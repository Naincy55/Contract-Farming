document.addEventListener("DOMContentLoaded", () => {
  const loginSuccess = sessionStorage.getItem("loginSuccess");

  if (loginSuccess === "true") {
    showLoginSuccess();
    // ✅ Clear the flag so it doesn't show every time
    sessionStorage.removeItem("loginSuccess");
  }
});

// ✅ Function to show success message
function showLoginSuccess() {
  const successBox = document.createElement("div");
  successBox.textContent = "✅ Login Successful!";
  successBox.style.position = "fixed";
  successBox.style.top = "40%";
  successBox.style.left = "50%";
  successBox.style.transform = "translate(-50%, -50%)";
  successBox.style.background = "#fff";
  successBox.style.color = "green";
  successBox.style.padding = "20px 30px";
  successBox.style.borderRadius = "12px";
  successBox.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  successBox.style.fontSize = "18px";
  successBox.style.zIndex = "999";

  document.body.appendChild(successBox);

  // Remove after 3 seconds
  setTimeout(() => {
    successBox.remove();
  }, 3000);
}


// Update the name in the profile icon

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/me");
    if (!res.ok) throw new Error("Not logged in");

    const user = await res.json();

    // Replace placeholder with real data
    document.getElementById("dropdownName").textContent = user.name;


    } catch (err) {
    console.error("Error loading user:", err);
    window.location.href = "/loginfarmer"; // kick out if no session
  }
});















/* scripts.js - interaction for Cropset */
/* defensive helpers */
const $ = id => document.getElementById(id);



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


/* sample data for demo */
const cropData = {
  rabi: [
    { name: "Cauliflower", img: "https://media.istockphoto.com/id/524005764/photo/cauliflower.jpg?s=2048x2048&w=is&k=20&c=yjnvKpeD7HaHdHomFf0eeAsg7iRfG82onP3Bk0Z3j6E=" },
    { name: "Potato",  img: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg" },
    { name: "Cabbage",  img: "https://media.istockphoto.com/id/477419224/photo/fresh-cabbage-cross-section-with-water-drops.jpg?b=1&s=612x612&w=0&k=20&c=vnAcCfqx49H_9H5oUrJs0v6_wCKVSruVqy94di8q5tU=" },
    { name: "Peas", img: "https://media.istockphoto.com/id/155431404/photo/green-pea.jpg?b=1&s=612x612&w=0&k=20&c=GR5hogr4qIEZ8T5Waim5PXN0R1XEzliAv27EOow4-Aw=" },
    { name: "Spinach", img: "https://media.istockphoto.com/id/522189977/photo/spinach.jpg?s=1024x1024&w=is&k=20&c=Aa0Z3n0PFOE_wqgmtsQfodfNBhtbAiUu1sxgrudBoiI=" }

  ],
  kharif: [
    { name: "Onion", img: "https://images.pexels.com/photos/7129153/pexels-photo-7129153.jpeg" },
    { name: "Brinjal / Eggplant (Baingan)", img: "https://media.istockphoto.com/id/1438550144/photo/full-frame-image-of-pile-of-aubergines-in-crate-on-supermarket-shelves-elevated-view.jpg?b=1&s=612x612&w=0&k=20&c=e3KhnJX2YOVHP9H9OoXEc4sdjxrDfUiaOucqUyPytPc=" },
    { name: "Ladyfinger (Bhindi)", img: "https://images.pexels.com/photos/2583187/pexels-photo-2583187.jpeg" },
    { name: "Chillies (Mirch)", img: "https://images.pexels.com/photos/2893540/pexels-photo-2893540.jpeg" },
  ],
  zaid: [
    { name: "Cucumber (Kheera)", img: "https://media.istockphoto.com/id/1045761832/photo/fresh-green-cucumber-salad.jpg?s=2048x2048&w=is&k=20&c=eE9IjZKjR1sahPhGOr7oem1SYAdStTmPe8CFJBtfws4=" },
    { name: "Bitter gourd (Karela)", img: "https://images.pexels.com/photos/28909474/pexels-photo-28909474.jpeg" },
    { name: "Bottle gourd (Lauki)", img: "https://media.istockphoto.com/id/1194258667/photo/bottle-gourd-for-sale-in-market.jpg?b=1&s=612x612&w=0&k=20&c=gGAKg7x26sDuE20vXLEnWROTqxB7Ag_x-PSLYafKgp4=" },
    { name: "Sponge gourd (Tori)", img: "https://images.pexels.com/photos/4078078/pexels-photo-4078078.jpeg" }
  ]
};

/* initialize UI */
document.addEventListener('DOMContentLoaded', () => {
  // nav hamburger for mobile
  const hamburger = $('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger?.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
  });

  // profile dropdown toggle
  const profileBtn = $('profileBtn');
  const profileDropdown = $('profileDropdown');
  profileBtn?.addEventListener('click', (e) => {
    const open = profileDropdown.style.display === 'block';
    profileDropdown.style.display = open ? 'none' : 'block';
    profileBtn.setAttribute('aria-expanded', String(!open));
  });

  // close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    const p = $('profileMenu');
    if (!p) return;
    if (!p.contains(e.target)) {
      const d = $('profileDropdown');
      if (d) d.style.display = 'none';
      profileBtn?.setAttribute('aria-expanded', 'false');
    }
  });

$('logoutBtn')?.addEventListener('click', () => {
  // Optional: confirmation popup
  if (confirm("Are you sure you want to log out?")) {
    window.location.href = "/loginfarmer"; // Backend clears session & redirects
  }
});


  // load saved profile and photo
  loadProfileIntoUI();

  // render initial things
  renderStats();
  renderMessages();
  renderCropTypes('rabi');
  renderCropsList();

  // Chart
  initChart();

  // crop image preview
  const cropImage = $('cropImage');
  cropImage?.addEventListener('change', () => {
    const f = cropImage.files[0];
    const p = $('preview');
    if (!f) { p.style.display='none'; return; }
    const reader = new FileReader();
    reader.onload = () => { p.src = reader.result; p.style.display='block'; }
    reader.readAsDataURL(f);
  });






  // profile photo preview & save
  $('profileImage')?.addEventListener('change', (e) => {
    const f = e.target.files[0];
    if(!f) return;
    const r = new FileReader();
    r.onload = () => {
      $('profilePreview').src = r.result;
      $('profilePreview').style.display = 'block';
      localStorage.setItem('profilePhoto', r.result);
      loadProfileIntoUI();
    };
    r.readAsDataURL(f);
  });

  // profile form submit
  $('profileForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const profile = {
      name: $('name').value.trim(),
      farm: $('farm').value.trim(),
      contact: $('contact').value.trim(),
      region: $('region').value.trim()
    };
    localStorage.setItem('farmerProfile', JSON.stringify(profile));
    showToast('Profile saved');
    loadProfileIntoUI();
  });

  // clear profile
  $('clearProfile')?.addEventListener('click', () => {
    localStorage.removeItem('farmerProfile');
    localStorage.removeItem('profilePhoto');
    $('profileForm')?.reset();
    loadProfileIntoUI();
    showToast('Profile cleared');
  });

  // chips to switch crop types
  document.querySelectorAll('.chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.type;
      renderCropTypes(t);
    });
  });
});

let frontendCrops = []; // keeps track of crops for stats only

function renderStats() {
  const totalContracts = 10; // Always fixed at 10

  // Use frontendCrops array instead of localStorage
  const crops = frontendCrops;

  // Active = number of crops added
  const active = crops.length;

  // Pending = totalContracts - active
  const pending = totalContracts - active;

  // Earnings = sum of qty * price for all crops
  const earnings = crops.reduce((sum, c) => {
    const qty = parseFloat(c.quantity || c.qty) || 0; // support both keys if needed
    const price = parseFloat(c.price) || 0;
    return sum + (qty * price);
  }, 0);

  // Update HTML
  document.getElementById('totalContracts').textContent = totalContracts;
  document.getElementById('activeContracts').textContent = active;
  document.getElementById('pendingRequests').textContent = pending;
  document.getElementById('totalEarnings').textContent = `₹${earnings}`;
}



async function renderCropsList() {
  const container = document.getElementById("cropList");
  if (!container) return;

  try {
    const res = await fetch("/crops/my-crops");
    if (!res.ok) throw new Error("Network response was not ok");

    const data = await res.json();

    if (!data.success || !data.crops || data.crops.length === 0) {
      container.innerHTML = `<div class="card">No crops added yet.</div>`;
      frontendCrops = [];
      renderStats();
      return;
    }

    // ✅ map crops
    frontendCrops = data.crops.map(c => ({
      cropName: c.cropName,
      quantity: parseFloat(c.quantity),
      price: parseFloat(c.price)
    }));

    // ✅ render crops (prepend /uploads/ for images)
    container.innerHTML = data.crops.map(c => `
      <div class="crop-card" data-id="${c._id}">
        <button class="delete-btn" data-id="${c._id}" title="Remove Crop">🗑</button>
        ${c.img ? `<img src="/uploads/${c.img}" alt="${escapeHtml(c.cropName)}">` : ""}
        <div><strong>${escapeHtml(c.cropName)}</strong></div>
        <div class="muted">Qty: ${escapeHtml(c.quantity || '')} kg • ₹${escapeHtml(c.price || '')}/kg</div>
        <div class="muted">${escapeHtml(c.location || '')} • ${c.harvestDate ? new Date(c.harvestDate).toLocaleDateString() : ""}</div>
      </div>
    `).join('');

    renderStats();

    // ✅ handle delete
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const cropId = e.target.dataset.id;
        if (confirm("Are you sure you want to remove this crop?")) {
          try {
            const deleteRes = await fetch(`/crops/${cropId}`, { method: "DELETE" });
            const deleteData = await deleteRes.json();

            if (deleteData.success) {
              alert("✅ Crop deleted");
              await renderCropsList();
            } else {
              alert("❌ Failed to delete crop");
            }
          } catch (err) {
            console.error("❌ Error deleting crop:", err);
            alert("❌ Error deleting crop");
          }
        }
      });
    });

  } catch (err) {
    console.error("❌ Error loading crops:", err);
    container.innerHTML = `<div class="card">Failed to load crops.</div>`;
  }
}







// Call renderStats on page load
// document.addEventListener("DOMContentLoaded", renderStats);
  // crop form submit
 document.getElementById("cropForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cropName = document.getElementById("cropName").value;
  const quantity = document.getElementById("cropQty").value;
  const harvestDate = document.getElementById("harvestDate").value;
  const location = document.getElementById("cropLocation").value;
  const price = document.getElementById("cropPrice").value;
  const cropImage = document.getElementById("cropImage").files[0];

  const formData = new FormData();
  formData.append("cropName", cropName);
  formData.append("quantity", quantity);
  formData.append("harvestDate", harvestDate);
  formData.append("location", location);
  formData.append("price", price);
  formData.append("cropImage", cropImage);

  try {
    const res = await fetch("/crops/add", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    alert(data.message);

    if (data.success) {
  document.getElementById("cropForm").reset();
  document.getElementById("preview").src = "";
   // Add crop to frontend array for stats only
      frontendCrops.push({quantity, price });

      // Update dashboard stats
      renderStats();
      renderCropsList();
}

  } catch (err) {
    console.error("❌ Error adding crop:", err);
    alert("Failed to add crop");
  }
});





function renderMessages(){
  const list = $('recentMessages');
  const list2 = $('messagesList');
  if(list) list.innerHTML = messages.slice(0,3).map(m => `<li><strong>${escapeHtml(m.from)}:</strong> ${escapeHtml(m.text)}</li>`).join('');
  if(list2) list2.innerHTML = messages.map(m => `<div class="card"><strong>${escapeHtml(m.from)}</strong><div class="muted">${escapeHtml(m.text)}</div></div>`).join('');
}

function renderCropTypes(type){
  const container = $('seasonCropList');
  if(!container) return;
  const arr = cropData[type] || [];
  container.innerHTML = arr.map(c => `
    <div class="crop-card">
      <img src="${c.img}" alt="${escapeHtml(c.name)}">
      <div><strong>${escapeHtml(c.name)}</strong></div>
    </div>
  `).join('');
}






















/* profile load */
function loadProfileIntoUI(){
  const p = JSON.parse(localStorage.getItem('farmerProfile') || '{}');
  const photo = localStorage.getItem('profilePhoto');
  if(p.name) $('dropdownName').textContent = p.name; else $('dropdownName').textContent = 'Your Name';
  $('dropdownContact').textContent = p.contact || 'Contact';
  $('dropdownRegion').textContent = p.region || '';

  // navbar & dropdown photo
  if(photo){
    $('dropdownProfilePic').src = photo;
    $('navbarProfilePic').src = photo;
    $('profilePreview').src = photo; $('profilePreview').style.display = 'block';
  } else {
    $('dropdownProfilePic').src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    $('navbarProfilePic').src = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';
    $('profilePreview').style.display = 'none';
  }

  // populate profile form fields (if present)
  const form = $('profileForm');
  if(form){
    $('name').value = p.name || '';
    $('farm').value = p.farm || '';
    $('contact').value = p.contact || '';
    $('region').value = p.region || '';
  }
}

/* chart (Chart.js) */
let chartInstance = null;
function initChart(){
  const ctx = document.getElementById('earningsChart');
  if(!ctx) return;
  const labels = ['Tomatoes','Onions','Wheat','Others'];
  const data = {
    labels,
    datasets: [{
      label:'Revenue (₹)',
      data: [12000, 8000, 15000, 6000],
      backgroundColor: ['#4caf50','#66bb6a','#ffb74d','#f9d632']
    }]
  };
  chartInstance = new Chart(ctx, { type:'bar', data, options:{responsive:true,plugins:{legend:{display:false}}} });
}
function updateChart(){
  if(!chartInstance) return;
  // naive update based on number of crops
  const cnt = JSON.parse(localStorage.getItem('crops') || '[]').length;
  chartInstance.data.datasets[0].data = chartInstance.data.datasets[0].data.map(v => v + Math.floor(cnt * 200));
  chartInstance.update();
}

/* utilities */
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
}
function showToast(message){
  const t = document.createElement('div');
  t.textContent = message;
  t.style.cssText = 'position:fixed;right:20px;bottom:20px;padding:10px 14px;background:#4caf50;color:#fff;border-radius:8px;box-shadow:0 6px 20px rgba(0,0,0,0.12);z-index:9999';
  document.body.appendChild(t);
  setTimeout(()=> t.remove(),2200);
}
function escapeHtml(s){ if(s===undefined||s===null) return ''; return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }

// Show/Hide profile form
document.getElementById("updateProfileBtn").addEventListener("click", function() {
    const form = document.getElementById("profileForm");
    form.style.display = (form.style.display === "none" || form.style.display === "") ? "block" : "none";
});

// Hide after saving
document.getElementById("saveProfileBtn").addEventListener("click", function() {
    document.getElementById("profileForm").style.display = "none";
    alert("Profile saved successfully!");
});
