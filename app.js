'use strict';
// Public, invented fixtures only. This illustration does not call Sentinel services.
const scenarios = {
  matched: {released:true, conclusion:'The records agree.', inventory:'Demo Runtime / 8.0.1', finding:'Demo Runtime / 8.0.1', observation:'2 hours before assessment', reason:"The invented inventory and finding identify the same endpoint, product and version, within the demonstration's freshness window.", explanation:'The demo scanner reports a finding for Demo Runtime 8.0.1 on DEMO-WS-01. The paired inventory supports that relationship. Exploitability and compromise are not established.'},
  product: {released:false, conclusion:'The product does not match.', inventory:'Demo Editor / 8.0.1', finding:'Demo Runtime / 8.0.1', observation:'2 hours before assessment', reason:'A shared version number does not establish product identity. An editor observation cannot support a runtime finding.', explanation:'Withheld. Obtain a matching product observation before releasing the scanner-attributed explanation.'},
  version: {released:false, conclusion:'A neighboring version is not a match.', inventory:'Demo Runtime / 8.0.2', finding:'Demo Runtime / 8.0.1', observation:'2 hours before assessment', reason:'The finding names 8.0.1 while the inventory records 8.0.2. This demonstration makes no inference about affected-version ranges.', explanation:'Withheld. Reconcile the exact observed version and the specific finding.'},
  stale: {released:false, conclusion:'The observation is too old.', inventory:'Demo Runtime / 8.0.1', finding:'Demo Runtime / 8.0.1', observation:'45 days before assessment', reason:'Matching names and versions are insufficient when the supporting inventory falls outside the illustrative 24-hour freshness window.', explanation:'Withheld. Obtain a recent, time-aligned observation; historical presence does not establish current state.'},
  missing: {released:false, conclusion:'A required record is missing.', inventory:'No inventory record', finding:'Demo Runtime / 8.0.1', observation:'Inventory observation unavailable', reason:'The scanner finding alone does not supply the paired inventory required by this relationship check.', explanation:'Withheld. Retrieve the missing inventory record and reconcile endpoint, product, version and time.'},
  conflict: {released:false, conclusion:'The findings conflict.', inventory:'Demo Runtime / 8.0.1', finding:'Conflicting 8.0.1 / 8.0.2 records', observation:'Both records 2 hours old', reason:'The available findings disagree about the same product and endpoint. The illustration does not choose whichever record supports release.', explanation:'Withheld. Resolve the conflicting records and retain both observations in the audit history.'}
};
let selected = 'matched';
const ids = ['conclusion','inventory','finding','observation','reason'];
function selectScenario(key) {
  if (!Object.hasOwn(scenarios,key)) return;
  selected = key;
  const scenario = scenarios[key];
  document.querySelectorAll('[data-scenario]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.scenario === key)));
  for (const id of ids) document.getElementById(id).textContent = scenario[id];
  document.getElementById('decision').textContent = scenario.released ? 'EXPLANATION RELEASED' : 'EXPLANATION WITHHELD';
  document.getElementById('release').textContent = scenario.explanation;
  document.querySelector('.assessment').classList.toggle('withheld', !scenario.released);
}
document.querySelectorAll('[data-scenario]').forEach(button => button.addEventListener('click', () => selectScenario(button.dataset.scenario)));
document.getElementById('export-demo').addEventListener('click', () => {
  const record = {kind:'synthetic-showcase-illustration', live_assessment:false, engine_executed:false, scenario:selected, endpoint:'DEMO-WS-01', integrity:'assumed valid; not checked by this illustration', ...scenarios[selected]};
  const url = URL.createObjectURL(new Blob([JSON.stringify(record,null,2)+'\n'],{type:'application/json'}));
  const link = document.createElement('a'); link.href=url; link.download=`sentinel-synthetic-${selected}.json`; link.click();
  setTimeout(() => URL.revokeObjectURL(url),1000);
});
