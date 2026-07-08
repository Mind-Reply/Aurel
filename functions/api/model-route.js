export async function onRequestPost(context){
 const env=context.env||{}; const body=await context.request.json().catch(()=>({})); const prompt=String(body.prompt||'').slice(0,10000); const wanted=body.provider||'auto'; if(!prompt)return Response.json({ok:false,error:'Missing prompt'},{status:400});
 const providers=[
  {name:'anthropic',key:env.ANTHROPIC_API_KEY,url:'https://api.anthropic.com/v1/messages',model:env.ANTHROPIC_MODEL||'claude-opus-4-8'},
  {name:'xai',key:env.XAI_API_KEY||env.GROK_API_KEY,url:'https://api.x.ai/v1/chat/completions',model:env.XAI_MODEL||'grok-4.3'},
  {name:'openai',key:env.OPENAI_API_KEY,url:'https://api.openai.com/v1/chat/completions',model:env.OPENAI_MODEL||'gpt-4.1-mini'}];
 const selected=providers.find(p=>(wanted==='auto'||wanted===p.name)&&p.key); if(!selected)return Response.json({ok:false,status:'NO_MODEL_KEY_BOUND',message:'Bind ANTHROPIC_API_KEY, XAI_API_KEY/GROK_API_KEY, or OPENAI_API_KEY in protected environment.'},{status:503});
 let r; if(selected.name==='anthropic'){r=await fetch(selected.url,{method:'POST',headers:{'x-api-key':selected.key,'anthropic-version':'2023-06-01','content-type':'application/json'},body:JSON.stringify({model:selected.model,max_tokens:1200,messages:[{role:'user',content:prompt}]})});}
 else{r=await fetch(selected.url,{method:'POST',headers:{authorization:`Bearer ${selected.key}`,'content-type':'application/json'},body:JSON.stringify({model:selected.model,messages:[{role:'system',content:'Private operator. Short, sharp, useful.'},{role:'user',content:prompt}]})});}
 return Response.json({ok:r.ok,provider:selected.name,model:selected.model,data:await r.json()});}
