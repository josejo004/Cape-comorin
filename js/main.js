/* =====================================================
   CAPE COMORIN — shared behaviour
   ===================================================== */

/* ---------- Business info wiring ---------- */
function ccWireBusinessInfo(){
  document.querySelectorAll("[data-cc-phone]").forEach(el=>{
    el.textContent = CC_BUSINESS.phoneDisplay;
  });
  document.querySelectorAll("[data-cc-tel]").forEach(el=>{
    el.href = "tel:" + CC_BUSINESS.phone;
  });
  document.querySelectorAll("[data-cc-whatsapp]").forEach(el=>{
    const msg = encodeURIComponent(CC_BUSINESS.whatsappMessage);
    el.href = `https://wa.me/91${CC_BUSINESS.phone}?text=${msg}`;
  });
  document.querySelectorAll("[data-cc-email]").forEach(el=>{ el.textContent = CC_BUSINESS.email; });
  document.querySelectorAll("[data-cc-address]").forEach(el=>{ el.textContent = CC_BUSINESS.address; });
  document.querySelectorAll("[data-cc-year]").forEach(el=>{ el.textContent = new Date().getFullYear(); });
}

/* ---------- Mobile nav ---------- */
function ccInitNav(){
  const btn = document.querySelector(".hamburger");
  const panel = document.querySelector(".mobile-panel");
  if(!btn || !panel) return;
  btn.addEventListener("click", ()=>{
    const willOpen = !panel.classList.contains("open");
    panel.classList.toggle("open", willOpen);
    btn.setAttribute("aria-expanded", String(willOpen));
    document.body.style.overflow = willOpen ? "hidden" : "";
  });
  panel.querySelectorAll("a").forEach(a=>{
    a.addEventListener("click", ()=>{
      panel.classList.remove("open");
      btn.setAttribute("aria-expanded","false");
      document.body.style.overflow = "";
    });
  });
}

/* ---------- Hero carousel ---------- */
function ccInitHero(){
  const root = document.querySelector(".hero");
  if(!root) return;
  const slides = [...root.querySelectorAll(".hero-slide")];
  const dotsWrap = root.querySelector(".hero-dots");
  const prevBtn = root.querySelector(".hero-arrow.prev");
  const nextBtn = root.querySelector(".hero-arrow.next");
  let idx = 0, timer = null;

  slides.forEach((_, i)=>{
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${i+1}`);
    if(i===0) dot.classList.add("active");
    dot.addEventListener("click", ()=> goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = [...dotsWrap.children];

  function goTo(i){
    slides[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
    restart();
  }
  function next(){ goTo(idx+1); }
  function prev(){ goTo(idx-1); }
  function restart(){
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }
  nextBtn && nextBtn.addEventListener("click", next);
  prevBtn && prevBtn.addEventListener("click", prev);

  // touch swipe
  let touchX = null;
  root.addEventListener("touchstart", e=>{ touchX = e.touches[0].clientX; }, {passive:true});
  root.addEventListener("touchend", e=>{
    if(touchX===null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if(Math.abs(dx) > 40){ dx < 0 ? next() : prev(); }
    touchX = null;
  }, {passive:true});

  restart();
}

/* ---------- Booking search widget (hero) ---------- */
function ccInitBookingSearch(){
  const form = document.getElementById("booking-search-form");
  if(!form) return;
  const result = document.getElementById("booking-search-result");
  const pickupDate = form.querySelector("[name=pickupDate]");
  const dropDate = form.querySelector("[name=dropDate]");
  const today = new Date().toISOString().split("T")[0];
  pickupDate.min = today;
  dropDate.min = today;
  pickupDate.addEventListener("change", ()=>{ dropDate.min = pickupDate.value || today; });

  form.addEventListener("submit", e=>{
    e.preventDefault();
    let valid = true;
    const errors = {
      pickupDate: "", pickupTime: "", dropDate: "", dropTime: ""
    };
    const vals = Object.fromEntries(new FormData(form).entries());

    if(!vals.pickupDate){ errors.pickupDate = "Pick a pickup date."; valid = false; }
    else if(vals.pickupDate < today){ errors.pickupDate = "Pickup date can't be in the past."; valid = false; }

    if(!vals.pickupTime){ errors.pickupTime = "Pick a pickup time."; valid = false; }

    if(!vals.dropDate){ errors.dropDate = "Pick a drop-off date."; valid = false; }
    else if(vals.dropDate < vals.pickupDate){ errors.dropDate = "Drop-off can't be before pickup."; valid = false; }

    if(!vals.dropTime){ errors.dropTime = "Pick a drop-off time."; valid = false; }

    if(vals.pickupDate && vals.dropDate && vals.pickupDate === vals.dropDate &&
       vals.pickupTime && vals.dropTime && vals.dropTime <= vals.pickupTime){
      errors.dropTime = "Drop-off time must be after pickup time.";
      valid = false;
    }

    Object.entries(errors).forEach(([key,msg])=>{
      const el = form.querySelector(`[data-error-for=${key}]`);
      if(el) el.textContent = msg;
    });

    if(!valid){
      result.classList.remove("show");
      return;
    }

    const available = CC_BIKES.filter(b=>b.available);
    result.innerHTML = `
      <p style="font-weight:700; margin-bottom:12px;">
        ${available.length} bikes available for ${vals.pickupDate} — ${vals.dropDate}
      </p>
      <div style="display:flex; gap:10px; flex-wrap:wrap;">
        ${available.slice(0,4).map(b=>`
          <span class="chip">${b.name} · ₹${b.pricePerDay}/day</span>
        `).join("")}
      </div>
      <a href="bikes.html" class="btn btn-navy" style="margin-top:16px;">View all available bikes</a>
    `;
    result.classList.add("show");
  });
}

/* ---------- Reviews / places horizontal scroll arrows (optional) ---------- */
function ccInitDragScroll(selector){
  document.querySelectorAll(selector).forEach(track=>{
    let isDown = false, startX, scrollLeft;
    track.addEventListener("mousedown", e=>{
      isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft;
    });
    ["mouseleave","mouseup"].forEach(evt=> track.addEventListener(evt, ()=> isDown=false));
    track.addEventListener("mousemove", e=>{
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX) * 1.2;
    });
  });
}

/* ---------- Card renderers (used across pages) ---------- */
function ccStars(rating){
  return "★★★★★☆☆☆☆☆".slice(5-rating, 10-rating);
}

function ccBikeCardHTML(b){
  const badge = !b.available
    ? `<span class="badge badge-red">Unavailable</span>`
    : (b.discount ? `<span class="badge badge-teal">${b.discount}</span>` : "");
  return `
  <article class="bike-card">
    <div class="bike-media">
    <img
  src="${b.image}"
  alt="${b.name}"
  loading="eager"
  decoding="async"
  onerror="this.style.display='none'; this.parentElement.classList.add('image-error');"
>
      ${badge}
      <span class="badge-amber">${b.category}</span>
    </div>
    <div class="bike-body">
      <span class="bike-cat">${b.brand}</span>
      <h3>${b.name}</h3>
      <div class="bike-specs">
        <span>⚙ ${b.transmission}</span>
        <span>🔧 ${b.cc}cc</span>
        <span>⛽ ${b.fuel}</span>
        <span>👥 ${b.seats} Seats</span>
        <span>📏 ${b.mileage}</span>
      </div>
      <p style="color:var(--ink-soft); font-size:0.88rem;">${b.desc}</p>
      <div class="bike-price-row">
        <div class="bike-price">
          <strong>₹${b.pricePerDay}</strong>
          <span> / day · ₹${b.pricePerHour}/hr</span>
        </div>
      </div>
      <div class="bike-actions">
        <a class="btn btn-outline-dark" href="bike-details.html?bike=${b.slug}">View Details</a>
        <a class="btn btn-amber" href="booking.html?bike=${b.slug}">${b.available ? "Book Now" : "Notify Me"}</a>
      </div>
    </div>
  </article>`;
}
function ccPlaceCardHTML(p){
  const imageUrl = new URL(p.image, document.baseURI).href;

  return `
  <article class="place-card">
    <div class="place-media">
      <img 
        src="${imageUrl}" 
        alt="${p.name}, a tourist attraction near Kanyakumari"
        loading="eager"
        decoding="async"
        onerror="console.error('Tourist image failed:', this.src)"
      >
    </div>
    <div class="place-body">
      <h3>${p.name}</h3>
      <div class="place-meta">
        <span>?? ${p.distance}</span>
        <span>?? ${p.time}</span>
      </div>
      <p>${p.desc}</p>
      <a class="btn-ghost" href="tourist-places.html#${p.slug}" style="margin-top:12px; display:inline-block; font-weight:700;">
        Explore ?
      </a>
    </div>
  </article>`;
}

function ccBlogCardHTML(p){
  const d = new Date(p.date);
  const dateStr = d.toLocaleDateString("en-IN", {day:"numeric", month:"short", year:"numeric"});
  return `
  <article class="blog-card">
    <a href="blog-post.html?post=${p.slug}"><div class="blog-media"><img src="${p.image}" alt="${p.title}" loading="lazy"></div></a>
    <div class="blog-body">
      <span class="blog-cat">${p.category}</span>
      <h3><a href="blog-post.html?post=${p.slug}">${p.title}</a></h3>
      <p>${p.excerpt}</p>
      <div class="blog-meta">
        <span>${dateStr}</span>
        <a href="blog-post.html?post=${p.slug}" style="font-weight:700; color:var(--navy-900);">Read More →</a>
      </div>
    </div>
  </article>`;
}

function ccReviewCardHTML(r){
  return `
  <article class="review-card">
    <div class="review-stars">${ccStars(r.rating)}</div>
    <p>"${r.text}"</p>
    <div class="review-person">
      <div class="review-avatar"><img src="${r.avatar}" alt="${r.name}" loading="lazy"></div>
      <div>
        <strong>${r.name}</strong>
        <span>${r.location}</span>
      </div>
    </div>
  </article>`;
}

/* ---------- Contact form (front-end demo) ---------- */
function ccInitContactForm(){
  const form = document.getElementById("contact-form");
  if(!form) return;
  form.addEventListener("submit", e=>{
    e.preventDefault();
    const note = document.getElementById("contact-note");
    note.textContent = "Thanks — your message has been sent. Our team will get back to you shortly.";
    note.style.display = "block";
    form.reset();
  });
}

/* ---------- Boot ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  ccWireBusinessInfo();
  ccInitNav();
  ccInitHero();
  ccInitBookingSearch();
  ccInitContactForm();
  ccInitDragScroll(".review-track");
});
