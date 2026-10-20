const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
function harness(){
  const elements=new Map(); let exported; const links=[];
  const buttons=['matched','product','version','stale','missing','conflict'].map(key=>({dataset:{scenario:key},attrs:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(k,fn){this[k]=fn;}}));
  const document={querySelectorAll:()=>buttons,getElementById(id){if(!elements.has(id))elements.set(id,{textContent:'',addEventListener(k,fn){this[k]=fn;}});return elements.get(id);},querySelector:()=>({classList:{toggle(){}}}),createElement:()=>{const link={click(){links.push(this);}};return link;}};
  const context=vm.createContext({document,Blob,URL:{createObjectURL(blob){exported=blob;return 'blob:test';},revokeObjectURL(){}},setTimeout(fn){fn();}});
  vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),context);
  return {buttons,elements,getExport:()=>exported,links};
}
test('only matching evidence releases an explanation; all five negative cases withhold',()=>{
  const h=harness();
  for(const button of h.buttons){button.click();assert.equal(h.elements.get('decision').textContent,button.dataset.scenario==='matched'?'EXPLANATION RELEASED':'EXPLANATION WITHHELD');assert.equal(h.buttons.filter(b=>b.attrs['aria-pressed']==='true').length,1);assert.ok(h.elements.get('reason').textContent.length>50);}
});
test('export retains selected scenario and explicit simulation boundaries',async()=>{
  const h=harness();h.buttons[4].click();h.elements.get('export-demo').click();const record=JSON.parse(await h.getExport().text());assert.equal(record.scenario,'missing');assert.equal(record.released,false);assert.equal(record.engine_executed,false);assert.equal(record.live_assessment,false);assert.match(record.integrity,/not checked/);assert.equal(h.links[0].download,'sentinel-synthetic-missing.json');
});
test('all local HTML links and fragments resolve',()=>{
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
  for(const [,target]of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(target.startsWith('https:'))continue;
    if(target.startsWith('#'))assert.ok(html.includes(`id="${target.slice(1)}"`),target);
    else assert.ok(fs.existsSync(path.join(root,target)),target);
  }
});
test('presentation has no external runtime requests or operational data',()=>{
  const js=fs.readFileSync(path.join(root,'app.js'),'utf8');const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
  assert.doesNotMatch(js,/\b(fetch|XMLHttpRequest|WebSocket|EventSource)\s*\(/);
  assert.doesNotMatch(css,/@import|https?:/);
  for(const file of ['index.html','styles.css','app.js','docs/STATUS.md','docs/RESEARCH.md','docs/DEMONSTRATION.md']){const text=fs.readFileSync(path.join(root,file),'utf8');assert.doesNotMatch(text,/C:\\(?:Projects|Users|P)\\|Bearer\s+[A-Za-z0-9]|gh[pousr]_[A-Za-z0-9]+|-----BEGIN .*PRIVATE KEY|research-435c|1ca2c/);}
});
