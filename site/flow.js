(function(){
const T=window.LF_T,qs=new URLSearchParams(location.search);
let L=qs.get('lang')||localStorage.getItem('lf-lang')||((navigator.language||'').startsWith('zh')?'zh':'en');if(!T[L])L='zh';
function bez(x1,y1,x2,y2){const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;const sx=t=>((ax*t+bx)*t+cx)*t,sy=t=>((ay*t+by)*t+cy)*t;
 return x=>{if(x<=0)return 0;if(x>=1)return 1;let a=0,b=1,t=x;for(let i=0;i<24;i++){t=(a+b)/2;if(sx(t)<x)a=t;else b=t}return sy(t)}}
const E=bez(.65,0,.35,1),cl=v=>v<0?0:v>1?1:v,R=(p,a,b)=>cl((p-a)/(b-a)),S=(p,a,b)=>E(R(p,a,b)),lerp=(a,b,t)=>a+(b-a)*t;
const LOGO=`<svg viewBox="0 0 64 64" fill="none"><path d="M45.2 19.2A10 10 0 1 1 42 4.8" stroke="#FF5A1F" stroke-width="4.4" stroke-linecap="round"/><path d="M46.5 7.8L39.0 9.0L42.8 1.4z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="1.2" stroke-linejoin="round"/><path d="M3 30.5c6.5 0 11.2-1.6 15-3.5H58v7.8h-8.6c-3.6 0-5.9 2.6-5.9 5.8V44h7.2v6.5H20.8V44H28v-3.4c0-3.2-2.3-5.8-5.9-5.8H17C10.8 34.8 6 33.2 3 30.5z" fill="currentColor"/></svg>`;
const FD='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1.5 4V13h13V5.5H7.5L6 4z"/></svg>';
const FOLD=['01-requirement','02-design','03-code','04-e2e','05-knowledge','workflow-summary.md'];
const tray=(done,drop,at)=>`<div class="tray"><div class="p">${T[L].tray}</div><div class="f">${FOLD.map((f,i)=>`<span class="fd${i<done?' done':''}${i===drop?' drop':''}"${i===drop?` data-at="${at}"`:''}>${FD}${f}</span>`).join('')}</div></div>`;
const txt=(s,side,extra='')=>`<div class="txt ${side}" data-k="txt"><div class="kick">${s.k}</div><h2 class="h">${s.h}</h2><p class="sub">${s.sub}</p>${extra}</div>`;
const tb=(t,extra='')=>`<div class="tb"><i></i><i></i><i></i><span>${t}</span>${extra}</div>`;
const CMD='/start-devflow "为订单列表增加状态筛选，并补充接口测试"';
function hero(t){const h=t.hero;return `
 <div class="txt l" style="top:210px"><div class="kick">${h.k}</div><h1 class="h" style="font-size:64px">${h.h.replace('写代码','<em>写代码</em>').replace('coding first','<em>coding first</em>')}</h1><p class="sub">${h.sub}</p>
 <div style="margin-top:30px;display:flex;gap:12px;align-items:center"><span class="pill f" style="font-size:13px;padding:11px 16px">$ npx -y loopforge-cli@latest install claude</span><span style="font:400 14px var(--zh);color:var(--tx3);white-space:nowrap">${h.ghost} ↓</span></div></div>
 <div class="persp"><div class="win r" data-k="win" style="top:176px"><span class="fig">FIG.01 — terminal · claude</span>${tb('~/shop — claude')}
 <div class="term"><div><span class="ps">›</span> <span class="cmd" data-type="${CMD.replace(/"/g,'&quot;')}" data-a=".08" data-b=".34"></span><span class="car" data-k="car"></span></div>
 <div class="ag rv" data-at=".42"><div class="av">${LOGO}</div><div><p class="rv" data-at=".42">${h.r[0]}</p><p class="rv" data-at=".5">${h.r[1]} <span class="chip">MEDIUM</span></p>
 <div class="route rv" data-at=".58"><span class="k">${h.route[0]}</span><span class="v">${h.route[1]}</span><span class="k hot">${h.route[2]} ←</span><span class="v hot">${h.route[3]}</span></div>
 <p class="rv" data-at=".68" style="margin-top:18px">${h.r[2]}</p></div></div></div></div></div>`}
function review(t){const r=t.review;const L1=[['  ','const STATUS = [\'pending\',\'paid\',\'shipped\',\'done\',\'cancelled\']',''],
 ['a',"router.get('/orders', async (req, res) => {",''],['a',"  const status = String(req.query.status || '').split(',')",'flag1'],['a',"  const rows = await db.orders.find({ status: { $in: status } })",''],
 ['a','  res.json(rows)',''],['','})',''],['',' ',''],['d',"- const [filter, setFilter] = useState([])",'flag2'],['a',"  const [filter, setFilter] = useState([])",'flag2']];
 const fixL=['a',"  const status = parse(req.query.status).filter(s => STATUS.includes(s))",'fix1'];
 return `
 ${txt(r,'l',tray(2,2,.3).replace('03-code<','03-code/review.md<'))}
 <div class="persp"><div class="win r" data-k="win" style="top:150px"><span class="fig">FIG.05 — diff + review · 2 agents</span>${tb('03-code · order-list-status-filter','<span class="sp"></span><span class="who"><span class="dot dv">D</span>'+r.dev+'</span>')}
 <div class="rvw"><div class="diff"><div class="fn"><b>api/orders.ts</b> +18 −3</div>
 ${L1.slice(0,6).map((l,i)=>`<div class="ln ${l[0]}${l[2]==='flag1'?' flag':''}" ${l[2]==='flag1'?'data-k="f1"':''}><i>${41+i}</i>${esc(l[1])}</div>`+(l[2]==='flag1'?`<div class="ln a rv" data-at=".74" style="height:0;overflow:hidden" data-k="fixln"><i>43</i>${esc(fixL[1])}</div>`:'')).join('')}
 <div class="fn" style="margin-top:18px"><b>web/OrderList.tsx</b> +24 −6</div>
 <div class="ln"><i>12</i>${esc("  const params = useSearchParams()")}</div>
 <div class="ln a flag" data-k="f2"><i>13</i>${esc("  const [filter, setFilter] = useState<Status[]>([])")}</div>
 <div class="ln a rv" data-at=".78" style="height:0;overflow:hidden" data-k="fixln2"><i>14</i>${esc("  useEffect(() => params.set('status', filter.join(',')), [filter])")}</div>
 <div class="ln a"><i>15</i>${esc("  <StatusFilter value={filter} onChange={setFilter} multiple />")}</div>
 <div class="ln"><i>16</i>${esc("  <OrderTable status={filter} />")}</div></div>
 <div class="side"><div class="who"><span class="dot rw">R</span>${r.rev}</div><div class="who"><span class="fresh" style="margin-left:0">${r.fresh}</span></div>
 <div class="sees rv" data-at=".12"><div style="padding-top:0;color:var(--tx3)">${r.sees}</div>${r.see.map(s=>`<div class="${s[1]?'y':'n'}">${s[0]}<b>${s[1]?'✓':'✕'}</b></div>`).join('')}</div>
 <div class="cm rv" data-at=".34" data-k="c1"><div class="tg">● ${r.sev[0]}<span>orders.ts:43</span></div>${r.c1}</div>
 <div class="cm rv" data-at=".48" data-k="c2"><div class="tg">● ${r.sev[1]}<span>OrderList.tsx:13</span></div>${r.c2}</div>
 <div class="verdict rv" data-at=".86">✓ ${r.fix} · ${r.pass}</div></div></div></div></div>`}
function dash(t){const d=t.dash;return `${txt(d,'l')}
 <div class="persp"><div class="win r bwin" data-k="win" style="top:150px"><span class="fig">FIG.09 — localhost:8765 · demo data</span>${tb('','<div class="url">localhost:8765 · Agent Observability</div><span style="width:60px"></span>')}
 <div class="vp"><div class="zoom" data-k="zoom"><iframe src="dash/index.html" title="dashboard" tabindex="-1"></iframe></div><span class="demo">${d.demo}</span></div></div></div>
 <div class="stk rv" data-at=".55" data-k="s1" style="left:548px;top:648px">${L==="zh"?"近 30 天成本":"30-day cost"}<b class="o">$95.55</b></div>
 <div class="stk rv" data-at=".62" data-k="s2" style="left:1200px;top:110px">devflow-code-reviewer<b>${L==="zh"?"29 次派发":"29 dispatches"}</b></div>`}
function install(t){const n=t.install;const H=[['Claude Code','claude','/start-devflow'],['Codex','codex','$devflow-codex'],['Cursor','cursor','/start-devflow'],['CodeBuddy','codebuddy','/start-devflow']];
 return `<div class="inst"><div class="kick" style="justify-content:center">${n.k}</div><h2 class="h">${n.h}</h2><p class="sub">${n.sub}</p>
 <div class="tabs">${H.map((h,i)=>`<button data-i="${i}" class="${i?'':'on'}">${h[0]}</button>`).join('')}</div>
 <div class="ibox"><div class="row"><span>$</span><code data-k="ic">npx -y loopforge-cli@latest install claude</code><button data-copy>${n.copy}</button></div>
 <div class="row"><span>$</span><code data-k="is">npx -y loopforge-cli@latest status claude</code></div><div class="st" data-k="ist">› /start-devflow "为订单列表增加状态筛选，并补充接口测试"</div></div>
 <p class="inote">${n.note} <code>npx -y loopforge-cli@latest doctor</code></p>
 <div class="ilinks"><a class="pill f" href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">${n.gh} →</a></div></div>
 <div class="foot"><span>${n.foot} · <a href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">github.com/Tencent/LoopForge</a></span><span>loopforge-cli v0.2.2</span></div>`}
const Z=(a,b)=>L==='zh'?a:b;
const fig=(n,s)=>`<span class="fig">FIG.${n} — ${s}</span>`;
const W=(side,n,figs,title,body,extra='',top=150)=>`<div class="persp"><div class="win ${side}" data-k="win" style="top:${top}px">${fig(n,figs)}${tb(title,extra)}${body}</div></div>`;
const AV=`<div class="av">${LOGO}</div>`;
const who=(c,n)=>`<span class="sp"></span><span class="who"><span class="dot ${c}">${({leader:'L',architect:'A',developer:'D'})[n.slice(8)]||'T'}</span>${n}</span>`;
function clarify(t){const c=t.clarify;return `${txt(c,'r',tray(0,0,.9))}
 ${W('l','02','clarify · devflow-leader','~/shop — claude',`<div class="chat">
  <div class="ag rv" data-at=".08">${AV}<div><p>${c.q1}</p></div></div>
  <div class="me rv" data-at=".2"><span>${c.a1}</span></div>
  <div class="ag rv" data-at=".3">${AV}<div><p>${c.q2}</p></div></div>
  <div class="me rv" data-at=".4"><span>${c.a2}</span></div>
  <div class="card rv" data-at=".5"><div class="ch">${c.card}<span>01-requirement/requirement.md</span></div>
   ${c.rows.map((r,i)=>`<div class="cr rv" data-at="${(.56+i*.05).toFixed(2)}"><b>${r[0]}</b><span>${r[1]}</span><i>✓</i></div>`).join('')}
   <div class="cf"><span class="btn rv" data-at=".8" data-k="okb">${c.ok}</span></div></div></div>`,who('dv','devflow-leader'))}`}
function plan(t){const c=t.plan;const F=[['api/orders.ts','+18 −3',''],['web/OrderList.tsx','+24 −6',''],['web/StatusFilter.tsx','+61',Z('新增','new')],['tests/orders.api.test.ts','+88',Z('新增','new')]];
 return `${txt(c,'l',tray(1,1,.86))}
 ${W('r','03','plan · devflow-architect','02-design/tech-design.md',`<div class="doc">
  <h3 class="rv" data-at=".06">${Z('订单列表状态筛选 · 技术方案','Order list status filter · design')}</h3>
  <h4 class="rv" data-at=".14">${c.s1}</h4>
  <pre class="rv" data-at=".18"><b>GET</b> /orders?status=paid,shipped
  → 200 Order[]
  → 400 { error: "unknown status: xxx" }</pre>
  <h4 class="rv" data-at=".32">${c.s2}</h4>
  ${F.map((f,i)=>`<div class="fl rv" data-at="${(.36+i*.06).toFixed(2)}"><code>${f[0]}</code>${f[2]?`<em>${f[2]}</em>`:''}<span>${f[1]}</span></div>`).join('')}
  <h4 class="rv" data-at=".62">${c.s3}</h4>
  ${c.steps.map((s,i)=>`<div class="stp rv" data-at="${(.66+i*.05).toFixed(2)}"><i>${i+1}</i>${s}</div>`).join('')}</div>`,who('dv','devflow-architect'))}`}
function implement(t){const c=t.build;const S2=[[Z('后端：解析并校验 status 参数','Backend: parse and validate status'),['Edit api/orders.ts','+18 −3']],[Z('前端：状态多选 + 同步到 URL','Frontend: multi-select, synced to URL'),['Edit web/OrderList.tsx','+24 −6'],['Create web/StatusFilter.tsx','+61']],[Z('补接口测试','API tests'),['Create tests/orders.api.test.ts','+88']]];
 let at=.08;return `${txt(c,'r',tray(2,2,.88))}
 ${W('l','04','build · devflow-developer','~/shop — devflow-developer',`<div class="term sm">
  <div class="rv" data-at=".04"><span class="dm">${Z('照 02-design 的 3 步来','following the 3 steps in 02-design')}</span></div>
  ${S2.map((s,i)=>{const h=`<div class="step rv" data-at="${(at).toFixed(2)}"><div class="sh"><i data-k="ck${i}">${i+1}</i>${s[0]}</div>${s.slice(1).map((x,j)=>`<div class="tl rv" data-at="${(at+.05+j*.05).toFixed(2)}"><span>${x[0]}</span><em>${x[1]}</em></div>`).join('')}</div>`;at+=.05+(s.length-1)*.05+.06;return h}).join('')}
  <div class="note rv" data-at=".66"><b>${Z('范围外，没改','out of scope, left alone')}</b>${Z('导出页 OrderExport 也读了 status，需求里没包含，记到总结里了。','OrderExport also reads status. Not in the sign-off, noted in the summary.')}</div>
  <div class="rv" data-at=".78" style="margin-top:14px"><span class="ok">✓</span> ${Z('4 个文件 · +191 −9 · 交给审查','4 files · +191 −9 · handing off to review')}</div></div>`)}`}
function test(t){const c=t.test;const T1=[['GET /orders?status=paid','12ms'],['GET /orders?status=paid,shipped','9ms'],['GET /orders?status=done,cancelled','8ms'],['GET /orders (no filter)','11ms'],['GET /orders?status=xxx → 400','6ms'],['GET /orders?status= → 200 all','7ms']];
 return `${txt(c,'r',tray(3,3,.9))}
 ${W('l','05','test · devflow-test-engineer','~/shop — devflow-test-engineer',`<div class="term sm">
  <div><span class="ps">$</span> <span class="cmd" data-type="npx vitest run tests/orders.api.test.ts" data-a=".04" data-b=".14"></span></div>
  <div class="rv" data-at=".18" style="margin-top:8px"><span class="dm">orders.api.test.ts</span></div>
  ${T1.map((x,i)=>`<div class="tr rv" data-at="${(.22+i*.04).toFixed(2)}"><span class="ok">✓</span> ${esc(x[0])}<span class="dm">${x[1]}</span></div>`).join('')}
  <div class="tr rv" data-at=".48"><span class="dm">… 6 more</span></div>
  <div class="sum rv" data-at=".58"><b class="okb">PASS</b> Tests <b>12 passed</b> (12) · ${Z('耗时','time')} 1.84s</div>
  <div class="rv" data-at=".7" style="margin-top:14px"><span class="ps">›</span> ${Z('写入 04-e2e/test-report.md','wrote 04-e2e/test-report.md')}</div></div>`)}`}
function resume(t){const c=t.resume;const ST=Z('澄清 方案 实现 审查 测试 沉淀','clarify plan build review test notes').split(' ').map((x,i)=>[x,i<4?1:i===4?2:0]);
 return `${txt(c,'l',`<div class="tray"><div class="p">${t.tray}</div><div class="f"><span class="fd done hot rv" data-at=".5">${FD}workflow-state.json</span></div></div>`)}
 ${W('r','06','resume · /resume-devflow','~/shop — claude',`<div class="term sm" style="position:relative">
  <div data-k="before"><div><span class="dm">devflow-test-engineer</span> ${Z('正在跑接口测试…','running API tests…')}</div><div class="tr"><span class="ok">✓</span> GET /orders?status=paid<span class="dm">12ms</span></div><div class="tr"><span class="ok">✓</span> GET /orders?status=paid,shipped<span class="dm">9ms</span></div><div class="tr"><span class="dm">◌</span> GET /orders?status=done,cancelled</div></div>
  <div class="cut" data-k="cut"><span>${c.lost}</span><small>session closed · ${Z('3 小时前','3 hours ago')}</small></div>
  <div data-k="after" style="display:none"><div><span class="ps">›</span> <span class="cmd" data-type="/resume-devflow order-list-status-filter" data-a=".5" data-b=".62"></span></div>
  ${c.r.map((r,i)=>`<div class="rv" data-at="${(.66+i*.05).toFixed(2)}" style="margin-top:${i?2:12}px"><span class="ok">${i<2?'✓':'→'}</span> ${r}</div>`).join('')}
  <div class="stpr rv" data-at=".8">${ST.map(s=>`<span class="sd s${s[1]}">${s[0]}</span>`).join('<i></i>')}</div>
  <div class="rv" data-at=".86" style="margin-top:18px"><span class="dm">devflow-test-engineer</span> ${Z('接着跑剩下的测试','picking up the remaining tests')}</div>
  <div class="tr rv" data-at=".89"><span class="ok">✓</span> GET /orders?status=done,cancelled<span class="dm">8ms</span></div>
  <div class="tr rv" data-at=".92"><span class="ok">✓</span> GET /orders?status=xxx → 400<span class="dm">6ms</span></div>
  <div class="tr rv" data-at=".95"><span class="dm">…</span></div></div></div>`)}`}
function deliver(t){const c=t.deliver;const TR=[[0,'01-requirement/',1],[1,'requirement.md',0],[0,'02-design/',1],[1,'tech-design.md',0],[0,'03-code/',1],[1,'changes.diff',0],[1,'review.md',0],[0,'04-e2e/',1],[1,'test-report.md',0],[0,'05-knowledge/',1],[1,'orders-status-filter.md',0],[0,'workflow-summary.md',2]];
 return `${txt(c,'r',tray(5,5,.6))}
 ${W('l','08','deliver · artifacts','artifacts/order-list-status-filter',`<div class="dl"><div class="tree">${TR.map((x,i)=>`<div class="tn rv${x[2]===2?' hl':''}" data-at="${(.04+i*.035).toFixed(3)}" style="padding-left:${14+x[0]*18}px">${x[2]?FD:'<span class="fi"></span>'}${x[1]}</div>`).join('')}</div>
  <div class="pv rv" data-at=".5"><div class="pt">${c.sum}</div><h3>${Z('订单列表状态筛选','Order list status filter')} <span class="chip">DONE</span></h3>
  ${c.lines.map((l,i)=>`<div class="pl rv" data-at="${(.56+i*.06).toFixed(2)}"><i>${['✓','✓','✓','–'][i]}</i>${l}</div>`).join('')}</div></div>`)}`}

function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
const SCN=[{b:hero,len:1.4,nav:0,n:'hero',sd:'r'},{b:clarify,len:2.2,nav:0,sd:'l'},{b:plan,len:1.8,nav:0,sd:'r'},{b:implement,len:1.8,nav:0,sd:'l'},{b:review,len:2.4,nav:1,n:'review',sd:'r'},{b:test,len:1.8,nav:1,sd:'l'},{b:resume,len:2.4,nav:2,n:'resume',sd:'r'},{b:deliver,len:1.8,nav:2,sd:'l'},{b:dash,len:2.0,nav:3,n:'dash',sd:'r'},{b:install,len:1.2,nav:4,n:'install'}],TR=.8;
let START=[],TOTAL=0;{let u=0;SCN.forEach((s,i)=>{START.push(u);u+=s.len+(i<SCN.length-1?TR:0)});TOTAL=u}
let SC=[],MOB=false;
function build(){const t=T[L];document.documentElement.lang=L==='zh'?'zh-CN':'en';
 const cv=document.getElementById('cv');
 cv.innerHTML=`<nav><a class="brand" href="#" data-go="0">${LOGO}<span>Loop<b>Forge</b></span></a><div class="links">${t.nav.map((n,i)=>`<a href="#" data-nav="${i}">${n}</a>`).join('')}</div><div class="sp"></div>
 <div class="lang"><button data-l="zh" class="${L==='zh'?'on':''}">中</button>/<button data-l="en" class="${L==='en'?'on':''}">EN</button></div>
 <a class="pill" href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">GitHub</a><a class="pill f" href="#" data-go="${SCN.length-1}">npx loopforge-cli</a></nav>`+
 SCN.map((s,i)=>`<section class="sc" data-i="${i}">${s.b(t)}</section>`).join('');
 SC=[...cv.querySelectorAll('section.sc')].map(el=>{const m={el,at:[...el.querySelectorAll('[data-at]')],ty:[...el.querySelectorAll('[data-type]')]};el.querySelectorAll('[data-k]').forEach(e=>{if(!m[e.dataset.k])m[e.dataset.k]=e});return m});
 cv.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(+a.dataset.go)}));
 cv.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=+a.dataset.nav;const i=SCN.findIndex(s=>s.nav>=k);go(i<0?SCN.length-1:i)}));
 cv.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{L=b.dataset.l;localStorage.setItem('lf-lang',L);const u=new URL(location);u.searchParams.set('lang',L);history.replaceState(null,'',u);build();frame()}));
 const H=['claude','codex','cursor','codebuddy'],ST=['/start-devflow','$devflow-codex','/start-devflow','/start-devflow'];const ins=SC[SC.length-1];
 ins.el.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{ins.el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x===b));const i=+b.dataset.i;
  ins.ic.textContent=`npx -y loopforge-cli@latest install ${H[i]}`;ins.is.textContent=`npx -y loopforge-cli@latest status ${H[i]}`;ins.ist.textContent=`› ${ST[i]} "为订单列表增加状态筛选，并补充接口测试"`}));
 ins.el.querySelector('[data-copy]').addEventListener('click',e=>{navigator.clipboard&&navigator.clipboard.writeText(ins.ic.textContent);e.target.textContent=t.install.copied;setTimeout(()=>e.target.textContent=t.install.copy,1400)});
}
function go(i){scrollTo({top:(START[i]+(i?.02:0))*innerHeight,behavior:'smooth'})}
const tilt=(w,e,side)=>{w.style.transform=`rotateY(${(side==='l'?9:-9)*(1-e)}deg) rotateX(${4*(1-e)}deg) translateZ(${-60*(1-e)}px)`};
const UPD={
 hero:(m,p)=>{tilt(m.win,S(p,-.2,.3),'r');m.car.style.display=p>.36?'none':''},
 review:(m,p)=>{tilt(m.win,S(p,0,.2),'r');REV(m,p)},
 resume:(m,p)=>{tilt(m.win,S(p,0,.2),'r');const cut=p>.24&&p<.46;m.cut.classList.toggle('on',cut);m.before.style.display=p<.36?'':'none';m.after.style.display=p>=.36?'':'none'},
 dash:(m,p)=>{tilt(m.win,S(p,0,.2),'r');const z=S(p,.25,.5);m.zoom.style.transform=`translate(${lerp(0,-8,z)}px,${lerp(0,-130,z)}px) scale(${lerp(.653,.8,z)})`},
 install:()=>{}};
function REV(m,p){const fx=p>.72;m.f1.classList.toggle('fixd',fx);m.f2.classList.toggle('fixd',p>.76);
  m.fixln.style.height=p>.74?'24px':'0';m.fixln2.style.height=p>.78?'24px':'0';m.c1.classList.toggle('fixd',p>.74);m.c2.classList.toggle('fixd',p>.78);
  const FX=L==='zh'?'✓ 已修复 ':'✓ fixed ';[[m.c1,.74,0],[m.c2,.78,1]].forEach(([c,a,j])=>{c.querySelector('.tg').firstChild.textContent=p>a?FX:'● '+T[L].review.sev[j]+' '});m.f1.classList.toggle('d',p>.74);m.f1.classList.toggle('a',p<=.74)}
let last=-1;
function frame(){if(MOB)return;const s=Math.min(innerWidth/1440,innerHeight/900);const cv=document.getElementById('cv');cv.style.transform=`translate(${(innerWidth-1440*s)/2}px,${(innerHeight-900*s)/2}px) scale(${s})`;
 const u=scrollY/innerHeight;let i=SCN.length-1;for(let k=0;k<SCN.length;k++){if(u<START[k]+SCN[k].len+TR){i=k;break}}
 const p=cl((u-START[i])/SCN[i].len),tr=u-START[i]-SCN[i].len;
 SC.forEach((m,k)=>{m.el.style.visibility=(k===i||(k===i+1&&tr>0))?'visible':'hidden';m.el.style.clipPath='none';m.el.style.zIndex=k===i+1?2:1});
 run(i,p);
 if(tr>0&&SC[i+1]){const t=S(tr,0,TR),n=SC[i+1].el,kind=i%3;
  n.style.clipPath=kind===0?`circle(${t*120}% at 50% 55%)`:kind===1?`inset(0 0 0 ${100-t*100}%)`:`inset(${100-t*100}% 0 0 0)`;run(i+1,0)}
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',+a.dataset.nav===SCN[i].nav));}
function run(i,p){const m=SC[i];m.at.forEach(e=>e.classList.toggle('on',p>=+e.dataset.at));
 m.ty.forEach(e=>{const s=[...e.dataset.type],k=R(p,+e.dataset.a,+e.dataset.b);e.innerHTML=esc(s.slice(0,Math.round(s.length*k)).join('')).replace(/(&quot;|")(.*)/,'<q>"$2</q>')});const sc=SCN[i];if(MOB){if(sc.n==='review')REV(m,1);if(sc.n==='resume'){m.before.style.display='none';m.after.style.display=''}return}if(UPD[sc.n])UPD[sc.n](m,p);else if(m.win)tilt(m.win,S(p,0,.2),sc.sd)}
function boot(){MOB=innerWidth<760;document.body.classList.toggle('mob',MOB);build();document.getElementById('spacer').style.height=MOB?'0':(TOTAL*100+100)+'vh';
 if(MOB){const cv=document.getElementById('cv');cv.style.transform='';SC.forEach((m,i)=>{m.el.style.visibility='visible';m.el.style.clipPath='none';run(i,1);const z=m.el.querySelector('.zoom');if(z){const w=m.el.querySelector('.vp').clientWidth;z.style.transform=`translate(0,-130px) scale(${w/1100*1.2})`}})}else frame()}
window.LF={START,SCN,TR,TOTAL,go};
addEventListener('scroll',()=>requestAnimationFrame(frame),{passive:true});let mw=innerWidth<760;addEventListener('resize',()=>{const n=innerWidth<760;if(n!==mw){mw=n;boot()}else frame()});boot();
})();
