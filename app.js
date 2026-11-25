
(function(){

var $=function(s){return document.querySelector(s)};
var state={products:[]};
var CATS=[{id:"kiyim",t:"Kiyimlar"},{id:"obuv",t:"Poyabzal"},{id:"shim",t:"Shimlar"},{id:"kurtka",t:"Kurtkalar"},{id:"aksessuar",t:"Aksessuarlar"}];
var edit=false,dirty=false,A=null,S=null,wide={};
var cart=[];try{cart=JSON.parse(localStorage.getItem("737cart")||"[]")}catch(e){}
var cdlg=$("#cdlg"),cdg=$("#cdg");
var box=$("#sections"),dlg=$("#dlg"),dg=$("#dg"),bar={style:{}};
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function num(p){return parseInt(String(p).replace(/\D/g,""),10)||0}
function fmt(n){return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," ")}
function saveCart(){try{localStorage.setItem("737cart",JSON.stringify(cart))}catch(e){}$("#cc").textContent=cart.length}
function orderText(items){var t="Salom! Buyurtma:\n",s=0;items.forEach(function(x,i){s+=num(x.p);t+=(i+1)+") "+x.n+(x.z?", oʻlcham "+x.z:"")+" — "+x.p+" soʻm\n"});return t+"Jami: "+fmt(s)+" soʻm"}
function openCart(){
 cdg.innerHTML="";var cl=el("button","x","×");cl.type="button";cl.setAttribute("aria-label","Yopish");cl.onclick=function(){cdlg.close()};cdg.appendChild(cl);
 cdg.appendChild(el("h2",null,"Savat"));
 if(!cart.length){cdg.appendChild(el("p",null,"Savat boʻsh. Mahsulotni tanlab, savatga qoʻshing."));cdlg.showModal();return}
 cart.forEach(function(it,i){var r=el("div","ci"),a=el("div");a.appendChild(el("span",null,it.n));a.appendChild(el("small",null,(it.z?"Oʻlcham: "+it.z:"")));
  var rm=el("button",null,"×");rm.type="button";rm.setAttribute("aria-label","Oʻchirish");rm.onclick=function(){cart.splice(i,1);saveCart();openCart()};
  r.appendChild(a);r.appendChild(el("b",null,it.p+" soʻm"));r.appendChild(rm);cdg.appendChild(r)});
 var s=cart.reduce(function(a,x){return a+num(x.p)},0),tt=el("div","tot");tt.appendChild(el("span",null,"Jami"));tt.appendChild(el("span",null,fmt(s)+" soʻm"));cdg.appendChild(tt);
 var go=el("a","go","Direct orqali buyurtma berish"),ms=el("div","msg");go.href="https://ig.me/m/737.store_";go.target="_blank";go.rel="noopener";
 go.onclick=function(){var t=orderText(cart);try{navigator.clipboard.writeText(t);ms.textContent="Buyurtma matni nusxalandi. Direct’ga joylang."}catch(e){ms.textContent=t}};
 cdg.appendChild(go);cdg.appendChild(el("div","tm","Buyurtma muddati: 7–10 kun"));cdg.appendChild(ms);cdlg.showModal();
}
function rng(x){return x.s.length>1?x.s[0]+"–"+x.s[x.s.length-1]:""}
function card(x){
 var c=el("div","card"),b=el("button","pb"),ph=el("div","ph");b.type="button";
 var mi=(x.imgs&&x.imgs[0])||x.img;if(mi){var im=el("img");im.src=mi;im.alt=x.n;im.loading="lazy";ph.appendChild(im)}else{var d=el("div","dm");d.appendChild(el("b",null,"737"));ph.appendChild(d)}
 if(!edit)ph.appendChild(el("span","buy","BUYURTMA BERISH"));
 var m=el("div","mt");m.appendChild(el("span","nm",x.n+(edit?"  ✎":"")));m.appendChild(el("span","pr",x.p+" soʻm"));
 b.appendChild(ph);b.appendChild(m);b.onclick=function(){edit?openEd(x,false):openP(x)};
 c.appendChild(b);return c}
function render(){
 box.innerHTML="";var pl=$("#pills");pl.innerHTML="";
 CATS.forEach(function(k){
  var items=state.products.filter(function(x){return x.c===k.id});
  if(!items.length&&!edit)return;
  var s=el("section","sec"),h=el("div","sh2"),ctl=el("div","ctl"),row=el("div","row"+(wide[k.id]?" wide":""));
  s.id=k.id;h.appendChild(el("h2",null,k.t));var pa=el("a",null,k.t);pa.href="#"+k.id;pl.appendChild(pa);
  var al=el("button","all",wide[k.id]?"QISQA KOʻRINISH":"BARCHASINI KOʻRISH");al.type="button";
  al.onclick=function(){wide[k.id]=!wide[k.id];render()};ctl.appendChild(al);
  if(!wide[k.id]){[["←","Oldingi",-1],["→","Keyingi",1]].forEach(function(a){var r=el("button","ar",a[0]);r.type="button";r.setAttribute("aria-label",a[1]);r.onclick=function(){row.scrollBy({left:a[2]*row.clientWidth*.8,behavior:"smooth"})};ctl.appendChild(r)})}
  h.appendChild(ctl);s.appendChild(h);
  items.forEach(function(x){row.appendChild(card(x))});s.appendChild(row);
  if(edit){var ad=el("button","add","+ Mahsulot qoʻshish");ad.type="button";ad.onclick=function(){openEd({id:Date.now().toString(36),c:k.id,n:"",p:"",s:[],img:""},true)};s.appendChild(ad)}
  box.appendChild(s)});
}
function openP(x){
 var size=x.s.length===1?x.s[0]:"";dg.innerHTML="";
 var cl=el("button","x","×");cl.type="button";cl.setAttribute("aria-label","Yopish");cl.onclick=function(){dlg.close()};dg.appendChild(cl);
 var gl=(x.imgs&&x.imgs.length)?x.imgs:(x.img?[x.img]:[]);if(gl.length){var im=el("img","big");im.src=gl[0];im.alt=x.n;dg.appendChild(im);if(gl.length>1){var th=el("div","th");gl.forEach(function(u,i){var tb=el("button");tb.type="button";tb.setAttribute("aria-pressed",i===0);var ti=el("img");ti.src=u;ti.alt="";tb.appendChild(ti);tb.onclick=function(){im.src=u;[].forEach.call(th.children,function(e){e.setAttribute("aria-pressed",e===tb)})};th.appendChild(tb)});dg.appendChild(th)}}
 dg.appendChild(el("h2",null,x.n));dg.appendChild(el("div","pr2",x.p+" soʻm"));dg.appendChild(el("div","tm","Buyurtma muddati: 7–10 kun"));
 var box2=el("div","sz");
 if(x.s.length){dg.appendChild(el("p",null,"Oʻlchamni tanlang"));
  x.s.forEach(function(v){var c=el("button","chip",v);c.type="button";c.setAttribute("aria-pressed",v===size);c.onclick=function(){size=v;[].forEach.call(box2.children,function(e){e.setAttribute("aria-pressed",e===c)})};box2.appendChild(c)});dg.appendChild(box2)}
 var ms=el("div","msg"),ad=el("button","go","Savatga qoʻshish"),go=el("a","go2","Darhol buyurtma berish");ad.type="button";
 function ok(){if(x.s.length&&!size){ms.textContent="Avval oʻlchamni tanlang.";return false}return true}
 ad.onclick=function(){if(!ok())return;cart.push({n:x.n,p:x.p,z:size});saveCart();dlg.close();openCart()};
 go.href="https://ig.me/m/737.store_";go.target="_blank";go.rel="noopener";
 go.onclick=function(e){if(!ok()){e.preventDefault();return}var t=orderText([{n:x.n,p:x.p,z:size}]);try{navigator.clipboard.writeText(t);ms.textContent="Buyurtma matni nusxalandi. Direct’ga joylang."}catch(er){ms.textContent=t}};
 dg.appendChild(ad);dg.appendChild(go);dg.appendChild(ms);dlg.showModal();
}
function fld(lbl,inp){var l=el("label","fl",lbl);l.appendChild(inp);return l}
function openEd(x,isNew){
 dg.innerHTML="";
 var cl=el("button","x","×");cl.type="button";cl.setAttribute("aria-label","Yopish");cl.onclick=function(){dlg.close()};dg.appendChild(cl);
 dg.appendChild(el("h2",null,isNew?"Yangi mahsulot":"Mahsulotni tahrirlash"));
 var sel=el("select");CATS.forEach(function(k){var o=el("option",null,k.t);o.value=k.id;sel.appendChild(o)});sel.value=x.c;
 var n=el("input");n.value=x.n;var p=el("input");p.value=x.p;p.placeholder="Masalan: 280 000";
 var sz=el("input");sz.value=x.s.join(", ");sz.placeholder="S, M, L, XL";
 var img=x.img,pv=el("img","pv");pv.alt="";if(img)pv.src=img;else pv.style.display="none";
 var f=el("input");f.type="file";f.accept="image/*";var ms=el("div","msg");
 f.onchange=function(){var file=f.files[0];if(!file)return;if(!S){ms.textContent="Rasm yuklash faqat muharrir uchun ishlaydi.";return}
  ms.textContent="Yuklanmoqda…";S.upload(file).then(function(r){img=r.url;pv.src=img;pv.style.display="block";ms.textContent="Rasm yuklandi."}).catch(function(){ms.textContent="Yuklab boʻlmadi. Rasm 20 MB dan kichik boʻlsin."})};
 [fld("Bo‘lim",sel),fld("Nomi",n),fld("Narxi (soʻm)",p),fld("Oʻlchamlar (vergul bilan)",sz),fld("Rasm",f)].forEach(function(e){dg.appendChild(e)});
 dg.appendChild(pv);
 var sv=el("button","sv","Qoʻshish");sv.type="button";sv.textContent=isNew?"Qoʻshish":"Tayyor";
 sv.onclick=function(){x.c=sel.value;x.n=n.value.trim()||"Nomsiz";x.p=p.value.trim()||"—";x.s=sz.value.split(",").map(function(v){return v.trim()}).filter(Boolean);x.img=img;
  if(isNew)state.products.push(x);dirty=true;bar.style.display="flex";dlg.close();render()};
 dg.appendChild(sv);dg.appendChild(ms);
 if(!isNew){var d=el("button","dl","Mahsulotni oʻchirish");d.type="button";d.onclick=function(){if(!confirm("Oʻchirilsinmi?"))return;state.products=state.products.filter(function(y){return y!==x});dirty=true;bar.style.display="flex";dlg.close();render()};dg.appendChild(d)}
 dlg.showModal();
}
$("#cartBtn").onclick=openCart;saveCart();
cdlg.addEventListener("click",function(e){if(e.target===cdlg)cdlg.close()});
dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});
render();
fetch("products.json?v="+Date.now()).then(function(r){return r.json()}).then(function(d){state.products=d;render()}).catch(function(){box.innerHTML='<div class="empty">Katalog yuklanmadi. Sahifani yangilang.</div>'});
})();
