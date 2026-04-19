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
init();      { no: 17, induk: "2034", nama: "Kayla Bilqis Arthalia", gender: "P", ortu: "Suwana Budi", univ: "", jurusan: "" },
      { no: 18, induk: "2049", nama: "M. Haikal Alamhudi Dzulhaqqi", gender: "L", ortu: "Dedi Setiawan", univ: "", jurusan: "" },
      { no: 19, induk: "2063", nama: "Mochammad Rifan Afifi", gender: "L", ortu: "Zainul Afif", univ: "", jurusan: "" },
      { no: 20, induk: "2068", nama: "Muhamad Irfad Fandi Abdillah", gender: "L", ortu: "Imam Wahyudi", univ: "", jurusan: "" },
      { no: 21, induk: "2069", nama: "Muhammad Alfa Rizzi Aldiansyah", gender: "L", ortu: "Rony Christiawan", univ: "", jurusan: "" },
      { no: 22, induk: "2079", nama: "Muhammad Fath Rasya Setyawan", gender: "L", ortu: "Rukminto Yudi Setyawan, S.T.", univ: "", jurusan: "" },
      { no: 23, induk: "2082", nama: "Muhammad Ilham Gufianto", gender: "L", ortu: "Gufron", univ: "", jurusan: "" },
      { no: 24, induk: "2086", nama: "Muhammad Nybras Durroyya Attaqi", gender: "L", ortu: "Muttaqin", univ: "", jurusan: "" },
      { no: 25, induk: "2087", nama: "Muhammad Rafkha Zaidan", gender: "L", ortu: "Helmi Hermanto, S.Sos", univ: "", jurusan: "" },
      { no: 26, induk: "2101", nama: "Nadiyah Puspa Sari", gender: "P", ortu: "Djoko Subiyanto", univ: "Poltekkes Kemenkes Surabaya", jurusan: "D3 Keperawatan" },
      { no: 27, induk: "2102", nama: "Najwa Deswinta Syaharani", gender: "P", ortu: "Suwignyo", univ: "Poltekkes Kemenkes Malang", jurusan: "D4 Keselamatan & Kesehatan Kerja" },
      { no: 28, induk: "2103", nama: "Narendra Raditya Afrizal", gender: "L", ortu: "Sapriadi", univ: "", jurusan: "" },
      { no: 29, induk: "2109", nama: "Naya Alodia Sari Adinata", gender: "P", ortu: "Noto Rejo", univ: "", jurusan: "" },
      { no: 30, induk: "2114", nama: "Novianti Puspita Ningrum", gender: "P", ortu: "Suwarno", univ: "", jurusan: "" },
      { no: 31, induk: "2124", nama: "Rado Dwi Anugrah Nasta'in Putra", gender: "L", ortu: "M.H. Nasta'in", univ: "", jurusan: "" },
      { no: 32, induk: "2136", nama: "Rania Faiqotul Himma Arif Putri", gender: "P", ortu: "Arif Supriyono", univ: "Universitas Negeri Malang", jurusan: "S1 Kimia" },
      { no: 33, induk: "2146", nama: "Rifkhi Ahmadhika", gender: "L", ortu: "Witanto", univ: "", jurusan: "" },
      { no: 34, induk: "2164", nama: "Shinta Bunga Anggraini", gender: "P", ortu: "Hari Purwanto", univ: "", jurusan: "" },
      { no: 35, induk: "2175", nama: "Vindy Dwi Agita Putri", gender: "P", ortu: "Agus Rumawan", univ: "Universitas Brawijaya", jurusan: "S1 Kebidanan" },
      { no: 36, induk: "2176", nama: "Vinza Aleisya Cahya Khoirunnisa", gender: "P", ortu: "Moch Soleh", univ: "", jurusan: "" }
    ]
  },
  "F-4": {
    wali: "Moch. Salim Imron, S.Pd.",
    total: 33,
    putra: 22,
    putri: 11,
    students: [
      { no: 1, induk: "1916", nama: "Afrizal Risky Dirgantara", gender: "L", ortu: "Slamet", univ: "", jurusan: "" },
      { no: 2, induk: "1921", nama: "Aisyah Nur Safitri", gender: "P", ortu: "Muh. Lazim", univ: "", jurusan: "" },
      { no: 3, induk: "1922", nama: "Al-Fatih Izzamudin Azka", gender: "L", ortu: "Ferry Eka Aprillia, S.Pd.", univ: "", jurusan: "" },
      { no: 4, induk: "1923", nama: "Alcito Armana Geraldy", gender: "L", ortu: "Darmono Hadi", univ: "", jurusan: "" },
      { no: 5, induk: "1924", nama: "Aldrich Gerrard Starly Paleba", gender: "L", ortu: "Donald Jechson Paleba", univ: "", jurusan: "" },
      { no: 6, induk: "1937", nama: "Angga Putra Firmansyah", gender: "L", ortu: "Agus Basuki", univ: "", jurusan: "" },
      { no: 7, induk: "1959", nama: "Azmil Dhea Lailatul Izza", gender: "P", ortu: "Syaiful Mubin", univ: "", jurusan: "" },
      { no: 8, induk: "1992", nama: "Evan Raissa Oktavianda", gender: "L", ortu: "Endra Santosa", univ: "", jurusan: "" },
      { no: 9, induk: "1994", nama: "Fahrani Widya Sari", gender: "P", ortu: "Risal Fauji", univ: "", jurusan: "" },
      { no: 10, induk: "1996", nama: "Faizah Putri Aurel", gender: "P", ortu: "Juni Hariyanto", univ: "", jurusan: "" },
      { no: 11, induk: "2005", nama: "Galang Satria Sofian", gender: "L", ortu: "Alfan Soefian", univ: "", jurusan: "" },
      { no: 12, induk: "2009", nama: "Giovanni Widyatmoko", gender: "L", ortu: "Musfiddin, S.T.", univ: "", jurusan: "" },
      { no: 13, induk: "2017", nama: "Husain Ali", gender: "L", ortu: "Yahya Chalid", univ: "", jurusan: "" },
      { no: 14, induk: "2022", nama: "Immanuel Rasya Jaya Pratama", gender: "L", ortu: "Rahmad Agung Wijaya", univ: "", jurusan: "" },
      { no: 15, induk: "2055", nama: "Margareth Liliana Lukman Simbolon", gender: "P", ortu: "Robin Lukman Simbolon", univ: "", jurusan: "" },
      { no: 16, induk: "2056", nama: "Meyshia Putri Wandaya", gender: "P", ortu: "Swandaya", univ: "", jurusan: "" },
      { no: 17, induk: "2072", nama: "Muhammad Asy Syams", gender: "L", ortu: "Sudarno", univ: "", jurusan: "" },
      { no: 18, induk: "2083", nama: "Muhammad Naufal Hafizh Iram", gender: "L", ortu: "Bambang Tri Sambodo", univ: "", jurusan: "" },
      { no: 19, induk: "2084", nama: "Muhammad Nur Iman Bayu Aji Restu Istika", gender: "L", ortu: "Nur Basuki S.Sos", univ: "", jurusan: "" },
      { no: 20, induk: "2089", nama: "Muhammad Rizq Hisaam", gender: "L", ortu: "Heny Andrysol", univ: "", jurusan: "" },
      { no: 21, induk: "2093", nama: "Murobby Patih Al Farroz", gender: "L", ortu: "Didik Puriyanto", univ: "", jurusan: "" },
      { no: 22, induk: "2098", nama: "Nadia Aqila Jala Ningtyas", gender: "P", ortu: "Dirgantoro", univ: "Politeknik Negeri Malang", jurusan: "D4 Teknologi Kimia Industri" },
      { no: 23, induk: "2134", nama: "Randy Aditya Rahman", gender: "L", ortu: "Abdul Rahman", univ: "", jurusan: "" },
      { no: 24, induk: "2135", nama: "Rangga Arya Pratama", gender: "L", ortu: "Agung Irawan", univ: "", jurusan: "" },
      { no: 25, induk: "2138", nama: "Reivan Giorgie", gender: "L", ortu: "Dyah Susilowati", univ: "", jurusan: "" },
      { no: 26, induk: "2143", nama: "Rezvan Miftahul Sugiarto", gender: "L", ortu: "Bambang Sugiarto", univ: "", jurusan: "" },
      { no: 27, induk: "2144", nama: "Rheihan Iqbal Baskara", gender: "L", ortu: "Kisriyono", univ: "", jurusan: "" },
      { no: 28, induk: "2147", nama: "Rizqi Cigra Akbar", gender: "L", ortu: "Koesnanto", univ: "", jurusan: "" },
      { no: 29, induk: "2160", nama: "Sekar Ageng Kristia Ningrum", gender: "P", ortu: "Suradji", univ: "", jurusan: "" },
      { no: 30, induk: "2191", nama: "Tiara Amelia Azzahra", gender: "P", ortu: "Suyitno", univ: "Universitas Airlangga", jurusan: "D3 Perpajakan" },
      { no: 31, induk: "2173", nama: "Verlita Aura Oktaviani", gender: "P", ortu: "Fajar Shodiq", univ: "UIN Sunan Ampel Surabaya", jurusan: "S1 Akuntansi" },
      { no: 32, induk: "2177", nama: "Vivian Marthen Liem", gender: "P", ortu: "Marthen", univ: "", jurusan: "" },
      { no: 33, induk: "2179", nama: "Wildan Muh Aziz Al Muttaqin", gender: "L", ortu: "Dalinu", univ: "Poltekkes Kemenkes Surabaya", jurusan: "D3 Teknologi Laboratorium Medis" }
    ]
  },
  "F-5": {
    wali: "Septi Rosiana Dewi, S.Si.",
    total: 35,
    putra: 14,
    putri: 21,
    students: [
      { no: 1, induk: "1910", nama: "Adelia Chika Putri Febriyanti", gender: "P", ortu: "Mochammad Bastoni", univ: "", jurusan: "" },
      { no: 2, induk: "1913", nama: "Adonis William Krisma Waruwu", gender: "L", ortu: "Desima Waruwu", univ: "", jurusan: "" },
      { no: 3, induk: "1933", nama: "Andi Yosia Imanuel", gender: "L", ortu: "Andi Subroto", univ: "", jurusan: "" },
      { no: 4, induk: "1936", nama: "Andri Kurniawan", gender: "L", ortu: "Abdu Salam", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Teknik Industri" },
      { no: 5, induk: "1945", nama: "Ariya Vinodhion Regitama", gender: "L", ortu: "Nur Kasan", univ: "", jurusan: "" },
      { no: 6, induk: "1955", nama: "Ayu Mulia Bened Marhanis", gender: "P", ortu: "Benediktus Paryanto", univ: "", jurusan: "" },
      { no: 7, induk: "1960", nama: "Balqis Alizza Rismala", gender: "P", ortu: "Ali Fatchur Rohman", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Kedokteran" },
      { no: 8, induk: "1966", nama: "Chintia Fitri Rahayu", gender: "P", ortu: "Sugiyanto", univ: "", jurusan: "" },
      { no: 9, induk: "1968", nama: "Chriscentia Harum Nugroho", gender: "P", ortu: "Dhani Bagus Nugroho", univ: "", jurusan: "" },
      { no: 10, induk: "1981", nama: "Devinta Jala Mandalika", gender: "P", ortu: "Supriono", univ: "", jurusan: "" },
      { no: 11, induk: "1983", nama: "Dhimas Satrio Utomo", gender: "L", ortu: "Gatot Jati Kiswanto", univ: "", jurusan: "" },
      { no: 12, induk: "1986", nama: "Dwi Indah Safitri", gender: "P", ortu: "Isnul Huda (Alm)", univ: "", jurusan: "" },
      { no: 13, induk: "1997", nama: "Farel Gading Hartono", gender: "L", ortu: "Hartono Eko Wadi", univ: "", jurusan: "" },
      { no: 14, induk: "2003", nama: "Fitri Yatul Habibah", gender: "P", ortu: "Purnomo", univ: "Institut Teknologi Sepuluh Nopember", jurusan: "S1 Matematika" },
      { no: 15, induk: "2010", nama: "Gladys Setya Putri Artika", gender: "P", ortu: "Muchli Zartika", univ: "UIN Maulana Malik Ibrahim Malang", jurusan: "S1 Farmasi" },
      { no: 16, induk: "2028", nama: "Jihan Salwa Dwi Rahayu", gender: "P", ortu: "Rakidi (Alm)", univ: "", jurusan: "" },
      { no: 17, induk: "2030", nama: "Juan Fairuz Akbar Bhama Kerti", gender: "L", ortu: "Poedji Tjahyono (Alm)", univ: "", jurusan: "" },
      { no: 18, induk: "2044", nama: "Lucas Farrel Noah", gender: "L", ortu: "Atok Subiyanto", univ: "", jurusan: "" },
      { no: 19, induk: "2058", nama: "Mikhael Jerry", gender: "L", ortu: "Lucky Soepriatman", univ: "", jurusan: "" },
      { no: 20, induk: "2070", nama: "Muhammad Alvan Putra Safi'i", gender: "L", ortu: "Imam Safi'i", univ: "", jurusan: "" },
      { no: 21, induk: "2106", nama: "Nathania Aurellie Singgiharto", gender: "P", ortu: "Agus Singgiharto", univ: "", jurusan: "" },
      { no: 22, induk: "2110", nama: "Nayla Nazwa Syafira", gender: "P", ortu: "Moh. Purwanto", univ: "", jurusan: "" },
      { no: 23, induk: "2111", nama: "Nayya Destiani", gender: "P", ortu: "Budi Waluyo", univ: "", jurusan: "" },
      { no: 24, induk: "2116", nama: "Oktamelia Rahma Tohari", gender: "P", ortu: "Chamim Tohari", univ: "", jurusan: "" },
      { no: 25, induk: "2119", nama: "Putri Fauziyah Andini", gender: "P", ortu: "Moh. Sobir", univ: "", jurusan: "" },
      { no: 26, induk: "2126", nama: "Raffel Aditya Syahputra", gender: "L", ortu: "Nursin", univ: "", jurusan: "" },
      { no: 27, induk: "2130", nama: "Raisah Rizqi Naira", gender: "P", ortu: "Herniawan", univ: "", jurusan: "" },
      { no: 28, induk: "2140", nama: "Restu Bumi", gender: "P", ortu: "Agung", univ: "", jurusan: "" },
      { no: 29, induk: "2145", nama: "Ridwan Athallah Zachrie", gender: "L", ortu: "Wahyu Irawan", univ: "Poltekkes Kemenkes Surabaya", jurusan: "D4 Keperawatan" },
      { no: 30, induk: "2149", nama: "Romy Alireza", gender: "L", ortu: "Siswoyo", univ: "", jurusan: "" },
      { no: 31, induk: "2150", nama: "Sacha Laura Dominique", gender: "P", ortu: "Tri Supartono", univ: "", jurusan: "" },
      { no: 32, induk: "2158", nama: "Santa Christian Vernando", gender: "L", ortu: "Budi Santoso", univ: "", jurusan: "" },
      { no: 33, induk: "2163", nama: "Shereen Zaizafun Daiman Putri", gender: "P", ortu: "Daiman", univ: "", jurusan: "" },
      { no: 34, induk: "2170", nama: "Tita Nanda Dwi Karunia", gender: "P", ortu: "Budi Utomo", univ: "", jurusan: "" },
      { no: 35, induk: "2171", nama: "Tri Wulan Sabila Ramadhani", gender: "P", ortu: "Paini", univ: "", jurusan: "" }
    ]
  },
  "F-6": {
    wali: "Pungki Triyanto, M.Pd.",
    total: 36,
    putra: 20,
    putri: 16,
    students: [
      { no: 1, induk: "1914", nama: "Afifah Tsuraya Haziqah", gender: "P", ortu: "Hermawan Wicaksana Putra", univ: "UIN Sunan Ampel Surabaya", jurusan: "S1 Sosiologi" },
      { no: 2, induk: "1919", nama: "Ainiya Hana", gender: "P", ortu: "Mokhamad Ridwan", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Administrasi Publik" },
      { no: 3, induk: "1930", nama: "Amalia Istiqomah", gender: "P", ortu: "Suyono", univ: "", jurusan: "" },
      { no: 4, induk: "1934", nama: "Andra Akhbar Satria Putra", gender: "L", ortu: "Samsul Hidayat", univ: "", jurusan: "" },
      { no: 5, induk: "1940", nama: "Annisa Azzahra Maulani Putri", gender: "P", ortu: "Khoirul Anam", univ: "", jurusan: "" },
      { no: 6, induk: "1943", nama: "Apriliana Azizah Putri", gender: "P", ortu: "Edi Purwanto", univ: "", jurusan: "" },
      { no: 7, induk: "1944", nama: "Araka Hasya", gender: "L", ortu: "Bayu Yusti Yuwana", univ: "", jurusan: "" },
      { no: 8, induk: "1951", nama: "Arya Tri Husada", gender: "L", ortu: "Anang Suwandi", univ: "", jurusan: "" },
      { no: 9, induk: "1956", nama: "Aziiz Abdul Razzaaq", gender: "L", ortu: "Darman", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Hubungan Internasional" },
      { no: 10, induk: "2189", nama: "Bintang Maulana Hafiiz", gender: "L", ortu: "Iswahyudi", univ: "", jurusan: "" },
      { no: 11, induk: "1979", nama: "Decko Saseno Wijaya", gender: "L", ortu: "Decky Wijaya", univ: "", jurusan: "" },
      { no: 12, induk: "1988", nama: "Dzu Izzi Ahmad Iklila", gender: "L", ortu: "Muladi (Alm)", univ: "", jurusan: "" },
      { no: 13, induk: "1995", nama: "Fahriansyah Yuliandaro Siregar", gender: "L", ortu: "Yunus Syarifuddin Siregar", univ: "", jurusan: "" },
      { no: 14, induk: "2000", nama: "Febriana Az-Zahra Waani", gender: "P", ortu: "Muhaimin", univ: "Politeknik Perkapalan Negeri Surabaya", jurusan: "D4 Manajemen Bisnis" },
      { no: 15, induk: "2001", nama: "Feliecia Az-Zahra", gender: "P", ortu: "Moch Supi'i", univ: "", jurusan: "" },
      { no: 16, induk: "2023", nama: "Indi Adina Kurnia", gender: "P", ortu: "Zaki Kurnia", univ: "", jurusan: "" },
      { no: 17, induk: "2025", nama: "Jennya Ladysta Sri Priyanti", gender: "P", ortu: "Supriyanto", univ: "UIN Sunan Ampel Surabaya", jurusan: "S1 Psikologi" },
      { no: 18, induk: "2031", nama: "Juandika Maulana", gender: "L", ortu: "Indarto", univ: "", jurusan: "" },
      { no: 19, induk: "2036", nama: "Keyzha Martha Zerlina Putri", gender: "P", ortu: "Doris Prasetyono", univ: "", jurusan: "" },
      { no: 20, induk: "2050", nama: "M. Rama Hartawan", gender: "L", ortu: "Amirul Mu'minin", univ: "", jurusan: "" },
      { no: 21, induk: "2053", nama: "Mukhamad Yusuf Arya Suta", gender: "L", ortu: "Dwi Siswanto", univ: "", jurusan: "" },
      { no: 22, induk: "2061", nama: "Moch. Rizal", gender: "L", ortu: "Bambang Triyono", univ: "", jurusan: "" },
      { no: 23, induk: "2062", nama: "Mochammad Isro' Irsyad N.", gender: "L", ortu: "Soirodin", univ: "", jurusan: "" },
      { no: 24, induk: "2067", nama: "Muhamad Giland Ramadhan", gender: "L", ortu: "Suyatno", univ: "", jurusan: "" },
      { no: 25, induk: "2076", nama: "Muhammad Fahri Javier Asyifa'", gender: "L", ortu: "Suwandik", univ: "", jurusan: "" },
      { no: 26, induk: "2078", nama: "Muhammad Farel Dyca Irawan", gender: "L", ortu: "Rumandi (Alm)", univ: "", jurusan: "" },
      { no: 27, induk: "2091", nama: "Muhammad Yusuf Abyztha Endrisma", gender: "L", ortu: "Endra Setyo Budi", univ: "", jurusan: "" },
      { no: 28, induk: "2104", nama: "Natasya Salsabillah", gender: "P", ortu: "Moch Wahib", univ: "", jurusan: "" },
      { no: 29, induk: "2120", nama: "Putri Nur Ainiyah Salsabilah", gender: "P", ortu: "Nur Qomari", univ: "", jurusan: "" },
      { no: 30, induk: "2131", nama: "Raisya Nazwa Pradisti", gender: "P", ortu: "Pambudi Juniarto", univ: "", jurusan: "" },
      { no: 31, induk: "2137", nama: "Rechan Alfarel Ramadhani", gender: "L", ortu: "Agus Toni Sapto Budhiarto", univ: "", jurusan: "" },
      { no: 32, induk: "2151", nama: "Safinatun Najah", gender: "P", ortu: "Irawan", univ: "Universitas Brawijaya", jurusan: "S1 Perencanaan Wilayah & Kota" },
      { no: 33, induk: "2157", nama: "Sandy Dimas Kurniawan Prayoga", gender: "L", ortu: "Supriyantono", univ: "", jurusan: "" },
      { no: 34, induk: "2167", nama: "Tasya Agustia", gender: "P", ortu: "Solichan Noor", univ: "", jurusan: "" },
      { no: 35, induk: "2178", nama: "Wahyu Aprilia Guritno", gender: "P", ortu: "Kariono", univ: "", jurusan: "" },
      { no: 36, induk: "2188", nama: "Zico Canavaro Putra Ananto", gender: "L", ortu: "Tri Yunianto", univ: "", jurusan: "" }
    ]
  },
  "F-7": {
    wali: "Sintya Risyulianita Masella, S.Pd.",
    total: 32,
    putra: 20,
    putri: 12,
    students: [
      { no: 1, induk: "1939", nama: "Anggra Teguh Samudera", gender: "L", ortu: "Teguh Raharjo", univ: "", jurusan: "" },
      { no: 2, induk: "1941", nama: "Anugrah Yuan Putra", gender: "L", ortu: "Andri Kurniawan", univ: "", jurusan: "" },
      { no: 3, induk: "1950", nama: "Arya Dimas Putra", gender: "L", ortu: "Zaldy", univ: "", jurusan: "" },
      { no: 4, induk: "1969", nama: "Christyo Bimo Saputro", gender: "L", ortu: "Satyo Ari Wibowo", univ: "", jurusan: "" },
      { no: 5, induk: "1974", nama: "Danu Reza", gender: "L", ortu: "Bahari Stiok", univ: "", jurusan: "" },
      { no: 6, induk: "1985", nama: "Dimas Alif Putra Alfahrizi", gender: "L", ortu: "Mokhammad Rofik", univ: "", jurusan: "" },
      { no: 7, induk: "2012", nama: "Hafizh Al Mughny", gender: "L", ortu: "Mauidatul Hasanah", univ: "", jurusan: "" },
      { no: 8, induk: "2014", nama: "Hanifa Putri Aulia", gender: "P", ortu: "Sutris", univ: "", jurusan: "" },
      { no: 9, induk: "2021", nama: "Ignatius Giovani Tri Juniarto", gender: "L", ortu: "Yohanes B. Anang Suhardianto", univ: "", jurusan: "" },
      { no: 10, induk: "2024", nama: "Jelita Syifarani", gender: "P", ortu: "Martoyo", univ: "", jurusan: "" },
      { no: 11, induk: "2027", nama: "Jessica Putri Devina", gender: "P", ortu: "Budiriva", univ: "", jurusan: "" },
      { no: 12, induk: "2032", nama: "Jufrian Dimas Saputra", gender: "L", ortu: "Achmad Djufri", univ: "", jurusan: "" },
      { no: 13, induk: "2033", nama: "Kaneisya Anadyaza", gender: "P", ortu: "Aan Kurniawan", univ: "", jurusan: "" },
      { no: 14, induk: "2039", nama: "Kinanti Dwi Arthalita", gender: "P", ortu: "Abdulloh", univ: "", jurusan: "" },
      { no: 15, induk: "2041", nama: "Kirana Nadiyah Restu Permono", gender: "P", ortu: "Adi Permono", univ: "", jurusan: "" },
      { no: 16, induk: "2043", nama: "Louisa Kathleen Anastasia Armansyah", gender: "P", ortu: "Wody Armansyah S.E", univ: "", jurusan: "" },
      { no: 17, induk: "2052", nama: "Muhammad Sulthan Nafis Muhtaram", gender: "L", ortu: "Dwi Purnomo", univ: "", jurusan: "" },
      { no: 18, induk: "2059", nama: "Moch. Akbar Putra Yalasena", gender: "L", ortu: "Rudy Sumariyono S.H.", univ: "", jurusan: "" },
      { no: 19, induk: "2066", nama: "Mohammad Farhad Fauqi", gender: "L", ortu: "Mochamad Achmadi", univ: "", jurusan: "" },
      { no: 20, induk: "2073", nama: "Muhammad Beryl Atha Majaya", gender: "L", ortu: "Yusroni", univ: "", jurusan: "" },
      { no: 21, induk: "2074", nama: "Muhammad Daffa Aswangga", gender: "L", ortu: "Aris Budiono", univ: "", jurusan: "" },
      { no: 22, induk: "2081", nama: "Muhammad Ibrahim Syahputra", gender: "L", ortu: "Nur Hasyim", univ: "", jurusan: "" },
      { no: 23, induk: "2095", nama: "Nabil Akhtar Firdaus", gender: "L", ortu: "Iwan Kusmiadi", univ: "", jurusan: "" },
      { no: 24, induk: "2100", nama: "Nadia Vega", gender: "P", ortu: "Erik Wahyudi", univ: "", jurusan: "" },
      { no: 25, induk: "2122", nama: "Radhitya Rasyidhin", gender: "L", ortu: "Rully Raharjo", univ: "", jurusan: "" },
      { no: 26, induk: "2125", nama: "Rafael Rio Fritz Armawan", gender: "L", ortu: "Andri Armawan", univ: "", jurusan: "" },
      { no: 27, induk: "2129", nama: "Raihan Fachri Ar - Rasyid", gender: "L", ortu: "Rosyid", univ: "", jurusan: "" },
      { no: 28, induk: "2142", nama: "Reysha Hartika Aprilyanti", gender: "P", ortu: "Hariyono Hendra Setyawan", univ: "", jurusan: "" },
      { no: 29, induk: "2155", nama: "Salsabila Nur Zam", gender: "P", ortu: "Zamroni (Alm)", univ: "", jurusan: "" },
      { no: 30, induk: "2165", nama: "Sindy Aulia Nur Agustin Santoso", gender: "P", ortu: "Puguh Santoso", univ: "", jurusan: "" },
      { no: 31, induk: "2169", nama: "Tiara Jane Amalia Putri", gender: "P", ortu: "Sajidin (Alm)", univ: "", jurusan: "" },
      { no: 32, induk: "2185", nama: "Yuda", gender: "L", ortu: "Purnomo", univ: "", jurusan: "" }
    ]
  },
  "F-8": {
    wali: "Putri Amalia Salsabila, S.Pd.",
    total: 32,
    putra: 15,
    putri: 21,
    students: [
      { no: 1, induk: "1925", nama: "Alriska Vonickiranadyah Paramadewi", gender: "P", ortu: "Yudi Darmawan", univ: "", jurusan: "" },
      { no: 2, induk: "1928", nama: "Alyaa' Yumnaa", gender: "P", ortu: "Sutejo", univ: "Universitas Negeri Surabaya", jurusan: "S1 Sosiologi" },
      { no: 3, induk: "1929", nama: "Alycia Tara Dewi Hardiyanti", gender: "P", ortu: "Kokok Hardioko", univ: "", jurusan: "" },
      { no: 4, induk: "1938", nama: "Anggie Ilmi Nafiq Ariesta", gender: "P", ortu: "Suyagi", univ: "", jurusan: "" },
      { no: 5, induk: "1946", nama: "Armandyga Oktarivio", gender: "L", ortu: "Ony Purwanto (Alm)", univ: "", jurusan: "" },
      { no: 6, induk: "1952", nama: "Aulia Salma Azzahrah", gender: "P", ortu: "Mochammad Toyib", univ: "Universitas Negeri Malang", jurusan: "S1 Pendidikan Tata Boga" },
      { no: 7, induk: "1954", nama: "Aura Rizq Farsya Anandia", gender: "P", ortu: "Ir. Nanang Marsudi", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Desain Komunikasi Visual" },
      { no: 8, induk: "1976", nama: "Dava Irsyadul Ibad Maulidy", gender: "L", ortu: "Soejono", univ: "", jurusan: "" },
      { no: 9, induk: "1980", nama: "Deskta Syaputra", gender: "L", ortu: "Firman Wahyudi", univ: "", jurusan: "" },
      { no: 10, induk: "1982", nama: "Dewi Tri Andini", gender: "P", ortu: "Sukariadi", univ: "", jurusan: "" },
      { no: 11, induk: "2002", nama: "Ferdyan Arta Yudhistira", gender: "L", ortu: "Arianto", univ: "", jurusan: "" },
      { no: 12, induk: "2008", nama: "Gendhis Tri Arianti Sya'diah", gender: "P", ortu: "Agus Arianto", univ: "Universitas Negeri Surabaya", jurusan: "S1 Pendidikan IPS" },
      { no: 13, induk: "2015", nama: "Harist Al Mughny", gender: "L", ortu: "Mauidatul Hasanah", univ: "", jurusan: "" },
      { no: 14, induk: "2026", nama: "Jesica Aulia Rahma", gender: "P", ortu: "Chusnul", univ: "", jurusan: "" },
      { no: 15, induk: "2038", nama: "Khiar Gathan Abinaya", gender: "L", ortu: "Ahmad Junaidi", univ: "", jurusan: "" },
      { no: 16, induk: "2040", nama: "Kirana Maharani Wewengkang", gender: "P", ortu: "Tunggal Wahyu Wewengkang", univ: "Universitas Airlangga", jurusan: "S1 Antropologi" },
      { no: 17, induk: "2046", nama: "Muhammad Adam Fauzan", gender: "L", ortu: "Sumardiono", univ: "", jurusan: "" },
      { no: 18, induk: "2047", nama: "M. Dzaki Musyaffa", gender: "L", ortu: "M. Imron Wahyudi", univ: "", jurusan: "" },
      { no: 19, induk: "2064", nama: "Moh. Okta Surya Nugraha", gender: "L", ortu: "Muhamad Yusuf", univ: "", jurusan: "" },
      { no: 20, induk: "2088", nama: "Muhammad Rendra Putra Wardhana", gender: "L", ortu: "Rido Wasongko", univ: "", jurusan: "" },
      { no: 21, induk: "2097", nama: "Nabilla Jasmine Verlyana", gender: "P", ortu: "Candra Wijaya, S.T.", univ: "", jurusan: "" },
      { no: 22, induk: "2099", nama: "Nadia Aurellya Hariyanto", gender: "P", ortu: "Budi Hariyanto", univ: "", jurusan: "" },
      { no: 23, induk: "2105", nama: "Nathania Amellia Putri", gender: "P", ortu: "Suhar", univ: "", jurusan: "" },
      { no: 24, induk: "2113", nama: "Nisrina Fitri Andriani", gender: "P", ortu: "Andri Arifin", univ: "", jurusan: "" },
      { no: 25, induk: "2115", nama: "Nura Imanda Putri Zahra", gender: "P", ortu: "Nur Muchammad Fatachillah", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Ilmu Komunikasi" },
      { no: 26, induk: "2121", nama: "Rachel Septiya Noveliyanti", gender: "P", ortu: "Rais", univ: "", jurusan: "" },
      { no: 27, induk: "2123", nama: "Raditya Fairuz Zein", gender: "L", ortu: "Drs. Syawal, M.M.", univ: "", jurusan: "" },
      { no: 28, induk: "2190", nama: "Rahmania Candrawati Putri Sani", gender: "P", ortu: "Yoga Hizrahtul Sani", univ: "UPN Veteran Jawa Timur", jurusan: "S1 Agribisnis" },
      { no: 29, induk: "2132", nama: "Raka Putra Barutama", gender: "L", ortu: "Heka Yuliardi", univ: "", jurusan: "" },
      { no: 30, induk: "2161", nama: "Serafim Madjid", gender: "L", ortu: "Irfan Atria Musry Utama S.Psi", univ: "", jurusan: "" },
      { no: 31, induk: "2162", nama: "Sevy Areza Putri", gender: "P", ortu: "Atip Supriyono", univ: "Poltekkes Kemenkes Surabaya", jurusan: "D3 Kesehatan Gigi" },
      { no: 32, induk: "2166", nama: "Sultan Alif Farrely Prasetya", gender: "L", ortu: "Beny Eko Prasetyo", univ: "", jurusan: "" },
      { no: 33, induk: "2168", nama: "Tiara Ayudia Asfa", gender: "P", ortu: "Muhamad Fauzi Abdulah", univ: "", jurusan: "" },
      { no: 34, induk: "2172", nama: "Tsabitah Naura Putri", gender: "P", ortu: "Moch. Sya'roni", univ: "Universitas Airlangga (Kesehatan Masyarakat) & Poltekkes Kemenkes Surabaya (Sanitasi)", jurusan: "S1 Kesehatan Masyarakat / D3 Sanitasi" },
      { no: 35, induk: "2180", nama: "Wildan Mustafit Sabillillah", gender: "L", ortu: "Moh. Idam Hori", univ: "", jurusan: "" },
      { no: 36, induk: "2187", nama: "Zafira Khairun Nisa Anwar", gender: "P", ortu: "Khoirul Anwar", univ: "UIN Sunan Ampel Surabaya", jurusan: "S1 Psikologi" }
    ]
  }
};
