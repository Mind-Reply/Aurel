function clean(value, max = 2000) { if (typeof value !== "string") return ""; return value.slice(0, max).replace(/[<>]/g, ""); }
export async function onRequestPost(context) {
  try {
    if (!context.env.UNIVERSE_DB) return Response.json({ ok:false, status:"NEEDS_D1_BINDING", message:"Cloud database binding required before official lead save." }, {status:503});
    const body = await context.request.json(); const id = crypto.randomUUID(); const created = new Date().toISOString();
    await context.env.UNIVERSE_DB.prepare("INSERT INTO intakes (id, brand, name, email, company, problem, budget, consent, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)").bind(id, clean(body.brand,120), clean(body.name,200), clean(body.email,300), clean(body.company,200), clean(body.problem,2000), clean(body.budget,100), clean(String(body.consent),20), created).run();
    return Response.json({ ok:true, id, status:"SAVED_TO_D1" });
  } catch(e) { return Response.json({ ok:false, status:"SAFE_ERROR", message:"Lead save failed safely.", private_details:"hidden" }, {status:500}); }
}
