(function(){
const T=window.LF_T,qs=new URLSearchParams(location.search);
let L=qs.get('lang')||localStorage.getItem('lf-lang')||((navigator.language||'').startsWith('zh')?'zh':'en');if(!T[L])L='zh';
/* ---------- easing tokens: out (entrances), io (moves), spring lives in CSS ---------- */
function bez(x1,y1,x2,y2){const cx=3*x1,bx=3*(x2-x1)-cx,ax=1-cx-bx,cy=3*y1,by=3*(y2-y1)-cy,ay=1-cy-by;const sx=t=>((ax*t+bx)*t+cx)*t,sy=t=>((ay*t+by)*t+cy)*t;
 return x=>{if(x<=0)return 0;if(x>=1)return 1;let a=0,b=1,t=x;for(let i=0;i<24;i++){t=(a+b)/2;if(sx(t)<x)a=t;else b=t}return sy(t)}}
const EIO=bez(.65,0,.35,1),EO=bez(.22,1,.36,1),cl=v=>v<0?0:v>1?1:v,R=(p,a,b)=>cl((p-a)/(b-a)),lerp=(a,b,t)=>a+(b-a)*t;
const Z=(a,b)=>L==='zh'?a:b;
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
/* ---------- marks ---------- */
const LOGO=`<svg viewBox="0 0 64 64" fill="none"><path d="M45.2 19.2A10 10 0 1 1 42 4.8" stroke="#FF5A1F" stroke-width="4.4" stroke-linecap="round"/><path d="M46.5 7.8L39.0 9.0L42.8 1.4z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="1.2" stroke-linejoin="round"/><path d="M3 30.5c6.5 0 11.2-1.6 15-3.5H58v7.8h-8.6c-3.6 0-5.9 2.6-5.9 5.8V44h7.2v6.5H20.8V44H28v-3.4c0-3.2-2.3-5.8-5.9-5.8H17C10.8 34.8 6 33.2 3 30.5z" fill="currentColor"/></svg>`;
// Product marks: Claude, Codex (OpenAI), Cursor, CodeBuddy from LobeHub Icons (@lobehub/icons-static-svg, MIT);
// Pi from pi.dev's own favicon. Trademarks of their owners, used only to name the agent each command targets.
const MARK={
 claude:['0 0 24 24','M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z'],
 codex:['0 0 24 24','M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z'],
 cursor:['0 0 24 24','M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z'],
 codebuddy:['0 0 24 24','M18.777 1.647c.28-.02.536.114.972.51 1.018.926 2.437 2.828 3.318 4.452l.34.631.482.24.11.06v3.638a5.206 5.206 0 00-5.32-1.23c-.491.166-1.021.471-2.08 1.082l-6.09 3.516c-1.057.61-1.586.916-1.975 1.259a5.208 5.208 0 00-1.493 5.572c.165.49.471 1.02 1.082 2.08l.315.543h-3.26c-.685 0-1.34-.135-1.939-.377-.169-.956-.009-1.789.469-2.335.158-.18.164-.189.13-.493a11.846 11.846 0 01-.057-1.711l.02-.444-.667-1.18C2.1 15.622 1.445 14.078 1.192 12.9c-.133-.647-.125-.934.04-1.146.1-.128.427-.261.822-.334.994-.175 3.162-.017 5.575.41l.25.043.551-.487c.915-.81 1.522-1.264 2.641-1.962 1.167-.73 2.484-1.331 3.967-1.807l.476-.152.261-.688c.937-2.471 1.896-4.293 2.58-4.9.235-.21.25-.22.422-.23z M12.139 18.2a1.203 1.203 0 011.642.44l1.296 2.243a1.204 1.204 0 01-2.083 1.203l-1.296-2.243a1.203 1.203 0 01.44-1.644zM18.629 14.452a1.203 1.203 0 011.642.44l1.295 2.244a1.203 1.203 0 11-2.083 1.203l-1.295-2.243a1.203 1.203 0 01.44-1.644z'],
 pi:['0 0 560 560','M420 280H280V140H0V0H420V280Z M560 560H420V280H560V560Z M140 560H0V140H140V280H280V420H140V560Z']};
const mark=(id,cls='')=>`<svg class="mk ${cls}" viewBox="${MARK[id][0]}" fill="currentColor" aria-hidden="true"><path d="${MARK[id][1]}"/></svg>`;
const AGENTS=[['claude','Claude Code'],['codex','Codex'],['cursor','Cursor'],['codebuddy','CodeBuddy'],['pi','Pi']];
const strip=(at)=>`<div class="astrip"><div class="ac rv" data-at="${at}">${Z('支持 5 个 Agent ——','Works with 5 agents —')}</div>${AGENTS.map((a,i)=>`<span class="ai rv pop" data-at="${(at+.03+i*.035).toFixed(3)}">${mark(a[0])}${a[1]}</span>`).join('')}</div>`;
const FD='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M1.5 4V13h13V5.5H7.5L6 4z"/></svg>';
const CUR='<svg viewBox="0 0 16 20"><path d="M1 1l13.5 7.2-5.8 1.4L6 15.4z" fill="#16161A" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>';
/* ---------- shared builders ---------- */
const FOLD=['01-requirement','02-design','03-code','04-e2e','05-knowledge','workflow-summary.md'];
const tray=(done,drop,at,lab)=>`<div class="tray rv" data-at=".16"><div class="p">${T[L].tray}</div><div class="f">${FOLD.map((f,i)=>`<span class="fd${i<done?' done':''}${i===drop?' drop':''}"${i===drop?` data-at="${at}"`:''}>${FD}${i===drop&&lab?lab:f}</span>`).join('')}</div></div>`;
const lines=(h,em)=>h.split('<br>').map((x,i)=>`<span class="hl"><span class="rv up" data-at="${(.03+i*.06).toFixed(2)}">${em?em(x):x}</span></span>`).join('');
const txt=(s,side,extra='')=>`<div class="txt ${side}"><div class="kick rv" data-at="0">${s.k}</div><h2 class="h">${lines(s.h)}</h2><p class="sub rv" data-at=".12">${s.sub}</p>${extra}</div>`;
const tb=(t,extra='')=>`<div class="tb"><i></i><i></i><i></i><span>${t}</span>${extra}</div>`;
const fig=(n,s)=>`<span class="fig">FIG.${n} — ${s}</span>`;
const W=(side,n,figs,title,body,extra='',top=150)=>`<div class="persp"><div class="win ${side}" data-k="win" style="top:${top}px">${fig(n,figs)}${tb(title,extra)}${body}</div></div>`;
const AV=`<div class="av">${LOGO}</div>`;
const who=(c,n)=>`<span class="sp"></span><span class="who"><span class="dot ${c}">${({leader:'L',architect:'A',developer:'D'})[n.slice(8)]||'T'}</span>${n}</span>`;
const TY=(s,a,b)=>`<span class="cmd" data-type="${esc(s).replace(/"/g,'&quot;')}" data-a="${a}" data-b="${b}"></span><span class="car tc"></span>`;
const CMD='/start-devflow "为订单列表增加状态筛选，并补充接口测试"';
/* ---------- scenes ---------- */
function hero(t){const h=t.hero;const em=x=>x.replace('写代码','<em>写代码</em>').replace('coding first','<em>coding first</em>');return `
 <div class="txt l" style="top:196px"><div class="kick rv" data-at="0">${h.k}</div><h1 class="h" style="font-size:64px">${lines(h.h,em)}</h1><p class="sub rv" data-at=".12">${h.sub}</p>
 <div class="rv" data-at=".18" style="margin-top:28px;display:flex;gap:12px;align-items:center"><span class="pill f" style="font-size:13px;padding:11px 16px">$ npx -y loopforge-cli@latest install claude</span></div>
 ${strip(.24)}</div>
 <div class="persp"><div class="win r" data-k="win" style="top:176px">${fig('01','terminal · claude')}${tb('~/shop — claude')}
 <div class="term"><div><span class="ps">›</span> ${TY(CMD,.1,.4)}</div>
 <div class="think rv" data-at=".43" data-off=".5"><i></i><i></i><i></i></div>
 <div class="ag rv" data-at=".5">${AV}<div><p class="rv" data-at=".5">${h.r[0]}</p><p class="rv" data-at=".58">${h.r[1]} <span class="chip rv pop" data-at=".62">MEDIUM</span></p>
 <div class="route rv" data-at=".66"><span class="k">${h.route[0]}</span><span class="v">${h.route[1]}</span><span class="k hot">${h.route[2]} ←</span><span class="v hot sweep" data-sw=".74">${h.route[3]}</span></div>
 <p class="rv" data-at=".82" style="margin-top:18px">${h.r[2]}</p></div></div></div></div></div>`}
function clarify(t){const c=t.clarify;const C1=Z(['单选','多选'],['Single','Multi']),C2=Z(['不用','保留，放 URL 里'],['No','Yes, in the URL']);
 return `${txt(c,'r',tray(0,0,.9))}
 ${W('l','02','clarify · devflow-leader','~/shop — claude',`<div class="chat">
  <div class="think rv" data-at=".05" data-off=".09"><i></i><i></i><i></i></div>
  <div class="ag rv" data-at=".09">${AV}<div><p>${c.q1}</p><div class="opts rv" data-at=".13"><span class="opt">${C1[0]}</span><span class="opt" data-k="o1" data-sel=".215">${C1[1]}</span></div></div></div>
  <div class="me rv" data-at=".24"><span>${c.a1}</span></div>
  <div class="think rv" data-at=".27" data-off=".31"><i></i><i></i><i></i></div>
  <div class="ag rv" data-at=".31">${AV}<div><p>${c.q2}</p><div class="opts rv" data-at=".35"><span class="opt">${C2[0]}</span><span class="opt" data-k="o2" data-sel=".415">${C2[1]}</span></div></div></div>
  <div class="me rv" data-at=".44"><span>${c.a2}</span></div>
  <div class="card rv" data-at=".5" data-k="card"><div class="ch">${c.card}<span>01-requirement/requirement.md</span></div>
   ${c.rows.map((r,i)=>`<div class="cr rv" data-at="${(.54+i*.04).toFixed(2)}"><b>${r[0]}</b><span>${r[1]}</span><i class="rv pop" data-at="${(.57+i*.04).toFixed(2)}">✓</i></div>`).join('')}
   <div class="cf"><span class="stamp rv" data-at=".82">${Z('已确认','SIGNED OFF')}</span><span class="btn rv" data-at=".71" data-k="okb" data-press=".79">${c.ok}</span></div></div></div>
  <div class="mcur" data-k="mc">${CUR}<i></i></div>`,who('dv','devflow-leader'))}`}
function plan(t){const c=t.plan;const F=[['api/orders.ts','+18 −3',''],['web/OrderList.tsx','+24 −6',''],['web/StatusFilter.tsx','+61',Z('新增','new')],['tests/orders.api.test.ts','+88',Z('新增','new')]];
 return `${txt(c,'l',tray(1,1,.88))}
 ${W('r','03','plan · devflow-architect','02-design/tech-design.md',`<div class="doc">
  <h3>${TY(Z('订单列表状态筛选 · 技术方案','Order list status filter · design'),.06,.2)}</h3>
  <h4 class="rv" data-at=".22">${c.s1}</h4>
  <pre class="rv sweep" data-at=".25" data-sw=".3"><b>GET</b> /orders?status=paid,shipped
  → 200 Order[]
  → 400 { error: "unknown status: xxx" }</pre>
  <h4 class="rv" data-at=".4">${c.s2}</h4>
  ${F.map((f,i)=>`<div class="fl rv" data-at="${(.43+i*.045).toFixed(3)}"><code>${f[0]}</code>${f[2]?`<em class="rv pop" data-at="${(.47+i*.045).toFixed(3)}">${f[2]}</em>`:''}<span data-cnt="${f[1]}" data-a="${(.44+i*.045).toFixed(3)}" data-b="${(.52+i*.045).toFixed(3)}">${f[1]}</span></div>`).join('')}
  <h4 class="rv" data-at=".64">${c.s3}</h4>
  ${c.steps.map((s,i)=>`<div class="stp rv" data-at="${(.67+i*.05).toFixed(2)}"><i>${i+1}</i>${s}</div>`).join('')}</div>`,who('dv','devflow-architect'))}`}
function implement(t){const c=t.build;const S2=[[Z('后端：解析并校验 status 参数','Backend: parse and validate status'),['Edit api/orders.ts','+18 −3']],[Z('前端：状态多选 + 同步到 URL','Frontend: multi-select, synced to URL'),['Edit web/OrderList.tsx','+24 −6'],['Create web/StatusFilter.tsx','+61']],[Z('补接口测试','API tests'),['Create tests/orders.api.test.ts','+88']]];
 let at=.1;return `${txt(c,'r',tray(2,2,.9))}
 ${W('l','04','build · devflow-developer','~/shop — devflow-developer',`<div class="term sm">
  <div class="rv" data-at=".05"><span class="dm">${Z('照 02-design 的 3 步来','following the 3 steps in 02-design')}</span></div>
  ${S2.map((s,i)=>{const st=at;const sub=s.slice(1).map((x,j)=>{const a=st+.04+j*.07;return `<div class="tl rv" data-at="${a.toFixed(3)}"><span class="spin" data-tick="${(a+.05).toFixed(3)}"></span><span>${x[0]}</span><em data-cnt="${x[1]}" data-a="${(a+.05).toFixed(3)}" data-b="${(a+.09).toFixed(3)}">${x[1]}</em></div>`}).join('');
   at=st+.04+(s.length-1)*.07+.04;return `<div class="step rv" data-at="${st.toFixed(3)}"><div class="sh"><i class="num" data-tick="${(at-.01).toFixed(3)}">${i+1}</i>${s[0]}</div>${sub}</div>`}).join('')}
  <div class="note rv" data-at=".66"><b>${Z('范围外，没改','out of scope, left alone')}</b>${Z('导出页 OrderExport 也读了 status，需求里没包含，记到总结里了。','OrderExport also reads status. Not in the sign-off, noted in the summary.')}</div>
  <div class="rv" data-at=".78" style="margin-top:14px"><span class="ok">✓</span> <span data-cnt="${Z('4 个文件 · +191 −9 · 交给审查','4 files · +191 −9 · handing off to review')}" data-a=".78" data-b=".86">${Z('4 个文件 · +191 −9 · 交给审查','4 files · +191 −9 · handing off to review')}</span></div></div>`)}`}
function review(t){const r=t.review;const A=[['','const STATUS = [\'pending\',\'paid\',\'shipped\',\'done\',\'cancelled\']'],['a',"router.get('/orders', async (req, res) => {"],['a',"  const status = String(req.query.status || '').split(',')",1],['a',"  const rows = await db.orders.find({ status: { $in: status } })"],['a','  res.json(rows)'],['','})']];
 return `${txt(r,'l',tray(2,2,.3,'03-code/review.md'))}
 <div class="persp"><div class="win r" data-k="win" style="top:150px">${fig('05','diff + review · 2 agents')}${tb('03-code · order-list-status-filter','<span class="sp"></span><span class="who"><span class="dot dv">D</span>'+r.dev+'</span>')}
 <div class="rvw"><div class="diff"><div class="fn"><b>api/orders.ts</b> +18 −3</div>
 ${A.map((l,i)=>`<div class="ln ${l[0]}${l[2]?' flag':''}" ${l[2]?'data-k="f1"':''}><i>${41+i}</i>${esc(l[1])}${l[2]?'<b class="pin rv pop" data-at=".36">1</b>':''}</div>`+(l[2]?`<div class="ln a grow" data-k="fixln"><i>43</i>${esc("  const status = parse(req.query.status).filter(s => STATUS.includes(s))")}</div>`:'')).join('')}
 <div class="fn" style="margin-top:18px"><b>web/OrderList.tsx</b> +24 −6</div>
 <div class="ln"><i>12</i>${esc("  const params = useSearchParams()")}</div>
 <div class="ln a flag" data-k="f2"><i>13</i>${esc("  const [filter, setFilter] = useState<Status[]>([])")}<b class="pin rv pop" data-at=".52">2</b></div>
 <div class="ln a grow" data-k="fixln2"><i>14</i>${esc("  useEffect(() => params.set('status', filter.join(',')), [filter])")}</div>
 <div class="ln a"><i>15</i>${esc("  <StatusFilter value={filter} onChange={setFilter} multiple />")}</div>
 <div class="ln"><i>16</i>${esc("  <OrderTable status={filter} />")}</div></div>
 <div class="side"><div class="who"><span class="dot rw">R</span>${r.rev}</div><div class="who rv" data-at=".06"><span class="fresh">${r.fresh}</span></div>
 <div class="sees rv" data-at=".1"><div style="padding-top:0;color:var(--tx3)">${r.sees}</div>${r.see.map((s,i)=>`<div class="${s[1]?'y':'n'} rv" data-at="${(.13+i*.035).toFixed(3)}">${s[0]}<b>${s[1]?'✓':'✕'}</b></div>`).join('')}</div>
 <div class="cm rv slide" data-at=".36" data-k="c1"><div class="tg"><span class="pn">1</span><span class="lb">${r.sev[0]}</span><span class="loc">orders.ts:43</span></div>${r.c1}</div>
 <div class="cm rv slide" data-at=".52" data-k="c2"><div class="tg"><span class="pn">2</span><span class="lb">${r.sev[1]}</span><span class="loc">OrderList.tsx:13</span></div>${r.c2}</div>
 <div class="verdict rv pop" data-at=".88">✓ ${r.fix} · ${r.pass}</div></div></div></div></div>`}
function test(t){const c=t.test;const T1=[['GET /orders?status=paid','12ms'],['GET /orders?status=paid,shipped','9ms'],['GET /orders?status=done,cancelled','8ms'],['GET /orders?status=pending','7ms'],['GET /orders?status=shipped,done','9ms'],['GET /orders (no filter)','11ms'],['GET /orders?status= → 200 all','7ms'],['GET /orders?status=xxx → 400','6ms'],['GET /orders?status=paid,xxx → 400','5ms'],['GET /orders?status=paid&page=2','10ms'],['keeps created_at sort order','8ms'],['empty result → 200 []','4ms']];
 return `${txt(c,'r',tray(3,3,.9))}
 ${W('l','05','test · devflow-test-engineer','~/shop — devflow-test-engineer',`<div class="term sm">
  <div><span class="ps">$</span> ${TY('npx vitest run tests/orders.api.test.ts',.04,.15)}</div>
  <div class="rv" data-at=".18" style="margin:6px 0 4px"><span class="dm">RUN</span> orders.api.test.ts</div>
  ${T1.map((x,i)=>{const a=.21+i*.038;return `<div class="tr rv" data-at="${a.toFixed(3)}"><span class="spin" data-tick="${(a+.03).toFixed(3)}"></span> ${esc(x[0])}<span class="dm ms rv" data-at="${(a+.03).toFixed(3)}">${x[1]}</span></div>`}).join('')}
  <div class="sum rv" data-at=".2"><b class="okb rv pop" data-at=".72">PASS</b> Tests <b data-k="count">0</b> passed (12) <span class="dm">· ${Z('耗时','time')} <span data-cnt="1.84s" data-a=".21" data-b=".7">1.84s</span></span></div>
  <div class="rv" data-at=".8" style="margin-top:10px"><span class="ps">›</span> ${Z('写入 04-e2e/test-report.md','wrote 04-e2e/test-report.md')}</div></div>`)}`}
function resume(t){const c=t.resume;const ST=Z('澄清 方案 实现 审查 测试 沉淀','clarify plan build review test notes').split(' ');
 return `${txt(c,'l',`<div class="tray rv" data-at=".16"><div class="p">${t.tray}</div><div class="f"><span class="fd drop hot" data-at=".6">${FD}workflow-state.json</span></div></div>`)}
 ${W('r','06','resume · /resume-devflow','~/shop — claude',`<div class="crtw"><div class="term sm scr" data-k="scr">
  <div data-k="before"><div><span class="dm">devflow-test-engineer</span> ${Z('正在跑接口测试…','running API tests…')}</div><div class="tr"><span class="ok">✓</span> GET /orders?status=paid<span class="dm">12ms</span></div><div class="tr"><span class="ok">✓</span> GET /orders?status=paid,shipped<span class="dm">9ms</span></div><div class="tr"><span class="spin"></span> GET /orders?status=done,cancelled</div></div>
  <div data-k="after" style="display:none"><div><span class="ps">›</span> ${TY('/resume-devflow order-list-status-filter',.5,.6)}</div>
  ${c.r.map((r,i)=>`<div class="rv" data-at="${(.63+i*.045).toFixed(3)}" style="margin-top:${i?2:12}px"><span class="ok">${i<2?'✓':'→'}</span> ${r}</div>`).join('')}
  <div class="stpr rv" data-at=".75">${ST.map((s,i)=>`<span class="sd${i===4?' now':''}" data-tick="${(.77+i*.018).toFixed(3)}" data-cls="${i<4?'s1':i===4?'s2':''}">${s}</span>`).join('<i></i>')}</div>
  <div class="rv" data-at=".86" style="margin-top:18px"><span class="dm">devflow-test-engineer</span> ${Z('接着跑剩下的测试','picking up the remaining tests')}</div>
  <div class="tr rv" data-at=".89"><span class="spin" data-tick=".91"></span> GET /orders?status=done,cancelled<span class="dm">8ms</span></div>
  <div class="tr rv" data-at=".93"><span class="spin" data-tick=".95"></span> GET /orders?status=pending<span class="dm">7ms</span></div></div></div>
  <div class="cut" data-k="cut"><span data-k="cutt">${c.lost}</span><small data-k="cuts">session closed · ${Z('3 小时前','3 hours ago')}</small></div></div>`)}`}
function deliver(t){const c=t.deliver;const TR=[[0,'01-requirement/',1],[1,'requirement.md',0],[0,'02-design/',1],[1,'tech-design.md',0],[0,'03-code/',1],[1,'changes.diff',0],[1,'review.md',0],[0,'04-e2e/',1],[1,'test-report.md',0],[0,'05-knowledge/',1],[1,'orders-status-filter.md',0],[0,'workflow-summary.md',2]];
 return `${txt(c,'r',tray(5,5,.62))}
 ${W('l','08','deliver · artifacts','artifacts/order-list-status-filter',`<div class="dl"><div class="tree">${TR.map((x,i)=>`<div class="tn rv settle${x[2]===2?' hl':''}" data-at="${(.06+i*.032).toFixed(3)}" style="padding-left:${14+x[0]*18}px">${x[2]?FD:'<span class="fi"></span>'}${x[1]}</div>`).join('')}</div>
  <div class="pv rv" data-at=".5"><div class="pt">${c.sum}</div><h3>${Z('订单列表状态筛选','Order list status filter')} <span class="chip rv pop stampy" data-at=".86">DONE</span></h3>
  ${c.lines.map((l,i)=>`<div class="pl rv" data-at="${(.56+i*.06).toFixed(2)}"><i class="rv pop" data-at="${(.58+i*.06).toFixed(2)}">${['✓','✓','✓','–'][i]}</i>${l}</div>`).join('')}</div></div>`)}`}
function dash(t){const d=t.dash;return `${txt(d,'l')}
 <div class="persp"><div class="win r bwin" data-k="win" style="top:150px">${fig('09','localhost:8765 · demo data')}${tb('','<div class="url">localhost:8765 · Agent Observability</div><span style="width:60px"></span>')}
 <div class="vp"><div class="zoom" data-k="zoom"><iframe src="dash/index.html" title="dashboard" tabindex="-1"></iframe></div><span class="demo">${d.demo}</span></div></div></div>
 <div class="stk rv pop" data-at=".66" style="left:548px;top:648px">${Z('近 30 天成本','30-day cost')}<b class="o" data-cnt="$95.55" data-a=".66" data-b=".8">$95.55</b></div>
 <div class="stk rv pop" data-at=".74" style="left:1200px;top:110px">devflow-code-reviewer<b data-cnt="${Z('29 次派发','29 dispatches')}" data-a=".74" data-b=".86">${Z('29 次派发','29 dispatches')}</b></div>`}
const INS={claude:['npx -y loopforge-cli@latest install claude','npx -y loopforge-cli@latest status claude','/start-devflow','Classic'],codex:['npx -y loopforge-cli@latest install codex','npx -y loopforge-cli@latest status codex','$devflow-codex','Classic'],
 cursor:['npx -y loopforge-cli@latest install cursor','npx -y loopforge-cli@latest status cursor','/start-devflow','Classic'],codebuddy:['npx -y loopforge-cli@latest install codebuddy','npx -y loopforge-cli@latest status codebuddy','/start-devflow','Classic'],
 pi:['npx -y loopforge-cli@latest skills install pi','pi install npm:pi-subagents','/skill:devflow','Portable']};
const REQ=()=>Z('"为订单列表增加状态筛选，并补充接口测试"','"为订单列表增加状态筛选，并补充接口测试"');
const edNote=id=>INS[id][3]==='Portable'?Z('Portable 版（Pi 只有这一版）· 第二行装的是 pi-subagents 扩展，多 Agent 流程要用到','Portable edition (the only one for Pi) · line 2 adds the pi-subagents extension used for multi-agent runs'):Z('Classic 版（默认）','Classic edition (default)');
function install(t){const n=t.install;
 return `<div class="inst"><div class="kick rv" data-at="0" style="justify-content:center">${n.k}</div><h2 class="h">${lines(n.h)}</h2><p class="sub rv" data-at=".1">${n.sub}</p>
 <div class="tabs rv" data-at=".14"><span class="ind" data-k="ind"></span>${AGENTS.map((a,i)=>`<button data-id="${a[0]}" class="rv pop${i?'':' act'}" data-at="${(.16+i*.04).toFixed(2)}">${mark(a[0])}${a[1]}</button>`).join('')}</div>
 <div class="ibox rv" data-at=".3"><div class="row"><span>$</span><code data-k="ic">${INS.claude[0]}</code><button data-copy>${n.copy}</button></div>
 <div class="row"><span>$</span><code data-k="is">${INS.claude[1]}</code></div><div class="st"><span class="ps">›</span> <code data-k="ist">${INS.claude[2]} ${REQ()}</code></div><div class="ed" data-k="ied">${edNote('claude')}</div></div>
 <p class="inote rv" data-at=".4">${n.note} <code>npx -y loopforge-cli@latest doctor</code></p>
 <div class="ilinks rv" data-at=".44"><a class="pill f" href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">${n.gh} →</a></div></div>
 <div class="foot"><span>${n.foot} · <a href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">github.com/Tencent/LoopForge</a> · ${Z('产品 Logo 归各自所有者','product logos belong to their owners')}</span><span>loopforge-cli v0.2.2</span></div>`}
const SCN=[{b:hero,len:1.6,nav:0,n:'hero',sd:'r'},{b:clarify,len:2.3,nav:0,n:'clarify',sd:'l'},{b:plan,len:1.9,nav:0,sd:'r'},{b:implement,len:1.9,nav:0,sd:'l'},{b:review,len:2.4,nav:1,n:'review',sd:'r'},{b:test,len:2.0,nav:1,n:'test',sd:'l'},{b:resume,len:2.4,nav:2,n:'resume',sd:'r'},{b:deliver,len:1.8,nav:2,sd:'l'},{b:dash,len:2.1,nav:3,n:'dash',sd:'r'},{b:install,len:2.0,nav:4,n:'install'}];
let SC=[],MOB=false;
/* ---------- typing with human cadence ---------- */
function cadence(s){const a=[...s];let h=7,t=0;const out=[];for(let i=0;i<a.length;i++){h=(h*9301+49297)%233280;const j=.55+h/233280*.9;const prev=a[i-1]||'';
 let w=/[\u4e00-\u9fff]/.test(a[i])?1.35:1;if(prev===' ')w*=1.5;if(/[，。,.:：、]/.test(prev))w*=3.2;if(prev==='"')w*=1.8;if(i&&i%9===0)w*=1.6;t+=w*j;out.push(t)}
 return out.map(x=>x/t)}
function setTyped(e,k){if(!e._c)e._c=cadence(e.dataset.type);const s=[...e.dataset.type];let n=0;while(n<s.length&&e._c[n]<=k+1e-6)n++;if(e._n===n)return;e._n=n;
 e.innerHTML=s.slice(0,n).join('').replace(/(&quot;|")(.*)$/,'<q>"$2</q>');const c=e.nextElementSibling;if(c&&c.classList.contains('tc'))c.classList.toggle('on',k>0&&k<1)}
/* ---------- count-up: animates every number in a string ---------- */
function setCount(e,k){const o=e.dataset.cnt;if(k>=1){if(e.textContent!==o)e.textContent=o;return}
 e.textContent=o.replace(/\d+(?:\.\d+)?/g,m=>{const d=(m.split('.')[1]||'').length;return (parseFloat(m)*k).toFixed(d)})}
/* ---------- build ---------- */
function build(){const t=T[L];document.documentElement.lang=L==='zh'?'zh-CN':'en';
 const cv=document.getElementById('cv');
 cv.innerHTML=`<nav><a class="brand" href="#" data-go="0">${LOGO}<span>Loop<b>Forge</b></span></a><div class="links">${t.nav.map((n,i)=>`<a href="#" data-nav="${i}">${n}</a>`).join('')}</div><div class="sp"></div>
 <div class="lang"><button data-l="zh" class="${L==='zh'?'on':''}">中</button>/<button data-l="en" class="${L==='en'?'on':''}">EN</button></div>
 <a class="pill" href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener">GitHub</a><a class="pill f" href="#" data-go="${SCN.length-1}">npx loopforge-cli</a></nav>`+
 SCN.map((s,i)=>`<section class="sc" data-i="${i}">${s.b(t)}</section>`).join('')+`<div class="rail">${SCN.map((s,i)=>`<b data-goto="${i}"><span>${String(i).padStart(2,'0')}</span></b>`).join('')}</div><button class="replay" type="button">↻ ${Z('重播这一段','Replay')}</button><div class="hint">${Z('滚一下 / ↓ 下一段','scroll / ↓ next')}</div>`;
 SC=[...cv.querySelectorAll('section.sc')].map(el=>{const q=s=>[...el.querySelectorAll(s)];const m={el,at:q('[data-at]'),off:q('[data-off]'),ty:q('[data-type]'),tick:q('[data-tick]'),cnt:q('[data-cnt]'),sw:q('[data-sw]'),sel:q('[data-sel]'),press:q('[data-press]')};
  el.querySelectorAll('[data-k]').forEach(e=>{if(!m[e.dataset.k])m[e.dataset.k]=e});return m});
 cv.querySelectorAll('[data-goto]').forEach(a=>a.addEventListener('click',()=>go(+a.dataset.goto)));cv.querySelector('.replay').addEventListener('click',()=>replay());
 cv.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(+a.dataset.go)}));
 cv.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const k=+a.dataset.nav;const i=SCN.findIndex(s=>s.nav>=k);go(i<0?SCN.length-1:i)}));
 cv.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{L=b.dataset.l;localStorage.setItem('lf-lang',L);const u=new URL(location);u.searchParams.set('lang',L);history.replaceState(null,'',u);boot()}));
 const ins=SC[SC.length-1];ins.el.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{ins.manual=true;pick(ins,b.dataset.id,!RM.matches)}));
 ins.el.querySelector('[data-copy]').addEventListener('click',e=>{navigator.clipboard&&navigator.clipboard.writeText(ins.ic.textContent);e.target.textContent=t.install.copied;setTimeout(()=>e.target.textContent=t.install.copy,1400)});
}
/* ---------- install tabs: sliding indicator + command retype ---------- */
function placeInd(m){const b=m.el.querySelector('.tabs button.act');if(!b)return;m.ind.style.width=b.offsetWidth+'px';m.ind.style.transform=`translateX(${b.offsetLeft}px)`}
function retype(el,text,delay=0){clearInterval(el._iv);clearTimeout(el._to);const c=cadence(text),dur=Math.min(900,180+text.length*16);
 el._to=setTimeout(()=>{const t0=performance.now();el._iv=setInterval(()=>{const k=cl((performance.now()-t0)/dur);let n=0;while(n<c.length&&c[n]<=k)n++;el.textContent=[...text].slice(0,n).join('');el.classList.toggle('typing',k<1);if(k>=1)clearInterval(el._iv)},16)},delay)}
function pick(m,id,animate){m.el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('act',x.dataset.id===id));m.cur=id;placeInd(m);const v=INS[id];
 const set=[[m.ic,v[0]],[m.is,v[1]],[m.ist,`${v[2]} ${REQ()}`]];
 if(animate){set.forEach(([e,s],i)=>retype(e,s,i*140));m.ied.classList.remove('on');void m.ied.offsetWidth;m.ied.textContent=edNote(id);m.ied.classList.add('on')}
 else{set.forEach(([e,s])=>{clearInterval(e._iv);clearTimeout(e._to);e.textContent=s;e.classList.remove('typing')});m.ied.textContent=edNote(id);m.ied.classList.add('on')}}
/* ---------- cursor in the clarify step ---------- */
function rel(el,root){let x=0,y=0,e=el;while(e&&e!==root){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent}return{x:x+el.offsetWidth*.55,y:y+el.offsetHeight*.55}}
function cursor(m,keys,p){const c=m.mc;if(!m._pts)m._pts=keys.map(k=>typeof k[1]==='string'?rel(m[k[1]],m.win):{x:k[1][0],y:k[1][1]});
 const P0=keys[0][0]-.02,P1=keys[keys.length-1][0]+.04;c.style.opacity=p<P0||p>P1?0:1;if(p<P0||p>P1)return;
 let x=m._pts[0].x,y=m._pts[0].y;for(let i=1;i<keys.length;i++){if(p>=keys[i][0]){x=m._pts[i].x;y=m._pts[i].y;continue}const t=EIO(R(p,keys[i-1][0]+(keys[i-1][2]?.012:0),keys[i][0]));x=lerp(m._pts[i-1].x,m._pts[i].x,t);y=lerp(m._pts[i-1].y,m._pts[i].y,t);break}
 c.style.transform=`translate(${x}px,${y}px)`;const ck=keys.some(k=>k[2]&&p>=k[0]&&p<k[0]+.02);c.classList.toggle('click',ck)}
const tilt=(w,e,side)=>{w.style.transform=`rotateY(${(side==='l'?8:-8)*(1-e)}deg) rotateX(${4*(1-e)}deg) translateY(${18*(1-e)}px) translateZ(${-50*(1-e)}px)`};
/* ---------- per-scene extras ---------- */
function dashFrame(m,p){const f=m.el.querySelector('iframe');const d=f&&f.contentDocument;if(!d||!d.body||!d.querySelector('.kpi-value'))return;
 if(m._dd!==d||!d.contains(m._kv&&m._kv[0])){m._dd=d;m._kv=[...d.querySelectorAll('.kpi-value')];m._kv.forEach(e=>{if(!e.dataset.cnt)e.dataset.cnt=e.textContent});
  m._ln=[];m._ar=[];d.querySelectorAll('svg path').forEach(e=>{const st=e.getAttribute('stroke');if(st&&st!=='none'&&e.getAttribute('fill')==='none'){e._len=e.getTotalLength();e.style.strokeDasharray=e._len;m._ln.push(e)}else if(e.getAttribute('opacity'))m._ar.push(e)});
  m._dt=[...d.querySelectorAll('svg circle')];m._br=[...d.querySelectorAll('svg rect')].filter(r=>+r.getAttribute('height')>2&&+r.getAttribute('width')<80);m._br.forEach(r=>{r.style.transformBox='fill-box';r.style.transformOrigin='50% 100%'});m._lp=-1}
 const q=Math.round(p*400)/400;if(q===m._lp)return;m._lp=q;
 const ke=EO(R(p,.24,.5));m._kv.forEach(e=>setCount(e,ke));
 const ld=EIO(R(p,.3,.62));m._ln.forEach(e=>e.style.strokeDashoffset=e._len*(1-ld));m._ar.forEach(e=>e.style.opacity=ld);m._dt.forEach(e=>e.style.opacity=ld>.98?1:0);
 m._br.forEach((r,i)=>{const k=EO(R(p,.34+i*.004,.5+i*.004));r.style.transform=k>=1?'':`scaleY(${k})`})}
const UPD={
 hero:(m,p)=>{tilt(m.win,EO(R(p,-.1,.3)),'r')},
 clarify:(m,p)=>{tilt(m.win,EO(R(p,0,.2)),'l');cursor(m,[[.15,[640,560]],[.215,'o1',1],[.33,[600,470]],[.415,'o2',1],[.62,[560,560]],[.79,'okb',1],[.86,[600,600]]],p)},
 review:(m,p)=>{tilt(m.win,EO(R(p,0,.2)),'r');const F1=.74,F2=.8;
  m.f1.classList.toggle('sweep',p>=.36);m.f2.classList.toggle('sweep',p>=.52);m.f1.classList.toggle('fixd',p>=F1);m.f2.classList.toggle('fixd',p>=F2);
  m.f1.classList.toggle('d',p>=F1);m.f1.classList.toggle('a',p<F1);m.fixln.classList.toggle('on',p>=F1+.02);m.fixln2.classList.toggle('on',p>=F2+.02);
  [[m.c1,F1,0],[m.c2,F2,1]].forEach(([c,a,j])=>{const f=p>=a;c.classList.toggle('fixd',f);c.querySelector('.lb').textContent=f?Z('已修复','fixed'):T[L].review.sev[j]})},
 test:(m,p)=>{tilt(m.win,EO(R(p,0,.2)),'l');const n=m.el.querySelectorAll('.tr .spin.ok').length;if(m.count.textContent!=String(n))m.count.textContent=n},
 resume:(m,p)=>{tilt(m.win,EO(R(p,0,.2)),'r');const off=p>=.26&&p<.46;m.scr.classList.toggle('off',off);m.scr.classList.toggle('boot',p>=.46);
  m.scr.parentElement.classList.toggle('dark',p>=.26&&p<.5);m.cut.classList.toggle('on',p>=.315&&p<.46);const rc=p>=.39;m.cutt.textContent=rc?Z('重新连接…','Reconnecting…'):T[L].resume.lost;m.cuts.textContent=rc?'claude · ~/shop':`session closed · ${Z('3 小时前','3 hours ago')}`;m.cut.classList.toggle('rc',rc);
  m.before.style.display=p<.46?'':'none';m.after.style.display=p>=.46?'':'none'},
 dash:(m,p)=>{tilt(m.win,EO(R(p,0,.2)),'r');const z=EIO(R(p,.2,.46));m.zoom.style.transform=`translate(${lerp(0,-8,z)}px,${lerp(0,-130,z)}px) scale(${lerp(.653,.8,z)})`;dashFrame(m,p)},
 install:(m,p)=>{if(m.manual)return;const st=p<.3?0:p<.6?1:p<.82?2:3;if(st===m.st)return;const live=anim===SC.indexOf(m)&&m.st!==undefined&&st===m.st+1;m.st=st;
  if(st===0){['ic','is','ist'].forEach(k=>{clearInterval(m[k]._iv);clearTimeout(m[k]._to);m[k].textContent=''});m.el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('act',x.dataset.id==='claude'));placeInd(m);m.ied.classList.remove('on');return}
  pick(m,st===1?'claude':st===2?'codex':'pi',live)}};
function run(i,p){const m=SC[i];
 m.at.forEach(e=>e.classList.toggle('on',p>=+e.dataset.at));m.off.forEach(e=>{if(p>=+e.dataset.off)e.classList.remove('on')});
 m.ty.forEach(e=>setTyped(e,R(p,+e.dataset.a,+e.dataset.b)));
 m.tick.forEach(e=>{const on=p>=+e.dataset.tick;e.classList.toggle(e.dataset.cls||'ok',on)});
 m.cnt.forEach(e=>setCount(e,EO(R(p,+e.dataset.a,+e.dataset.b))));
 m.sw.forEach(e=>e.classList.toggle('swon',p>=+e.dataset.sw));m.sel.forEach(e=>e.classList.toggle('sel',p>=+e.dataset.sel));m.press.forEach(e=>e.classList.toggle('press',p>=+e.dataset.press));
 const sc=SCN[i];if(MOB){if(sc.n==='review'){UPD.review(m,1);m.win.style.transform=''}if(sc.n==='resume'){m.before.style.display='none';m.after.style.display='';m.cut.classList.remove('on')}if(sc.n==='test')UPD.test(m,1);if(sc.n==='install'&&!m.cur)pick(m,'claude',false);return}
 if(UPD[sc.n])UPD[sc.n](m,p);else if(m.win)tilt(m.win,EO(R(p,0,.2)),sc.sd)}
/* ---------- pager: one gesture = one scene; each scene plays on its own clock ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const DUR=SCN.map(s=>Math.round(s.len*3400)),TRMS=950;
let cur=0,P=[],done=[],anim=null,busy=false,raf=0;
function fit(){const s=Math.min(innerWidth/1440,innerHeight/900);document.getElementById('cv').style.transform=`translate(${(innerWidth-1440*s)/2}px,${(innerHeight-900*s)/2}px) scale(${s})`}
function paint(){SC.forEach((m,k)=>{m.el.style.visibility=k===cur?'visible':'hidden';m.el.style.clipPath='none';m.el.style.zIndex=1});run(cur,P[cur]);ui()}
function ui(){document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',+a.dataset.nav===SCN[cur].nav));
 document.querySelectorAll('.rail b').forEach((d,k)=>d.classList.toggle('on',k===cur));
 const rp=document.querySelector('.replay');if(rp)rp.classList.toggle('on',!!done[cur]&&anim===null);
 document.body.dataset.scene=cur;document.body.dataset.playing=anim!==null?'1':'0';document.body.classList.toggle('still',anim===null)}
function play(i,from=0){cancelAnimationFrame(raf);if(RM.matches){P[i]=1;done[i]=true;anim=null;paint();return}
 const t0=performance.now()-from*DUR[i];anim=i;document.body.classList.remove('still');ui();
 (function tick(now){if(cur!==i){anim=null;return}P[i]=cl((now-t0)/DUR[i]);run(i,P[i]);if(P[i]<1)raf=requestAnimationFrame(tick);else{done[i]=true;anim=null;ui()}})(performance.now())}
function finishNow(i){document.body.classList.add('still');P[i]=1;done[i]=true;run(i,1)}
function go(j){j=Math.max(0,Math.min(SCN.length-1,j));if(j===cur||busy)return;
 cancelAnimationFrame(raf);if(anim!==null){const a=anim;anim=null;finishNow(a)}
 const from=cur,fwd=j>from;cur=j;lastNav=performance.now();if(!done[j]){P[j]=0;const m=SC[j];m.st=undefined;m.manual=false}else document.body.classList.add('still');
 const n=SC[j].el,o=SC[from].el;SC.forEach((m,k)=>{m.el.style.visibility=(k===j||k===from)?'visible':'hidden';m.el.style.zIndex=k===j?2:1});run(j,P[j]);ui();
 const kind=(fwd?from:j)%3;const clip=t=>kind===0?`circle(${t*120}% at 50% 55%)`:kind===1?(fwd?`inset(0 0 0 ${100-t*100}%)`:`inset(0 ${100-t*100}% 0 0)`):(fwd?`inset(${100-t*100}% 0 0 0)`:`inset(0 0 ${100-t*100}% 0)`);
 const fin=()=>{busy=false;o.style.visibility='hidden';o.style.transform='';n.style.clipPath='none';if(!done[j])play(j);else ui()};
 if(RM.matches){fin();return}
 busy=true;const t0=performance.now();(function tr(now){const t=EIO(cl((now-t0)/TRMS));n.style.clipPath=clip(t);o.style.transform=`translateY(${(fwd?-1:1)*t*-0}px) scale(${1-.02*t})`;if(t<1)requestAnimationFrame(tr);else fin()})(t0)}
function replay(){if(busy)return;const m=SC[cur];done[cur]=false;P[cur]=0;m.st=undefined;m.manual=false;m.el.querySelectorAll('.on,.ok,.s1,.s2,.sel,.press,.swon,.sweep,.fixd').forEach(e=>e.classList.remove('on','ok','s1','s2','sel','press','swon','sweep','fixd'));document.body.classList.remove('still');run(cur,0);play(cur)}
let wheelAcc=0,lastWheel=0,gestureUsed=false,lastNav=0;
function onWheel(e){if(MOB)return;e.preventDefault();const now=performance.now();
 if(now-lastWheel>350){gestureUsed=false;wheelAcc=0}lastWheel=now;if(gestureUsed||busy||now-lastNav<1100)return;
 wheelAcc+=e.deltaY;if(Math.abs(wheelAcc)>=40){gestureUsed=true;go(cur+(wheelAcc>0?1:-1));wheelAcc=0}}
function onKey(e){if(MOB||e.target.closest&&e.target.closest('input,textarea'))return;const k=e.key;
 if(['ArrowDown','PageDown',' ','ArrowRight'].includes(k)){e.preventDefault();go(cur+1)}
 else if(['ArrowUp','PageUp','ArrowLeft'].includes(k)){e.preventDefault();go(cur-1)}
 else if(k==='Home'){e.preventDefault();go(0)}else if(k==='End'){e.preventDefault();go(SCN.length-1)}}
let ty0=null;
function boot(){MOB=innerWidth<760;document.body.classList.toggle('mob',MOB);document.documentElement.classList.toggle('pager',!MOB);build();
 if(MOB){cancelAnimationFrame(raf);anim=null;document.body.classList.add('still');const cv=document.getElementById('cv');cv.style.transform='';SC.forEach((m,i)=>{m.el.style.visibility='visible';m.el.style.clipPath='none';run(i,1);const z=m.el.querySelector('.zoom');if(z){const w=m.el.querySelector('.vp').clientWidth;z.style.transform=`translate(0,-130px) scale(${w/1100*1.2})`}});placeInd(SC[SC.length-1]);return}
 fit();if(!P.length){P=SCN.map(()=>0);done=SCN.map(()=>false)}if(done[cur])document.body.classList.add('still');paint();if(!done[cur])play(cur,P[cur]);placeInd(SC[SC.length-1])}
window.LF={SCN,go,replay,get cur(){return cur},get playing(){return anim!==null},get busy(){return busy},DUR,TRMS,seek(i,p){cancelAnimationFrame(raf);anim=null;if(i!==cur){SC[cur].el.style.visibility='hidden';cur=i}SC[i].el.style.visibility='visible';SC[i].el.style.clipPath='none';P[i]=p;done[i]=p>=1;run(i,p);ui()}};
addEventListener('wheel',onWheel,{passive:false});addEventListener('keydown',onKey);
addEventListener('touchstart',e=>{ty0=e.touches[0].clientY},{passive:true});
addEventListener('touchend',e=>{if(MOB||ty0===null)return;const d=ty0-e.changedTouches[0].clientY;ty0=null;if(Math.abs(d)>50)go(cur+(d>0?1:-1))},{passive:true});
let mw=innerWidth<760;addEventListener('resize',()=>{const n=innerWidth<760;if(n!==mw){mw=n;boot()}else if(!MOB){fit();placeInd(SC[SC.length-1])}});
document.fonts&&document.fonts.ready.then(()=>placeInd(SC[SC.length-1]));boot();
})();
