/*! A11-K / Mind-Reply CS Widget | Owner private */
(function () {
  if (window.__MR_CS_LOADED__) return;
  window.__MR_CS_LOADED__ = true;
  var script = document.currentScript;
  var BRAND = (script && script.getAttribute("data-brand")) || "a11-k";
  var ACCENT = (script && script.getAttribute("data-accent")) || "#C9A96E";
  var TITLE = (script && script.getAttribute("data-title")) || "Concierge · 24/7";
  var API = (script && script.getAttribute("data-api")) || "";

  var copy = {
    title: TITLE,
    online: "Online · replies instantly",
    placeholder: "Ask anything…",
    send: "Send",
    welcome: "Welcome. I'm your 24/7 concierge. How can I help?",
    suggestions: ["What do you offer?", "Pricing & access", "Book a consultation", "Technical support", "Talk to a human"]
  };

  function replyFor(text) {
    var t = (text || "").toLowerCase();
    if (/price|pricing|cost|budget/.test(t)) return "Access is tailored. Share your use case and I'll route the right next step.";
    if (/book|consult|call|meeting/.test(t)) return "Perfect. Leave your email and goal — we'll arrange a private consultation.";
    if (/support|bug|error|issue|down|broken/.test(t)) return "Describe the issue (site, page, what failed). I'll triage immediately.";
    if (/human|person|owner|agent/.test(t)) return "Connecting you to the owner team queue. Please share contact + urgency.";
    if (/offer|what|product|service|aurel|wifi|connect/.test(t)) {
      if (BRAND === "aurel") return "AUREL designs invisible premium connectivity for luxury homes, boutique hospitality, and executive spaces. Reliability before hype.";
      return "We help with premium digital systems, connectivity, and owner-grade support. Tell me what you need.";
    }
    return "Got it. Share a bit more detail and I'll give you a precise next step.";
  }

  function css() {
    return "#mr-cs-root{all:initial;font-family:Inter,system-ui,sans-serif}#mr-cs-root *{box-sizing:border-box}"
      + "#mr-cs-btn{position:fixed;right:20px;bottom:20px;z-index:2147483000;border:0;border-radius:999px;padding:14px 18px;background:linear-gradient(135deg," + ACCENT + ",#E8D5B0);color:#111;font-weight:800;cursor:pointer;box-shadow:0 16px 40px rgba(0,0,0,.35)}"
      + "#mr-cs-panel{position:fixed;right:20px;bottom:84px;width:min(380px,calc(100vw - 24px));height:min(560px,calc(100vh - 120px));z-index:2147483000;display:none;flex-direction:column;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,#0b0b0b,#070707);color:#F0EDE8;box-shadow:0 30px 80px rgba(0,0,0,.5)}"
      + "#mr-cs-panel.open{display:flex}#mr-cs-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center}"
      + "#mr-cs-head strong{display:block;font-size:14px}#mr-cs-head span{display:block;font-size:11px;color:#9aa7bd;margin-top:2px}"
      + "#mr-cs-close{background:transparent;border:0;color:#9aa7bd;font-size:18px;cursor:pointer}"
      + "#mr-cs-msgs{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px}"
      + ".mr-msg{max-width:88%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.45}"
      + ".mr-bot{align-self:flex-start;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08)}"
      + ".mr-user{align-self:flex-end;background:rgba(201,169,110,.18);border:1px solid rgba(201,169,110,.35)}"
      + "#mr-cs-sugs{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px}"
      + "#mr-cs-sugs button{border:1px solid rgba(201,169,110,.28);background:rgba(201,169,110,.08);color:#E8D5B0;border-radius:999px;padding:7px 10px;font-size:11px;cursor:pointer}"
      + "#mr-cs-form{display:flex;gap:8px;padding:12px;border-top:1px solid rgba(255,255,255,.1)}"
      + "#mr-cs-input{flex:1;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:#050505;color:#F0EDE8;padding:11px 12px;font:inherit}"
      + "#mr-cs-send{border:0;border-radius:12px;padding:0 14px;background:linear-gradient(135deg," + ACCENT + ",#E8D5B0);color:#111;font-weight:800;cursor:pointer}"
      + "#mr-cs-meta{padding:0 14px 10px;font-size:10px;color:#6f7b90}";
  }

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  function addMsg(box, role, text) {
    var m = el("div", { class: "mr-msg " + (role === "user" ? "mr-user" : "mr-bot") });
    m.textContent = text;
    box.appendChild(m);
    box.scrollTop = box.scrollHeight;
  }

  function boot() {
    var root = el("div", { id: "mr-cs-root" });
    var style = el("style");
    style.textContent = css();
    var btn = el("button", { id: "mr-cs-btn", type: "button" }, "Chat");
    var panel = el("div", { id: "mr-cs-panel" });
    panel.innerHTML = ""
      + "<div id='mr-cs-head'><div><strong></strong><span></span></div><button id='mr-cs-close' type='button' aria-label='Close'>×</button></div>"
      + "<div id='mr-cs-msgs'></div><div id='mr-cs-sugs'></div>"
      + "<form id='mr-cs-form'><input id='mr-cs-input' autocomplete='off' /><button id='mr-cs-send' type='submit'>Send</button></form>"
      + "<div id='mr-cs-meta'></div>";
    root.appendChild(style);
    root.appendChild(btn);
    root.appendChild(panel);
    document.body.appendChild(root);

    panel.querySelector("#mr-cs-head strong").textContent = copy.title;
    panel.querySelector("#mr-cs-head span").textContent = copy.online;
    panel.querySelector("#mr-cs-input").setAttribute("placeholder", copy.placeholder);
    panel.querySelector("#mr-cs-send").textContent = copy.send;
    panel.querySelector("#mr-cs-meta").textContent = BRAND.toUpperCase() + " · customer service";

    var msgs = panel.querySelector("#mr-cs-msgs");
    var sugs = panel.querySelector("#mr-cs-sugs");
    addMsg(msgs, "bot", copy.welcome);
    copy.suggestions.forEach(function (s) {
      var b = el("button", { type: "button" });
      b.textContent = s;
      b.onclick = function () { send(s); };
      sugs.appendChild(b);
    });

    function send(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg(msgs, "user", text);
      panel.querySelector("#mr-cs-input").value = "";
      if (API) {
        addMsg(msgs, "bot", "…");
        fetch(API, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ message: text, brand: BRAND, mode: "customer_support" })
        }).then(function (r) { return r.json().catch(function(){return null;}); })
          .then(function (data) {
            msgs.lastChild.textContent = (data && (data.reply || data.message || data.answer)) || replyFor(text);
          }).catch(function () {
            msgs.lastChild.textContent = replyFor(text);
          });
      } else {
        addMsg(msgs, "bot", replyFor(text));
      }
    }

    btn.onclick = function () { panel.classList.toggle("open"); };
    panel.querySelector("#mr-cs-close").onclick = function () { panel.classList.remove("open"); };
    panel.querySelector("#mr-cs-form").onsubmit = function (e) {
      e.preventDefault();
      send(panel.querySelector("#mr-cs-input").value);
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();