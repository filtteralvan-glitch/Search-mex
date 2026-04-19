// ======================== DATA SISWA ========================
const students = [
  { nis: "001", nama: "Ahmad Fauzi", kelas: "XII MIPA 1", gender: "L", universitas: "ITS", jurusan: "Teknik Informatika" },
  { nis: "002", nama: "Budi Santoso", kelas: "XII MIPA 1", gender: "L", universitas: "Universitas Brawijaya", jurusan: "Sistem Informasi" },
  { nis: "003", nama: "Citra Dewi", kelas: "XII MIPA 1", gender: "P", universitas: "Unair", jurusan: "Farmasi" },
  { nis: "004", nama: "Dian Permatasari", kelas: "XII MIPA 2", gender: "P", universitas: "ITS", jurusan: "Teknik Kimia" },
  { nis: "005", nama: "Eka Prasetya", kelas: "XII MIPA 2", gender: "L", universitas: "Universitas Gadjah Mada", jurusan: "Teknik Mesin" },
  { nis: "006", nama: "Fajar Nugroho", kelas: "XII MIPA 2", gender: "L", universitas: "Universitas Negeri Surabaya", jurusan: "Pendidikan Matematika" },
  { nis: "007", nama: "Gita Rahayu", kelas: "XII MIPA 3", gender: "P", universitas: "Unair", jurusan: "Kedokteran" },
  { nis: "008", nama: "Hendra Wijaya", kelas: "XII MIPA 3", gender: "L", universitas: "ITS", jurusan: "Teknik Elektro" },
  { nis: "009", nama: "Indah Lestari", kelas: "XII MIPA 3", gender: "P", universitas: "Universitas Brawijaya", jurusan: "Manajemen" },
  { nis: "010", nama: "Joko Susilo", kelas: "XII IPS 1", gender: "L", universitas: "Universitas Airlangga", jurusan: "Ilmu Hukum" },
  { nis: "011", nama: "Kartika Sari", kelas: "XII IPS 1", gender: "P", universitas: "Universitas Negeri Malang", jurusan: "Psikologi" },
  { nis: "012", nama: "Lukman Hakim", kelas: "XII IPS 1", gender: "L", universitas: "UIN Sunan Ampel", jurusan: "Ekonomi Syariah" },
  { nis: "013", nama: "Maya Sari", kelas: "XII IPS 2", gender: "P", universitas: "Universitas Brawijaya", jurusan: "Ilmu Komunikasi" },
  { nis: "014", nama: "Nanda Pratama", kelas: "XII IPS 2", gender: "L", universitas: "", jurusan: "" },
  { nis: "015", nama: "Oktavia Dewi", kelas: "XII IPS 2", gender: "P", universitas: "Universitas Negeri Surabaya", jurusan: "Pendidikan Bahasa Inggris" },
  { nis: "016", nama: "Putra Ardiansyah", kelas: "XII MIPA 1", gender: "L", universitas: "", jurusan: "" },
  { nis: "017", nama: "Rina Melati", kelas: "XII MIPA 2", gender: "P", universitas: "ITS", jurusan: "Teknik Lingkungan" },
  { nis: "018", nama: "Sandi Hermawan", kelas: "XII MIPA 3", gender: "L", universitas: "Universitas Gadjah Mada", jurusan: "Fisika" },
  { nis: "019", nama: "Tia Anggraini", kelas: "XII IPS 1", gender: "P", universitas: "Universitas Airlangga", jurusan: "Administrasi Publik" },
  { nis: "020", nama: "Umar Zaki", kelas: "XII IPS 2", gender: "L", universitas: "", jurusan: "" }
];

// Data kelas unik & wali kelas (untuk footer)
const kelasData = {
  "XII MIPA 1": { wali: "Bu Siti, M.Pd.", jumlah: students.filter(s => s.kelas === "XII MIPA 1").length },
  "XII MIPA 2": { wali: "Pak Budi, S.Si.", jumlah: students.filter(s => s.kelas === "XII MIPA 2").length },
  "XII MIPA 3": { wali: "Bu Dewi, M.Sc.", jumlah: students.filter(s => s.kelas === "XII MIPA 3").length },
  "XII IPS 1": { wali: "Pak Eko, S.Pd.", jumlah: students.filter(s => s.kelas === "XII IPS 1").length },
  "XII IPS 2": { wali: "Bu Rina, S.Sos.", jumlah: students.filter(s => s.kelas === "XII IPS 2").length }
};

// State
let currentKelas = "all"; // 'all' atau nama kelas
let currentGender = "all";
let currentSearch = "";
let currentPage = "all"; // 'all' atau 'ptn'

// DOM Elements
const splash = document.getElementById("splash");
const pageAll = document.getElementById("page-all");
const pagePtn = document.getElementById("page-ptn");
const navButtons = document.querySelectorAll(".npill");
const searchInput = document.getElementById("searchInput");
const kelasContainer = document.getElementById("kelasFilterContainer");
const infoKelasSpan = document.getElementById("infoKelas");
const infoCountSpan = document.getElementById("infoCount");
const cardsContainer = document.getElementById("cardsContainer");
const tableBody = document.getElementById("tableBody");
const ptnCardsContainer = document.getElementById("ptnCardsContainer");
const statSiswa = document.getElementById("stat-siswa");
const statPtn = document.getElementById("stat-ptn");
const ptnCountBanner = document.getElementById("ptnCountBanner");
const footerSiswa = document.getElementById("footerSiswa");
const footerPtn = document.getElementById("footerPtn");
const footerLk = document.getElementById("footerLk");
const footerPr = document.getElementById("footerPr");
const footerKelasList = document.getElementById("footerKelasList");

// Helper: filter data berdasarkan state
function getFilteredData() {
  let filtered = [...students];
  // Filter kelas
  if (currentKelas !== "all") {
    filtered = filtered.filter(s => s.kelas === currentKelas);
  }
  // Filter gender
  if (currentGender !== "all") {
    filtered = filtered.filter(s => s.gender === currentGender);
  }
  // Filter search (nama, nis, universitas)
  if (currentSearch.trim() !== "") {
    const searchLower = currentSearch.toLowerCase();
    filtered = filtered.filter(s =>
      s.nama.toLowerCase().includes(searchLower) ||
      s.nis.includes(searchLower) ||
      s.universitas.toLowerCase().includes(searchLower)
    );
  }
  return filtered;
}

function getPtnData() {
  return students.filter(s => s.universitas && s.universitas.trim() !== "");
}

// Render cards & table untuk halaman "Semua"
function renderAll() {
  const data = getFilteredData();
  // Update info bar
  let kelasDisplay = currentKelas === "all" ? "Semua Kelas" : currentKelas;
  infoKelasSpan.innerText = kelasDisplay;
  infoCountSpan.innerText = data.length;
  
  // Render cards
  if (data.length === 0) {
    cardsContainer.innerHTML = `<div class="empty"><div class="empty-ico"><i class="fas fa-user-graduate"></i></div><div class="empty-t">Tidak ada siswa ditemukan</div><div class="empty-s">Coba ubah filter atau kata kunci</div></div>`;
  } else {
    cardsContainer.innerHTML = data.map((s, idx) => `
      <div class="sc">
        <div class="sc-av" style="background: ${s.gender === 'L' ? 'linear-gradient(135deg,#38bdf8,#0284c7)' : 'linear-gradient(135deg,#f43f5e,#be123c)'}">${s.nama.charAt(0)}</div>
        <div class="sc-body">
          <div class="sc-name">${s.nama}</div>
          <div class="sc-tags">
            <span class="tag t-nis">NIS: ${s.nis}</span>
            <span class="tag t-cls">${s.kelas}</span>
            <span class="tag ${s.gender === 'L' ? 't-m' : 't-f'}">${s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}</span>
          </div>
          <div class="sc-row"><i class="fas fa-university"></i><span class="sc-univ-txt">${s.universitas || 'Belum masuk PTN'}</span></div>
          ${s.universitas ? `<div class="sc-row"><i class="fas fa-book-open"></i><span>${s.jurusan}</span></div>` : ''}
        </div>
      </div>
    `).join('');
  }
  
  // Render tabel
  tableBody.innerHTML = data.map((s, idx) => `
    <tr>
      <td class="td-no">${idx+1}</td>
      <td class="td-m">${s.nis}</td>
      <td class="td-n">${s.nama}</td>
      <td>${s.kelas}</td>
      <td><span class="${s.gender === 'L' ? 'g-m' : 'g-f'}"><i class="fas ${s.gender === 'L' ? 'fa-mars' : 'fa-venus'}"></i> ${s.gender === 'L' ? 'Laki' : 'Perempuan'}</span></td>
      <td>${s.universitas ? `<span class="univ-tag">${s.universitas}</span>` : '<span class="td-nil">—</span>'}</td>
      <td>${s.jurusan || '<span class="td-nil">—</span>'}</td>
    </tr>
  `).join('');
}

// Render halaman PTN
function renderPtn() {
  const ptnStudents = getPtnData();
  ptnCountBanner.innerText = ptnStudents.length;
  if (ptnStudents.length === 0) {
    ptnCardsContainer.innerHTML = `<div class="empty"><div class="empty-ico"><i class="fas fa-trophy"></i></div><div class="empty-t">Belum ada data PTN</div><div class="empty-s">Siswa yang diterima PTN akan muncul di sini</div></div>`;
  } else {
    ptnCardsContainer.innerHTML = ptnStudents.map(s => `
      <div class="sc ptn">
        <div class="sc-av" style="background: linear-gradient(135deg,#f59e0b,#b45309);">${s.nama.charAt(0)}</div>
        <div class="sc-body">
          <div class="sc-name">${s.nama}</div>
          <div class="sc-tags">
            <span class="tag t-nis">NIS: ${s.nis}</span>
            <span class="tag t-cls">${s.kelas}</span>
          </div>
          <div class="sc-row"><i class="fas fa-university"></i><span class="sc-univ-txt" style="color:var(--amber)">${s.universitas}</span></div>
          <div class="sc-row"><i class="fas fa-book-open"></i><span>${s.jurusan}</span></div>
        </div>
      </div>
    `).join('');
  }
}

// Update semua tampilan & statistik global
function updateAll() {
  const totalSiswa = students.length;
  const totalPtn = getPtnData().length;
  const totalLaki = students.filter(s => s.gender === "L").length;
  const totalPerempuan = students.filter(s => s.gender === "P").length;
  
  statSiswa.innerText = totalSiswa;
  statPtn.innerText = totalPtn;
  footerSiswa.innerText = totalSiswa;
  footerPtn.innerText = totalPtn;
  footerLk.innerText = totalLaki;
  footerPr.innerText = totalPerempuan;
  
  if (currentPage === "all") {
    renderAll();
  } else {
    renderPtn();
  }
}

// Event handlers
function onSearchInput(e) {
  currentSearch = e.target.value;
  updateAll();
}

function onKelasClick(kelas) {
  currentKelas = kelas;
  // Update active class pada tombol kelas
  document.querySelectorAll(".ktab").forEach(btn => {
    if (btn.dataset.kelas === kelas) btn.classList.add("on");
    else btn.classList.remove("on");
  });
  updateAll();
}

function onGenderClick(gender) {
  currentGender = gender;
  document.querySelectorAll(".chip").forEach(chip => {
    if (chip.dataset.gender === gender) chip.classList.add("active");
    else chip.classList.remove("active");
  });
  updateAll();
}

function onNavClick(page) {
  currentPage = page;
  if (page === "all") {
    pageAll.classList.remove("hidden");
    pagePtn.classList.add("hidden");
  } else {
    pageAll.classList.add("hidden");
    pagePtn.classList.remove("hidden");
    renderPtn();
  }
  navButtons.forEach(btn => {
    if (btn.dataset.page === page) btn.classList.add("on");
    else btn.classList.remove("on");
  });
  updateAll(); // update statistik tetap
}

// Generate tombol kelas
function generateKelasTabs() {
  const kelasUnik = [...new Set(students.map(s => s.kelas))];
  let html = `<button class="ktab on" data-kelas="all">Semua Kelas</button>`;
  kelasUnik.forEach(kelas => {
    html += `<button class="ktab" data-kelas="${kelas}">${kelas}</button>`;
  });
  kelasContainer.innerHTML = html;
  document.querySelectorAll(".ktab").forEach(btn => {
    btn.addEventListener("click", () => onKelasClick(btn.dataset.kelas));
  });
}

// Generate footer kelas list
function generateFooterKelas() {
  let html = "";
  for (const [kelas, info] of Object.entries(kelasData)) {
    html += `<div class="fkelas"><div><div class="fk-name">${kelas}</div><div class="fk-wali">${info.wali}</div></div><div class="fk-cnt">${info.jumlah} siswa</div></div>`;
  }
  footerKelasList.innerHTML = html;
}

// Inisialisasi event listeners
function init() {
  generateKelasTabs();
  generateFooterKelas();
  
  searchInput.addEventListener("input", onSearchInput);
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => onGenderClick(chip.dataset.gender));
  });
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => onNavClick(btn.dataset.page));
  });
  
  // Set default active gender
  currentGender = "all";
  document.querySelector('.chip[data-gender="all"]').classList.add("active");
  
  updateAll();
  
  // Hilangkan splash setelah 0.8 detik
  setTimeout(() => {
    splash.classList.add("out");
  }, 800);
}

// Start
init();      <td class="td-no">${idx+1}</td>
      <td class="td-m">${s.nis}</td>
      <td class="td-n">${s.nama}</td>
      <td>${s.kelas}</td>
      <td><span class="${s.gender === 'L' ? 'g-m' : 'g-f'}"><i class="fas ${s.gender === 'L' ? 'fa-mars' : 'fa-venus'}"></i> ${s.gender === 'L' ? 'Laki' : 'Perempuan'}</span></td>
      <td>${s.universitas ? `<span class="univ-tag">${s.universitas}</span>` : '<span class="td-nil">—</span>'}</td>
      <td>${s.jurusan || '<span class="td-nil">—</span>'}</td>
    </tr>
  `).join('');
}

// Render halaman PTN
function renderPtn() {
  const ptnStudents = getPtnData();
  ptnCountBanner.innerText = ptnStudents.length;
  if (ptnStudents.length === 0) {
    ptnCardsContainer.innerHTML = `<div class="empty"><div class="empty-ico"><i class="fas fa-trophy"></i></div><div class="empty-t">Belum ada data PTN</div><div class="empty-s">Siswa yang diterima PTN akan muncul di sini</div></div>`;
  } else {
    ptnCardsContainer.innerHTML = ptnStudents.map(s => `
      <div class="sc ptn">
        <div class="sc-av" style="background: linear-gradient(135deg,#f59e0b,#b45309);">${s.nama.charAt(0)}</div>
        <div class="sc-body">
          <div class="sc-name">${s.nama}</div>
          <div class="sc-tags">
            <span class="tag t-nis">NIS: ${s.nis}</span>
            <span class="tag t-cls">${s.kelas}</span>
          </div>
          <div class="sc-row"><i class="fas fa-university"></i><span class="sc-univ-txt" style="color:var(--amber)">${s.universitas}</span></div>
          <div class="sc-row"><i class="fas fa-book-open"></i><span>${s.jurusan}</span></div>
        </div>
      </div>
    `).join('');
  }
}

// Update statistik global (tanpa render ulang halaman penuh)
function updateStats() {
  const totalSiswa = students.length;
  const totalPtn = getPtnData().length;
  const totalLaki = students.filter(s => s.gender === "L").length;
  const totalPerempuan = students.filter(s => s.gender === "P").length;
  statSiswa.innerText = totalSiswa;
  statPtn.innerText = totalPtn;
  footerSiswa.innerText = totalSiswa;
  footerPtn.innerText = totalPtn;
  footerLk.innerText = totalLaki;
  footerPr.innerText = totalPerempuan;
}

// Update semua tampilan berdasarkan halaman aktif
function updateUI() {
  updateStats();
  if (currentPage === "all") {
    renderAll();
  } else {
    renderPtn();
  }
}

// Event handlers
function onSearchInput(e) {
  currentSearch = e.target.value;
  updateUI();
}

function onKelasClick(kelas) {
  currentKelas = kelas;
  document.querySelectorAll(".ktab").forEach(btn => {
    if (btn.dataset.kelas === kelas) btn.classList.add("on");
    else btn.classList.remove("on");
  });
  updateUI();
}

function onGenderClick(gender) {
  currentGender = gender;
  document.querySelectorAll(".chip").forEach(chip => {
    if (chip.dataset.gender === gender) chip.classList.add("active");
    else chip.classList.remove("active");
  });
  updateUI();
}

function onNavClick(page) {
  currentPage = page;
  if (page === "all") {
    pageAll.classList.remove("hidden");
    pagePtn.classList.add("hidden");
  } else {
    pageAll.classList.add("hidden");
    pagePtn.classList.remove("hidden");
  }
  navButtons.forEach(btn => {
    if (btn.dataset.page === page) btn.classList.add("on");
    else btn.classList.remove("on");
  });
  updateUI();
}

// Generate tombol kelas
function generateKelasTabs() {
  const kelasUnik = [...new Set(students.map(s => s.kelas))];
  let html = `<button class="ktab on" data-kelas="all">Semua Kelas</button>`;
  kelasUnik.forEach(kelas => {
    html += `<button class="ktab" data-kelas="${kelas}">${kelas}</button>`;
  });
  kelasContainer.innerHTML = html;
  document.querySelectorAll(".ktab").forEach(btn => {
    btn.addEventListener("click", () => onKelasClick(btn.dataset.kelas));
  });
}

// Generate footer kelas list
function generateFooterKelas() {
  let html = "";
  for (const [kelas, info] of Object.entries(kelasData)) {
    html += `<div class="fkelas"><div><div class="fk-name">${kelas}</div><div class="fk-wali">${info.wali}</div></div><div class="fk-cnt">${info.jumlah} siswa</div></div>`;
  }
  footerKelasList.innerHTML = html;
}

// Inisialisasi event listeners dan render awal
function init() {
  generateKelasTabs();
  generateFooterKelas();
  
  searchInput.addEventListener("input", onSearchInput);
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => onGenderClick(chip.dataset.gender));
  });
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => onNavClick(btn.dataset.page));
  });
  
  currentGender = "all";
  document.querySelector('.chip[data-gender="all"]').classList.add("active");
  
  updateUI();
  
  // Pastikan splash hilang setelah 0.8 detik, ditambah fallback jika error
  if (splash) {
    setTimeout(() => {
      splash.classList.add("out");
    }, 800);
  } else {
    console.warn("Splash element not found");
  }
}

// Jalankan init setelah DOM siap
document.addEventListener("DOMContentLoaded", init);
