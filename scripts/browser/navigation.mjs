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
  '--allow-file-access-from-files', '--user-data-dir=' + resolve(workspace, '.preview-browser-navigation')
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

try {
const {targetId}=await command('Target.createTarget',{url:'about:blank'});
({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
await command('Page.enable',{},session);await command('Runtime.enable',{},session);
for(const [width,height] of [[1440,900],[1280,720],[1024,768],[1000,768],[834,1112],[768,1024],[390,844],[320,568],[844,390]]) {
await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false},session);
for(const path of ['/','/services/']) {
await command('Page.navigate',{url:base+path},session);await pause(1000);
assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'page width '+path+' '+width);
assert(await evaluate('getComputedStyle(document.querySelector(".header")).position==="sticky"&&getComputedStyle(document.querySelector(".header")).backgroundColor==="rgb(245, 242, 236)"'),'opaque sticky header '+path+' '+width);
if(width<=1000)await click('.site-menu-toggle');
const result=await evaluate('(()=>{const links=[...document.querySelectorAll(".site-menu a")];return links.length===5&&links.every(a=>{const r=a.getBoundingClientRect();return r.height>=44&&r.left>=0&&r.right<=innerWidth})})()');
assert(result,'all navigation targets fit '+path+' '+width);
assert(await evaluate('document.querySelector(".site-contact").textContent.includes("Parlons de votre projet")'),'contact action '+path+' '+width);
if(width===390||width===1440)await shot('header-'+(path==='/'?'home':'services')+'-'+width+(width<=1000?'-menu':''));
if(width<=1000){await click('.site-menu-toggle');if(width===390)await shot('header-'+(path==='/'?'home':'services')+'-'+width);}
await evaluate('scrollTo({top:450,behavior:"instant"})');await pause(200);
assert(await evaluate('Math.abs(document.querySelector(".header").getBoundingClientRect().top)<1'),'header stays visible after scroll '+path+' '+width);
}
}
assert(errors.length===0,'no console errors: '+errors.join('; '));
console.log('Modern header checks passed.');
}finally{browser.kill()}
