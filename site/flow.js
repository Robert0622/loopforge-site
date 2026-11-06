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
let lgN=0;
const LOGO=()=>{const g='lfg'+(++lgN);return `<svg viewBox="12 12 88 88" fill="none" aria-hidden="true"><defs><linearGradient id="${g}" x1="19" y1="20" x2="93" y2="93" gradientUnits="userSpaceOnUse"><stop stop-color="#008DCC"/><stop offset=".48" stop-color="#526CE8"/><stop offset="1" stop-color="#8A4ED9"/></linearGradient></defs><path d="M53 72C53 59 63 52.5 73 52.5S93 59 93 72 83 91.5 73 91.5 53 85 53 72V40C53 27 44.5 20.5 36 20.5S19 27 19 40" stroke="url(#${g})" stroke-width="7.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
// Product marks: Claude, Codex (OpenAI), Cursor, CodeBuddy from LobeHub Icons (@lobehub/icons-static-svg, MIT);
// Pi from pi.dev's own favicon; GitHub from Simple Icons (CC0). Trademarks of their owners, used only to name the agent each command targets.
const MARK={
 claude:['0 0 24 24','M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z'],
 codex:['0 0 24 24','M8.086.457a6.105 6.105 0 013.046-.415c1.333.153 2.521.72 3.564 1.7a.117.117 0 00.107.029c1.408-.346 2.762-.224 4.061.366l.063.03.154.076c1.357.703 2.33 1.77 2.918 3.198.278.679.418 1.388.421 2.126a5.655 5.655 0 01-.18 1.631.167.167 0 00.04.155 5.982 5.982 0 011.578 2.891c.385 1.901-.01 3.615-1.183 5.14l-.182.22a6.063 6.063 0 01-2.934 1.851.162.162 0 00-.108.102c-.255.736-.511 1.364-.987 1.992-1.199 1.582-2.962 2.462-4.948 2.451-1.583-.008-2.986-.587-4.21-1.736a.145.145 0 00-.14-.032c-.518.167-1.04.191-1.604.185a5.924 5.924 0 01-2.595-.622 6.058 6.058 0 01-2.146-1.781c-.203-.269-.404-.522-.551-.821a7.74 7.74 0 01-.495-1.283 6.11 6.11 0 01-.017-3.064.166.166 0 00.008-.074.115.115 0 00-.037-.064 5.958 5.958 0 01-1.38-2.202 5.196 5.196 0 01-.333-1.589 6.915 6.915 0 01.188-2.132c.45-1.484 1.309-2.648 2.577-3.493.282-.188.55-.334.802-.438.286-.12.573-.22.861-.304a.129.129 0 00.087-.087A6.016 6.016 0 015.635 2.31C6.315 1.464 7.132.846 8.086.457zm-.804 7.85a.848.848 0 00-1.473.842l1.694 2.965-1.688 2.848a.849.849 0 001.46.864l1.94-3.272a.849.849 0 00.007-.854l-1.94-3.393zm5.446 6.24a.849.849 0 000 1.695h4.848a.849.849 0 000-1.696h-4.848z'],
 cursor:['0 0 24 24','M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z'],
 codebuddy:['0 0 24 24','M18.777 1.647c.28-.02.536.114.972.51 1.018.926 2.437 2.828 3.318 4.452l.34.631.482.24.11.06v3.638a5.206 5.206 0 00-5.32-1.23c-.491.166-1.021.471-2.08 1.082l-6.09 3.516c-1.057.61-1.586.916-1.975 1.259a5.208 5.208 0 00-1.493 5.572c.165.49.471 1.02 1.082 2.08l.315.543h-3.26c-.685 0-1.34-.135-1.939-.377-.169-.956-.009-1.789.469-2.335.158-.18.164-.189.13-.493a11.846 11.846 0 01-.057-1.711l.02-.444-.667-1.18C2.1 15.622 1.445 14.078 1.192 12.9c-.133-.647-.125-.934.04-1.146.1-.128.427-.261.822-.334.994-.175 3.162-.017 5.575.41l.25.043.551-.487c.915-.81 1.522-1.264 2.641-1.962 1.167-.73 2.484-1.331 3.967-1.807l.476-.152.261-.688c.937-2.471 1.896-4.293 2.58-4.9.235-.21.25-.22.422-.23z M12.139 18.2a1.203 1.203 0 011.642.44l1.296 2.243a1.204 1.204 0 01-2.083 1.203l-1.296-2.243a1.203 1.203 0 01.44-1.644zM18.629 14.452a1.203 1.203 0 011.642.44l1.295 2.244a1.203 1.203 0 11-2.083 1.203l-1.295-2.243a1.203 1.203 0 01.44-1.644z'],
 gh:['0 0 24 24','M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12'],
 pi:['0 0 560 560','M420 280H280V140H0V0H420V280Z M560 560H420V280H560V560Z M140 560H0V140H140V280H280V420H140V560Z']};
const mark=(id,cls='')=>`<svg class="mk ${cls}" viewBox="${MARK[id][0]}" fill="currentColor" aria-hidden="true"><path d="${MARK[id][1]}"/></svg>`;
const AGENTS=[['claude','Claude Code'],['codex','Codex'],['cursor','Cursor'],['codebuddy','CodeBuddy'],['pi','Pi']];
const EXECS=[['codebuddy','CodeBuddy'],['codex','Codex'],['claude','Claude Code']];
const TRY=()=>'demo/'+(L==='en'?'?lang=en':'');
const strip=(list,lab)=>`<div class="astrip">${lab?`<span class="ac">${lab}</span>`:''}${list.map(a=>`<span class="ai">${mark(a[0])}${a[1]}</span>`).join('')}</div>`;
const lines=(h,em)=>h.split('<br>').map((x,i)=>`<span class="hl"><span class="rv up" data-at="${(.03+i*.06).toFixed(2)}">${em?em(x):x}</span></span>`).join(L==='en'?' ':'');
const emph=(h,em)=>x=>em&&x.includes(em)?x.replace(em,`<em>${em}</em>`):x;
const head=(s,tag='h2',cls='')=>`<${tag} class="h ${cls}">${lines(s.h,emph(s.h,s.em))}</${tag}>${s.sub?`<p class="sub rv" data-at=".12">${s.sub}</p>`:''}`;
const tb=(t,extra='')=>`<div class="tb"><i></i><i></i><i></i><span>${t}</span>${extra}</div>`;
const W=(s,body,extra='',max=1)=>`<div class="fit" data-max="${max}"><div class="fz"><div class="win" data-k="win">${tb(s.win,extra)}${body}</div></div></div>`;
const DEMO=()=>`<span class="sp"></span><span class="chip dmo">${T[L].demo}</span>`;
const f2=x=>x.toFixed(3);
const EXN={codebuddy:'CodeBuddy',codex:'Codex',claude:'Claude Code',gh:'GitHub'};
/* ---------- product windows ---------- */
/* hero: the built-in bug-fix SOP on the designer canvas (node names/outputs follow the public catalog) */
const PN=[[0,0,'agent'],[1,0,'agent'],[2,0,'agent'],[3,0,'agent'],[3,1,'agent'],[2,1,'human'],[1,1,'agent']];
const NX=c=>28+c*170,NY=r=>34+r*176,NW=146,NH=84;
function hero(t){const c=t.hero;
 const nd=(n,i)=>{const[col,row,ty]=PN[i];return `<div class="nd ${ty} rv pop" data-at="${f2(.08+i*.05)}" style="left:${NX(col)}px;top:${NY(row)}px"><div class="nt"><span class="ty">${c.ty[ty]}</span>${ty==='agent'?'<span class="ex">codebuddy</span>':''}<i class="st" data-tick="${f2(.62+i*.045)}" data-cls="dn"></i></div><b>${n[0]}</b><small>${n[1]}</small></div>`};
 const my=r=>NY(r)+NH/2,cx=c=>NX(c)+NW/2;
 const E=[[NX(0)+NW,my(0),NX(1),my(0)],[NX(1)+NW,my(0),NX(2),my(0)],[NX(2)+NW,my(0),NX(3),my(0)],[cx(3),NY(0)+NH,cx(3),NY(1)],[NX(3),my(1),NX(2)+NW,my(1)],[NX(2),my(1),NX(1)+NW,my(1)]];
 const ah=(x2,y2,dx,dy)=>{const px=-dy,py=dx;return `M${x2} ${y2}L${x2-dx*7+px*4} ${y2-dy*7+py*4}L${x2-dx*7-px*4} ${y2-dy*7-py*4}z`};
 const edges=E.map((e,i)=>{const a=f2(.14+i*.05),dx=Math.sign(e[2]-e[0]),dy=Math.sign(e[3]-e[1]);return `<path class="eg dr" pathLength="1" data-at="${a}" d="M${e[0]} ${e[1]}L${e[2]} ${e[3]}"/><path class="ahd rvo" data-at="${f2(+a+.04)}" d="${ah(e[2],e[3],dx,dy)}"/>`}).join('');
 const rx=cx(2)+30;const rej=`<path class="eg rej rvo" data-at=".5" d="M${rx} ${NY(1)}L${rx} ${NY(0)+NH}"/><path class="ahd rj rvo" data-at=".5" d="${ah(rx,NY(0)+NH,0,-1)}"/>`;
 return W(c,`<div class="cvs"><div class="cvi"><svg class="egs" width="718" height="330" viewBox="0 0 718 330">${edges}${rej}</svg>
 <span class="rlab rvo" data-at=".52" style="left:${rx+8}px;top:${(NY(0)+NH+NY(1))/2-9}px">${c.rej}</span>
 ${c.nodes.map(nd).join('')}
 <div class="lgd rv" data-at=".5" style="left:${NX(0)}px;top:${NY(1)+8}px"><div><i class="l1"></i>${c.lg[0]}</div><div><i class="l2"></i>${c.lg[1]}</div></div></div></div>`,`<span class="sp"></span><span class="chip">${c.pub}</span>`,1.56)}
/* one requirement moving through the SOP, one role per step */
function sop(t){const c=t.sop;
 return W(c,`<div class="pipe"><div class="ptl rv" data-at=".04">${t.req}</div><div class="ph">${c.head.map(h=>`<span>${h}</span>`).join('')}<span></span></div>
 ${c.rows.map((r,i)=>{const a=.1+i*.09;return `<div class="pr rv" data-at="${f2(a)}"><b><i>${i+1}</i>${r[0]}</b><span>${r[1]}</span><span class="ex">${mark(r[2])}${EXN[r[2]]}</span><code class="rv pop" data-at="${f2(a+.05)}">${r[3]}</code><span class="spin" data-tick="${f2(a+.08)}"></span></div>`}).join('')}
 <div class="pf rv" data-at=".72">${c.foot}</div></div>`,`<span class="sp"></span>${c.ctl.map(x=>`<span class="tbb">${x}</span>`).join('')}`)}
/* a gate run: the agent claims done, the command decides */
function gate(t){const c=t.gate;const ln=(a,h,cls='')=>`<div class="rv ${cls}" data-at="${a}">${h}</div>`;
 return W(c,`<div class="term sm gtm">
 ${ln('.04',`<span class="dm">${c.win}</span>`)}
 ${ln('.08',`<span class="ok">●</span> ${c.claim}`)}
 ${ln('.15',`<span class="ps">$</span> <span class="cmd">go test ./...</span> <span class="dm">· ${c.run}</span>`)}
 ${c.fails.map((f,i)=>ln(f2(.24+i*.05),esc(f),'bad')).join('')}
 ${ln('.36',`<b>${c.exit}</b>`,'bad')}
 ${ln('.42',`↩ ${c.verdict}`,'vd no')}
 ${ln('.54',`<span class="dm">${c.retry}</span>`,'gap')}
 ${ln('.58',`<span class="ok">●</span> ${c.fixed}`)}
 ${ln('.64',`<span class="ps">$</span> <span class="cmd">go test ./...</span>`)}
 ${ln('.72',`<span class="ok">✓</span> ${c.pass}`)}
 ${ln('.8',`✓ ${c.done}`,'vd yes')}</div>`)}
const INS={platform:['git clone https://github.com/Tencent/LoopForge.git && cd LoopForge','bash scripts/install.sh','open http://localhost:8090','Platform'],claude:['npx -y loopforge-cli@latest install claude','npx -y loopforge-cli@latest status claude','/start-devflow','Classic'],codex:['npx -y loopforge-cli@latest install codex','npx -y loopforge-cli@latest status codex','$devflow-codex','Classic'],
 cursor:['npx -y loopforge-cli@latest install cursor','npx -y loopforge-cli@latest status cursor','/start-devflow','Classic'],codebuddy:['npx -y loopforge-cli@latest install codebuddy','npx -y loopforge-cli@latest status codebuddy','/start-devflow','Classic'],
 pi:['npx -y loopforge-cli@latest skills install pi','pi install npm:pi-subagents','/skill:devflow','Portable']};
const REQ=()=>Z('"为订单列表增加状态筛选，并补充接口测试"','"Add a status filter to the order list and cover the API with tests"');
const stLine=id=>id==='platform'?INS[id][2]:`${INS[id][2]} ${REQ()}`;
const edNote=id=>INS[id][3]==='Platform'?Z('平台版 · 第一个注册的账号自动成为管理员，新手引导里的“一键体验”不需要 API Key','Platform · the first account becomes admin; the onboarding demo needs no API key'):INS[id][3]==='Portable'?Z('Portable 版（Pi 只有这一版）· 第二行装的是 pi-subagents 扩展，多 Agent 流程要用到','Portable edition (the only one for Pi) · line 2 adds the pi-subagents extension used for multi-agent runs'):Z('Classic 版（默认）','Classic edition (default)');
const TABS=()=>[['platform',T[L].install.plat],...AGENTS];
const tmark=id=>id==='platform'?`<span class="mk lgm">${LOGO()}</span>`:mark(id);
function install(t){const n=t.install;
 return `${head({h:t.dep.h,em:t.dep.em,sub:n.sub})}
 <div class="tabs rv" data-at=".14"><span class="ind" data-k="ind"></span>${TABS().map((a,i)=>`<button data-id="${a[0]}" class="rv pop${i?'':' act'}" data-at="${(.16+i*.035).toFixed(3)}">${tmark(a[0])}${a[1]}</button>`).join('')}</div>
 <div class="ibox rv" data-at=".3"><div class="row"><span>$</span><code data-k="ic">${INS.platform[0]}</code><button data-copy>${n.copy}</button></div>
 <div class="row"><span>$</span><code data-k="is">${INS.platform[1]}</code></div><div class="st"><span class="ps">›</span> <code data-k="ist">${stLine('platform')}</code></div><div class="ed" data-k="ied">${edNote('platform')}</div></div>
 <p class="inote rv" data-at=".4">${n.note} <code>npx -y loopforge-cli@latest doctor</code></p>`}
/* cloud workspaces keep running after the laptop closes; idle ones snapshot and sleep */
function cloud(t){const c=t.cloud;
 const st=(i)=>i===0?`<span class="wst run"><i></i>${c.run}</span>`:i===1?`<span class="wst run s-a"><i></i>${c.run}</span><span class="wst slp s-b"><i></i>${c.sleep}</span>`:`<span class="wst wt"><i></i>${c.wait}</span>`;
 return W(c,`<div class="cwk"><div class="lidr rv" data-at=".04"><span class="dev off"><i></i>${c.lid}</span><span class="arr">→</span><span class="dev on"><i></i>${c.up}</span></div>
 ${c.rows.map((r,i)=>`<div class="wsr rv" data-at="${f2(.12+i*.07)}"${i===1?' data-sw=".52"':''}><code>${r[0]}</code><div><b>${r[1]}</b><small>${r[2]} · ${mark(r[3])}${EXN[r[3]]}</small></div>${st(i)}<em class="pg"><em class="bar" style="--w:${[72,100,100][i]}%" data-tick="${f2(.2+i*.07)}" data-cls="on"></em></em></div>`).join('')}
 <div class="wake rv" data-at=".74"><span class="ok">✓</span> ${c.wake}</div></div>`)}
/* one shared conversation, one Main Bot */
function chat(t){const c=t.chat;
 return W(c,`<div class="cht">${c.msgs.map((m,i)=>{const a=f2(.06+i*.13);return `<div class="cm2 ${m[0]} rv" data-at="${a}"><span class="avt">${m[0]==='b'?LOGO():m[1]}</span><div><b>${m[2]}</b><p>${m[3]}</p>${m[5]?`<span class="apn rv pop" data-at="${f2(+a+.05)}">✓ ${m[5]}</span>`:''}${i===4?`<div class="mflow">${c.flow.map((x,j)=>`<span class="rv pop" data-at="${f2(.7+j*.035)}"${j<2?` data-tick="${f2(.82+j*.04)}" data-cls="dn"`:''}${j===2?` data-tick=".9" data-cls="go"`:''}><i></i>${x}</span>`).join('')}</div>`:''}</div>${m[4]&&i!==4?`<code class="rv pop" data-at="${f2(+a+.03)}">${m[4]}</code>`:''}</div>`}).join('')}</div>`,`<span class="sp"></span><span class="chip mode">${c.mode}</span>`)}
/* scheduled issue sync: fix in parallel, resolve conflicts, park what needs a person */
function auto(t){const c=t.auto;const res=[`<span class="spin" data-tick=".42"></span><code class="rv pop" data-at=".44">${c.rows[0][2]}</code>`,`<span class="cfl rv" data-at=".48">${c.conflict}</span><code class="rv pop" data-at=".58">${c.rows[1][2]}</code>`,`<span class="wst wt rv" data-at=".52"><i></i>${c.wait}</span>`,`<span class="spin" data-tick=".62"></span><span class="pln rv" data-at=".64">${c.plan}</span>`];
 return W(c,`<div class="aut"><div class="aph rv" data-at=".04"><span class="chip">${mark('gh')} ${c.pulled}</span></div>
 ${c.rows.map((r,i)=>`<div class="ais rv" data-at="${f2(.1+i*.06)}"><code>${r[0]}</code><b>${r[1]}</b><span class="sopc">${i===3?Z('定时巡检','Health check'):c.fix}</span><span class="ares">${res[i]}</span></div>`).join('')}
 <div class="vd yes rv" data-at=".78">✓ ${c.done}</div></div>`)}
/* engineering RSI: score the run, prescribe, write back, the next run passes */
function rsi(t){const c=t.rsi;
 return W(c,`<div class="rsi"><div class="rr2"><div class="rrun rv" data-at=".04"><div class="ring bad"><b data-cnt="55" data-a=".06" data-b=".24">55</b><small>/100</small></div><span>${c.r1}</span></div>
 <span class="rarr rv" data-at=".66">→</span>
 <div class="rrun rv" data-at=".7"><div class="ring"><b data-cnt="96" data-a=".72" data-b=".9">96</b><small>/100</small></div><span>${c.r2}</span></div></div>
 <div class="sgh rv" data-at=".28">${c.rx}</div>
 ${c.items.map((x,i)=>`<div class="rxi rv" data-at="${f2(.32+i*.06)}" data-sw="${f2(.56+i*.03)}"><span class="rxt">${x[0]}</span><p>${x[1]}</p><span class="btn s-a" data-press="${f2(.53+i*.03)}">${c.apply}</span><span class="rxd s-b">✓ ${c.applied}</span></div>`).join('')}</div>`,DEMO())}
const STEPS=[['cloud',cloud],['chat',chat],['sop',sop],['gate',gate],['auto',auto],['rsi',rsi]];
const LEN={hero:1.9,why:1,head:.6,cloud:1.8,chat:2.2,sop:1.8,gate:2.2,auto:2,rsi:2,install:2,fin:.7};
const PLAY='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 001.5.86l12.6-7.5a1 1 0 000-1.72L8.5 3.64A1 1 0 007 4.5z"/></svg>';
/* ---------- typing with human cadence ---------- */
function cadence(s){const a=[...s];let h=7,t=0;const out=[];for(let i=0;i<a.length;i++){h=(h*9301+49297)%233280;const j=.55+h/233280*.9;const prev=a[i-1]||'';
 let w=/[\u4e00-\u9fff]/.test(a[i])?1.35:1;if(prev===' ')w*=1.5;if(/[，。,.:：、]/.test(prev))w*=3.2;if(prev==='"')w*=1.8;if(i&&i%9===0)w*=1.6;t+=w*j;out.push(t)}
 return out.map(x=>x/t)}
/* ---------- count-up: animates every number in a string ---------- */
function setCount(e,k){const o=e.dataset.cnt;if(k>=1){if(e.textContent!==o)e.textContent=o;return}
 e.textContent=o.replace(/\d+(?:\.\d+)?/g,m=>{const d=(m.split('.')[1]||'').length;return (parseFloat(m)*k).toFixed(d)})}
/* ---------- build ---------- */
let U=[];
function build(){const t=T[L];document.documentElement.lang=L==='zh'?'zh-CN':'en';
 const MD=document.querySelector('meta[name=description]');window.LF_ZH_META=window.LF_ZH_META||[document.title,MD?MD.content:''];document.title=Z(LF_ZH_META[0],'LoopForge · Open-source, self-improving cloud platform for AI development');if(MD)MD.content=Z(LF_ZH_META[1],'LoopForge is an open-source, self-hosted cloud platform for AI development: 24/7 cloud workspaces, a shared conversation with one Main Bot, SOPs with hard gates, scheduled and issue automation, and a review after every run that improves the process.');
 const GH='https://github.com/Tencent/LoopForge',ids=['why','story','video','deploy'];
 const c=t.hero,w=t.why;
 document.getElementById('app').innerHTML=`<header class="nav"><div class="nbar"><a class="brand" href="#top">${LOGO()}<span>LoopForge</span></a>
 <div class="links">${t.nav.map((n,i)=>`<a href="#${ids[i]}" data-nav="${ids[i]}">${n}</a>`).join('')}</div>
 <div class="lang"><button data-l="zh" class="${L==='zh'?'on':''}" aria-label="${Z('中文','Chinese')}">${Z('中','ZH')}</button>/<button data-l="en" class="${L==='en'?'on':''}">EN</button></div>
 <a class="pill ghl" href="${GH}" target="_blank" rel="noopener" aria-label="GitHub">${mark('gh')}<span>GitHub</span></a><a class="pill f" href="${TRY()}">${t.try}</a></div></header>
 <main>
 <section class="hero u" id="top" data-u="hero"><div class="hx">${head(c,'h1')}
  <div class="cta rv" data-at=".18"><a class="pill f" href="${TRY()}">${t.try} →</a><a class="pill" href="#deploy">${c.deploy}</a></div>
  <div class="rv" data-at=".24">${strip(EXECS,c.exec)}</div></div>
  <div class="hwin">${hero(t)}</div></section>
 <section class="why wrap u" id="why" data-u="why"><div class="shead">${head(w)}</div>
  <div class="pains">${w.pains.map((x,i)=>`<div class="pain rv" data-at="${(.18+i*.08).toFixed(2)}"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join('')}</div></section>
 <section class="story" id="story"><div class="shead u" data-u="head">${head(t.story)}</div>
  <div class="tline"><div class="rail2"><i class="fill"></i></div>
  ${STEPS.map(([k,fn],i)=>`<div class="step" data-tone="${i}"><div class="mark"><span class="tm">${t.story.marks[i]}</span><b class="dot"></b></div>
   <div class="scard u" data-u="${k}"><div class="ct"><span class="no">${String(i+1).padStart(2,'0')}</span>${head(t[k],'h3')}</div><div class="cw">${fn(t)}</div>
   <button class="rp" type="button">↻ ${t.replay}</button></div></div>`).join('')}</div></section>
 <section class="video wrap" id="video"><div class="shead u" data-u="head">${head(t.video)}</div>
  <div class="vframe"><video preload="none" playsinline poster="demo/media/loopforge-promo.jpg?v=11" src="demo/media/loopforge-promo.mp4?v=11"></video>
  <button class="play" type="button"><i>${PLAY}</i><span>${t.video.play}</span></button></div>
  <a class="pill vl" href="${TRY()}">${t.video.cta} →</a></section>
 <section class="deploy wrap u" id="deploy" data-u="install">${install(t)}</section>
 <section class="fin u" data-u="fin"><span class="fl rv pop" data-at=".02">${LOGO()}</span>${head(t.fin)}
  <div class="cta rv" data-at=".2"><a class="pill f" href="${TRY()}">${t.try} →</a><a class="pill" href="${GH}" target="_blank" rel="noopener">${mark('gh')}${t.install.gh}</a></div></section>
 </main>
 <footer class="ft"><a class="brand" href="#top">${LOGO()}<span>LoopForge</span></a><span>${t.install.foot} · <a href="${GH}" target="_blank" rel="noopener">github.com/Tencent/LoopForge</a> · ${Z('产品 Logo 归各自所有者','product logos belong to their owners')}</span></footer>`;
 const app=document.getElementById('app');
 U=[...app.querySelectorAll('.u')].map(el=>{const q=s=>[...el.querySelectorAll(s)];const n=el.dataset.u;
  const m={el,n,dur:Math.round(LEN[n]*3400),p:0,done:false,playing:false,at:q('[data-at]'),off:q('[data-off]'),tick:q('[data-tick]'),cnt:q('[data-cnt]'),sw:q('[data-sw]'),sel:q('[data-sel]'),press:q('[data-press]')};
  el.querySelectorAll('[data-k]').forEach(e=>{if(!m[e.dataset.k])m[e.dataset.k]=e});return m});
 U.forEach(m=>{const b=m.el.querySelector(':scope>.rp');if(b)b.addEventListener('click',()=>{reset(m);play(m)})});
 app.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.l===L)return;L=b.dataset.l;localStorage.setItem('lf-lang',L);const u=new URL(location);u.searchParams.set('lang',L);history.replaceState(null,'',u);boot()}));
 const ins=U.find(m=>m.n==='install');ins.el.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>{ins.manual=true;pick(ins,b.dataset.id,!RM.matches)}));
 ins.el.querySelector('[data-copy]').addEventListener('click',e=>{navigator.clipboard&&navigator.clipboard.writeText(ins.ic.textContent);e.target.textContent=t.install.copied;setTimeout(()=>e.target.textContent=t.install.copy,1400)});
 const vf=app.querySelector('.vframe'),v=vf.querySelector('video');
 vf.querySelector('.play').addEventListener('click',()=>{vf.classList.add('on');v.controls=true;v.play()});
}
/* ---------- install tabs: sliding indicator + command retype ---------- */
function placeInd(m){const b=m.el.querySelector('.tabs button.act');if(!b)return;m.ind.style.width=b.offsetWidth+'px';m.ind.style.transform=`translateX(${b.offsetLeft}px)`}
function retype(el,text,delay=0){clearInterval(el._iv);clearTimeout(el._to);const c=cadence(text),dur=Math.min(900,180+text.length*16);
 el._to=setTimeout(()=>{const t0=performance.now();el._iv=setInterval(()=>{const k=cl((performance.now()-t0)/dur);let n=0;while(n<c.length&&c[n]<=k)n++;el.textContent=[...text].slice(0,n).join('');el.classList.toggle('typing',k<1);if(k>=1)clearInterval(el._iv)},16)},delay)}
function pick(m,id,animate){m.el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('act',x.dataset.id===id));m.cur=id;placeInd(m);const v=INS[id];
 const set=[[m.ic,v[0]],[m.is,v[1]],[m.ist,stLine(id)]];
 if(animate){set.forEach(([e,s],i)=>retype(e,s,i*140));m.ied.classList.remove('on');void m.ied.offsetWidth;m.ied.textContent=edNote(id);m.ied.classList.add('on')}
 else{set.forEach(([e,s])=>{clearInterval(e._iv);clearTimeout(e._to);e.textContent=s;e.classList.remove('typing')});m.ied.textContent=edNote(id);m.ied.classList.add('on')}}
const tilt=w=>e=>{w.style.transform=e>=1?'':`rotateX(${14*(1-e)}deg) translateY(${48*(1-e)}px)`};
const UPD={
 hero:(m,p)=>{tilt(m.win)(EO(R(p,-.1,.3)))},
 install:(m,p)=>{if(m.manual)return;const st=p<.3?0:p<.6?1:p<.82?2:3;if(st===m.st)return;const live=m.playing&&m.st!==undefined&&st===m.st+1;m.st=st;
  if(st===0){['ic','is','ist'].forEach(k=>{clearInterval(m[k]._iv);clearTimeout(m[k]._to);m[k].textContent=''});m.el.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('act',x.dataset.id==='platform'));placeInd(m);m.ied.classList.remove('on');return}
  pick(m,st===1?'platform':st===2?'claude':'pi',live)}};
function run(m,p){
 m.at.forEach(e=>e.classList.toggle('on',p>=+e.dataset.at));m.off.forEach(e=>{if(p>=+e.dataset.off)e.classList.remove('on')});
 m.tick.forEach(e=>{const on=p>=+e.dataset.tick;e.classList.toggle(e.dataset.cls||'ok',on)});
 m.cnt.forEach(e=>setCount(e,EO(R(p,+e.dataset.a,+e.dataset.b))));
 m.sw.forEach(e=>e.classList.toggle('swon',p>=+e.dataset.sw));m.sel.forEach(e=>e.classList.toggle('sel',p>=+e.dataset.sel));m.press.forEach(e=>e.classList.toggle('press',p>=+e.dataset.press));
 if(UPD[m.n])UPD[m.n](m,p);else if(m.win)tilt(m.win)(EO(R(p,0,.2)))}
/* ---------- each block plays on its own clock once it scrolls into view ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)'),STILL=qs.has('still');
function play(m){cancelAnimationFrame(m.raf);if(RM.matches||STILL){m.p=1;finish(m);return}
 m.playing=true;m.el.classList.remove('played');const t0=performance.now()-m.p*m.dur;
 const tick=now=>{m.p=cl((now-t0)/m.dur);run(m,m.p);if(m.p<1)m.raf=requestAnimationFrame(tick);else finish(m)};m.raf=requestAnimationFrame(tick)}
function finish(m){m.playing=false;m.done=true;run(m,1);m.el.classList.add('played')}
function reset(m){cancelAnimationFrame(m.raf);m.p=0;m.done=false;m.st=undefined;m.manual=false;
 m.el.classList.add('rewind');run(m,0);void m.el.offsetWidth;m.el.classList.remove('rewind')}
let io;
function watch(){if(io)io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const m=U.find(x=>x.el===e.target);io.unobserve(e.target);if(m&&!m.done&&!m.playing)play(m)}),{rootMargin:'0px 0px -22% 0px'});
 U.forEach(m=>{if(m.done){run(m,1);m.el.classList.add('played')}else io.observe(m.el)})}
/* ---------- windows scale to their column ---------- */
function fit(){document.querySelectorAll('.fit').forEach(f=>{const z=f.firstElementChild,w=f.clientWidth,k=Math.min(+f.dataset.max||1,w/718);
 z.style.transform=`scale(${k.toFixed(4)})`;z.style.marginLeft=Math.max(0,(w-718*k)/2)+'px';f.style.height=Math.ceil(z.offsetHeight*k)+'px'})}
/* ---------- nav state + timeline progress ---------- */
function onScroll(){const y=innerHeight*.45;let on=null;
 document.querySelectorAll('main>section[id]').forEach(s=>{if(s.getBoundingClientRect().top<y)on=s.id});
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===on));
 document.querySelector('.nav').classList.toggle('sc',scrollY>8);
 const tl=document.querySelector('.tline');if(!tl)return;const r=tl.getBoundingClientRect(),f=tl.querySelector('.fill');
 f.style.height=Math.max(0,Math.min(r.height,innerHeight*.55-r.top))+'px';
 tl.querySelectorAll('.step').forEach(s=>s.classList.toggle('on',s.querySelector('.dot').getBoundingClientRect().top<innerHeight*.55))}
function boot(){const keep=scrollY,prev=U.map(m=>m.done);build();if(prev.length===U.length)U.forEach((m,i)=>{m.done=prev[i];if(m.done)m.p=1});
 U.forEach(m=>run(m,m.p));fit();watch();onScroll();scrollTo(0,keep)}
window.LF={get units(){return U},play,reset,fit};
addEventListener('scroll',onScroll,{passive:true});
addEventListener('resize',()=>{fit();onScroll();const m=U.find(x=>x.n==='install');if(m)placeInd(m)});
document.fonts&&document.fonts.ready.then(()=>{fit();const m=U.find(x=>x.n==='install');if(m)placeInd(m)});
boot();
})();
