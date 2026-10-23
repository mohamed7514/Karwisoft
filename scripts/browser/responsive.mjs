import { spawn } from 'node:child_process';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const workspace = resolve(process.cwd(), '..');
const output = resolve(workspace, 'preview', 'responsive');
await mkdir(output, { recursive: true });
const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--disable-background-networking', '--disable-component-update', '--remote-debugging-pipe',
  '--allow-file-access-from-files', '--user-data-dir=' + resolve(workspace, '.preview-browser-responsive-final')
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
const pause = ms => new Promise(resolve=>setTimeout(resolve,ms));
async function click(selector){await evaluate('document.querySelector('+JSON.stringify(selector)+').click()');await pause(80)}

const sizes=[[1920,1080],[1440,900],[1280,720],[1024,600],[1000,768],[834,1112],[768,1024],[600,800],[430,932],[390,844],[375,667],[320,568],[844,390],[667,375],[720,450]];
const ids=['intro-1','intro-2','intro-3','approche','attirer','ressentir','convaincre','confiance','orienter','photos','preview','demande','reception','rappels','avis','workflow','mesurer','offre','suite'];
async function ready(presenting=false) {
  for(let i=0;i<80;i++) {
    if(await evaluate(presenting?'!!window.karwisoftPresentation':'!!document.querySelector(".site-menu-toggle")')) {await pause(100);return;}
    await pause(100);
  }
  throw new Error('Page did not hydrate');
}
function geometricCheck(id) {
  const frame=document.getElementById(id), failures=[];
  const container=frame.getBoundingClientRect();
  for(const e of frame.querySelectorAll('h2,.deck-copy>p,.story-caption>p,.deck-panel,.real-site,.deck-bottom,.workflow-grid')) {
    if(!e.getClientRects().length)continue;
    const r=e.getBoundingClientRect();
    if(r.width&&r.height&&(r.left < -1 || r.right > innerWidth+1 || r.top < container.top-2 || r.bottom > container.bottom+2)) failures.push({element:e.tagName+'.'+e.className,rect:[r.left,r.top,r.right,r.bottom],frame:[container.top,container.bottom]});
  }
  const caption=frame.querySelector('.story-caption'), mock=frame.querySelector('.story-browser');
  if(caption&&mock&&mock.getClientRects().length) {
    const a=caption.getBoundingClientRect(),b=mock.getBoundingClientRect();
    // Caption wrappers span the width on wide screens; compare their text boxes.
    for(const e of caption.querySelectorAll('h2,p')) {
      const c=e.getBoundingClientRect();
      if(c.right>b.left+2&&c.left<b.right-2&&c.bottom>b.top+2&&c.top<b.bottom-2)failures.push({overlap:'caption and browser',caption:[c.left,c.top,c.right,c.bottom],mock:[b.left,b.top,b.right,b.bottom]});
    }
  }
  return failures;
}
try {
  const {targetId}=await command('Target.createTarget',{url:'about:blank'});
  ({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
  await command('Page.enable',{},session);await command('Runtime.enable',{},session);
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]},session);
  for(const [width,height] of sizes) {
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false},session);
    await command('Page.navigate',{url:base},session);await ready();await pause(350);
    if(width>=1101&&height>=700)for(let i=0;i<80;i++){if(await evaluate('document.querySelector(".story").classList.contains("story-enhanced")'))break;await pause(100);}
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'), 'landing width '+width+'x'+height);
    assert(await evaluate('document.querySelector(".story").classList.contains("story-enhanced")==='+(width>=1101&&height>=700)), 'pinning matches available screen '+width+'x'+height);
    if(width<1101||height<700) {
      for(const id of ids.slice(0,3)) {
        const result=await evaluate('('+geometricCheck.toString()+')('+JSON.stringify(id)+')');
        assert(result.length===0,'flowing hero '+id+' at '+width+'x'+height+': '+JSON.stringify(result));
      }
    }
    if(width===390||width===844||width===1440)await shot('final-landing-'+width+'x'+height);
    await command('Page.navigate',{url:base+'/?mode=presentation#intro-1'},session);await ready(true);
    for(const id of ids) {
      await evaluate('window.karwisoftPresentation.goTo('+JSON.stringify(id)+')');
      await pause(35);
      const result=await evaluate('('+geometricCheck.toString()+')('+JSON.stringify(id)+')');
      assert(result.length===0,'slide content contained '+id+' at '+width+'x'+height+': '+JSON.stringify(result));
      assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'slide width '+id+' at '+width);
      if(width===390&&id==='convaincre'||width===844&&height===390&&id==='intro-2')await shot('final-'+id+'-'+width+'x'+height);
      // At the bottom, the fixed controls must leave all end content reachable.
      await evaluate('scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})');await pause(20);
      assert(await evaluate('document.getElementById('+JSON.stringify(id)+').getBoundingClientRect().bottom<=document.querySelector(".present-controls").getBoundingClientRect().top+2'), 'slide end reachable above controls '+id+' at '+width+'x'+height);
    }
  }
  // Resize the same animated page across breakpoints and rotate it without reload.
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false},session);
  await command('Page.navigate',{url:base},session);await ready();await pause(500);
  await evaluate('window.responsiveResizeMarker="same-document"');
  for(const [width,height] of [[390,844],[834,1112],[844,390],[1440,900]]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false},session);await pause(700);
    assert(await evaluate('window.responsiveResizeMarker==="same-document"&&document.documentElement.scrollWidth<=innerWidth+1'),'resize keeps document and fits '+width+'x'+height);
    assert(await evaluate('document.querySelector(".story").classList.contains("story-enhanced")==='+(width>=1101&&height>=700)),'animation resets after live resize '+width+'x'+height);
    if(width<1101)assert(await evaluate('[...document.querySelectorAll("[data-story-scene]")].every(e=>!e.inert&&e.getAttribute("aria-hidden")!=="true"&&getComputedStyle(e).visibility==="visible")'),'all hero scenes remain accessible after resize');
  }
  assert(errors.length===0,'no browser errors: '+errors.join('; '));
  console.log('Responsive geometry, landscape, zoom-equivalent and live resize checks passed.');
}finally{browser.kill()}
