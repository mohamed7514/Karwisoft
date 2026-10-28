import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const workspace = resolve(process.cwd(), '..');
const output = resolve(workspace, 'preview', 'next');
await mkdir(output, { recursive: true });
const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--disable-background-networking', '--disable-component-update', '--remote-debugging-pipe',
  '--allow-file-access-from-files', '--user-data-dir=' + resolve(workspace, '.preview-browser-services')
], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'], windowsHide: true });
let serial = 0, buffer = '', session;
const pending = new Map(), errors = [];
browser.stderr.on('data', () => {});
browser.on('error', error => { for (const entry of pending.values()) entry.reject(error); });
browser.stdio[4].on('data', data => {
  buffer += data.toString();
  let offset;
  while ((offset = buffer.indexOf('\0')) >= 0) {
    const packet = buffer.slice(0, offset); buffer = buffer.slice(offset + 1);
    if (!packet) continue;
    const message = JSON.parse(packet);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(arg => arg.value || arg.description || '').join(' '));
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (pending.has(message.id)) {
      const entry = pending.get(message.id); pending.delete(message.id); clearTimeout(entry.timeout);
      message.error ? entry.reject(new Error(JSON.stringify(message.error))) : entry.resolve(message.result);
    }
  }
});
function command(method, params = {}, sessionId) {
  return new Promise((resolvePromise, reject) => {
    const id = ++serial;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Timed out: ' + method)); }, 20000);
    pending.set(id, { resolve: resolvePromise, reject, timeout });
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + '\0');
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, session);
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
function assert(condition, name) { if (!condition) throw new Error('Failed: ' + name); console.log('PASS ' + name); }
async function shot(name, fullPage = false) {
  await evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const size = fullPage ? await evaluate('({width:innerWidth,height:document.documentElement.scrollHeight})') : null;
  const result = await command('Page.captureScreenshot', {
    format: 'png', captureBeyondViewport: fullPage,
    ...(size ? { clip: { x: 0, y: 0, ...size, scale: 1 } } : {})
  }, session);
  await writeFile(resolve(output, name + '.png'), Buffer.from(result.data, 'base64'));
}
const base=process.env.KARWISOFT_TEST_URL || 'http://127.0.0.1:3100';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
try {
  assert((await fetch(base+'/services/')).status===200,'Services route responds');
  assert((await fetch(base+'/services',{redirect:'manual'})).status===308,'extensionless route redirects');
  const {targetId}=await command('Target.createTarget',{url:'about:blank'});
  ({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
  await command('Page.enable',{},session);await command('Runtime.enable',{},session);
  for(const [width,height] of [[1440,1000],[1024,768],[768,1024],[390,844],[320,568]]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<760},session);
    await command('Page.navigate',{url:base+'/services/'},session);await pause(700);
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`Services fits ${width}`);
    assert(await evaluate('document.querySelectorAll("h1").length===1&&document.querySelectorAll(".service-card").length===4'),`four services and one page title ${width}`);
    assert(await evaluate('[...document.querySelectorAll("a")].filter(a=>a.getAttribute("href").startsWith("#")).every(a=>document.getElementById(a.hash.slice(1)))'),`local anchors resolve ${width}`);
    const boxes=await evaluate('[...document.querySelectorAll(".orbit-label,.art-center")].map(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,top:r.top,bottom:r.bottom}})');
    assert(boxes.every((a,i)=>boxes.every((b,j)=>i===j||a.right<=b.left||b.right<=a.left||a.bottom<=b.top||b.bottom<=a.top)),`hero labels do not overlap ${width}`);
    await shot('services-hero-'+width);
    await evaluate('document.querySelectorAll(".service-card")[1].click()');await pause(750);
    assert(await evaluate('location.hash==="#seo-ia"'),'service card opens matching detail');
    await evaluate('document.querySelector(".services-faq summary").click()');
    assert(await evaluate('document.querySelector(".services-faq details").open'),'FAQ disclosure works');
    await evaluate('document.querySelector("#sites-web").scrollIntoView({behavior:"instant"})');await pause(400);
    assert(await evaluate('document.querySelector(".preview-image img").naturalWidth>0'),'web design image loads');
    if(width===1440||width===390)await shot('services-web-'+width);
    assert(await evaluate('[...document.querySelectorAll("a[href^=mailto]")].every(a=>a.href.includes("Support@karwisoft.com"))'),'contact destination is correct');
    if(width===1440)await shot('services-full',true);
    await command('Page.navigate',{url:base},session);await pause(1000);
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`landing navigation fits ${width}`);
    if(await evaluate('document.querySelector(".site-menu-toggle").getClientRects().length>0')) {
      await evaluate('document.querySelector(".site-menu-toggle").click()');await pause(80);
      assert(await evaluate('document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="true"'),`mobile landing menu opens ${width}`);
    }
    assert(await evaluate('document.querySelector(".services-link").getBoundingClientRect().width>0'),`Services is visible in landing menu ${width}`);
    await evaluate('document.querySelector(".services-link").click()');await pause(500);
    assert(await evaluate('location.pathname==="/services/"'),'landing opens Services');
  }
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false},session);
  await command('Emulation.setScriptExecutionDisabled',{value:true},session);
  await command('Page.navigate',{url:base+'/services/'},session);await pause(500);
  await command('DOM.enable',{},session);await command('CSS.enable',{},session);
  const {root}=await command('DOM.getDocument',{},session);
  const {nodeId}=await command('DOM.querySelector',{nodeId:root.nodeId,selector:'h1'},session);
  const style=await command('CSS.getComputedStyleForNode',{nodeId},session);
  assert(style.computedStyle.some(s=>s.name==='display'&&s.value!=='none'),'Services heading remains visible without JavaScript');
  await command('Emulation.setScriptExecutionDisabled',{value:false},session);
  await command('Page.navigate',{url:base+'/?mode=presentation#convaincre'},session);await pause(500);
  assert(await evaluate('!document.querySelector("#convaincre").hidden&&document.querySelector("#present-position").textContent==="07 / 19"'),'tablet presentation remains available');
  assert(errors.length===0,'no console errors: '+errors.join('; '));
  console.log('Services page checks passed.');
} finally {browser.kill()}
