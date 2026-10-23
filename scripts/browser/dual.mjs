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
  '--allow-file-access-from-files', '--user-data-dir=' + resolve(workspace, '.preview-browser-next-migration')
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
  assert((await fetch(base)).status===200,'page responds');
  const {targetId}=await command('Target.createTarget',{url:'about:blank'});
  ({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
  await command('Page.enable',{},session);await command('Runtime.enable',{},session);
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]},session);
  for(const [width,height] of [[1440,900],[1024,768],[768,1024],[390,844],[320,568]]){
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<760},session);
    await command('Page.navigate',{url:base},session);await pause(600);
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),`online page fits ${width}`);
    assert(await evaluate('[...document.querySelectorAll("a")].filter(a=>a.hash).every(a=>document.getElementById(a.hash.slice(1)))'),`online anchors resolve ${width}`);
    if(width<=760) {
      assert(await evaluate('document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="false"&&[...document.querySelectorAll(".site-menu>a")].every(a=>!a.getClientRects().length)'),`closed mobile menu hides links ${width}`);
      await click('.site-menu-toggle');
      assert(await evaluate('document.querySelector(".site-menu-toggle").getAttribute("aria-controls")===document.querySelector(".site-menu").id&&document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="true"&&document.querySelectorAll(".site-menu>a").length===4&&[...document.querySelectorAll(".site-menu>a")].every(a=>a.getBoundingClientRect().height>=44)'),`mobile menu exposes all four touch targets ${width}`);
      await evaluate('document.querySelector(".site-menu>a").focus()');
      await command('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'},session);await pause(80);
      assert(await evaluate('document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="false"&&document.activeElement===document.querySelector(".site-menu-toggle")&&!document.querySelector(".site-menu").getClientRects().length'),`Escape closes menu and restores focus ${width}`);
      await click('.site-menu-toggle');await click('.site-menu>a[href="#parcours"]');
      assert(await evaluate('location.hash==="#parcours"&&document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="false"&&!document.querySelector(".site-menu").getClientRects().length'),`menu selection navigates and closes ${width}`);
      if(width===390) {
        await click('.site-menu-toggle');
        await command('Emulation.setDeviceMetricsOverride',{width:1024,height:768,deviceScaleFactor:1,mobile:false},session);await pause(120);
        assert(await evaluate('!document.querySelector(".site-menu-toggle").getClientRects().length&&document.querySelector(".site-menu-toggle").getAttribute("aria-expanded")==="false"&&[...document.querySelectorAll(".site-menu>a")].every(a=>a.getClientRects().length)'), 'desktop navigation appears on resize without reloading');
        await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:true},session);await pause(120);
        assert(await evaluate('document.querySelector(".site-menu-toggle").getClientRects().length>0&&!document.querySelector(".site-menu").getClientRects().length'), 'returning to mobile restores the closed menu');
      }
    } else {
      assert(await evaluate('!document.querySelector(".site-menu-toggle").getClientRects().length&&document.querySelectorAll(".site-menu>a").length===4&&[...document.querySelectorAll(".site-menu>a")].every(a=>a.getClientRects().length)'),`desktop navigation keeps all four links visible ${width}`);
    }
    await click('.model-button[data-model="essentielle"]');
    assert(await evaluate('document.querySelector("#contact-link").href.includes("mailto:Contact@Karwisoft.com")&&decodeURIComponent(document.querySelector("#contact-link").href).includes("Essentielle")'),'contact includes Essentielle formula');
    await click('.model-button[data-model="avancee"]');
    assert(await evaluate('decodeURIComponent(document.querySelector("#contact-link").href).includes("Avancée")&&document.querySelectorAll(".offer-card.selected").length===1'),'Avancée replaces Essentielle');
    await evaluate('document.querySelector(".faq-list details").open=true');
    assert(await evaluate('document.querySelector(".faq-list details").open'),'FAQ opens');
    if(width===1440||width===390){await evaluate('scrollTo({top:0,behavior:"instant"})');await shot('migration-online-'+width)}
    await command('Page.navigate',{url:base+'/?mode=presentation#accueil'},session);await pause(800);
    assert(await evaluate('!!window.karwisoftPresentation&&document.querySelector("#present-position").textContent==="01 / 19"'),`presentation initializes ${width}`);
    assert(await evaluate('!document.querySelector(".header").getClientRects().length&&document.querySelectorAll("#overview-items button").length===19'),`presentation controls and index ${width}`);
    for(let i=0;i<19;i++){
      await evaluate(`window.karwisoftPresentation.goTo(${JSON.stringify(['intro-1','intro-2','intro-3','approche','attirer','ressentir','convaincre','confiance','orienter','photos','preview','demande','reception','rappels','avis','workflow','mesurer','offre','suite'][i])})`);
      const state=await evaluate('({overflow:document.documentElement.scrollWidth>innerWidth+1,visible:[...document.querySelectorAll("[data-story-scene],#approche,[data-deck],#offre,#suite")].filter(x=>x.getClientRects().length).length,bottom:document.querySelector(".present-controls").getBoundingClientRect().bottom,height:innerHeight})');
      assert(!state.overflow&&state.visible===1&&state.bottom<=state.height,`slide ${i+1} fits and is alone at ${width}`);
    }
    await click('#present-overview');assert(await evaluate('document.querySelector("#presentation-overview").open'),'overview opens');
    await click('[data-present-go="6"]');assert(await evaluate('!document.querySelector("#presentation-overview").open&&!document.querySelector("#convaincre").hidden'),'overview jumps to demo');
    await click('[data-hotspot="design"]');assert(await evaluate('document.querySelector("#hotspot-detail").textContent.includes("typographie")'),'hotspot works in presentation');
    if(width===1024||width===768||width===390)await shot('migration-tablet-'+width);
    await evaluate('window.karwisoftPresentation.goTo("preview");document.querySelector("#smile-range").value="70";document.querySelector("#smile-range").dispatchEvent(new Event("input",{bubbles:true}))');
    assert(await evaluate('document.querySelector(".smile-compare").style.getPropertyValue("--split")==="70%"'),'comparison remains interactive');
    await evaluate('window.karwisoftPresentation.goTo("demande")');
    for(let j=0;j<4;j++)await click('#quiz-content button');
    assert(await evaluate('document.querySelector("#quiz-content").textContent.includes("préparée")'),'quiz completes in presentation');
    await evaluate('window.karwisoftPresentation.goTo("offre")');await click('.model-button[data-model="essentielle"]');
    assert(await evaluate('!document.querySelector("#suite").hidden&&document.querySelector("#selected-model").textContent.includes("Essentielle")'),'model selection advances to contact');
    assert(await evaluate('document.querySelector("#leave-presentation").getAttribute("href")==="?#suite"'),'return link retains current section');
    await command('Page.navigate',{url:base+'/?mode=presentation#demande'},session);await pause(600);
    assert(await evaluate('!document.querySelector("#demande").hidden'),'direct presentation link restores slide');
    await command('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight'},session);await pause(50);
    assert(await evaluate('!document.querySelector("#reception").hidden'),'keyboard advances');
    await command('Page.navigate',{url:base+'/?mode=presentation#preview'},session);await pause(300);
    await evaluate('document.querySelector("#smile-range").focus()');
    await command('Input.dispatchKeyEvent',{type:'keyDown',key:'ArrowRight',code:'ArrowRight'},session);await pause(50);
    assert(await evaluate('!document.querySelector("#preview").hidden'),'range keyboard does not advance slide');
  }
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false},session);
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]},session);
  await command('Page.navigate',{url:base},session);await pause(1800);
  assert(await evaluate('document.querySelector(".story").classList.contains("story-enhanced")'),'online animation remains enabled');
  await evaluate('document.querySelector("#attirer").scrollIntoView({behavior:"instant"})');await pause(1000);
  assert(await evaluate('document.querySelector(".deck-nav").classList.contains("is-visible")'),'online journey navigation works');
  await command('Page.navigate',{url:base+'/?mode=presentation#convaincre'},session);await pause(500);
  assert(await evaluate('document.querySelectorAll(".pin-spacer").length===0'),'presentation avoids scroll pinning');
  await click('.replay-smile');await pause(2600);
  assert(await evaluate('!document.querySelector(".replay-smile").disabled&&Number(getComputedStyle(document.querySelector(".demo-before")).opacity)===0'),'manual transformation completes');
  await command('Emulation.setDeviceMetricsOverride',{width:1024,height:768,deviceScaleFactor:1,mobile:false},session);
  await evaluate('window.karwisoftPresentation.goTo("convaincre")');
  assert(await evaluate('document.querySelector("#convaincre .deck-bottom").getBoundingClientRect().bottom<=document.querySelector(".present-controls").getBoundingClientRect().top'),'tablet landscape demo clears controls');
  await shot('migration-tablet-motion');
  assert(errors.length===0,'no browser console errors: '+errors.join('; '));
  console.log('Dual mode checks passed.');
} finally {browser.kill()}
