// Exercise the actual hook lifecycle without pretending this is browser visual QA.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const source=fs.readFileSync('src/hooks/usePortfolioMotion.js','utf8');
const hook=source.slice(source.indexOf('export default function')).replace('export default ','');
const settle=()=>new Promise(resolve=>setImmediate(resolve));
function scenario({hash='',delayed=false}={}) {
 const state={timelines:[],scenes:[],starts:0,stops:0,scrolls:[],refreshes:0,classes:new Set(),cleanup:null};
 let resolveImage;
 const imageReady=delayed?new Promise(resolve=>resolveImage=resolve):Promise.resolve();
 const events=()=>({listeners:{},addEventListener(name,handler){this.listeners[name]=handler;}});
 const anchor={...events(),hash:'#projects'};
 const image={decode:()=>imageReady};
 const target={id:'projects'};
 const logo={getBoundingClientRect:()=>({left:30,top:25,width:20,height:20})};
 const root={querySelector:s=>s==='.portrait-backdrop img'?image:s==='.header .logo-square'?logo:{},querySelectorAll:s=>s==='.loader-stack img'?[image]:s==='a[href^="#"]'?[anchor]:[]};
 const document={fonts:{ready:Promise.resolve()},documentElement:{...events(),classList:{add:(...v)=>v.forEach(x=>state.classes.add(x)),remove:(...v)=>v.forEach(x=>state.classes.delete(x))}},getElementById:id=>id==='projects'?target:null};
 const history={scrollRestoration:'auto',replaceState(){}};
 const window={...events(),scrollTo:(x,y)=>state.scrolls.push(y)};
 const context={add:fn=>fn(),revert(){}};
 const gsap={registerPlugin(){},ticker:{add(){},remove(){},lagSmoothing(){}},context:()=>context,matchMedia:()=>({add:(...args)=>state.scenes.push(args),revert(){}}),set(){},killTweensOf(){},timeline(options){const timeline={options,kill(){this.killed=true;},set(){return this;},to(){return this;},fromTo(){return this;}};state.timelines.push(timeline);return timeline;}};
 class Lenis {on(){} raf(){} stop(){state.stops++;} start(){state.starts++;} scrollTo(to,options){state.scrolls.push(to);} destroy(){}}
 class IntersectionObserver {observe(){} disconnect(){}}
 let timerId=0;const timers=new Map();
 const useLayoutEffect=fn=>{state.cleanup=fn();};
 new Function('useLayoutEffect','gsap','ScrollTrigger','Lenis','matchMedia','IntersectionObserver','document','window','history','location','setTimeout','clearTimeout','root','scrollY',`${hook}\nusePortfolioMotion({current:root});`)(useLayoutEffect,gsap,{config(){},update(){},refresh(){state.refreshes++;}},Lenis,()=>({...events(),matches:false}),IntersectionObserver,document,window,history,{hash},fn=>{timers.set(++timerId,fn);return timerId;},id=>timers.delete(id),root,900);
 return {state,history,resolveImage,anchor,timers};
}
for (const hash of ['', '#projects']) {
 const s=scenario({hash});
 assert.equal(s.history.scrollRestoration,'manual');
 await settle();
 assert.equal(s.state.timelines.length,1,'Refresh at a restored scroll position must still create the loader.');
 assert.equal(s.state.scenes.length,0,'Scroll scenes must wait for the intro.');
 s.state.timelines[0].options.onComplete();
 assert.equal(s.state.scenes.length,2);
 assert.equal(s.state.starts,1);
 assert.ok(!s.state.classes.has('is-loading'));
 if(hash) assert.ok(s.state.scrolls.some(x=>x?.id==='projects'),'Deep link is honored after the loader.');
 s.state.timelines[0].options.onComplete();
 assert.equal(s.state.scenes.length,2,'Completing twice must not duplicate scroll scenes.');
 s.state.cleanup();assert.equal(s.history.scrollRestoration,'auto');
}
const cancelled=scenario({delayed:true});
cancelled.state.cleanup();cancelled.resolveImage();await settle();
assert.equal(cancelled.state.timelines.length,0,'Unmounted StrictMode effect must not start a late loader.');
const skipped=scenario({delayed:true});
skipped.anchor.listeners.click({preventDefault(){},detail:1});
skipped.resolveImage();await settle();
assert.equal(skipped.state.timelines.length,0,'Skip during image loading must not be covered by a late loader.');
assert.equal(skipped.state.scenes.length,2);skipped.state.cleanup();
const timeout=scenario({delayed:true});
[...timeout.timers.values()][0]();timeout.resolveImage();await settle();
assert.equal(timeout.state.timelines.length,0,'Timeout fallback must not restart the loader later.');
assert.equal(timeout.state.starts,1);timeout.state.cleanup();
console.log('PASS: refresh, hash navigation, intro/scroll handoff, repeat completion, StrictMode cleanup, skip and timeout races.');
