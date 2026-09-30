/* =====================================================
   CAPE COMORIN — booking flow (front-end demo)
   Stores bookings in localStorage under "cc_bookings" so
   the admin demo page can list them. A production system
   should persist this to a real backend/database instead.
   ===================================================== */
(function(){
  const form = document.getElementById("booking-form");
  if(!form) return;

  const bikeSelect = document.getElementById("bBike");
  const params = new URLSearchParams(location.search);
  const preselect = params.get("bike");

  bikeSelect.innerHTML = CC_BIKES.map(b =>
    `<option value="${b.slug}" ${b.slug===preselect ? "selected" : ""} ${!b.available ? "disabled" : ""}>
      ${b.name} — ₹${b.pricePerDay}/day${!b.available ? " (Unavailable)" : ""}
    </option>`
  ).join("");

  const pickDate = document.getElementById("bPickDate");
  const dropDate = document.getElementById("bDropDate");
  const today = new Date().toISOString().split("T")[0];
  pickDate.min = today;
  dropDate.min = today;

  function getBike(){ return CC_BIKES.find(b => b.slug === bikeSelect.value); }

  function hoursBetween(d1,t1,d2,t2){
    if(!d1 || !t1 || !d2 || !t2) return 0;
    const start = new Date(`${d1}T${t1}`);
    const end = new Date(`${d2}T${t2}`);
    const diff = (end - start) / 36e5;
    return diff > 0 ? diff : 0;
  }

  function updateSummary(){
    const bike = getBike();
    const hours = hoursBetween(pickDate.value, document.getElementById("bPickTime").value, dropDate.value, document.getElementById("bDropTime").value);
    const days = Math.ceil(hours / 24);

    document.getElementById("sum-bike").textContent = bike ? bike.name : "—";

    if(hours > 0){
      let rental, durationLabel;
      if(hours <= 12){
        rental = bike.pricePerHour * Math.ceil(hours);
        durationLabel = `${Math.ceil(hours)} hour(s)`;
      } else {
        rental = bike.pricePerDay * Math.max(days,1);
        durationLabel = `${Math.max(days,1)} day(s)`;
      }
      document.getElementById("sum-duration").textContent = durationLabel;
      document.getElementById("sum-rental").textContent = "₹" + rental;
      document.getElementById("sum-extra").textContent = "₹0";
      document.getElementById("sum-deposit").textContent = "₹" + (bike ? bike.deposit : 0);
      document.getElementById("sum-total").textContent = "₹" + (rental + (bike ? bike.deposit : 0));
      form.dataset.rental = rental;
      form.dataset.total = rental + (bike ? bike.deposit : 0);
    } else {
      document.getElementById("sum-duration").textContent = "—";
      document.getElementById("sum-rental").textContent = "₹0";
      document.getElementById("sum-extra").textContent = "₹0";
      document.getElementById("sum-deposit").textContent = "₹" + (bike ? bike.deposit : 0);
      document.getElementById("sum-total").textContent = "₹0";
    }
  }

  ["change","input"].forEach(evt=>{
    form.addEventListener(evt, e=>{
      if(["bBike","bPickDate","bPickTime","bDropDate","bDropTime"].includes(e.target.id)){
        if(e.target.id === "bPickDate") dropDate.min = pickDate.value || today;
        updateSummary();
      }
    });
  });
  updateSummary();

  function genBookingId(){
    const n = Math.floor(1000 + Math.random()*9000);
    return "CC-" + new Date().getFullYear() + "-" + n;
  }

  form.addEventListener("submit", e=>{
    e.preventDefault();
    const errorEl = document.getElementById("booking-form-error");
    errorEl.textContent = "";

    const vals = Object.fromEntries(new FormData(form).entries());
    const bike = getBike();

    if(!bike || !bike.available){
      errorEl.textContent = "Please choose an available bike.";
      return;
    }
    if(vals.dropDate < vals.pickupDate || (vals.dropDate === vals.pickupDate && vals.dropTime <= vals.pickupTime)){
      errorEl.textContent = "Drop-off must be after pickup.";
      return;
    }
    if(!/^[0-9]{10}$/.test(vals.mobile)){
      errorEl.textContent = "Enter a valid 10-digit mobile number.";
      return;
    }

    const bookingId = genBookingId();
    const record = {
      id: bookingId,
      status: "Pending",
      createdAt: new Date().toISOString(),
      bike: bike.name,
      customer: vals.name,
      mobile: vals.mobile,
      email: vals.email,
      pickup: `${vals.pickupDate} ${vals.pickupTime}`,
      dropoff: `${vals.dropDate} ${vals.dropTime}`,
      total: form.dataset.total || 0
    };

    try{
      const existing = JSON.parse(localStorage.getItem("cc_bookings") || "[]");
      existing.unshift(record);
      localStorage.setItem("cc_bookings", JSON.stringify(existing));
    }catch(err){ /* localStorage unavailable — booking still shown on screen */ }

    document.getElementById("booking-step-form").style.display = "none";
    const confirmBox = document.getElementById("booking-step-confirm");
    confirmBox.style.display = "block";
    document.getElementById("confirm-id").textContent = bookingId;
    confirmBox.scrollIntoView({behavior:"smooth"});
  });
})();
