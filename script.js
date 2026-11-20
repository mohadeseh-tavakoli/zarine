const catalog=[
{id:1,name:"انگشتر مینیمال آوا",cat:"انگشتر",weight:"۲.۱۵ گرم",karat:"۱۸ عیار",price:12800000,symbol:"◇",tag:"پرفروش",image:"images/gold-ring-1.jpg"},
{id:2,name:"گردنبند ماه‌نشان",cat:"گردنبند",weight:"۳.۴۰ گرم",karat:"۱۸ عیار",price:19700000,symbol:"☾",tag:"جدید",image:"images/gold-necklace-1.jpg"},
{id:3,name:"دستبند ونوس",cat:"دستبند",weight:"۴.۱۰ گرم",karat:"۱۸ عیار",price:24600000,symbol:"∞",tag:"منتخب",image:"images/gold-bracelet-1.jpg"},
{id:4,name:"گوشواره سپیده",cat:"گوشواره",weight:"۱.۸۰ گرم",karat:"۱۸ عیار",price:10900000,symbol:"✧",tag:"",image:"images/gold-earrings-1.jpg"},
{id:5,name:"انگشتر آترین",cat:"انگشتر",weight:"۲.۷۰ گرم",karat:"۱۸ عیار",price:15900000,symbol:"◈",tag:"",image:"images/gold-ring-2.jpg"},
{id:6,name:"گردنبند الی",cat:"گردنبند",weight:"۲.۹۰ گرم",karat:"۱۸ عیار",price:17400000,symbol:"♡",tag:"جدید",image:"images/gold-necklace-2.jpg"},
{id:7,name:"دستبند روژان",cat:"دستبند",weight:"۳.۶۰ گرم",karat:"۱۸ عیار",price:21800000,symbol:"⌁",tag:"",image:"images/gold-bracelet-1.jpg"},
{id:8,name:"گوشواره آوین",cat:"گوشواره",weight:"۲.۰۵ گرم",karat:"۱۸ عیار",price:12300000,symbol:"❋",tag:"",image:"images/gold-earrings-2.jpg"}];
let filter="همه",cart=[];
const fmt=n=>new Intl.NumberFormat("fa-IR").format(n)+" تومان";
const products=document.getElementById("products");
function render(){
 let list=catalog.filter(p=>(filter==="همه"||p.cat===filter)&&p.name.includes(document.getElementById("searchInput").value.trim()));
 const sort=document.getElementById("sort").value;
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 if(sort==="high")list.sort((a,b)=>b.price-a.price);
 products.innerHTML=list.map(p=>`<article><div class="productvisual"><img class="product-photo" src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'"><span class="symbol image-fallback" style="display:none">${p.symbol}</span><span class="tag">${p.tag}</span><button class="heart" data-wish="${p.id}" aria-label="افزودن به علاقه‌مندی">♡</button></div><div class="productinfo"><h3>${p.name}</h3><div class="meta">${p.cat}　·　${p.karat}　·　${p.weight}</div><div class="productbottom"><b class="price">${fmt(p.price)}</b><button class="add" data-add="${p.id}">افزودن +</button></div></div></article>`).join("")||"<p>محصولی پیدا نشد.</p>";
}
function updateCart(){document.getElementById("count").textContent=new Intl.NumberFormat("fa-IR").format(cart.length);document.getElementById("total").textContent=fmt(cart.reduce((s,p)=>s+p.price,0));document.getElementById("items").innerHTML=cart.length?cart.map((p,i)=>`<div class="cartrow"><span>${p.name}<br><small>${fmt(p.price)}</small></span><button data-remove="${i}">حذف</button></div>`).join(""):"<p>سبد خرید شما خالی است.</p>";}
function toast(t){let el=document.getElementById("toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1800)}
document.addEventListener("click",e=>{let add=e.target.closest("[data-add]");if(add){cart.push(catalog.find(p=>p.id===+add.dataset.add));updateCart();toast("به سبد خرید اضافه شد");}let rem=e.target.closest("[data-remove]");if(rem){cart.splice(+rem.dataset.remove,1);updateCart();}let wish=e.target.closest("[data-wish]");if(wish){wish.textContent=wish.textContent==="♡"?"♥":"♡";toast("وضعیت علاقه‌مندی تغییر کرد");}let cat=e.target.closest("[data-cat]");if(cat){filter=cat.dataset.cat;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));render();}});
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;document.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));render()}));
document.getElementById("searchInput").addEventListener("input",render);document.getElementById("sort").addEventListener("change",render);
document.getElementById("cartOpen").onclick=()=>document.body.classList.add("open");document.getElementById("close").onclick=()=>document.body.classList.remove("open");document.getElementById("overlay").onclick=()=>document.body.classList.remove("open");
document.getElementById("checkout").onclick=()=>toast("این نسخه نمایشی است؛ پرداخت فعال نیست.");
document.getElementById("menu").onclick=()=>document.getElementById("nav").classList.toggle("show");
document.getElementById("search").onclick=()=>{document.getElementById("searchInput").focus();document.getElementById("shop").scrollIntoView()};
document.getElementById("wish").onclick=()=>toast("برای افزودن به علاقه‌مندی، قلب کنار محصول را بزنید.");
document.getElementById("newsletter").addEventListener("submit",e=>{e.preventDefault();document.getElementById("message").textContent="ممنون از همراهی شما! (ثبت آزمایشی)";e.target.reset()});
render();updateCart();
