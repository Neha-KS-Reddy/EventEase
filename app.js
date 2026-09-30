const events=[
 {id:1,title:"Tech & AI Summit 2026",date:"18 Oct 2026",place:"Bengaluru",price:799,icon:"🤖",cat:"Technology"},
 {id:2,title:"Startup Founders Meetup",date:"24 Oct 2026",place:"Bengaluru",price:499,icon:"🚀",cat:"Business"},
 {id:3,title:"Design Thinking Workshop",date:"31 Oct 2026",place:"Bengaluru",price:299,icon:"🎨",cat:"Design"},
 {id:4,title:"Data Analytics Bootcamp",date:"07 Nov 2026",place:"Online",price:599,icon:"📊",cat:"Learning"},
 {id:5,title:"Music & Food Festival",date:"14 Nov 2026",place:"Bengaluru",price:999,icon:"🎵",cat:"Entertainment"},
 {id:6,title:"AI Career Masterclass",date:"21 Nov 2026",place:"Online",price:399,icon:"💼",cat:"Career"}
];

const grid=document.getElementById("eventGrid");
const list=document.getElementById("bookingList");
const modal=document.getElementById("modal");
const modalContent=document.getElementById("modalContent");

function renderEvents(items=events){
 grid.innerHTML=items.map(e=>`<article class="card">
   <div class="card-top">${e.icon}</div><div class="card-body">
   <span class="tag">${e.cat}</span><h3>${e.title}</h3>
   <p class="muted">${e.date} • ${e.place}</p><div class="price">₹${e.price}</div>
   <button class="book" onclick="openBooking(${e.id})">Book Now</button></div></article>`).join("");
}
function getBookings(){return JSON.parse(localStorage.getItem("eventease_bookings")||"[]")}
function saveBookings(x){localStorage.setItem("eventease_bookings",JSON.stringify(x))}
function renderBookings(){
 const b=getBookings();
 list.innerHTML=b.length?b.map(x=>`<div class="booking"><div><strong>${x.title}</strong><div class="muted">${x.date} • ${x.email}</div></div><span class="status">Confirmed • ₹${x.amount}</span></div>`).join("")
 : `<div class="booking"><span class="muted">No bookings yet. Book an event above.</span></div>`;
}
function openBooking(id){
 const e=events.find(x=>x.id===id);
 modalContent.innerHTML=`<p class="eyebrow">RESERVE YOUR SEAT</p><h2>${e.title}</h2>
 <p class="muted">${e.date} • ${e.place} • ₹${e.price}</p>
 <form class="form" id="bookingForm">
 <input id="name" required placeholder="Full name"><input id="email" type="email" required placeholder="Email address">
 <button class="pay">Proceed to secure payment</button></form>
 <p class="muted">Demo integration: payment + confirmation email are simulated locally. Production credentials can be connected through the adapter in app.js.</p>`;
 modal.classList.remove("hidden");
 document.getElementById("bookingForm").onsubmit=(ev)=>{ev.preventDefault();completeBooking(e)};
}
function completeBooking(e){
 const name=document.getElementById("name").value;
 const email=document.getElementById("email").value;
 const booking={id:Date.now(),title:e.title,date:e.date,email,amount:e.price,name,payment:"PAID"};
 const b=getBookings();b.unshift(booking);saveBookings(b);
 // Integration hooks: replace these demo functions with Razorpay/Stripe, EmailJS/Resend,
 // and Supabase/Firebase/Cloudinary credentials in a production deployment.
 modalContent.innerHTML=`<div class="success"><div style="font-size:55px">✓</div><h3>Booking confirmed</h3>
 <p>Your payment of <strong>₹${e.price}</strong> is recorded in demo mode.</p>
 <p class="muted">A confirmation email would be sent to <strong>${email}</strong> in production.</p>
 <button class="pay" onclick="closeModal()">Done</button></div>`;
 renderBookings();
}
function closeModal(){modal.classList.add("hidden")}
document.getElementById("closeModal").onclick=closeModal;
modal.addEventListener("click",e=>{if(e.target===modal)closeModal()});
document.getElementById("search").addEventListener("input",e=>{
 const q=e.target.value.toLowerCase();
 renderEvents(events.filter(x=>(x.title+x.cat+x.place).toLowerCase().includes(q)));
});
document.getElementById("loginBtn").onclick=()=>{
 modalContent.innerHTML=`<p class="eyebrow">ACCOUNT</p><h2>Sign in</h2><form class="form">
 <input type="email" required placeholder="Email"><input type="password" required placeholder="Password">
 <button class="pay">Sign In (Demo)</button></form>`;
 modal.classList.remove("hidden");
};
renderEvents();renderBookings();