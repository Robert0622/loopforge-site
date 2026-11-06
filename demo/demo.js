(function(){
'use strict';
const qs=new URLSearchParams(location.search);
let L=qs.get('lang')||localStorage.getItem('lf-lang')||((navigator.language||'').startsWith('zh')?'zh':'en');if(L!=='zh'&&L!=='en')L='zh';
const Z=(a,b)=>L==='zh'?a:b;
const XU='https://x.com/loopforgege',SRC='media/loopforge-promo.mp4?v=12',POSTER='media/loopforge-promo.jpg?v=12',GH='https://github.com/Tencent/LoopForge';
let lgN=0;
const LOGO=()=>{const g='lfg'+(++lgN);return `<svg viewBox="12 12 88 88" fill="none" aria-hidden="true"><defs><linearGradient id="${g}" x1="19" y1="20" x2="93" y2="93" gradientUnits="userSpaceOnUse"><stop stop-color="#008DCC"/><stop offset=".48" stop-color="#526CE8"/><stop offset="1" stop-color="#8A4ED9"/></linearGradient></defs><path class="lgp" pathLength="100" d="M53 72C53 59 63 52.5 73 52.5S93 59 93 72 83 91.5 73 91.5 53 85 53 72V40C53 27 44.5 20.5 36 20.5S19 27 19 40" stroke="url(#${g})" stroke-width="7.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`};
const I={
 play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
 pause:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>',
 vol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
 mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z" fill="currentColor"/><path d="m16 9 5 6M21 9l-5 6"/></svg>',
 fs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
 arrow:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 copy:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9h11v11H9zM5 15V4h11"/></svg>',
 check:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5l4.5 4.5 10.5-10.5"/></svg>',
 term:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v14H4zM7.5 9.5 10 12l-2.5 2.5M12.5 15h4"/></svg>',
 film:'<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0zM10 8.5v7l5.5-3.5z"/></svg>',
 gh:'<svg class="mk" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
 x:'<svg class="mk" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>',
 star:'<svg viewBox="0 0 800 800" fill="currentColor" aria-hidden="true"><path d="M305.105 180.279C347.327 104.538 368.437 66.6667 400 66.6667C431.563 66.6667 452.673 104.537 494.893 180.279L505.817 199.874C517.817 221.398 523.813 232.16 533.17 239.26C542.523 246.361 554.17 248.997 577.47 254.268L598.683 259.068C680.67 277.619 721.667 286.894 731.42 318.258C741.173 349.62 713.227 382.303 657.33 447.663L642.87 464.573C626.987 483.147 619.043 492.433 615.47 503.923C611.9 515.413 613.1 527.803 615.5 552.587L617.687 575.147C626.137 662.353 630.363 705.957 604.83 725.34C579.293 744.723 540.91 727.05 464.143 691.707L444.283 682.56C422.47 672.517 411.563 667.493 400 667.493C388.437 667.493 377.53 672.517 355.717 682.56L335.857 691.707C259.089 727.05 220.706 744.723 195.172 725.34C169.637 705.957 173.863 662.353 182.313 575.147L184.499 552.587C186.901 527.803 188.102 515.413 184.529 503.923C180.956 492.433 173.014 483.147 157.131 464.573L142.67 447.663C86.7749 382.303 58.8272 349.62 68.5806 318.258C78.3339 286.894 119.329 277.619 201.318 259.068L222.53 254.268C245.828 248.997 257.478 246.361 266.831 239.26C276.185 232.16 282.184 221.398 294.182 199.874L305.105 180.279Z"/></svg>',
 spk:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5L12 0z"/></svg>',
 replay:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 4v4h4"/></svg>',
};
// Start times match the title cards in the video.
const CH=[
 [2.8,'一句话提需求','Prompt a task','选好权限，输入需求，自动编排出 SOP','Type the task and get an SOP to run'],
 [11.5,'失败自动重跑','Auto retry','验收没过就打回上游节点，重跑后通过','Failed checks go back upstream and rerun'],
 [16.5,'多 Agent 并行','Parallel agents','前端、后端、测试各有隔离工作区','Frontend, backend, tests, each isolated'],
 [22.2,'人工确认，交付 PR','Sign-off to PR','关键节点人来确认，跑完提交 PR','A person approves key steps, then a PR'],
 [30.4,'合上电脑照样跑','Runs overnight','4 个任务在云端跑一夜，早上收到 PR','Four tasks run overnight; PRs by morning'],
 [38,'团队共用会话','Shared session','产品、设计、研发在一个会话里提要求','Product, design and dev ask in one thread'],
 [44.9,'SOP 与执行引擎','SOPs & engines','流程写成 SOP，执行引擎随时切换','Process as SOPs; swap the coding agent'],
 [51.6,'自动修 Bug','Bugs fix themselves','定时拉取 GitHub Issues，修完提 PR','Pulls GitHub Issues and opens PRs'],
 [60.4,'评测与复盘','Score and improve','给每次运行打分，改进建议一键写回 SOP','Runs get scored; fixes go into the SOP'],
 [72.5,'开源部署','Open source','MIT 协议，clone 后跑一个安装脚本','MIT licensed; clone and run one install script'],
];
const mmss=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const nn=i=>String(i+1).padStart(2,'0');
document.documentElement.lang=L==='zh'?'zh-CN':'en';
document.title=Z('LoopForge · 演示视频','LoopForge · Demo video');
const home='../'+(L==='en'?'?lang=en':'');
const app=document.getElementById('app');
app.innerHTML=`
<header class="nav"><div class="nbar"><a class="brand" href="${home}">${LOGO()}<span>LoopForge</span></a><a class="back" href="${home}"><span class="ar">${I.arrow}</span>${Z('返回首页','Home')}</a><span class="sp"></span>
<span class="lang"><button data-l="zh" class="${L==='zh'?'on':''}">${Z('中','ZH')}</button><button data-l="en" class="${L==='en'?'on':''}">EN</button></span>
<a class="ghs" href="${GH}" target="_blank" rel="noopener" aria-label="GitHub"><span class="gsw"><span class="g1">${I.gh}</span><span class="g2">${I.star}</span><i class="sk s1">${I.spk}</i><i class="sk s2">${I.spk}</i></span><span class="gtx">GitHub</span><span class="gct" hidden></span></a><a class="btn-k sm" href="#deploy">${Z('快速部署','Self-host')}<span class="ar">${I.arrow}</span></a></div></header>
<main>
<section class="hd wrap"><span class="kick rv"><i class="led"></i>${Z('实机演示 · 1 分 20 秒','Walkthrough · 1:20')}</span>
<h1 class="h rv d1">${Z('<em>80 秒</em>，看一个需求怎么走到 PR','From request to PR in <em>80 seconds</em>')}</h1>
<p class="sub rv d2">${Z('一句话提需求，多个 Agent 在云端并行开发，验收不过自动打回重跑，最后提交 PR，并给这次运行打分。','One line of request, agents building in parallel in the cloud, failed checks sent back and rerun, then a pull request and a score for the run.')}</p></section>
<section class="stage wrap rv d3">
<div class="screen" tabindex="-1">
<video playsinline preload="metadata" poster="${POSTER}" aria-label="${Z('LoopForge 演示视频','LoopForge demo video')}"><source src="${SRC}" type="video/mp4"></video>
<span class="now" aria-live="polite"><b></b><span></span></span>
<button class="big" type="button" aria-label="${Z('播放','Play')}">${I.play}</button>
<button class="snd" type="button" hidden>${I.vol}<span>${Z('打开声音','Sound on')}</span></button>
<div class="ctl">
<button class="pp" type="button" aria-label="${Z('播放','Play')}">${I.play}</button>
<span class="tm"><span class="cur">0:00</span> / <span class="dur">1:20</span></span>
<div class="track" role="slider" tabindex="0" aria-label="${Z('进度','Seek')}" aria-valuemin="0" aria-valuemax="80" aria-valuenow="0"><span class="rail"></span><span class="buf"></span><span class="done"></span>${CH.map(()=>'<span class="mk"></span>').join('')}<span class="knob"></span><span class="tip"></span></div>
<button class="mu" type="button" aria-label="${Z('静音','Mute')}">${I.vol}</button>
<button class="fs" type="button" aria-label="${Z('全屏','Fullscreen')}">${I.fs}</button>
</div></div></section>
<section class="chap wrap" aria-label="${Z('分段目录','Chapters')}"><div class="chh"><span class="kick">${I.film}${Z('分段目录','Chapters')}</span><span class="hint">${Z('点击跳转 · 数字键 1–0 也可以','Click to jump · or press 1–0')}</span></div><ol>
${CH.map(([t,a,b,c,d],i)=>`<li class="rv" data-d="${i}"><button type="button" data-i="${i}"><span class="ct"><b>${nn(i)}</b><time>${mmss(t)}</time></span><strong>${Z(a,b)}</strong><small>${Z(c,d)}</small><span class="bar"><i></i></span></button></li>`).join('')}
</ol></section>
<section class="fin wrap" id="deploy"><span class="fl">${LOGO()}</span><h2 class="h">${Z('看完了，<em>自己部署</em>跑一遍','Now <em>run it yourself</em>')}</h2>
<p class="sub">${Z('MIT 协议开源，需要 Docker 和 Python 3。','MIT licensed; requires Docker and Python 3.')}</p>
<div class="ibox"><div class="ibh"><i></i><i></i><i></i><span>bash</span><span class="sp"></span><button type="button" class="cp">${I.copy}<span>${Z('复制','Copy')}</span></button></div>
<div class="row"><span>$</span><code>git clone ${GH}.git && cd LoopForge</code></div><div class="row"><span>$</span><code>bash scripts/install.sh</code></div></div>
<div class="cta"><a class="btn-k" href="${GH}#readme" target="_blank" rel="noopener">${Z('部署文档','Deploy guide')}<span class="ar">${I.arrow}</span></a><a class="btn-t" href="${home}">${Z('回到首页','Back to home')}<span class="ar">${I.arrow}</span></a></div></section>
</main>
<footer class="ft"><a class="brand" href="${home}">${LOGO()}<span>LoopForge</span></a><span>${Z('LoopForge 由腾讯开源，遵循 MIT 协议','LoopForge is open-sourced by Tencent under the MIT License')} · <a href="${GH}" target="_blank" rel="noopener">github.com/Tencent/LoopForge</a> · <a href="${XU}" target="_blank" rel="noopener">x.com/loopforgege</a></span></footer>`;
app.querySelectorAll('.chap li').forEach(li=>li.style.setProperty('--d',li.dataset.d));

const $=s=>app.querySelector(s);
const v=$('video'),screen=$('.screen'),big=$('.big'),snd=$('.snd'),pp=$('.pp'),mu=$('.mu'),track=$('.track'),done=$('.track .done'),buf=$('.track .buf'),knob=$('.track .knob'),tip=$('.track .tip');
const nowEl=$('.now'),chapBtns=[...app.querySelectorAll('.chap button')],marks=[...app.querySelectorAll('.track .mk')];
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
  chapBtns.forEach((b,i)=>{b.setAttribute('aria-current',i===c);if(i!==c)b.querySelector('.bar i').style.width='0'});last=c;
  nowEl.classList.remove('on');if(c>=0){nowEl.firstChild.textContent=nn(c)+' / '+CH.length;nowEl.lastChild.textContent=Z(CH[c][1],CH[c][2]);void nowEl.offsetWidth;nowEl.classList.add('on')}
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

chapBtns.forEach((b,i)=>b.addEventListener('click',()=>{seek(CH[i][0]);play();const r=screen.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)screen.scrollIntoView({behavior:reduced?'auto':'smooth',block:'center'})}));

document.addEventListener('keydown',e=>{
 if(e.ctrlKey||e.metaKey||e.altKey||/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))return;
 const onBtn=e.target.tagName==='BUTTON'||e.target.tagName==='A';
 if((e.key===' '&&!onBtn)||e.key==='k'){e.preventDefault();toggle()}
 else if(e.key==='ArrowLeft'&&e.target!==track){seek(v.currentTime-5)}
 else if(e.key==='ArrowRight'&&e.target!==track){seek(v.currentTime+5)}
 else if(e.key==='m'){v.muted=!v.muted}
 else if(e.key==='f'){$('.fs').click()}
 else if(/^[0-9]$/.test(e.key)){const c=CH[(+e.key+9)%10];if(c){seek(c[0]);play()}}
});


$('.cp').addEventListener('click',e=>{const b=e.currentTarget,txt=[...app.querySelectorAll('.ibox code')].map(c=>c.textContent).join('\n');navigator.clipboard?.writeText(txt).then(()=>{b.classList.add('ok');b.innerHTML=I.check+'<span>'+Z('已复制','Copied')+'</span>';clearTimeout(b._t);b._t=setTimeout(()=>{b.classList.remove('ok');b.innerHTML=I.copy+'<span>'+Z('复制','Copy')+'</span>'},1600)},()=>{})});
try{const c=JSON.parse(localStorage.getItem('lf-stars')||'null');if(c&&typeof c.n==='number'){const e=$('.ghs .gct');e.textContent=c.n>=1e4?(c.n/1e3).toFixed(1)+'k':c.n.toLocaleString('en-US');e.hidden=false}}catch(e){}
const nav=$('.nav'),onSc=()=>nav.classList.toggle('sc',scrollY>8);addEventListener('scroll',onSc,{passive:true});onSc();
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -10% 0px'});
app.querySelectorAll('.chap,.fin').forEach(el=>io.observe(el));
app.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>{localStorage.setItem('lf-lang',b.dataset.l);const u=new URL(location);u.searchParams.set('lang',b.dataset.l);location.replace(u)}));

// Muted autoplay so the page opens on a moving scene; sound is one click away.
if(!reduced){v.muted=true;play()}
})();
