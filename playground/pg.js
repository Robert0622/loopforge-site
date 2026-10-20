(function(){
'use strict';
const {SOPS,NN,RULES}=window.PG_DATA;
const qs=new URLSearchParams(location.search);
let L=qs.get('lang')||localStorage.getItem('lf-lang')||((navigator.language||'').startsWith('zh')?'zh':'en');if(L!=='zh'&&L!=='en')L='zh';
const Z=(a,b)=>L==='zh'?a:b;
const B=(zh,en)=>({zh,en});
const tx=v=>v==null?'':typeof v==='string'?v:(v[L]!=null?v[L]:v.zh);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const nn=id=>Z(NN[id][0],NN[id][1]);
const EXEC=[['codebuddy','CodeBuddy'],['codex','Codex'],['claude-code','Claude Code']];
const LOGO='<svg viewBox="0 0 64 64" fill="none"><path d="M45.2 19.2A10 10 0 1 1 42 4.8" stroke="#FF5A1F" stroke-width="4.4" stroke-linecap="round"/><path d="M46.5 7.8L39.0 9.0L42.8 1.4z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="1.2" stroke-linejoin="round"/><path d="M3 30.5c6.5 0 11.2-1.6 15-3.5H58v7.8h-8.6c-3.6 0-5.9 2.6-5.9 5.8V44h7.2v6.5H20.8V44H28v-3.4c0-3.2-2.3-5.8-5.9-5.8H17C10.8 34.8 6 33.2 3 30.5z" fill="currentColor"/></svg>';

/* ---------- synthetic per-node output (demo data) ---------- */
const CTX={
 bugfix:{files:[['src/export/orders.ts','+14 −4'],['src/lib/time.ts','+11 −2'],['tests/export.test.ts','+38']],tests:9,
  cause:B('导出时用服务器时区（UTC）格式化 created_at，页面按用户时区（Asia/Shanghai）显示。','The export formats created_at in the server timezone (UTC) while the page uses the user timezone (Asia/Shanghai).')},
 backend:{files:[['api/orders.ts','+22 −3'],['api/schema.ts','+9'],['tests/orders.api.test.ts','+64']],tests:12,
  cause:B('GET /orders 目前忽略 status 参数。','GET /orders currently ignores the status parameter.')}};
function gen(run,node){
 const k=run.sop.kind,c=CTX[k],a=run.att[node.id],cm=run.comment,t=run.title,d=run.body,lines=[],tool=(m,x)=>lines.push({k:'tool',m}),info=m=>lines.push({k:'info',m}),ok=m=>lines.push({k:'ok',m});
 const H=(zh,en)=>B(zh,en);let body;
 if(k==='welcome'){
  if(node.id==='prepare'){tool(B('$ mkdir -p reports','$ mkdir -p reports'));tool(B("$ printf '# LoopForge 本地验收…' > reports/welcome.md","$ printf '# LoopForge local check…' > reports/welcome.md"));ok(B('脚本退出码 0','script exit code 0'));
   body=B('# LoopForge 本地验收\n\n已验证：真实脚本节点、持久化产物、人工审批与恢复。\n','# LoopForge local check\n\nVerified: real script node, persisted artifact, human approval and resume.\n')}
  else{tool(B("$ printf '# 验收完成…' > completed.md","$ printf '# Check complete…' > completed.md"));ok(B('脚本退出码 0','script exit code 0'));body=B('# 验收完成\n\n审批已通过，执行成功恢复。\n','# Check complete\n\nApproval passed and execution resumed.\n')}
  return{lines,body}}
 const P=k==='product';
 switch(node.id){
 case 'clarify':
  tool(B('Read 需求描述与附件','Read request and attachments'));
  if(!P)tool(B(`Grep "${k==='bugfix'?'created_at':'status'}" src/ → 6 处匹配`,`Grep "${k==='bugfix'?'created_at':'status'}" src/ → 6 matches`));
  else tool(B('Read 现有会员规则文档（工作区）','Read existing membership rules (workspace)'));
  info(B('整理目标、范围、边界与可测试的验收标准','Drafting goal, scope, boundaries and testable acceptance criteria'));
  tool(B('Write requirement.md','Write requirement.md'));
  body=H(`# 需求定型\n\n## 目标\n${t}\n\n## 背景\n${d}\n\n## 范围\n${P?'- 积分获取、抵扣、过期三条规则\n- 会员中心积分明细页':'- '+c.files.filter(f=>!f[0].startsWith('tests')).map(f=>f[0]).join('\n- ')}\n\n## 不做\n- ${P?'积分商城':'与本需求无关的重构'}\n\n## 验收标准\n${P?'- 每条规则都有正例、反例和边界值\n- 过期规则说明清楚时区与结算时间点':'- 新增测试覆盖正常值、边界值与非法值\n- 现有测试全部通过'}\n`,
   `# Requirement\n\n## Goal\n${t}\n\n## Context\n${d}\n\n## Scope\n${P?'- Earning, redeeming and expiry rules\n- Points history page':'- '+c.files.filter(f=>!f[0].startsWith('tests')).map(f=>f[0]).join('\n- ')}\n\n## Out of scope\n- ${P?'Points store':'Unrelated refactoring'}\n\n## Acceptance criteria\n${P?'- Every rule has positive, negative and boundary examples\n- Expiry states its timezone and cut-off time':'- New tests cover normal, boundary and invalid values\n- All existing tests pass'}\n`);break;
 case 'design':
  tool(B('Read requirement.md','Read requirement.md'));
  if(!P)tool(B(`Read ${c.files[0][0]}`,`Read ${c.files[0][0]}`));
  info(P?B('梳理用户旅程、业务规则与风险','Mapping user journeys, business rules and risks'):B(`根因：${c.cause.zh}`,`Root cause: ${c.cause.en}`));
  if(cm&&run.sop.nodes.find(n=>n.type==='approval').rejectTo==='design'&&a>1)info(B(`按验收意见调整方案：${cm}`,`Revising the spec per sign-off notes: ${cm}`));
  tool(B('Write design.md','Write design.md'));
  body=P?H(`# 产品方案\n\n## 用户旅程\n1. 下单支付成功 → 获得积分\n2. 结算页选择抵扣 → 实付减少\n3. 积分到期前 7 天提醒\n\n## 业务规则\n- 每实付 1 元得 1 积分，退款时扣回\n- 100 积分抵 1 元，单笔最多抵 50%\n- 积分自获得起 12 个月过期（按 Asia/Shanghai 零点结算）\n${cm&&a>1?'\n## 本次修订\n- '+cm+'\n':''}\n## 风险\n- 部分退款的积分扣回比例需要财务确认\n`,
   `# Product spec\n\n## User journeys\n1. Order paid → points earned\n2. Choose to redeem at checkout → lower total\n3. Reminder 7 days before points expire\n\n## Rules\n- 1 point per 1 currency unit paid; clawed back on refund\n- 100 points = 1 unit; at most 50% of an order\n- Points expire 12 months after earning (midnight Asia/Shanghai)\n${cm&&a>1?'\n## Revision\n- '+cm+'\n':''}\n## Risks\n- Clawback ratio for partial refunds needs finance sign-off\n`)
   :H(`# 技术方案\n\n## 根因\n${c.cause.zh}\n\n## 改动\n${c.files.map(f=>`- ${f[0]}`).join('\n')}\n\n## 步骤\n1. ${k==='bugfix'?'抽出 formatInZone(ts, tz)，导出按用户时区格式化':'解析并白名单校验 status，非法值返回 400'}\n2. 补充测试\n3. 回归现有测试\n\n## 风险\n- ${k==='bugfix'?'历史导出文件不受影响，需在交付说明中注明':'前端旧版本不传 status 时保持原行为'}\n`,
   `# Design\n\n## Root cause\n${c.cause.en}\n\n## Changes\n${c.files.map(f=>`- ${f[0]}`).join('\n')}\n\n## Steps\n1. ${k==='bugfix'?'Extract formatInZone(ts, tz); export in the user timezone':'Parse and whitelist status; unknown values return 400'}\n2. Add tests\n3. Re-run existing tests\n\n## Risks\n- ${k==='bugfix'?'Previously exported files are unaffected; note it in the delivery':'Older clients without status keep the current behavior'}\n`);break;
 case 'implement':
  tool(B('Read requirement.md · design.md','Read requirement.md · design.md'));
  if(cm&&a>1)info(B(`第 ${a} 次尝试，处理验收意见：${cm}`,`Attempt ${a}, addressing sign-off notes: ${cm}`));
  c.files.forEach(f=>tool(B(`Edit ${f[0]}  ${f[1]}`,`Edit ${f[0]}  ${f[1]}`)));
  tool(B(`Bash npm test -- ${k==='bugfix'?'export':'orders'} → exit 0`,`Bash npm test -- ${k==='bugfix'?'export':'orders'} → exit 0`));
  tool(B('Write implementation.md','Write implementation.md'));
  body=H(`# 实现记录（第 ${a} 次）\n\n## 改动\n${c.files.map(f=>`- ${f[0]}  ${f[1]}`).join('\n')}\n${cm&&a>1?`\n## 处理的验收意见\n- ${cm}\n`:''}\n## 自检\n- npm test -- ${k==='bugfix'?'export':'orders'}：通过\n`,`# Implementation (attempt ${a})\n\n## Changes\n${c.files.map(f=>`- ${f[0]}  ${f[1]}`).join('\n')}\n${cm&&a>1?`\n## Sign-off notes addressed\n- ${cm}\n`:''}\n## Self-check\n- npm test -- ${k==='bugfix'?'export':'orders'}: passed\n`);break;
 case 'review':
  tool(B(P?'Read requirement.md · design.md':'Read requirement.md · design.md · implementation.md',P?'Read requirement.md · design.md':'Read requirement.md · design.md · implementation.md'));
  if(!P)tool(B('Bash git diff --stat','Bash git diff --stat'));
  info(B('独立上下文：看不到实现者的对话记录','Fresh context: the author\'s conversation is not visible'));
  info(P?B('建议：补充“部分退款”的积分扣回示例（非阻断）','Suggestion: add a partial-refund clawback example (non-blocking)'):B(`建议：${k==='bugfix'?'formatInZone 补一条跨日边界用例':'400 响应体里带上合法取值列表'}（非阻断）`,`Suggestion: ${k==='bugfix'?'add a cross-midnight case for formatInZone':'include allowed values in the 400 body'} (non-blocking)`));
  ok(B('结论：PASS','Verdict: PASS'));tool(B('Write review.md','Write review.md'));
  body=H(`# 独立评审\n\n结论：PASS\n\n## 意见\n| 严重程度 | 位置 | 说明 |\n| --- | --- | --- |\n| 建议 | ${P?'design.md · 业务规则':k==='bugfix'?'src/lib/time.ts':'api/orders.ts'} | ${P?'补充部分退款的积分扣回示例':k==='bugfix'?'补一条跨日边界用例':'400 响应体带上合法取值'} |\n\n未发现阻断问题。\n`,`# Independent review\n\nVerdict: PASS\n\n## Notes\n| Severity | Location | Note |\n| --- | --- | --- |\n| suggestion | ${P?'design.md · rules':k==='bugfix'?'src/lib/time.ts':'api/orders.ts'} | ${P?'Add a partial-refund clawback example':k==='bugfix'?'Add a cross-midnight case':'List allowed values in the 400 body'} |\n\nNo blocking issues.\n`);break;
 case 'test':
  tool(B('Bash npm ci → exit 0','Bash npm ci → exit 0'));tool(B(`Bash npm test → ${c.tests} passed`,`Bash npm test → ${c.tests} passed`));tool(B('Bash npm run build → exit 0','Bash npm run build → exit 0'));tool(B('Write test-report.md','Write test-report.md'));
  body=H(`# 测试报告\n\n| 命令 | 退出码 | 结果 |\n| --- | --- | --- |\n| npm ci | 0 | 通过 |\n| npm test | 0 | ${c.tests} / ${c.tests} 通过 |\n| npm run build | 0 | 通过 |\n\n## 未验证范围\n- 生产数据量下的性能\n`,`# Test report\n\n| Command | Exit | Result |\n| --- | --- | --- |\n| npm ci | 0 | ok |\n| npm test | 0 | ${c.tests} / ${c.tests} passed |\n| npm run build | 0 | ok |\n\n## Not verified\n- Performance at production data volume\n`);break;
 case 'deliver':
  tool(B('Read 各阶段产物与验证证据','Read every stage\'s artifacts and evidence'));tool(B('Write delivery.md','Write delivery.md'));info(B('未创建 PR：试用环境没有绑定 GitHub 仓库','No PR opened: no GitHub repository is bound in the playground'));
  body=H(`# 交付汇总\n\n## 完成内容\n${t}\n\n## 证据\n- requirement.md · design.md${P?'':' · implementation.md'} · review.md${P?'':' · test-report.md'}\n- 人工验收：通过${run.rejects?`（期间打回 ${run.rejects} 次）`:''}\n\n## 已知限制\n- ${P?'部分退款扣回比例待财务确认':'未在生产数据量下压测'}\n`,`# Delivery\n\n## Done\n${t}\n\n## Evidence\n- requirement.md · design.md${P?'':' · implementation.md'} · review.md${P?'':' · test-report.md'}\n- Human sign-off: approved${run.rejects?` (sent back ${run.rejects} time${run.rejects>1?'s':''})`:''}\n\n## Known limits\n- ${P?'Partial refund clawback ratio awaits finance':'Not load-tested at production volume'}\n`);break;}
 return{lines,body}}

/* ---------- state ---------- */
const S={sop:SOPS[1].id,view:'new',runs:[],run:null,sel:null,art:null,tab:'log',speed:1};
let seq=1042;
const sopOf=id=>SOPS.find(s=>s.id===id);
function newRun(sop,title,body,exec){const r={id:seq++,sop,title,body,exec,status:'running',t0:Date.now(),acc:0,st:{},att:{},logs:[],arts:{},cur:-1,q:null,qi:0,timer:0,comment:'',rejects:0};
 sop.nodes.forEach(n=>{r.st[n.id]='pending';r.att[n.id]=0});return r}
const el=r=>Math.floor(((r.status==='running'||r.status==='waiting')?Date.now()-r.t0:0)/1000+r.acc);
function log(r,k,m,node){r.logs.push({t:el(r),k,m,node});if(S.run===r)appendLog(r.logs[r.logs.length-1])}
function next(r){clearTimeout(r.timer);if(r.status!=='running')return;
 if(r.q){if(r.qi<r.q.lines.length){const ln=r.q.lines[r.qi++];log(r,ln.k,ln.m,r.q.node.id);return sched(r)}
  const n=r.q.node;if(n.out){const prev=r.arts[n.out];r.arts[n.out]={node:n.id,body:r.q.body,v:prev?prev.v+1:1,hist:prev?[...prev.hist,prev.body]:[]};log(r,'art',B(`产物已保存：${n.out}（v${r.arts[n.out].v}）`,`Artifact saved: ${n.out} (v${r.arts[n.out].v})`),n.id)}
  r.st[n.id]='done';log(r,'ok',B(`${NN[n.id][0]} 完成`,`${NN[n.id][1]} done`),n.id);r.q=null;refresh(r);return sched(r)}
 const i=r.sop.nodes.findIndex(n=>r.st[n.id]==='pending');
 if(i<0){r.acc=el(r);r.status='done';log(r,'ok',B('运行完成','Run completed'));refresh(r);return}
 const n=r.sop.nodes[i];r.cur=i;r.att[n.id]++;
 if(n.type==='approval'){r.st[n.id]='waiting';r.status='waiting';log(r,'gate',B(`等待人工判断：${NN[n.id][0]}`,`Waiting for a human decision: ${NN[n.id][1]}`),n.id);refresh(r);return}
 r.st[n.id]='running';
 log(r,'info',n.type==='script'?B(`执行 Shell 脚本 · 沙箱 ${r.sop.sandbox}`,`Running shell script · sandbox ${r.sop.sandbox}`):B(`启动 ${r.exec} · 角色 ${n.agentId} · 沙箱 ${r.sop.sandbox} · 第 ${r.att[n.id]} 次`,`Started ${r.exec} · role ${n.agentId} · sandbox ${r.sop.sandbox} · attempt ${r.att[n.id]}`),n.id);
 const g=gen(r,n);r.q={node:n,lines:g.lines,body:g.body};r.qi=0;refresh(r);sched(r)}
function sched(r){r.timer=setTimeout(()=>next(r),(420+Math.random()*380)/S.speed)}
function approve(r){const n=r.sop.nodes[r.cur];const c=$('#gctx')&&$('#gctx').value.trim();r.st[n.id]='done';r.status='running';
 log(r,'gate',B(`人工审批通过（你）${c?'：'+c:''}`,`Approved by you${c?': '+c:''}`),n.id);refresh(r);sched(r)}
function reject(r){const n=r.sop.nodes[r.cur];const c=($('#gctx')&&$('#gctx').value.trim())||Z('请按验收意见调整','Please revise per sign-off');const to=r.sop.nodes.findIndex(x=>x.id===n.rejectTo);
 r.comment=c;r.rejects++;for(let i=to;i<=r.cur;i++)r.st[r.sop.nodes[i].id]='pending';r.status='running';
 log(r,'warn',B(`打回到「${NN[n.rejectTo][0]}」：${c}`,`Sent back to ${NN[n.rejectTo][1]}: ${c}`),n.id);refresh(r);sched(r)}
function pause(r){if(r.status!=='running')return;clearTimeout(r.timer);r.acc=el(r);r.status='paused';log(r,'warn',B('已暂停','Paused'));refresh(r)}
function resume(r){if(r.status!=='paused')return;r.t0=Date.now();r.status='running';log(r,'info',B('继续执行','Resumed'));refresh(r);sched(r)}
function cancel(r){if(r.status==='done'||r.status==='cancelled')return;clearTimeout(r.timer);if(r.status!=='paused')r.acc=el(r);
 r.sop.nodes.forEach(n=>{if(r.st[n.id]==='running'||r.st[n.id]==='waiting')r.st[n.id]='cancelled'});r.q=null;r.status='cancelled';log(r,'warn',B('运行已取消','Run cancelled'));refresh(r)}
function rerun(r,id){if(r.status==='running')return;clearTimeout(r.timer);const i=r.sop.nodes.findIndex(n=>n.id===id);
 for(let j=i;j<r.sop.nodes.length;j++)r.st[r.sop.nodes[j].id]='pending';r.q=null;if(r.status!=='paused'&&r.status!=='running')r.acc=el(r);r.t0=Date.now();r.status='running';
 log(r,'info',B(`从「${NN[id][0]}」重跑`,`Re-running from ${NN[id][1]}`),id);refresh(r);sched(r)}

/* ---------- rendering ---------- */
const STL={pending:['未开始','pending'],running:['运行中','running'],done:['已完成','done'],waiting:['待确认','waiting'],cancelled:['已取消','cancelled'],paused:['已暂停','paused']};
const stl=s=>Z(STL[s][0],STL[s][1]);
const TYL={agent:'AGENT',script:Z('脚本','SCRIPT'),approval:Z('人工','HUMAN')};
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
function flowHTML(sop,r,clickable){return `<div class="flow">${sop.nodes.map((n,i)=>{const st=r?r.st[n.id]:'';const sel=(r?S.sel:S.dsel)===n.id;
 return `${i?'<span class="ar"></span>':''}<button type="button" class="fn ${n.type}${st?' s-'+st:''}${sel?' sel':''}" data-node="${n.id}"${clickable?'':' disabled'}>
  <span class="fh"><span class="ty">${TYL[n.type]}</span>${n.type==='agent'?`<span class="ex">${r?esc(r.exec):'codebuddy'}</span>`:''}${st?`<i class="sd" title="${esc(stl(st))}"></i>`:''}</span>
  <b>${esc(nn(n.id))}</b><small>${n.out?esc(n.out):n.rejectTo?esc(Z('打回 → ','reject → ')+nn(n.rejectTo)):''}${r&&r.att[n.id]>1?` · ×${r.att[n.id]}`:''}</small></button>`}).join('')}</div>`}
function side(){return `<div class="sh">${Z('流程模板 · 内置','Built-in SOPs')}</div>${SOPS.map(s=>`<button type="button" class="si${S.sop===s.id&&S.view!=='run'?' on':''}" data-sop="${s.id}"><b>${esc(tx({zh:s.name[0],en:s.name[1]}))}</b><span>${s.nodes.length} ${Z('个节点','nodes')}${s.noAgent?Z(' · 无需 Key',' · no key'):''}</span></button>`).join('')}
 <div class="sh">${Z('运行记录','Runs')}<em>${Z('仅保存在本页','this tab only')}</em></div>${S.runs.length?S.runs.slice().reverse().map(r=>`<button type="button" class="si run${S.view==='run'&&S.run===r?' on':''}" data-run="${r.id}"><b>${esc(r.title)}</b><span><i class="dot d-${r.status}"></i>#${r.id} · ${esc(stl(r.status))}</span></button>`).join(''):`<p class="empty">${Z('还没有运行。选一个 SOP，点“启动运行”。','No runs yet. Pick an SOP and start one.')}</p>`}`}
function sopHead(s){return `<div class="kick">${Z('流程模板','SOP')} · ${esc(s.id)} · v1</div><h1>${esc(Z(s.name[0],s.name[1]))}</h1><p class="lead">${esc(Z(s.desc[0],s.desc[1]))}</p>
 <div class="seg"><button type="button" data-view="new" class="${S.view==='new'?'on':''}">${Z('新建运行','New run')}</button><button type="button" data-view="design" class="${S.view==='design'?'on':''}">${Z('流程设计','Designer')}</button></div>`}
function viewNew(s){return `${sopHead(s)}<div class="card">${flowHTML(s,null,false)}</div>
 <form class="card form" id="nf" autocomplete="off"><label>${Z('需求标题','Title')}<input name="title" maxlength="80" required value="${esc(Z(s.title[0],s.title[1]))}"></label>
 <label>${Z('需求描述','Description')}<textarea name="body" rows="3" maxlength="400">${esc(Z(s.body[0],s.body[1]))}</textarea></label>
 <div class="row"><label class="sm">${Z('执行器','Executor')}<select name="exec"${s.noAgent?' disabled':''}>${EXEC.map(e=>`<option value="${e[0]}">${e[1]}</option>`).join('')}</select></label>
 <label class="sm">${Z('运行环境','Sandbox')}<input value="${esc(s.sandbox)}" disabled></label><span class="sp"></span><button class="btn" type="submit">${Z('启动运行','Start run')} →</button></div>
 ${s.noAgent?`<p class="hint">${Z('这条 SOP 只有脚本和人工审批，真实平台上也不需要任何 API Key。','This SOP is scripts and approval only; on the real platform it needs no API key either.')}</p>`:`<p class="hint">${Z('试用环境不会调用模型；自部署后由你选的 CLI 真正执行每个 Agent 节点。','Nothing calls a model here. Self-hosted, the CLI you pick really runs each agent node.')}</p>`}</form>`}
function inspector(s,id){const n=s.nodes.find(x=>x.id===id);if(!n)return `<div class="insp empty">${Z('点画布上的节点查看配置','Click a node to see its config')}</div>`;
 const rows=[[Z('类型','Type'),TYL[n.type]],[Z('最大尝试次数','Max attempts'),n.maxAttempts]];
 if(n.type==='agent')rows.push([Z('角色','Role'),n.agentId],[Z('执行器','Executor'),n.executorId],[Z('规则','Rules'),Z(RULES[n.rule][0],RULES[n.rule][1])],['Skills / MCP',Z('无（可按角色挂载）','none (attach per role)')]);
 if(n.out)rows.push([Z('产物','Output'),n.out]);if(n.rejectTo)rows.push([Z('打回到','Reject to'),nn(n.rejectTo)]);
 return `<div class="insp"><div class="ih"><span class="ty ${n.type}">${TYL[n.type]}</span><b>${esc(nn(n.id))}</b></div>${rows.map(r=>`<div class="kv"><span>${esc(r[0])}</span><code>${esc(r[1])}</code></div>`).join('')}
 ${n.ins?`<div class="ins"><span>${Z('角色指令','Instructions')}</span><p>${esc(tx(n.ins))}</p></div>`:''}${n.script?`<div class="ins"><span>${Z('脚本','Script')}</span><pre>${esc(tx(n.script))}</pre></div>`:''}</div>`}
function viewDesign(s){if(!S.dsel||!s.nodes.find(n=>n.id===S.dsel))S.dsel=s.nodes[0].id;return `${sopHead(s)}<div class="dz"><div class="card cv">${flowHTML(s,null,true)}
 <div class="legend"><span><i class="l1"></i>${Z('成功依赖','on success')}</span><span><i class="l2"></i>${Z('人工节点可打回到指定环节','human nodes can send work back')}</span></div>
 <p class="ro">${Z('试用为只读。自部署后可以拖拽节点、连线、配置角色并发布新版本。','Read-only here. Self-hosted, you can drag nodes, connect them, configure roles and publish versions.')}</p></div>${inspector(s,S.dsel)}</div>`}
function gateHTML(r){if(r.status!=='waiting')return '';const n=r.sop.nodes[r.cur];const arts=Object.keys(r.arts);
 return `<div class="gate"><div class="gh"><span class="pill w">${stl('waiting')}</span><b>${Z('需要人工判断','Needs a human decision')}</b><span>${Z('步骤：','Step: ')}${esc(nn(n.id))}</span></div>
 <p>${Z('上游产物已就绪。看完再决定：放行到下游，或带着意见打回到','Upstream artifacts are ready. Approve to continue, or send it back with notes to')} <b>${esc(nn(n.rejectTo))}</b>${Z('。','.')}</p>
 <div class="ga">${arts.map(a=>`<button type="button" class="chipb" data-art="${esc(a)}">${esc(a)} · v${r.arts[a].v}</button>`).join('')}</div>
 <textarea id="gctx" rows="2" maxlength="300" placeholder="${esc(Z('补充上下文或打回原因（可选），例如：跨日边界再补一条用例','Notes or reason to send back (optional), e.g. add a cross-midnight case'))}"></textarea>
 <div class="gb"><button type="button" class="btn" data-act="approve">${Z('确认通过，继续下游','Approve and continue')}</button><button type="button" class="btn2" data-act="reject">${Z('打回到','Send back to')}「${esc(nn(n.rejectTo))}」</button></div></div>`}
function viewRun(r){const done=Object.values(r.st).filter(x=>x==='done').length;
 return `<div class="kick">Run #${r.id} · ${esc(Z(r.sop.name[0],r.sop.name[1]))} · v1</div><div class="rh"><h1>${esc(r.title)}</h1><span class="pill st-${r.status}" id="rst">${esc(stl(r.status))}</span></div>
 <div class="meta"><span>${Z('执行器','Executor')} <code>${r.sop.noAgent?'—':esc(r.exec)}</code></span><span>${Z('沙箱','Sandbox')} <code>${esc(r.sop.sandbox)}</code></span><span>${Z('耗时','Elapsed')} <code id="rel">${fmt(el(r))}</code></span><span>${Z('节点','Nodes')} <code>${done} / ${r.sop.nodes.length}</code></span>
 <span class="sp"></span><span class="ctl">${r.status==='running'?`<button type="button" data-act="pause">${Z('暂停','Pause')}</button>`:''}${r.status==='paused'?`<button type="button" data-act="resume">${Z('继续','Resume')}</button>`:''}${r.status!=='done'&&r.status!=='cancelled'?`<button type="button" data-act="cancel">${Z('取消运行','Cancel')}</button>`:''}<button type="button" data-act="speed">${S.speed===1?'1×':'3×'}</button></span></div>
 ${gateHTML(r)}<div class="card">${flowHTML(r.sop,r,true)}${S.sel?nodeBar(r):''}</div>
 <div class="split"><div class="pane"><div class="ph"><button type="button" data-tab="log" class="${S.tab==='log'?'on':''}">${Z('实时轨迹','Live trace')}</button><button type="button" data-tab="art" class="${S.tab==='art'?'on':''}">${Z('产物','Artifacts')} <em>${Object.keys(r.arts).length}</em></button>${S.sel?`<span class="flt">${Z('只看','Only')} ${esc(nn(S.sel))} <button type="button" data-act="unsel">×</button></span>`:''}</div>
 <div class="pb" id="pb">${S.tab==='log'?`<div class="logs" id="logs">${r.logs.filter(l=>!S.sel||l.node===S.sel).map(l=>logHTML(l)).join('')}</div>`:artsHTML(r)}</div></div></div>
 ${r.status==='done'?`<div class="fin">${Z('跑完了。真实平台上，每个 Agent 节点由你选的 CLI 在 Docker 沙箱或你自己的机器上执行，产物、轨迹和审批记录都会留在实例里。','Done. On the real platform each agent node runs through the CLI you pick, in a Docker sandbox or on your own machine, and artifacts, traces and approvals stay in your instance.')} <a href="https://github.com/Tencent/LoopForge#quick-start" target="_blank" rel="noopener">${Z('自己部署一套','Self-host it')} →</a></div>`:''}`}
function nodeBar(r){const n=r.sop.nodes.find(x=>x.id===S.sel);if(!n)return '';const st=r.st[n.id];const can=r.status!=='running'&&(st==='done'||st==='cancelled');
 return `<div class="nb"><b>${esc(nn(n.id))}</b><span>${esc(stl(st))} · ${Z('尝试','attempts')} ${r.att[n.id]}/${n.maxAttempts}</span>${n.out&&r.arts[n.out]?`<button type="button" class="chipb" data-art="${esc(n.out)}">${esc(n.out)}</button>`:''}<span class="sp"></span>${can?`<button type="button" class="btn2" data-rerun="${n.id}">${Z('从这个节点重跑','Re-run from here')}</button>`:''}</div>`}
function logHTML(l,nw){return `<div class="lg k-${l.k}${nw?' nw':''}"><span class="lt">${fmt(l.t)}</span>${l.node?`<span class="ln">${esc(nn(l.node))}</span>`:'<span class="ln">run</span>'}<span class="lm">${esc(tx(l.m))}</span></div>`}
function artsHTML(r){const ks=Object.keys(r.arts);if(!ks.length)return `<p class="empty">${Z('还没有产物。','No artifacts yet.')}</p>`;if(!S.art||!r.arts[S.art])S.art=ks[0];const a=r.arts[S.art];
 return `<div class="arts"><div class="al">${ks.map(k=>`<button type="button" data-art="${esc(k)}" class="${k===S.art?'on':''}"><b>${esc(k)}</b><span>${esc(nn(r.arts[k].node))} · v${r.arts[k].v}</span></button>`).join('')}</div><pre class="av">${esc(tx(a.body))}</pre></div>`}
function appendLog(l){const box=$('#logs');if(!box||S.tab!=='log'||(S.sel&&l.node!==S.sel))return;const near=box.scrollHeight-box.scrollTop-box.clientHeight<60;box.insertAdjacentHTML('beforeend',logHTML(l,1));if(near)box.scrollTop=box.scrollHeight}
function refresh(r){if(S.view==='run'&&S.run===r)render(true);else $('#side').innerHTML=side()}
function render(keep){const m=$('#main');const g=$('#gctx');const gv=g?g.value:'';const box=$('#logs');const sc=box?box.scrollTop:0,bottom=box?box.scrollHeight-box.scrollTop-box.clientHeight<60:true;
 $('#side').innerHTML=side();const s=sopOf(S.sop);
 m.innerHTML=S.view==='run'&&S.run?viewRun(S.run):S.view==='design'?viewDesign(s):viewNew(s);
 const g2=$('#gctx');if(g2&&keep)g2.value=gv;const b2=$('#logs');if(b2)b2.scrollTop=bottom?b2.scrollHeight:sc}
function chrome(){document.documentElement.lang=L==='zh'?'zh-CN':'en';document.title=Z('在线试用 · LoopForge','Playground · LoopForge');
 $('#top').innerHTML=`<a class="brand" href="../${L==='en'?'?lang=en':''}">${LOGO}<span>Loop<b>Forge</b></span></a><span class="tag">${Z('在线试用','Playground')}</span><span class="sp"></span>
 <div class="lang"><button type="button" data-l="zh" class="${L==='zh'?'on':''}">${Z('中','ZH')}</button>/<button type="button" data-l="en" class="${L==='en'?'on':''}">EN</button></div>
 <a class="pill" href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">GitHub</a><a class="pill f" href="https://github.com/Tencent/LoopForge#quick-start" target="_blank" rel="noopener">${Z('自己部署','Self-host')} →</a>`;
 $('#note').innerHTML=`<b>${Z('浏览器里的模拟演示','Simulated in your browser')}</b> ${Z('流程结构、角色和指令取自 LoopForge 内置 SOP；运行轨迹和产物是示例数据，不会调用模型、不会执行代码，也不会上传你输入的内容。','SOP structure, roles and instructions come from the built-in LoopForge catalog; traces and artifacts are demo data. Nothing calls a model, runs code, or leaves your browser.')}`}
/* ---------- events ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;const d=t.dataset;
 if(d.l){L=d.l;localStorage.setItem('lf-lang',L);const u=new URL(location);u.searchParams.set('lang',L);history.replaceState(null,'',u);chrome();render(true);return}
 if(d.sop){S.sop=d.sop;S.view='new';S.dsel=null;render();return}
 if(d.run){S.run=S.runs.find(r=>r.id===+d.run);S.view='run';S.sel=null;S.art=null;render();return}
 if(d.view){S.view=d.view;render();return}
 if(d.node){if(S.view==='design'){S.dsel=d.node;render();return}if(S.view==='run'){S.sel=S.sel===d.node?null:d.node;render(true)}return}
 if(d.tab){S.tab=d.tab;render(true);return}
 if(d.art){S.art=d.art;S.tab='art';render(true);return}
 if(d.rerun&&S.run){rerun(S.run,d.rerun);return}
 const r=S.run;if(!d.act)return;
 if(d.act==='unsel'){S.sel=null;render(true);return}
 if(d.act==='speed'){S.speed=S.speed===1?3:1;render(true);return}
 if(!r)return;({approve,reject,pause,resume,cancel})[d.act]&&({approve,reject,pause,resume,cancel})[d.act](r)});
document.addEventListener('submit',e=>{if(e.target.id!=='nf')return;e.preventDefault();const f=new FormData(e.target);const s=sopOf(S.sop);
 const title=String(f.get('title')||'').trim().slice(0,80)||Z(s.title[0],s.title[1]);const body=String(f.get('body')||'').trim().slice(0,400);
 const r=newRun(s,title,body,s.noAgent?'—':String(f.get('exec')||'codebuddy'));S.runs.push(r);S.run=r;S.view='run';S.sel=null;S.art=null;S.tab='log';
 log(r,'info',B(`运行已创建 · ${s.name[0]} v1`,`Run created · ${s.name[1]} v1`));render();sched(r)});
setInterval(()=>{const r=S.run;if(S.view==='run'&&r&&(r.status==='running'||r.status==='waiting')){const x=$('#rel');if(x)x.textContent=fmt(el(r))}},1000);
const pre=qs.get('sop');if(pre&&sopOf(pre))S.sop=pre;
chrome();render();
window.PG={S,approve,reject};
})();
