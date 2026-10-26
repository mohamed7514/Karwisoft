import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const workspace = resolve(process.cwd(), '..');
const output = resolve(workspace, 'preview', 'next');
await mkdir(output, { recursive: true });
const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--no-first-run', '--no-default-browser-check', '--disable-extensions',
  '--disable-background-networking', '--disable-component-update', '--remote-debugging-pipe',
  '--user-data-dir=' + resolve(workspace, '.preview-browser-seo-learning'),
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
function command(method, params = {}, sessionId = session) {
  return new Promise((resolvePromise, reject) => {
    const id = ++serial;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error('Timed out: ' + method)); }, 20000);
    pending.set(id, { resolve: resolvePromise, reject, timeout });
    browser.stdio[3].write(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }) + '\0');
  });
}
async function evaluate(expression) {
  const result = await command('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
function assert(condition, name) { if (!condition) throw new Error('Failed: ' + name); console.log('PASS ' + name); }
const pause = ms => new Promise(resolvePromise => setTimeout(resolvePromise, ms));
async function waitFor(expression) {
  for (let i = 0; i < 120; i++) { if (await evaluate(expression)) return; await pause(100); }
  throw new Error('Timeout waiting for ' + expression);
}
const base = process.env.KARWISOFT_TEST_URL || 'http://127.0.0.1:3100';
const key = 'karwisoft:seo-learning:v3';
async function navigate() {
  await command('Page.navigate', { url: base + '/services/seo/' });
  await pause(700);
  await waitFor('document.querySelector(".seo-guided-learning")?.dataset.ready === "true"');
}
async function screenshot(name) {
  const result = await command('Page.captureScreenshot', { format: 'png' });
  await writeFile(resolve(output, name + '.png'), Buffer.from(result.data, 'base64'));
}
async function count() { return Number(await evaluate('document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")')); }

const expected = ['reputation','local','autorite','qualite','pertinence','technique'];
const readProgress = () => evaluate('(()=>{const names={technique:"Technique",pertinence:"Pertinence",qualite:"Qualité",autorite:"Autorité",local:"Contexte local",reputation:"Réputation"}; const timer=document.querySelector("[role=timer]"); const text=timer?.querySelector("strong").textContent||"05:00"; const elapsed=text.includes("min +")?300000:text.split(":").reduce((sum,n)=>sum*60+Number(n),0)*1000; return {answers:Array(document.querySelectorAll(".seo-answer-feedback").length).fill(0),elapsedMs:timer?.textContent.includes("Terminé")?elapsed:300000-elapsed,placements:[...document.querySelectorAll("[data-pyramid-slot]")].map(e=>Object.keys(names).find(id=>e.getAttribute("aria-label").includes(names[id]))||null)}})()');
const questions = () => evaluate('document.querySelectorAll(".seo-answer-feedback").length');
async function keypress(key='Enter',code='Enter',value=13) {
  await command('Input.dispatchKeyEvent',{type:'keyDown',key,code,text:key==='Enter'?'\r':key===' '?' ':undefined,windowsVirtualKeyCode:value});
  await command('Input.dispatchKeyEvent',{type:'keyUp',key,code,windowsVirtualKeyCode:value});
}
async function center(selector) {
  return evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}})()');
}
async function mouseDrag(selector,slot) {
  const from=await center(selector), to=await center('[data-pyramid-slot="'+slot+'"]');
  await command('Input.dispatchMouseEvent',{type:'mouseMoved',...from});
  await command('Input.dispatchMouseEvent',{type:'mousePressed',...from,button:'left',clickCount:1});
  for(let n=1;n<=8;n++) await command('Input.dispatchMouseEvent',{type:'mouseMoved',x:from.x+(to.x-from.x)*n/8,y:from.y+(to.y-from.y)*n/8,buttons:1});
  await command('Input.dispatchMouseEvent',{type:'mouseReleased',...to,button:'left',clickCount:1});
  await pause(80);
}
async function touchDrag(selector,slot) {
  await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({behavior:"instant",block:"center"})');
  const from=await center(selector);
  assert(from.y>0&&from.y<844,'Touch source is visible');
  await command('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...from,id:1,radiusX:3,radiusY:3}]});
  let to=await center('[data-pyramid-slot="'+slot+'"]');
  const edge=await evaluate('document.querySelector(".seo-reading-journey").getBoundingClientRect().bottom+12');
  if(to.y<edge+45) {
    await command('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from.x,y:edge,id:1,radiusX:3,radiusY:3}]});
    for(let n=0;n<120&&to.y<edge+45;n++) { await pause(30); to=await center('[data-pyramid-slot="'+slot+'"]'); }
  }
  assert(to.y>edge&&to.y<844,'Edge scrolling brings the drop target into view');
  for(let n=1;n<=8;n++) await command('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:from.x+(to.x-from.x)*n/8,y:from.y+(to.y-from.y)*n/8,id:1,radiusX:3,radiusY:3}]});
  await command('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await pause(100);
}
async function selectPlace(id,slot) {
  await evaluate('document.querySelector("[data-signal-id='+id+']").click()');
  await waitFor('document.querySelector("[data-signal-id='+id+']")?.getAttribute("aria-pressed")==="true"');
  await evaluate('document.querySelector("[data-pyramid-slot=\\"'+slot+'\\"]").click()');
  for(let n=0;n<40;n++) {if((await readProgress()).placements[slot]===id)return;await pause(50)}
  throw new Error('Placement did not update');
}
async function refresh() {
  await command('Page.reload'); await pause(700);
  await waitFor('document.querySelector(".seo-guided-learning")?.dataset.ready==="true"');
}
async function begin() {
  await evaluate('document.querySelector("#seo-ready-button").click()');
  await waitFor('document.querySelector(".seo-five-minute-path").dataset.started==="true"');
}
async function answerOne(index) {
  await evaluate('document.querySelectorAll(".seo-task-quiz input")['+(index%3)+'].click()');
  await waitFor('!document.querySelector(".seo-task-quiz button").disabled');
  await evaluate('document.querySelector(".seo-task-quiz button").click()');
  await waitFor('document.querySelectorAll(".seo-answer-feedback").length==='+String(index+1));
}
async function allQuestions() {for(let n=0;n<6;n++)await answerOne(n)}
async function assertFresh(label) {
  assert(await count()===0 && await questions()===0 && await evaluate('document.querySelector(".seo-gated-content").hidden && !document.querySelector("[role=timer]") && !document.querySelector("#seo-pyramid-game") && !document.querySelector(".seo-learning-finished") && !document.querySelector(".seo-task-quiz input:checked")'),label);
}

try {
  const {targetId}=await command('Target.createTarget',{url:'about:blank'});
  ({sessionId:session}=await command('Target.attachToTarget',{targetId,flatten:true}));
  await command('Page.enable');await command('Runtime.enable');
  await navigate();
  await evaluate('for(const version of [1,2,3])localStorage.setItem("karwisoft:seo-learning:v"+version,JSON.stringify({answers:[0,0,0,0,0,0],elapsedMs:120000}));localStorage.setItem("seo-test:unrelated","keep")');
  await refresh();
  await assertFresh('Old saved progress is ignored on a fresh load');
  assert(await evaluate('![1,2,3].some(n=>localStorage.getItem("karwisoft:seo-learning:v"+n)) && localStorage.getItem("seo-test:unrelated")==="keep"'),'Only the old lesson snapshots are removed');
  assert(await evaluate('document.querySelectorAll(".seo-pyramid-row").length===6 && document.querySelector(".seo-pyramid-search-case").textContent.includes("implants dentaires Gatineau")'),'The reference pyramid remains available before starting');
  await evaluate('document.querySelector(".seo-not-ready").click()');
  assert(await count()===0 && !await evaluate('!!document.querySelector("[role=timer]")'),'Not now still leaves the timer idle');
  for(const[width,height]of[[1440,1000],[768,1024],[390,844],[320,568]]) {
    await command('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:width<760});
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth+1'),'Introduction fits '+width+'px');
  }
  await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await evaluate('document.querySelector("#seo-ready-button").focus()');await keypress();
  await waitFor('document.querySelector(".seo-five-minute-path").dataset.started==="true"');
  assert(await evaluate('document.querySelector("[role=timer] strong").textContent==="05:00" && document.activeElement.id==="seo-quick-technique"'),'Ready starts a fresh five-minute lesson');
  await pause(1200);assert((await readProgress()).elapsedMs>0,'The timer still advances during the visit');
  await answerOne(0);
  assert(await count()===1 && await evaluate('document.querySelector("#seo-feedback-0").textContent.includes("Votre réponse")'),'A wrong answer still reveals the explanation and next question');
  await refresh();
  await assertFresh('Refreshing during the questions clears answers, timer and completion');
  await begin();
  assert(await evaluate('document.querySelector("[role=timer] strong").textContent==="05:00" && document.activeElement.id==="seo-quick-technique"'),'After refresh, Ready starts at the first question and 05:00');
  await allQuestions();
  assert(await count()===6 && (await readProgress()).placements.every(id=>id===null),'Six questions still unlock an empty reconstruction game');
  await evaluate('document.querySelector("#seo-pyramid-game").scrollIntoView({behavior:"instant"})');await pause(100);
  await mouseDrag('[data-signal-id="qualite"]',0);
  assert((await readProgress()).placements[0]==='qualite','Mouse drag still places a label during the visit');
  await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await command('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  await touchDrag('[data-signal-id="reputation"]',1);
  assert((await readProgress()).placements[1]==='reputation','Touch drag still works without saved state');
  await pause(400);
  await evaluate('document.querySelector("[data-signal-id=autorite]").focus()');await keypress();
  await evaluate('document.querySelector("[data-pyramid-slot=\\"2\\"]").focus()');await keypress();
  assert((await readProgress()).placements[2]==='autorite','Keyboard placement still works');
  await refresh();
  await assertFresh('Refreshing during the game clears all six answers and partial placements');
  await begin();await allQuestions();
  assert((await readProgress()).placements.every(id=>id===null),'The new game does not restore earlier placements');
  for(let index=0;index<6;index++)await selectPlace(expected[index],index);
  assert(await count()===6,'The completed pyramid still requires verification');
  await evaluate('document.querySelector(".seo-game-check").click()');
  await waitFor('document.querySelector("[role=progressbar]").getAttribute("aria-valuenow")==="7"');
  const stopped=(await readProgress()).elapsedMs;await pause(1200);
  assert((await readProgress()).elapsedMs===stopped && await evaluate('document.querySelector(".seo-reading-label strong").textContent==="100 %"'),'Correct reconstruction completes the lesson and stops the timer');
  assert(await evaluate('![...Object.keys(localStorage),...Object.keys(sessionStorage)].some(key=>key.startsWith("karwisoft:seo-learning:"))'),'No learning progress is written to persistent or session storage');
  assert(await evaluate('!document.body.textContent.includes("Progression enregistrée sur cet appareil") && !document.body.textContent.includes("Votre progression est conservée sur cet appareil")'),'The interface no longer promises saved progress');
  await refresh();
  await assertFresh('Refreshing a completed lesson also restarts from zero');
  await begin();await answerOne(0);
  await evaluate('document.querySelector(".seo-learning-reset summary").click();document.querySelector(".seo-learning-reset button").click()');
  await waitFor('document.querySelector(".seo-five-minute-path").dataset.started==="false"');
  await assertFresh('Manual restart remains available');
  const {identifier}=await command('Page.addScriptToEvaluateOnNewDocument',{source:'for(const name of ["getItem","setItem","removeItem"])Storage.prototype[name]=function(){throw new DOMException("Disabled","SecurityError")};'});
  await navigate();await begin();await answerOne(0);
  assert(await count()===1,'Blocked browser storage does not affect learning');
  await refresh();await assertFresh('Refresh also resets the lesson when storage is blocked');
  await command('Page.removeScriptToEvaluateOnNewDocument',{identifier});await navigate();
  await evaluate('localStorage.removeItem("seo-test:unrelated")');
  await command('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  assert(await evaluate('getComputedStyle(document.querySelector(".seo-guided-task")).animationName==="none"'),'Reduced motion remains supported');
  await command('Emulation.setScriptExecutionDisabled',{value:true});
  await command('Page.navigate',{url:base+'/services/seo/'});await pause(700);
  await command('DOM.enable');await command('CSS.enable');
  const {root}=await command('DOM.getDocument');
  const {nodeId}=await command('DOM.querySelector',{nodeId:root.nodeId,selector:'.seo-gated-content'});
  const style=await command('CSS.getComputedStyleForNode',{nodeId});
  assert(style.computedStyle.some(item=>item.name==='display'&&item.value==='block'),'Reading without JavaScript remains available');
  assert(errors.length===0,'No browser errors: '+errors.join('; '));
  console.log('In-memory SEO lesson and refresh reset passed.');
} catch(error){console.error(error.message);process.exitCode=1}finally{browser.kill()}
