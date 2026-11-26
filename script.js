const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let entered=false,soundOn=false;const portal=$("#portal"),site=$("#site"),amb=$("#ambience"),open=$("#openSound"),arr=$("#arrival");
function play(a,v=.2){if(!soundOn)return;try{a.volume=v;a.currentTime=0;a.play().catch(()=>{});}catch(e){}}
$("#enter").onclick = () => {
  portal.classList.add("leaving");
  play(open, .28);

  setTimeout(() => {
    portal.style.display = "none";

    const entering = document.getElementById("enteringWorld");
    entering.classList.add("show");

    setTimeout(() => {
      entering.classList.remove("show");
      site.classList.add("show");
      window.scrollTo(0, 0);
      play(arr, .2);

      if (soundOn) {
        amb.volume = .07;
        amb.play().catch(() => {});
      }
    }, 3000);

  }, 3000);
};
$("#sound").onclick=()=>{soundOn=!soundOn;$("#sound").textContent=soundOn?"♫ Sound on":"♫ Sound off";if(soundOn&&entered){amb.volume=.07;amb.play().catch(()=>{});}else amb.pause();};
function go(id){$$(".page").forEach(p=>p.classList.remove("active"));$("#"+id).classList.add("active");$$("nav a").forEach(a=>a.classList.toggle("active",a.dataset.page===id));$("#nav").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});play(arr,.1);history.replaceState(null,"","#"+id);}
$$("[data-page]").forEach(a=>a.onclick=e=>{e.preventDefault();go(a.dataset.page)});$$("[data-go]").forEach(b=>b.onclick=()=>go(b.dataset.go));$("#menu").onclick=()=>$("#nav").classList.toggle("open");$("#year").textContent=new Date().getFullYear();
const cfg=window.DIGINOVA_CONFIG||{},num=(cfg.whatsappNumber||"").replace(/\D/g,""),msg=encodeURIComponent(cfg.message||"Hello, I would like to know more about DigiNova.");
$$(".wa").forEach(a=>{if(num.length>=10&&!num.includes("X")){a.href="https://wa.me/"+num+"?text="+msg;a.target="_blank";a.rel="noopener"}else{a.href="#";a.onclick=e=>{e.preventDefault();alert("Please add your WhatsApp number in site-config.js before publishing.")}}});
const c=$("#stars"),ctx=c.getContext("2d");let w,h,dpr,pts=[];function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:Math.min(45,Math.floor(w*h/20000))},()=>({x:Math.random()*w,y:Math.random()*h,v:.05+Math.random()*.1,s:1+Math.random()*2}));}function draw(){ctx.clearRect(0,0,w,h);for(const p of pts){p.y-=p.v;if(p.y<0)p.y=h;ctx.globalAlpha=.17;ctx.fillStyle="#c9b2d1";ctx.fillRect(p.x,p.y,p.s,p.s)}ctx.globalAlpha=1;requestAnimationFrame(draw)}resize();addEventListener("resize",resize);draw();

// DigiNova opening sequence — 3 seconds per screen
window.addEventListener("load", () => {
  const loading = document.getElementById("loadingScreen");
  const activation = document.getElementById("portalActivation");
  const portal = document.getElementById("portal");

  setTimeout(() => {
    loading.style.display = "none";
    activation.classList.add("show");

    setTimeout(() => {
      activation.classList.remove("show");
      activation.style.display = "none";
      portal.style.display = "grid";
    }, 3000);

  }, 3000);
});
// Make homepage cards fully clickable
$$(".home-card").forEach(card => {
  card.addEventListener("click", event => {
    if (!event.target.closest("button")) {
      go(card.dataset.go);
    }
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      go(card.dataset.go);
    }
  });
});
