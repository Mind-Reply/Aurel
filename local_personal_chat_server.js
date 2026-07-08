const http = require('http');
const fs = require('fs');
const path = require('path');
function loadEnv(){
  const p=path.join(process.cwd(),'.env');
  if(!fs.existsSync(p)) return;
  for(const line of fs.readFileSync(p,'utf8').split(/\r?\n/)){
    const m=line.match(/^([A-Z0-9_]+)=(.*)$/); if(m && !process.env[m[1]]) process.env[m[1]]=m[2].replace(/^['"]|['"]$/g,'');
  }
}
loadEnv();
async function callModel(prompt){
  const key=process.env.XAI_API_KEY || process.env.GROK_API_KEY || process.env.OPENAI_API_KEY;
  if(!key) return {ok:false,status:'NO_LOCAL_MODEL_KEY',message:'Add XAI_API_KEY/GROK_API_KEY or OPENAI_API_KEY to local .env. Do not publish it.'};
  const isXai=!!(process.env.XAI_API_KEY || process.env.GROK_API_KEY);
  const url=isXai?'https://api.x.ai/v1/chat/completions':'https://api.openai.com/v1/chat/completions';
  const model=isXai?(process.env.XAI_MODEL||'grok-4.3'):(process.env.OPENAI_MODEL||'gpt-4.1-mini');
  const r=await fetch(url,{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model,messages:[{role:'system',content:'Private brand operator. Short, direct, practical.'},{role:'user',content:prompt}]})});
  return {ok:r.ok,provider:isXai?'xai':'openai',model,data:await r.json()};
}
const server=http.createServer(async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Access-Control-Allow-Headers','content-type');
  if(req.method==='OPTIONS'){res.end();return}
  if(req.url==='/api/chat' && req.method==='POST'){
    let body=''; req.on('data',c=>body+=c); req.on('end',async()=>{try{const j=JSON.parse(body||'{}'); const out=await callModel(String(j.prompt||'')); res.setHeader('content-type','application/json'); res.end(JSON.stringify(out,null,2));}catch(e){res.statusCode=500;res.end(JSON.stringify({ok:false,error:'local server error'}));}}); return;
  }
  res.setHeader('content-type','text/plain'); res.end('Local personal chat server running. POST /api/chat');
});
server.listen(8787,()=>console.log('Local personal chat server: http://localhost:8787/api/chat'));
