(function(){
'use strict';
const qs=new URLSearchParams(location.search);
let L=qs.get('lang')||localStorage.getItem('lf-lang')||((navigator.language||'').startsWith('zh')?'zh':'en');if(L!=='zh'&&L!=='en')L='zh';
const Z=(a,b)=>L==='zh'?a:b;
const SRC='media/loopforge-promo.mp4',POSTER='media/loopforge-promo.jpg',GH='https://github.com/Tencent/LoopForge';
const LOGO=`<svg viewBox="0 0 64 64" fill="none" aria-hidden="true"><path d="M45.2 19.2A10 10 0 1 1 42 4.8" stroke="#FF5A1F" stroke-width="4.4" stroke-linecap="round"/><path d="M46.5 7.8L39.0 9.0L42.8 1.4z" fill="#FF5A1F" stroke="#FF5A1F" stroke-width="1.2" stroke-linejoin="round"/><path d="M3 30.5c6.5 0 11.2-1.6 15-3.5H58v7.8h-8.6c-3.6 0-5.9 2.6-5.9 5.8V44h7.2v6.5H20.8V44H28v-3.4c0-3.2-2.3-5.8-5.9-5.8H17C10.8 34.8 6 33.2 3 30.5z" fill="currentColor"/></svg>`;
const I={
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
 vol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
 mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="m16 9 5 6M21 9l-5 6"/></svg>',
 fs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 4v4h4"/></svg>',
};
// Start times match the title cards in the video.
const CH=[
 [3,'一句话提需求','Prompt a task','输入需求，匹配对应的研发 SOP','Enter a requirement and match an SOP'],
 [16,'多 Agent 并行','Parallel agents','前后端与测试在独立云端工作区同时跑','Frontend, backend and test in own workspaces'],
 [25,'流水线生成 MR','Pipeline to MR','按步骤执行、过门禁，最后提交 MR','Run steps and gates, then open an MR'],
 [30,'云端后台运行','Runs in the cloud','合上电脑或关掉网页，任务在云端继续跑','Keep tasks running after closing your laptop'],
 [38,'多人同一会话','Shared session','产品、设计、研发同群协作，按需走 SOP','Product, design and dev in a single thread'],
 [45,'编排 SOP 与执行器','SOPs & executors','配置角色与门禁，切换 Claude、Codex 等','Set roles and gates; switch CLI per step'],
 [51,'工蜂 / TAPD 同步','Git & TAPD sync','拉取缺陷单自动修复，状态回写单据','Pull tickets, run fixes, and sync status back'],
 [61,'运行评测与复盘','Run review','给运行打分找卡点，改进建议写回 SOP','Score each run, spot bottlenecks, update SOP'],
 [69,'开源与私有部署','Open source','MIT 协议开源，支持团队自主部署','MIT licensed, ready to self-host'],
];
const mmss=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
document.documentElement.lang=L==='zh'?'zh-CN':'en';
document.title=Z('LoopForge · 演示视频','LoopForge · Demo video');
const home='../'+(L==='en'?'?lang=en':'');
const app=document.getElementById('app');
app.innerHTML=`
<nav><div class="wrap"><a class="brand" href="${home}">${LOGO}<span>Loop<b>Forge</b></span></a><a class="back" href="${home}">← ${Z('返回首页','Home')}</a><span class="sp"></span>
<span class="lang"><button data-l="zh" class="${L==='zh'?'on':''}">ZH</button>/<button data-l="en" class="${L==='en'?'on':''}">EN</button></span>
<a class="pill gh" href="${GH}" target="_blank" rel="noopener">GitHub</a><a class="pill f" href="${GH}#readme" target="_blank" rel="noopener">${Z('自己部署','Self-host')} →</a></div></nav>
<main class="wrap">
<header class="hd rv"><h1>${Z('一分半看懂 LoopForge','LoopForge in 80 seconds')}</h1>
<p class="lede">${Z('从一句话提需求、多 Agent 云端并行开发，到提交 MR 与运行复盘的完整实录。','A full walkthrough: from a one-line requirement and parallel cloud agents to a merge request and post-run review.')}</p></header>
<section class="stage rv d1">
<figure class="fig">
<div class="win"><div class="wbar" aria-hidden="true"><i></i><i></i><i></i><span>LoopForge · ${Z('实机演示','Walkthrough')}</span><span class="r">1:20</span></div>
<div class="screen" tabindex="-1">
<video playsinline preload="metadata" poster="${POSTER}" aria-label="${Z('LoopForge 演示视频','LoopForge demo video')}"><source src="${SRC}" type="video/mp4"></video>
<button class="big" type="button" aria-label="${Z('播放','Play')}">${I.play}</button>
<button class="snd" type="button" hidden>${I.vol}<span>${Z('打开声音','Sound on')}</span></button>
<div class="ctl">
<button class="pp" type="button" aria-label="${Z('播放','Play')}">${I.play}</button>
<span class="tm"><span class="cur">0:00</span> / <span class="dur">1:20</span></span>
<div class="track" role="slider" tabindex="0" aria-label="${Z('进度','Seek')}" aria-valuemin="0" aria-valuemax="80" aria-valuenow="0"><span class="rail"></span><span class="buf"></span><span class="done"></span>${CH.map(()=>'<span class="mk"></span>').join('')}<span class="knob"></span><span class="tip"></span></div>
<button class="mu" type="button" aria-label="${Z('静音','Mute')}">${I.vol}</button>
<button class="fs" type="button" aria-label="${Z('全屏','Fullscreen')}">${I.fs}</button>
</div></div></div></figure>
<aside class="chap" aria-label="${Z('分段目录','Chapters')}"><h2><span>${Z('分段目录','CHAPTERS')}</span><span>${Z('点击跳转','click to jump')}</span></h2><ol>
${CH.map(([t,a,b,c,d],i)=>`<li><button type="button" data-i="${i}"><time>${mmss(t)}</time><strong>${Z(a,b)}</strong><small>${Z(c,d)}</small><span class="bar"><i></i></span></button></li>`).join('')}
</ol></aside>
</section>
<section class="cta"><div><h2>${Z('自己部署试试','Run it yourself')}</h2>
<p>${Z('MIT 协议开源，需要 Docker 和 Python 3。装好后第一个注册账号即为管理员，自带免 API Key 的示例流程。','MIT licensed; requires Docker and Python 3. The first registered account becomes admin, with a built-in sample flow that needs no API key.')}</p>
<div class="cmd"><code>git clone ${GH}.git</code><button type="button" class="cp">${Z('复制','Copy')}</button></div></div>
<div class="acts"><a class="pill f" href="${GH}#readme" target="_blank" rel="noopener">${Z('部署文档','Deploy guide')} →</a><a class="pill" href="${home}">${Z('返回首页','Back to home')}</a></div></section>
</main>
<footer><div class="wrap"><span>${Z('非官方社区介绍页 · 与 Tencent 无隶属关系','Unofficial community page · not affiliated with Tencent')}</span><span>LoopForge · <a href="${GH}/blob/main/LICENSE" target="_blank" rel="noopener">MIT</a></span></div></footer>`;

const $=s=>app.querySelector(s);
const v=$('video'),screen=$('.screen'),big=$('.big'),snd=$('.snd'),pp=$('.pp'),mu=$('.mu'),track=$('.track'),done=$('.track .done'),buf=$('.track .buf'),knob=$('.track .knob'),tip=$('.track .tip');
const chapBtns=[...app.querySelectorAll('.chap button')],marks=[...app.querySelectorAll('.track .mk')];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let dur=80;
const play=()=>v.play().catch(()=>{});
const toggle=()=>v.paused||v.ended?play():v.pause();
const seek=t=>{v.currentTime=Math.min(Math.max(0,t),dur-.05)};
const chapAt=t=>{let c=0;CH.forEach(([s],i)=>{if(t>=s)c=i});return t<CH[0][0]?-1:c};

function layoutMarks(){marks.forEach((m,i)=>{m.style.left=CH[i][0]/dur*100+'%'});track.setAttribute('aria-valuemax',Math.round(dur));$('.dur').textContent=mmss(dur)}
v.addEventListener('loadedmetadata',()=>{if(isFinite(v.duration))dur=v.duration;layoutMarks()});
layoutMarks();

let last=-2;
function paint(){
 const t=v.currentTime,p=t/dur*100;
 done.style.width=p+'%';knob.style.left=p+'%';
 $('.cur').textContent=mmss(t);track.setAttribute('aria-valuenow',Math.floor(t));track.setAttribute('aria-valuetext',mmss(t));
 const c=chapAt(t);
 if(c!==last){
  chapBtns.forEach((b,i)=>b.setAttribute('aria-current',i===c));last=c;
  const ol=chapBtns[0].closest('ol');
  if(c>=0&&ol.scrollHeight>ol.clientHeight){const li=chapBtns[c].parentElement;ol.scrollTo({top:li.offsetTop-ol.clientHeight/2+li.offsetHeight/2,behavior:reduced?'auto':'smooth'})}
 }
 if(c>=0){const s=CH[c][0],e=c+1<CH.length?CH[c+1][0]:dur;chapBtns[c].querySelector('.bar i').style.width=Math.min(100,(t-s)/(e-s)*100)+'%'}
}
let raf=0;
const loop=()=>{paint();raf=v.paused?0:requestAnimationFrame(loop)};
v.addEventListener('timeupdate',()=>{if(!raf)paint()});
v.addEventListener('play',()=>{screen.classList.add('playing');pp.innerHTML=I.pause;pp.setAttribute('aria-label',Z('暂停','Pause'));if(!raf)raf=requestAnimationFrame(loop);poke()});
v.addEventListener('pause',()=>{screen.classList.remove('playing','idle');pp.innerHTML=I.play;pp.setAttribute('aria-label',Z('播放','Play'))});
v.addEventListener('ended',()=>{big.innerHTML=I.replay;big.setAttribute('aria-label',Z('重新播放','Replay'))});
v.addEventListener('seeked',()=>{if(!v.ended){big.innerHTML=I.play;big.setAttribute('aria-label',Z('播放','Play'))}paint()});
v.addEventListener('progress',()=>{if(v.buffered.length)buf.style.width=v.buffered.end(v.buffered.length-1)/dur*100+'%'});
function syncVol(){const m=v.muted||v.volume===0;mu.innerHTML=m?I.mute:I.vol;mu.setAttribute('aria-label',m?Z('取消静音','Unmute'):Z('静音','Mute'));snd.hidden=!m||v.paused}
v.addEventListener('volumechange',syncVol);v.addEventListener('play',syncVol);v.addEventListener('pause',syncVol);

big.addEventListener('click',e=>{e.stopPropagation();if(v.ended)seek(0);v.muted=false;play()});
pp.addEventListener('click',e=>{e.stopPropagation();toggle()});
mu.addEventListener('click',e=>{e.stopPropagation();v.muted=!v.muted;if(!v.muted&&v.volume===0)v.volume=1});
snd.addEventListener('click',e=>{e.stopPropagation();v.muted=false;v.volume=1});
$('.fs').addEventListener('click',e=>{e.stopPropagation();if(document.fullscreenElement)document.exitFullscreen();else if(screen.requestFullscreen)screen.requestFullscreen();else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()});
screen.addEventListener('click',e=>{if(e.target.closest('.ctl'))return;toggle()});
screen.addEventListener('dblclick',e=>{if(!e.target.closest('.ctl'))$('.fs').click()});
$('.ctl').addEventListener('click',e=>e.stopPropagation());

let idleT=0;
function poke(){screen.classList.remove('idle');clearTimeout(idleT);idleT=setTimeout(()=>{if(!v.paused&&!track.classList.contains('drag'))screen.classList.add('idle')},2200)}
screen.addEventListener('pointermove',poke);screen.addEventListener('focusin',poke);

const ratio=e=>{const r=track.getBoundingClientRect();return Math.min(1,Math.max(0,(e.clientX-r.left)/r.width))};
function hover(e){const x=ratio(e),t=x*dur,c=chapAt(t);tip.style.left=x*100+'%';tip.textContent=mmss(t)+(c>=0?' · '+Z(CH[c][1],CH[c][2]):'')}
track.addEventListener('pointermove',e=>{hover(e);if(track.classList.contains('drag'))seek(ratio(e)*dur)});
track.addEventListener('pointerdown',e=>{track.setPointerCapture(e.pointerId);track.classList.add('drag');hover(e);seek(ratio(e)*dur)});
const up=()=>{track.classList.remove('drag');poke()};
track.addEventListener('pointerup',up);track.addEventListener('pointercancel',up);
track.addEventListener('keydown',e=>{const k={ArrowLeft:-5,ArrowRight:5,ArrowDown:-10,ArrowUp:10}[e.key];if(k){e.preventDefault();e.stopPropagation();seek(v.currentTime+k)}else if(e.key==='Home'){e.preventDefault();seek(0)}else if(e.key==='End'){e.preventDefault();seek(dur)}});

chapBtns.forEach((b,i)=>b.addEventListener('click',()=>{seek(CH[i][0]);play();if(innerWidth<=1100)screen.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'})}));

document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))return;
 const onBtn=e.target.tagName==='BUTTON'||e.target.tagName==='A';
 if((e.key===' '&&!onBtn)||e.key==='k'){e.preventDefault();toggle()}
 else if(e.key==='ArrowLeft'&&e.target!==track){seek(v.currentTime-5)}
 else if(e.key==='ArrowRight'&&e.target!==track){seek(v.currentTime+5)}
 else if(e.key==='m'){v.muted=!v.muted}
 else if(e.key==='f'){$('.fs').click()}
 else if(/^[1-9]$/.test(e.key)){seek(CH[+e.key-1][0]);play()}
});

const fit=()=>{const h=$('.win').offsetHeight;$('.chap').style.setProperty('--chap-h',Math.max(320,h-34)+'px')};
new ResizeObserver(fit).observe($('.win'));

$('.cp').addEventListener('click',e=>{const b=e.currentTarget;navigator.clipboard?.writeText($('.cmd code').textContent).then(()=>{b.textContent=Z('已复制','Copied');setTimeout(()=>b.textContent=Z('复制','Copy'),1600)},()=>{})});
app.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('lf-lang',b.dataset.l);const u=new URL(location);u.searchParams.set('lang',b.dataset.l);location.replace(u)}));

// Muted autoplay so the page opens on a moving scene; sound is one click away.
if(!reduced){v.muted=true;play()}
})();
