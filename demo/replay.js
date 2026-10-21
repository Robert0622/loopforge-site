(() => {
  'use strict';
  const {meta,responses}=window.LF_RECORDINGS;
  const originalFetch=window.fetch.bind(window);
  let approved=false;
  const clone=v=>JSON.parse(JSON.stringify(v));
  const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json'}});
  const msg=()=>document.documentElement.dataset.lang==='en'?'Recorded preview: this action requires a self-hosted instance. Do not enter credentials here.':'录制预览：此操作需在自部署实例中使用，请勿在这里输入凭据。';
  function lookup(path,search){return responses[path+search]??responses[path]}
  function completedWaiting(){
    const r=clone(responses['/api/runs/'+meta.completedRunId]);
    const waiting=responses['/api/runs/'+meta.waitingRunId];
    r.id=meta.waitingRunId;r.input=clone(waiting.input);return r;
  }
  window.fetch=async(input,options={})=>{
    const u=new URL(typeof input==='string'?input:input.url,location.href);
    const method=(options.method||(input instanceof Request?input.method:'GET')).toUpperCase();
    if(u.origin!==location.origin)return json({error:msg()},403);
    if(!u.pathname.startsWith('/api/')){
      if(method!=='GET'||!u.pathname.startsWith('/demo/'))return json({error:msg()},403);
      return originalFetch(input,options);
    }
    const path=u.pathname;
    if(method!=='GET'){
      // The only writable path is an in-memory transition between two real recorded states.
      if(method==='POST'&&path==='/api/runs/'+meta.waitingRunId+'/approve'){
        approved=true;setTimeout(()=>{if(typeof showRunDetail==='function')showRunDetail(meta.waitingRunId)},100);return json({ok:true});
      }
      return json({error:msg()},403);
    }
    if(path==='/api/runs'&&approved){const rs=clone(responses[path]);return json(rs.map(r=>r.id===meta.waitingRunId?completedWaiting():r))}
    if(path==='/api/runs/'+meta.waitingRunId&&approved)return json(completedWaiting());
    if(path==='/api/auth/current')return json(clone(responses[path]));
    if(path.startsWith('/api/auth/photo/'))return new Response('',{status:404});
    const found=lookup(path,u.search);
    if(found!==undefined){
      if(typeof found==='string')return new Response(found,{headers:{'Content-Type':'text/plain;charset=utf-8'}});
      return json(clone(found));
    }
    if(path.includes('/artifacts/')){
      const id=path.split('/artifacts/')[1];
      const content=Object.entries(responses).find(([k,v])=>k.endsWith('/artifacts/'+id));
      if(content)return new Response(content[1],{headers:{'Content-Type':'text/plain;charset=utf-8'}});
    }
    console.info('[recorded preview] endpoint not captured:',path);
    return json({error:'此页面尚未录制 / This endpoint is not recorded'},404);
  };
  // No live SSE or backend connection is made. Real detail GET responses remain available.
  class RecordedEventSource extends EventTarget{
    static CONNECTING=0;static OPEN=1;static CLOSED=2;
    constructor(url){super();this.url=url;this.readyState=1;setTimeout(()=>this.dispatchEvent(new Event('open')),0)}
    close(){this.readyState=2}
  }
  window.EventSource=RecordedEventSource;
  window.WebSocket=class{constructor(){throw new Error(msg())}};
  navigator.sendBeacon=()=>false;
  // Neutralise credential and file-upload inputs in the real UI. No form may submit to the network.
  document.addEventListener('submit',e=>{e.preventDefault()},true);
  document.addEventListener('DOMContentLoaded',()=>{
    const en=new URLSearchParams(location.search).get('lang')==='en';
    if(en)localStorage.setItem('loopforge.lang','en');
    const bar=document.createElement('div');bar.id='recordedPreviewBar';
    bar.innerHTML='<b>LoopForge 平台真实前端 · 录制预览</b><span>来自开源项目的真实界面和本地运行记录；无需 API Key，不运行模型或脚本。</span><a href="#/sops">SOP 流程</a><a href="#/flow/demo-issue-fix-production">流程设计器</a><a href="#/runs/'+meta.waitingRunId+'">审批演示</a><a href="#/runs/'+meta.completedRunId+'">已完成运行</a><a href="https://github.com/Tencent/LoopForge" target="_blank" rel="noopener noreferrer">自己部署 ↗</a>';
    document.body.prepend(bar);
    const protect=()=>document.querySelectorAll('input[type=password],input[type=file]').forEach(e=>{e.disabled=true;if(e.type==='password'){e.value='';e.placeholder='录制预览不接收凭据 / No credentials in preview'}});
    protect();new MutationObserver(protect).observe(document.body,{childList:true,subtree:true});
  });
  if(!location.hash)location.hash='#/sops';
  window.LF_PREVIEW={meta,reset(){approved=false;location.reload()}};
})();
