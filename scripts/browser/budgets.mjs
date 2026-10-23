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
  '--allow-file-access-from-files', '--user-data-dir=' + resolve(workspace, '.preview-browser-budget')
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
  const {targetId}=await command('Target.createTarget',{url:'about:blank'});
  ({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
  await command('Page.enable',{},session);await command('Runtime.enable',{},session);
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]},session);
  for(const [width,height] of [[1440,1000],[1024,768],[768,1024],[390,844],[320,568]]){
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<760},session);
    for(const presentation of [false,true]){
      await command('Page.navigate',{url:base+(presentation?'/?mode=presentation#offre':'/#offre')},session);await pause(500);
      assert(await evaluate('document.querySelectorAll(".offer-card").length===3&&document.querySelectorAll(".offer-common li").length===6'),`three formulas share six tasks at ${width}, presentation ${presentation}`);
      assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1&&[...document.querySelectorAll(".offer-card")].every(c=>c.scrollWidth<=c.clientWidth+1)'),`offer cards fit ${width}, presentation ${presentation}`);
      assert(await evaluate('!/(par lead|au mois|deux formules|deux modes)/i.test(document.querySelector("#offre").textContent)'),`legacy billing removed ${width}, presentation ${presentation}`);
      assert(await evaluate('document.querySelector(".offer-note").textContent.includes("payé à Google")&&document.querySelector(".offer-note").textContent.includes("distincts")'),'media spend and fees are separate');
      if(width===1440||width===390)await shot('budget-offers-'+width+'-'+presentation);
      for(const [i,label] of ['Essentielle','Avancée','Premium'].entries()){
        if(presentation)await evaluate('window.karwisoftPresentation.goTo("offre")');
        await evaluate(`document.querySelectorAll('.model-button')[${i}].click()`);await pause(50);
        assert(await evaluate(`document.querySelectorAll('.offer-card.selected').length===1&&document.querySelectorAll('.model-button')[${i}].getAttribute('aria-pressed')==='true'&&document.querySelector('#selected-model').textContent.includes(${JSON.stringify(label)})`),`${label} replaces prior selection`);
        assert(await evaluate(`decodeURIComponent(document.querySelector('#contact-link').href).includes(${JSON.stringify('Google Ads — formule '+label)})&&document.querySelector('#contact-link').href.startsWith('mailto:Contact@Karwisoft.com')`),`${label} contact subject is correct`);
        if(presentation)assert(await evaluate('!document.querySelector("#suite").hidden'),'selection advances presentation to contact');
      }
      if(presentation){
        await evaluate('document.querySelector("#present-overview").click()');
        assert(await evaluate('document.querySelectorAll("[data-present-go]")[17].textContent.includes("formules Google Ads")'),'overview uses current formula label');
      }
    }
    await command('Page.navigate',{url:base+'/services/'},session);await pause(300);
    assert(await evaluate('document.querySelector("#google-ads").textContent.includes("mêmes prestations")&&document.querySelector("#google-ads").textContent.includes("budget publicitaire mensuel")'),'Services explains budget-based formulas');
    assert(await evaluate('!/(par lead|au mois)/i.test(document.body.textContent)'),'Services contains no obsolete billing');
  }
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]},session);
  await command('Page.navigate',{url:base+'/#offre'},session);await pause(1600);
  await evaluate('document.querySelector(".offer-grid").scrollIntoView({behavior:"instant"})');await pause(1000);
  assert(await evaluate('Number(getComputedStyle(document.querySelector(".offer-grid")).opacity)>.95'),'offer cards appear with animations enabled');
  assert(errors.length===0,'no console errors: '+errors.join('; '));
  console.log('Budget formula checks passed.');
}finally{browser.kill()}
