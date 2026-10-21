import json,re,shutil,pathlib,argparse
parser=argparse.ArgumentParser(description='Package the upstream Web UI and sanitised local recordings; no model credentials are needed.')
parser.add_argument('--source',required=True,type=pathlib.Path,help='Path to the upstream web directory')
parser.add_argument('--capture',required=True,type=pathlib.Path,help='Directory containing rec-zh.json, rec-extra.json and rec-final.json')
args=parser.parse_args()
root=pathlib.Path(__file__).resolve().parent
src=args.source
cap=args.capture
out=root/'demo'
out.mkdir(exist_ok=True)
for p in src.iterdir():
    if p.is_file() and p.suffix in ('.js','.css','.ico','.png') and '_test' not in p.name and '.test.' not in p.name:
        shutil.copy2(p,out/p.name)
for name in ['app','images','mcp-icons']:
    shutil.copytree(src/name,out/name,dirs_exist_ok=True)
# Only URL-like quoted root paths are relocated; /api is handled in-memory by replay.js.
for p in list(out.glob('*.js'))+list((out/'app').glob('*.js')):
    s=p.read_text()
    s=re.sub(r'([\'"`])/(images|mcp-icons|monaco|vscode-web)(/)',r'\1/demo/\2\3',s)
    s=re.sub(r'`/api/auth/photo/[^`]+`',"'/demo/favicon.png'",s)
    if p.name=='app.js' and p.parent==out:
        s=s.replace('  restoreRequirementComposer();','  restoreRequirementComposer();\n  document.getElementById(\'previewLoading\')?.remove();',1)
    p.write_text(s)
s=(src/'index.html').read_text()
s=re.sub(r'((?:src|href)=[\'"])/(?!(?:api)/)',r'\1/demo/',s)
s=s.replace('<script src="/demo/boot.js">','<script src="/demo/recordings.js"></script><script src="/demo/replay.js"></script><link rel="stylesheet" href="/demo/replay.css"><script src="/demo/boot.js">')
s=s.replace('<head>','<head>\n<meta name="referrer" content="no-referrer">\n<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\' \'unsafe-inline\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: blob:; connect-src \'self\'; font-src \'self\' data:; object-src \'none\'; base-uri \'self\'; form-action \'none\'">')
s=s.replace('<script src=','<script defer src=')
s=s.replace('<body>','<body>\n  <div id="previewLoading" role="status" aria-live="polite"><div><span class="preview-spinner" aria-hidden="true"></span><h1>正在打开 LoopForge 平台</h1><p>加载真实界面与录制数据，无需登录或 API Key。</p><p id="previewLoadingHelp" hidden>加载时间较长，请检查网络后刷新，或<a href="/">返回首页</a>。</p></div></div>',1)
(out/'index.html').write_text(s)
records=[]
for name in ['rec-zh.json','rec-extra.json','rec-final.json']:
    records+=json.loads((cap/name).read_text())
# Keep only GET responses: login mutation and its password must never be published.
data={}
for r in records:
    if r['method']!='GET' or r['status']!=200 or r['body'] is None or '/stream' in r['path'] or '/auth/photo/' in r['path']:continue
    try: body=json.loads(r['body'])
    except ValueError: body=r['body']
    data[r['path']+r['search']]=body
# Sanitise runtime identities/host paths; the recording instance contains only demo data and no model/Git credentials.
def clean(o):
    if isinstance(o,list):return [clean(v) for v in o]
    if not isinstance(o,dict):
        if isinstance(o,str):o=o.replace('/data/workspace/lf-demo-record','/demo-workspace').replace('http://127.0.0.1:8097','https://loopforge.cn/demo')
        return o
    result={}
    for k,v in o.items():
        if any(x in k.lower() for x in ['password','secret','apikey','access_token','refresh_token']):continue
        if k in ['ownerInstanceId','workspaceHost','avatarUrl','email']:result[k]='';continue
        result[k]=clean(v)
    return result
data=clean(data)
# Match by pathname when dynamic pagination/search params differ.
for k,v in list(data.items()):
    if '?' in k:data.setdefault(k.split('?')[0],v)
# auth/current contains return_url in the recording
cur=next(v for k,v in data.items() if k.startswith('/api/auth/current'))
data['/api/auth/current']=cur
runs=data.get('/api/runs',[])
waiting=next(r for r in runs if r['status']=='waiting')
complete=next(r for r in runs if r['status']=='succeeded')
meta={'source':'Tencent/LoopForge','sourceCommit':'91f2b42','recordedAt':'2026-10-21','waitingRunId':waiting['id'],'completedRunId':complete['id']}
(out/'recordings.js').write_text('window.LF_RECORDINGS='+json.dumps({'meta':meta,'responses':data},ensure_ascii=False,separators=(',',':'))+';\n')
print('Packaged',len(data),'recorded endpoints;',meta)
