const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const INTERESTS=["Coding","Cricket","Music","Photography","Startups","Football","Anime","Gaming","Dance","Reading"];
const PEOPLE=[
{n:"Aarav",b:"CSE · 2nd yr",i:["Coding","Startups","Gaming","Anime"]},
{n:"Riya",b:"ECE · 3rd yr",i:["Music","Photography","Dance","Reading"]},
{n:"Kabir",b:"Mech · 2nd yr",i:["Cricket","Football","Gaming","Photography"]},
{n:"Meera",b:"IT · 1st yr",i:["Coding","Reading","Music","Startups"]}];
const EVENTS=[{n:"Tech Fest 2026",d:"Oct 18 · Main Auditorium",c:12},{n:"Open Mic Night",d:"Oct 22 · Amphitheatre",c:7},{n:"Hackathon 24h",d:"Nov 2 · CS Block",c:21}];
const GROUPS=[{n:"DSA Study Circle",m:14},{n:"Photography Walk",m:9},{n:"Startup Idea Lab",m:11}];
const BAD=["stupid","idiot","loser","bekaar","pagal","hate you"];
const S={user:null,sel:new Set(),req:new Set(),ev:new Set(),gr:new Set(),chat:0,log:{0:[["Aarav","Hey! Tumhe bhi coding pasand hai?"]]},privacy:"Everyone"};
const AUTH=["discover","chat","events","groups","profile"];
const LABEL={discover:"Discover",chat:"Chat",events:"Events",groups:"Groups",profile:"Profile"};

const P={
home:()=>`<section class="hero"><h1>College mein apne log dhundo.</h1><p>Interests batao. AI compatible students, groups aur event buddies dhundta hai.</p>
<a class="btn" href="#/signup">Sign up</a> <a class="btn s" href="#/login">Log in</a></section>
<div class="grid3"><div class="card"><h3>Friend matching</h3><p class="mut">Interests aur goals se match.</p></div>
<div class="card"><h3>Event buddy</h3><p class="mut">Fest akele nahi jaana.</p></div>
<div class="card"><h3>Safe chat</h3><p class="mut">Toxic messages rukte hain.</p></div></div>`,
signup:()=>`<form class="form" id="f"><h2>Sign up</h2><p class="mut">College email se account banao.</p>
<label>Name<input id="n" autocomplete="name"></label><label>College email<input id="e" type="email" autocomplete="email"></label>
<label>Password<input id="p" type="password" autocomplete="new-password"></label><p class="err" id="er"></p>
<button class="btn">Create account</button><p class="mut">Account hai? <a href="#/login"><b>Log in</b></a></p></form>`,
login:()=>`<form class="form" id="f"><h2>Log in</h2><label>College email<input id="e" type="email" autocomplete="email"></label>
<label>Password<input id="p" type="password" autocomplete="current-password"></label><p class="err" id="er"></p>
<button class="btn">Log in</button><p class="mut">Naye ho? <a href="#/signup"><b>Sign up</b></a></p></form>`,
onboarding:()=>`<div class="form" style="max-width:560px"><h2>Apne baare mein batao</h2><p class="mut">Kam se kam 2 interests chuno.</p>
<div class="chips" id="ch"></div><label>Branch<select><option>CSE</option><option>ECE</option><option>Mech</option><option>IT</option><option>Other</option></select></label>
<label>Goal<select><option>Placement</option><option>Startup</option><option>Higher studies</option><option>Just exploring</option></select></label>
<p class="err" id="er"></p><button class="btn" id="go">Continue</button></div>`,
discover:()=>{const r=PEOPLE.map(p=>({p,c:p.i.filter(x=>S.sel.has(x))})).sort((a,b)=>b.c.length-a.c.length);
return `<h2>Discover</h2><p class="mut">Tumhare interests ke basis par matches.</p><div class="list">`+r.map(({p,c},k)=>{const pct=Math.min(97,45+c.length*18);
return `<div class="card"><div class="row"><div class="row"><div class="av">${p.n[0]}</div><div><h3>${p.n} <span class="pct">${pct}%</span></h3><p class="mut">${p.b}${c.length?" · Common: "+c.join(", "):""}</p></div></div>
<button class="btn sm ${S.req.has(p.n)?"s":""}" data-r="${p.n}">${S.req.has(p.n)?"Requested":"Connect"}</button></div></div>`}).join("")+`</div>`},
chat:()=>{const p=PEOPLE[S.chat],l=S.log[S.chat]||[];
return `<h2>Chat</h2><div class="chat"><div class="who">${PEOPLE.map((x,i)=>`<button class="btn sm s" data-c="${i}" ${i==S.chat?'style="border-color:var(--acc)"':""}>${x.n}</button>`).join("")}</div>
<div class="card"><div class="msgs" id="ms">${l.map(m=>`<div class="b ${m[0]=="me"?"me":""}">${esc(m[1])}</div>`).join("")}</div>
<div class="send"><input id="mi" placeholder="Message likho" aria-label="Message"><button class="btn" id="sb">Send</button></div>
<div class="warn" id="wn"></div><button class="chip" id="ice">Icebreaker idea</button></div></div>`},
events:()=>`<h2>Events</h2><p class="mut">Event buddy chuno aur saath jao.</p><div class="list">`+EVENTS.map((e,i)=>`<div class="card row"><div><h3>${e.n}</h3><p class="mut">${e.d} · ${e.c+(S.ev.has(i)?1:0)} students going</p></div>
<button class="btn sm ${S.ev.has(i)?"s":""}" data-e="${i}">${S.ev.has(i)?"You're in":"Find buddy"}</button></div>`).join("")+`</div>`,
groups:()=>`<h2>Groups</h2><p class="mut">AI ne tumhare interests se ye groups suggest kiye.</p><div class="list">`+GROUPS.map((g,i)=>`<div class="card row"><div><h3>${g.n}</h3><p class="mut">${g.m+(S.gr.has(i)?1:0)} members</p></div>
<button class="btn sm ${S.gr.has(i)?"s":""}" data-g="${i}">${S.gr.has(i)?"Joined":"Join"}</button></div>`).join("")+`</div>`,
profile:()=>`<h2>Profile</h2><div class="list"><div class="card"><div class="row"><div class="row"><div class="av">${esc(S.user.n[0]||"?").toUpperCase()}</div><div><h3>${esc(S.user.n)}</h3><p class="mut">${esc(S.user.e)}</p></div></div></div>
<div class="chips">${[...S.sel].map(i=>`<span class="chip">${i}</span>`).join("")||'<span class="mut">Koi interest nahi chuna.</span>'}</div></div>
<div class="card"><label>Profile kaun dekh sakta hai?<select id="pv">${["Everyone","Same branch","Connections only"].map(o=>`<option ${o==S.privacy?"selected":""}>${o}</option>`).join("")}</select></label></div>
<div class="card row"><div><h3>Safety</h3><p class="mut">Kisi ko block ya report karo.</p></div><button class="btn sm s" id="rp">Report user</button></div>
<button class="btn s" id="lo">Log out</button></div>`
};

function go(){
 let r=(location.hash.replace("#/","")||"home");
 if(!P[r])r="home";
 if(AUTH.includes(r)&&!S.user)r="login";
 if(S.user&&["home","login","signup"].includes(r))r="discover";
 const ban=S.user&&AUTH.includes(r)?`<div class="banner"><i></i><div><b>Hi, ${esc(S.user.n)}</b><span>Apne campus se judo</span></div></div>`:"";
 $("#app").innerHTML=ban+P[r]();$("#app").classList.toggle("anim",r!==go.last);go.last=r;
 const links=S.user?AUTH.map(k=>`<a href="#/${k}" class="${k==r?"on":""}">${LABEL[k]}</a>`).join(""):`<a href="#/login">Log in</a><a href="#/signup" class="on">Sign up</a>`;
 $("#nav").innerHTML=links;$("#tabs").innerHTML=S.user?links:"";$("#tabs").style.display=S.user?"":"none";
 document.body.classList.toggle("pub",!S.user);bind[r]&&bind[r]();window.scrollTo(0,0);
}
const bind={
 signup(){$("#f").onsubmit=e=>{e.preventDefault();const n=$("#n").value.trim(),m=$("#e").value.trim(),p=$("#p").value;
  if(!n)return err("Naam likho.");if(!/^\S+@\S+\.\S+$/.test(m))return err("Sahi email daalo.");if(p.length<6)return err("Password kam se kam 6 characters ka ho.");
  S.user={n,e:m};location.hash="#/onboarding"}},
 login(){$("#f").onsubmit=e=>{e.preventDefault();const m=$("#e").value.trim(),p=$("#p").value;
  if(!/^\S+@\S+\.\S+$/.test(m))return err("Sahi email daalo.");if(p.length<6)return err("Password kam se kam 6 characters ka ho.");
  S.user={n:m.split("@")[0],e:m};location.hash="#/discover"}},
 onboarding(){const c=$("#ch");INTERESTS.forEach(t=>{const b=document.createElement("button");b.className="chip";b.textContent=t;b.setAttribute("aria-pressed",S.sel.has(t));
  b.onclick=()=>{S.sel.has(t)?S.sel.delete(t):S.sel.add(t);b.setAttribute("aria-pressed",S.sel.has(t))};c.appendChild(b)});
  $("#go").onclick=()=>S.sel.size<2?err("Kam se kam 2 interests chuno."):location.hash="#/discover"},
 discover(){document.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{S.req.add(b.dataset.r);go()})},
 chat(){document.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{S.chat=+b.dataset.c;go()});
  const send=()=>{const v=$("#mi").value.trim();if(!v)return;
   if(BAD.some(w=>v.toLowerCase().includes(w))){$("#wn").textContent="Ye message harmful lag raha hai, isliye nahi bheja. Kindly badal ke likho.";return}
   (S.log[S.chat]=S.log[S.chat]||[]).push(["me",v]);go()};
  $("#sb").onclick=send;$("#mi").onkeydown=e=>e.key=="Enter"&&send();
  $("#ice").onclick=()=>{const p=PEOPLE[S.chat],c=p.i.find(x=>S.sel.has(x))||p.i[0];$("#mi").value=`Hey ${p.n}! Tumhe ${c} pasand hai na? Kaise start kiya tumne?`;$("#mi").focus()};
  const m=$("#ms");m.scrollTop=m.scrollHeight},
 events(){document.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{const i=+b.dataset.e;S.ev.has(i)?S.ev.delete(i):S.ev.add(i);go()})},
 groups(){document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{const i=+b.dataset.g;S.gr.has(i)?S.gr.delete(i):S.gr.add(i);go()})},
 profile(){$("#pv").onchange=e=>S.privacy=e.target.value;$("#lo").onclick=()=>{S.user=null;location.hash="#/"};
  $("#rp").onclick=()=>alert("Report bhej diya gaya. Moderators review karenge.")}
};
function err(t){const e=$("#er");if(e)e.textContent=t}
addEventListener("hashchange",go);go();
