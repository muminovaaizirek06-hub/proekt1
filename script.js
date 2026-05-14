// ===== EDUPLATFORM - ENHANCED REAL PROJECT =====
// Complete Online Learning System with Real-World Features
// Version 2.0 - Fixed & Enhanced

'use strict';

// ===== STATE MANAGEMENT =====
let currentUser = null;
let selectedRating = 0;
let selectedCourse = null;
let selectedRole = null;
let currentDashTab = 'overview';
let currentPage = 1;
let itemsPerPage = 8;
let searchQuery = '';
let filteredCourses = [];
let notifications = [];
let achievements = [];

// ===== COURSES DATA =====
const courses = [
  { id: 1, title: "Python негиздери", cat: "Программалоо", time: "8 жума", price: 2500, desc: "Нөлдөн баштап Python үйрөнүү. Базалык синтаксис, функциялар, класстар.", teacher: "Азамат Токтогулов", lessons: 24, color: "#306998", enrolled: 45, rating: 4.8, reviews: 32, level: "Баштапкы" },
  { id: 2, title: "JavaScript Pro", cat: "Программалоо", time: "10 жума", price: 3200, desc: "Заманбап веб-интерфейстер. ES6+, DOM, Async/Await.", teacher: "Салтанат Кыдырбаева", lessons: 32, color: "#f7df1e", enrolled: 38, rating: 4.7, reviews: 28, level: "Орто" },
  { id: 3, title: "UI/UX Дизайн", cat: "Дизайн", time: "6 жума", price: 2800, desc: "Figma жана Adobe XD менен профессионалдык дизайн.", teacher: "Гүлмира Асанова", lessons: 18, color: "#ff6b6b", enrolled: 52, rating: 4.9, reviews: 41, level: "Баштапкы" },
  { id: 4, title: "Англис тили B1", cat: "Тилдер", time: "12 жума", price: 1900, desc: "Сүйлөшүү жана грамматика. Күнүмдүк диалогдор.", teacher: "Sarah Johnson", lessons: 36, color: "#0077b6", enrolled: 67, rating: 4.6, reviews: 55, level: "Орто" },
  { id: 5, title: "SMM & Таргет", cat: "Маркетинг", time: "5 жума", price: 2200, desc: "Социалдык тармактарда маркетинг. Instagram, Facebook, TikTok.", teacher: "Бакыт Оrozов", lessons: 15, color: "#118ab2", enrolled: 41, rating: 4.5, reviews: 19, level: "Баштапкы" },
  { id: 6, title: "Flutter Мобилдик", cat: "Технология", time: "14 жума", price: 4500, desc: "iOS & Android тиркемелери. Dart тили, Widget'тер.", teacher: "Азамат Токтогулов", lessons: 42, color: "#00f5d4", enrolled: 29, rating: 4.8, reviews: 22, level: "Өнүккөн" },
  { id: 7, title: "Киберкоопсуздук", cat: "Технология", time: "11 жума", price: 3900, desc: "Тармакты коргоо. Этикалык хакерлик, тестирлөө.", teacher: "Эрлан Жуманов", lessons: 33, color: "#7209b7", enrolled: 22, rating: 4.9, reviews: 15, level: "Өнүккөн" },
  { id: 8, title: "Excel & Data Analysis", cat: "Бизнес", time: "6 жума", price: 1500, desc: "Маалыматтарды анализдөө. Pivot таблицалар, формулалар.", teacher: "Эрлан Жуманов", lessons: 18, color: "#219ebc", enrolled: 55, rating: 4.4, reviews: 38, level: "Баштапкы" },
  { id: 9, title: "React.js Advanced", cat: "Программалоо", time: "11 жума", price: 3600, desc: "Заманбап фронтенд. Hooks, Redux, Next.js.", teacher: "Азамат Токтогулов", lessons: 30, color: "#61dafb", enrolled: 43, rating: 4.7, reviews: 31, level: "Өнүккөн" },
  { id: 10, title: "3D Моделирование", cat: "Дизайн", time: "9 жума", price: 3400, desc: "Blender менен иштөө. Моделдөө, текстура, анимация.", teacher: "Гүлмира Асанова", lessons: 27, color: "#6a4c93", enrolled: 19, rating: 4.6, reviews: 12, level: "Орто" },
  { id: 11, title: "Корей тили", cat: "Тилдер", time: "9 жума", price: 2100, desc: "Hangul жана сөздөр. K-pop маданияты менен үйрөнүү.", teacher: "Min-jun Kim", lessons: 27, color: "#ef476f", enrolled: 33, rating: 4.8, reviews: 25, level: "Баштапкы" },
  { id: 12, title: "SEO Оптимизация", cat: "Маркетинг", time: "4 жума", price: 1800, desc: "Google'до алдыга чыгуу. Ачкыч сөздөр, бекемдөө.", teacher: "Бакыт Оrozов", lessons: 12, color: "#06d6a0", enrolled: 28, rating: 4.3, reviews: 16, level: "Баштапкы" },
  { id: 13, title: "Python AI & ML", cat: "Программалоо", time: "12 жума", price: 4800, desc: "Машиналык үйрөнүү. TensorFlow, нейрондук тармактар.", teacher: "Салтанат Кыдырбаева", lessons: 36, color: "#ff9f1c", enrolled: 31, rating: 4.9, reviews: 27, level: "Өнүккөн" },
  { id: 14, title: "Япон тили N5", cat: "Тилдер", time: "10 жума", price: 2300, desc: "Hiragana, Katakana, Kanji. JLPT N5 даярдоо.", teacher: "Yuki Tanaka", lessons: 30, color: "#e63946", enrolled: 26, rating: 4.7, reviews: 18, level: "Баштапкы" },
  { id: 15, title: "Бизнес Стратегия", cat: "Бизнес", time: "8 жума", price: 3100, desc: "Стартап жана башкаруу. MVP, инвестиция, масштабдоо.", teacher: "Эрлан Жуманов", lessons: 24, color: "#8ac926", enrolled: 37, rating: 4.5, reviews: 21, level: "Орто" },
  { id: 16, title: "Digital Marketing Pro", cat: "Маркетинг", time: "7 жума", price: 2700, desc: "Реклама жана аналитика. Google Ads, Яндекс.Директ.", teacher: "Бакыт Оrozов", lessons: 21, color: "#2b2d42", enrolled: 44, rating: 4.6, reviews: 29, level: "Орто" },
  { id: 17, title: "Cloud Computing AWS", cat: "Технология", time: "8 жума", price: 3200, desc: "AWS, Azure негиздери. EC2, S3, Lambda.", teacher: "Эрлан Жуманов", lessons: 24, color: "#00b4d8", enrolled: 18, rating: 4.8, reviews: 14, level: "Өнүккөн" },
  { id: 18, title: "Финансылык сабаттуулук", cat: "Бизнес", time: "5 жума", price: 1200, desc: "Бюджет, инвестиция, кредит. Жеке финансыңызды башкарыңыз.", teacher: "Эрлан Жуманов", lessons: 15, color: "#38b000", enrolled: 61, rating: 4.7, reviews: 43, level: "Баштапкы" },
  { id: 19, title: "Кыргыз тили адабияты", cat: "Тилдер", time: "6 жума", price: 1100, desc: "Грамматика жана чыгармачылык. Классикалык адабият.", teacher: "Айгүл Маматова", lessons: 18, color: "#9d0208", enrolled: 48, rating: 4.5, reviews: 35, level: "Баштапкы" },
  { id: 20, title: "Video Editing Pro", cat: "Дизайн", time: "7 жума", price: 2900, desc: "Premiere Pro & After Effects. Монтаж, VFX, түстү коррекциялоо.", teacher: "Гүлмира Асанова", lessons: 21, color: "#ffbe0b", enrolled: 35, rating: 4.6, reviews: 24, level: "Орто" },
  { id: 21, title: "Node.js Backend", cat: "Программалоо", time: "10 жума", price: 3400, desc: "Express, MongoDB, REST API. Microservices архитектурасы.", teacher: "Азамат Токтогулов", lessons: 30, color: "#339933", enrolled: 27, rating: 4.7, reviews: 20, level: "Өнүккөн" },
  { id: 22, title: "Графикалык Дизайн", cat: "Дизайн", time: "7 жума", price: 2400, desc: "Photoshop, Illustrator. Логотип, брендинг, печать.", teacher: "Гүлмира Асанова", lessons: 21, color: "#9c88ff", enrolled: 39, rating: 4.5, reviews: 26, level: "Баштапкы" }
];

// ===== ACHIEVEMENTS DATA =====
const achievementsData = [
  { id: 'first_course', icon: '🎯', title: 'Биринчи кадам', desc: 'Биринчи курска катталдыңыз', condition: (u) => (u.enrolledCourses || []).length >= 1 },
  { id: 'three_courses', icon: '📚', title: 'Китепканачы', desc: '3 курска катталдыңыз', condition: (u) => (u.enrolledCourses || []).length >= 3 },
  { id: 'five_courses', icon: '🏆', title: 'Билим сарайы', desc: '5 курска катталдыңыз', condition: (u) => (u.enrolledCourses || []).length >= 5 },
  { id: 'first_complete', icon: '✅', title: 'Бүтүрүүчү', desc: 'Биринчи курсту бүтүрдүңүз', condition: (u) => (u.enrolledCourses || []).some(e => e.progress === 100) },
  { id: 'perfect_student', icon: '⭐', title: 'Мыкты студент', desc: 'Бардык сабактарды 100% бүтүрдүңүз', condition: (u) => (u.enrolledCourses || []).length > 0 && (u.enrolledCourses || []).every(e => e.progress === 100) },
  { id: 'reviewer', icon: '💬', title: 'Пикирчи', desc: 'Биринчи пикириңизди калтырдыңыз', condition: (u) => false }, // Checked separately
  { id: 'night_owl', icon: '🦉', title: 'Түнгү буха', desc: 'Түнкү саат 12ден кийин кирдиңиз', condition: (u) => new Date().getHours() >= 0 && new Date().getHours() < 6 }
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initAuth();
  initSearch();
  initPagination();
  initPasswordStrength();
  initEmailValidation();
  initNotifications();
  renderCourses();
  initReviews();
  setupEventListeners();
  initMobileMenu();
  initSkeletonLoading();
  checkAchievements();
});

// ===== THEME =====
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon();
  const toggle = document.getElementById('themeToggle');
  const dashToggle = document.getElementById('dashThemeToggle');
  if (toggle) toggle.addEventListener('click', toggleTheme);
  if (dashToggle) dashToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon();
  showToast(isDark ? '☀️ Жарык тема' : '🌙 Караңгы тема', 'info');
}

function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('#themeToggle, #dashThemeToggle').forEach(function(icon) {
    if (icon) icon.textContent = isDark ? '☀️' : '🌙';
  });
}

// ===== AUTH =====
function initAuth() {
  try {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      currentUser = JSON.parse(saved);
      updateAuthUI();
      checkAchievements();
    }
  } catch (e) {
    console.error('Auth error:', e);
  }
}

function updateAuthUI() {
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const userBadge = document.getElementById('userBadge');
  const adminLink = document.getElementById('adminLink');
  if (!loginBtn || !registerBtn || !logoutBtn || !userBadge) return;
  if (currentUser) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-flex';
    userBadge.style.display = 'inline-flex';
    userBadge.textContent = '👤 ' + currentUser.name;
    userBadge.onclick = function() { openDashboard(); };
    if (currentUser.role === 'admin' && adminLink) adminLink.style.display = 'block';
  } else {
    loginBtn.style.display = 'inline-flex';
    registerBtn.style.display = 'inline-flex';
    logoutBtn.style.display = 'none';
    userBadge.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
  }
}

// ===== SEARCH =====
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  if (!searchInput) return;

  searchInput.addEventListener('input', function(e) {
    searchQuery = e.target.value.toLowerCase().trim();
    currentPage = 1;
    renderCourses();
  });

  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      searchQuery = searchInput.value.toLowerCase().trim();
      currentPage = 1;
      renderCourses();
    });
  }
}

// ===== PAGINATION =====
function initPagination() {
  const prevBtn = document.getElementById('prevPage');
  const nextBtn = document.getElementById('nextPage');
  if (prevBtn) prevBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderCourses(); } });
  if (nextBtn) nextBtn.addEventListener('click', () => { const maxPages = Math.ceil(filteredCourses.length / itemsPerPage); if (currentPage < maxPages) { currentPage++; renderCourses(); } });
}

// ===== PASSWORD STRENGTH =====
function initPasswordStrength() {
  const passInputs = document.querySelectorAll('#sPass, #tPass');
  passInputs.forEach(function(input) {
    if (!input) return;
    input.addEventListener('input', function() {
      const val = this.value;
      const meter = this.parentElement.querySelector('.password-strength');
      if (!meter) return;
      let strength = 0;
      if (val.length >= 6) strength++;
      if (val.length >= 10) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;
      const colors = ['#ef476f', '#ff9f1c', '#ffd166', '#06d6a0', '#118ab2'];
      const labels = ['Абдан алсыз', 'Алсыз', 'Орто', 'Күчтүү', 'Абдан күчтүү'];
      meter.style.width = (strength / 5 * 100) + '%';
      meter.style.background = colors[strength - 1] || '#ddd';
      meter.title = labels[strength - 1] || 'Сырсөздү киргизиңиз';
    });
  });
}

// ===== EMAIL VALIDATION =====
function initEmailValidation() {
  const emailInputs = document.querySelectorAll('#sEmail, #tEmail, #loginEmail');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailInputs.forEach(function(input) {
    if (!input) return;
    input.addEventListener('blur', function() {
      const isValid = emailRegex.test(this.value);
      this.style.borderColor = isValid || !this.value ? '' : '#ef476f';
      const error = this.parentElement.querySelector('.email-error');
      if (error) error.style.display = isValid || !this.value ? 'none' : 'block';
    });
  });
}

// ===== NOTIFICATIONS =====
function initNotifications() {
  const bell = document.getElementById('notificationBell');
  const panel = document.getElementById('notificationPanel');
  if (bell && panel) {
    bell.addEventListener('click', function(e) {
      e.stopPropagation();
      panel.classList.toggle('active');
      updateNotificationBadge();
    });
    document.addEventListener('click', function(e) {
      if (!panel.contains(e.target) && e.target !== bell) panel.classList.remove('active');
    });
  }
}

function addNotification(title, message, type) {
  const notif = { id: Date.now(), title, message, type, time: new Date().toISOString(), read: false };
  notifications.unshift(notif);
  if (notifications.length > 20) notifications.pop();
  updateNotificationBadge();
  renderNotifications();
}

function updateNotificationBadge() {
  const badge = document.getElementById('notifBadge');
  const unread = notifications.filter(n => !n.read).length;
  if (badge) {
    badge.textContent = unread;
    badge.style.display = unread > 0 ? 'flex' : 'none';
  }
}

function renderNotifications() {
  const panel = document.getElementById('notificationList');
  if (!panel) return;
  if (notifications.length === 0) {
    panel.innerHTML = '<div class="empty-state" style="padding:20px;"><p>Билдирүүлөр жок</p></div>';
    return;
  }
  panel.innerHTML = notifications.map(function(n) {
    const icons = { success: '✅', info: 'ℹ️', warning: '⚠️', danger: '❌' };
    return '<div class="notif-item ' + (n.read ? 'read' : 'unread') + '" onclick="markRead(' + n.id + ')">' +
      '<div class="notif-icon">' + (icons[n.type] || '🔔') + '</div>' +
      '<div class="notif-content">' +
        '<strong>' + n.title + '</strong>' +
        '<p>' + n.message + '</p>' +
        '<small>' + timeAgo(n.time) + '</small>' +
      '</div></div>';
  }).join('');
}

function markRead(id) {
  const n = notifications.find(function(x) { return x.id === id; });
  if (n) { n.read = true; updateNotificationBadge(); renderNotifications(); }
}

function timeAgo(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);
  if (diff < 60) return 'Жаңы эле';
  if (diff < 3600) return Math.floor(diff / 60) + ' мүн. мурун';
  if (diff < 86400) return Math.floor(diff / 3600) + ' саат мурун';
  return Math.floor(diff / 86400) + ' күн мурун';
}

// ===== SKELETON LOADING =====
function initSkeletonLoading() {
  // Applied in renderCourses when loading
}

function showSkeleton(count) {
  let html = '';
  for (let i = 0; i < count; i++) {
    html += '<div class="course-card skeleton">' +
      '<div class="skeleton-img"></div>' +
      '<div class="skeleton-body">' +
        '<div class="skeleton-tag"></div>' +
        '<div class="skeleton-title"></div>' +
        '<div class="skeleton-desc"></div>' +
        '<div class="skeleton-meta"></div>' +
      '</div></div>';
  }
  return html;
}

// ===== ACHIEVEMENTS =====
function checkAchievements() {
  if (!currentUser) return;
  const userAchievements = currentUser.achievements || [];
  let newUnlocked = [];
  achievementsData.forEach(function(ach) {
    if (!userAchievements.includes(ach.id) && ach.condition(currentUser)) {
      userAchievements.push(ach.id);
      newUnlocked.push(ach);
    }
  });
  if (newUnlocked.length > 0) {
    currentUser.achievements = userAchievements;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
    if (idx !== -1) { users[idx] = currentUser; localStorage.setItem('users', JSON.stringify(users)); }
    newUnlocked.forEach(function(ach) {
      showToast('🏆 Ачылды: ' + ach.title + '! ' + ach.desc, 'success');
      addNotification('Жаңы жетишкендик!', ach.title + ' ачылды', 'success');
    });
  }
}

function renderAchievements() {
  if (!currentUser) return '';
  const userAch = currentUser.achievements || [];
  return '<div class="achievements-grid">' + achievementsData.map(function(ach) {
    const unlocked = userAch.includes(ach.id);
    return '<div class="achievement-card ' + (unlocked ? 'unlocked' : 'locked') + '">' +
      '<div class="achievement-icon">' + (unlocked ? ach.icon : '🔒') + '</div>' +
      '<h4>' + ach.title + '</h4>' +
      '<p>' + ach.desc + '</p>' +
      '</div>';
  }).join('') + '</div>';
}

// ===== MODALS =====
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', function(e) {
  if (e.target.classList && e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
      closeModal(m.id);
    });
  }
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.tab-content').forEach(function(c) { c.classList.remove('active'); });
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab + 'Tab').classList.add('active');
    });
  });

  document.querySelectorAll('.role-card').forEach(function(card) {
    card.addEventListener('click', function() {
      selectedRole = this.dataset.role;
      document.querySelectorAll('.role-card').forEach(function(c) { c.classList.remove('selected'); });
      this.classList.add('selected');
      document.getElementById('studentRegisterForm').style.display = selectedRole === 'student' ? 'block' : 'none';
      document.getElementById('teacherRegisterForm').style.display = selectedRole === 'teacher' ? 'block' : 'none';
    });
  });

  const studentForm = document.getElementById('studentRegisterForm');
  if (studentForm) {
    studentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('sEmail').value;
      const pass = document.getElementById('sPass').value;
      if (!validateEmail(email)) { showToast('❌ Туура email киргизиңиз!', 'danger'); return; }
      if (pass.length < 6) { showToast('❌ Сырсөз 6 символдон узун болушу керек!', 'danger'); return; }
      registerUser({
        id: 'u' + Date.now(),
        name: document.getElementById('sName').value,
        email: email,
        password: pass,
        phone: document.getElementById('sPhone').value,
        birthdate: document.getElementById('sBirthdate').value,
        education: document.getElementById('sEducation').value,
        role: 'student',
        enrolledCourses: [],
        certificates: [],
        achievements: [],
        notifications: [],
        createdAt: new Date().toISOString()
      });
    });
  }

  const teacherForm = document.getElementById('teacherRegisterForm');
  if (teacherForm) {
    teacherForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('tEmail').value;
      const pass = document.getElementById('tPass').value;
      if (!validateEmail(email)) { showToast('❌ Туура email киргизиңиз!', 'danger'); return; }
      if (pass.length < 6) { showToast('❌ Сырсөз 6 символдон узун болушу керек!', 'danger'); return; }
      registerUser({
        id: 'u' + Date.now(),
        name: document.getElementById('tName').value,
        email: email,
        password: pass,
        specialty: document.getElementById('tSpecialty').value,
        experience: document.getElementById('tExp').value,
        education: document.getElementById('tEducation').value,
        bio: document.getElementById('tBio').value,
        role: 'teacher',
        courses: [],
        rating: 0,
        totalStudents: 0,
        achievements: [],
        createdAt: new Date().toISOString()
      });
    });
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin();
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const addCourseForm = document.getElementById('addCourseForm');
  if (addCourseForm) {
    addCourseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      addNewCourse();
    });
  }

  const reviewForm = document.getElementById('newReviewForm');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      submitReview();
    });
  }

  const stars = document.querySelectorAll('#starInput span');
  if (stars.length > 0) {
    stars.forEach(function(star) {
      star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.val);
        document.getElementById('rRating').value = selectedRating;
        highlightStars(selectedRating);
      });
      star.addEventListener('mouseenter', function() { highlightStars(parseInt(this.dataset.val)); });
      star.addEventListener('mouseleave', function() { highlightStars(selectedRating); });
    });
  }
}

// ===== VALIDATION =====
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function highlightStars(val) {
  document.querySelectorAll('#starInput span').forEach(function(s) {
    const sVal = parseInt(s.dataset.val);
    s.style.color = sVal <= val ? 'var(--warning)' : '#ddd';
    s.style.transform = sVal <= val ? 'scale(1.1)' : 'scale(1)';
  });
}

function selectRole(role) {
  selectedRole = role;
  document.querySelectorAll('.role-card').forEach(function(c) { c.classList.remove('selected'); });
  document.querySelector('[data-role="' + role + '"]').classList.add('selected');
  document.getElementById('studentRegisterForm').style.display = role === 'student' ? 'block' : 'none';
  document.getElementById('teacherRegisterForm').style.display = role === 'teacher' ? 'block' : 'none';
}

// ===== USER MANAGEMENT =====
function registerUser(userData) {
  try {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(function(u) { return u.email === userData.email; })) {
      showToast('❌ Бул email мурун катталган!', 'danger');
      return;
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    loginSuccess(userData);
    closeModal('authModal');
    showToast('✅ Ийгиликтүү катталдыңыз! Кош келдиңиз, ' + userData.name + '!', 'success');
    addNotification('Кош келдиңиз!', 'Аккаунтуңуз ийгиликтүү түзүлдү', 'success');
    document.getElementById('studentRegisterForm').reset();
    document.getElementById('teacherRegisterForm').reset();
    document.querySelectorAll('.role-card').forEach(function(c) { c.classList.remove('selected'); });
    document.getElementById('studentRegisterForm').style.display = 'none';
    document.getElementById('teacherRegisterForm').style.display = 'none';
    checkAchievements();
  } catch (e) {
    showToast('Ката кетти!', 'danger');
  }
}

function handleLogin() {
  try {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;
    if (email === 'admin@edu.kg' && pass === 'admin') {
      loginSuccess({ id: 'admin', name: 'Админ', email: email, role: 'admin', createdAt: new Date().toISOString() });
      closeModal('authModal');
      showToast('✅ Админ катары кирдиңиз!', 'success');
      addNotification('Админ кирди', 'Системага админ катары кирдиңиз', 'info');
      return;
    }
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(function(u) { return u.email === email && u.password === pass; });
    if (user) {
      loginSuccess(user);
      closeModal('authModal');
      showToast('✅ Кош келдиңиз, ' + user.name + '! 👋', 'success');
      addNotification('Кош келдиңиз!', user.name + ', сиз кирдиңиз', 'success');
      checkAchievements();
    } else {
      showToast('❌ Email же сырсөз туура эмес!', 'danger');
    }
  } catch (e) {
    showToast('Ката кетти!', 'danger');
  }
}

function loginSuccess(user) {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  updateAuthUI();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  updateAuthUI();
  exitDashboard();
  showToast('🚪 Системадан чыктыңыз. Кайра көрүшкөнчө!', 'info');
}

// ===== COURSES RENDERING =====
function renderCourses() {
  const grid = document.getElementById('coursesGrid');
  const filters = document.getElementById('categoryFilters');
  const pagination = document.getElementById('pagination');
  if (!grid) return;

  // Filter courses
  filteredCourses = courses.filter(function(c) {
    if (!searchQuery) return true;
    return c.title.toLowerCase().includes(searchQuery) || 
           c.cat.toLowerCase().includes(searchQuery) || 
           c.teacher.toLowerCase().includes(searchQuery) ||
           c.desc.toLowerCase().includes(searchQuery);
  });

  // Render filters
  if (filters) {
    const categories = ['Бардыгы'];
    courses.forEach(function(c) { if (!categories.includes(c.cat)) categories.push(c.cat); });
    filters.innerHTML = categories.map(function(cat) {
      return '<button class="filter-btn' + (cat === 'Бардыгы' ? ' active' : '') + '" data-cat="' + cat + '">' + cat + '</button>';
    }).join('');
    filters.querySelectorAll('.filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        filters.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
        this.classList.add('active');
        const cat = this.dataset.cat;
        document.querySelectorAll('.course-card').forEach(function(card) {
          card.style.display = (cat === 'Бардыгы' || card.dataset.cat === cat) ? 'block' : 'none';
        });
      });
    });
  }

  // Pagination
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageCourses = filteredCourses.slice(start, end);

  // Render courses
  if (pageCourses.length === 0) {
    grid.innerHTML = '<div class="empty-state" style="grid-column: 1/-1;"><div class="empty-state-icon">🔍</div><h3>Эч нерсе табылган жок</h3><p>Башка сөз менен издеп көрүңүз</p></div>';
  } else {
    grid.innerHTML = pageCourses.map(function(c) {
      return '<div class="course-card" data-cat="' + c.cat + '">' +
        '<div class="course-img" style="background:linear-gradient(135deg,' + c.color + ',' + c.color + 'dd)"><i class="fas fa-book-open"></i></div>' +
        '<div class="course-body">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
            '<span class="course-tag" style="background:' + c.color + '25; color:' + c.color + '">' + c.cat + '</span>' +
            '<span class="badge badge-primary" style="font-size:0.7rem;">' + c.level + '</span>' +
          '</div>' +
          '<h3 class="course-title">' + c.title + '</h3>' +
          '<p class="course-desc">' + c.desc + '</p>' +
          '<div class="course-meta">' +
            '<span>⏱ ' + c.time + '</span>' +
            '<span>👥 ' + c.enrolled + ' студент</span>' +
            '<span>⭐ ' + c.rating + '</span>' +
          '</div>' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">' +
            '<span class="course-price">' + c.price.toLocaleString() + ' сом</span>' +
            '<button class="btn btn-outline btn-sm" onclick="showCourseInfo(' + c.id + ')">Маалымат</button>' +
          '</div>' +
        '</div></div>';
    }).join('');
  }

  // Render pagination
  if (pagination) {
    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    if (totalPages > 1) {
      let pagesHtml = '<button class="btn btn-sm" id="prevPage" ' + (currentPage === 1 ? 'disabled' : '') + '>←</button>';
      for (let i = 1; i <= totalPages; i++) {
        pagesHtml += '<button class="btn btn-sm ' + (i === currentPage ? 'btn-primary' : 'btn-outline') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
      }
      pagesHtml += '<button class="btn btn-sm" id="nextPage" ' + (currentPage === totalPages ? 'disabled' : '') + '>→</button>';
      pagination.innerHTML = pagesHtml;
      pagination.style.display = 'flex';
    } else {
      pagination.style.display = 'none';
    }
  }
}

function goToPage(page) {
  currentPage = page;
  renderCourses();
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

// ===== COURSE INFO =====
function showCourseInfo(id) {
  selectedCourse = courses.find(function(c) { return c.id === id; });
  if (!selectedCourse) return;
  const titleEl = document.getElementById('cmTitle');
  const detailsEl = document.getElementById('cmDetails');
  if (titleEl) titleEl.textContent = selectedCourse.title;
  if (detailsEl) {
    detailsEl.innerHTML = 
      '<div class="detail-row"><span class="detail-label">Категория</span><span class="badge badge-primary">' + selectedCourse.cat + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Деңгээл</span><span class="badge badge-success">' + selectedCourse.level + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Мугалим</span><span>👨‍🏫 ' + selectedCourse.teacher + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Узактыгы</span><span>⏱ ' + selectedCourse.time + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Сабактар</span><span>📚 ' + selectedCourse.lessons + ' сабак</span></div>' +
      '<div class="detail-row"><span class="detail-label">Студенттер</span><span>👥 ' + selectedCourse.enrolled + ' адам катталган</span></div>' +
      '<div class="detail-row"><span class="detail-label">Рейтинг</span><span>⭐ ' + selectedCourse.rating + '/5 (' + selectedCourse.reviews + ' пикир)</span></div>' +
      '<div class="detail-row"><span class="detail-label">Баасы</span><span class="course-price" style="font-size:1.3rem;">' + selectedCourse.price.toLocaleString() + ' сом</span></div>' +
      '<div class="detail-row"><span class="detail-label">Сүрөттөмө</span><span>' + selectedCourse.desc + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Сертификат</span><span>✅ Бар</span></div>';
  }
  openModal('courseModal');
}

// ===== ENROLLMENT WITH PAYMENT =====
function enrollCourse() {
  if (!currentUser) {
    showToast('Курска жазылуу үчүн кириңиз!', 'danger');
    closeModal('courseModal');
    openModal('authModal');
    return;
  }
  if (currentUser.role !== 'student') {
    showToast('Тек гана студенттер каттала алат!', 'danger');
    return;
  }
  if (!currentUser.enrolledCourses) currentUser.enrolledCourses = [];
  if (!currentUser.certificates) currentUser.certificates = [];
  if (currentUser.enrolledCourses.find(function(e) { return e.courseId === selectedCourse.id; })) {
    showToast('Сиз бу курска мурун катталгансыз!', 'danger');
    closeModal('courseModal');
    return;
  }

  // Show payment modal
  showPaymentModal(selectedCourse);
}

function showPaymentModal(course) {
  const modal = document.getElementById('paymentModal');
  if (!modal) {
    // If no payment modal exists, enroll directly
    completeEnrollment(course);
    return;
  }
  document.getElementById('paymentCourseName').textContent = course.title;
  document.getElementById('paymentAmount').textContent = course.price.toLocaleString() + ' сом';
  openModal('paymentModal');

  const confirmBtn = document.getElementById('confirmPayment');
  if (confirmBtn) {
    confirmBtn.onclick = function() {
      closeModal('paymentModal');
      completeEnrollment(course);
    };
  }
}

function completeEnrollment(course) {
  const enrollment = {
    courseId: course.id,
    enrolledAt: new Date().toISOString(),
    progress: 0,
    completedLessons: 0,
    lastAccessed: new Date().toISOString()
  };
  currentUser.enrolledCourses.push(enrollment);
  const c = courses.find(function(x) { return x.id === course.id; });
  if (c) c.enrolled++;
  updateTeacherStats(course.teacher);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  closeModal('courseModal');
  showToast('🎉 "' + course.title + '" курсуна катталдыңыз! Билимге жол ачык! 🚀', 'success');
  addNotification('Жаңы каттоо!', '"' + course.title + '" курсуна катталдыңыз', 'success');
  renderCourses();
  checkAchievements();
}

function updateTeacherStats(teacherName) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const teacher = users.find(function(u) { return u.role === 'teacher' && u.name === teacherName; });
  if (teacher) {
    teacher.totalStudents = (teacher.totalStudents || 0) + 1;
    localStorage.setItem('users', JSON.stringify(users));
  }
}

// ===== REVIEWS =====
function initReviews() {
  const track = document.getElementById('liveReviewTrack');
  if (!track) return;
  let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
  if (reviews.length === 0) {
    reviews = [
      { name: "Айбек", role: "Студент", text: "Платформа абдан ыңгайлуу! Курстар сапаттуу жана практикалык.", rating: 5, date: "2026-04-15" },
      { name: "Гүлмира", role: "Мугалим", text: "Студенттер менен иштөө оңой. Интерфейс жакшы ойлонуп чыгарылган.", rating: 4, date: "2026-04-10" },
      { name: "Нурлан", role: "Студент", text: "Python курсу сонун! Азамат мugalим мыкты түшүндүрөт. Рекомендация кылам!", rating: 5, date: "2026-04-08" },
      { name: "Айгүл", role: "Студент", text: "Дизайн курстары практикалык. Ишке алып чыгып калдым.", rating: 5, date: "2026-04-05" },
      { name: "Бакыт", role: "Мугалим", text: "Курс кошуу функциясы жакшы иштейт. Студенттердин прогресстин көрүү керемет.", rating: 4, date: "2026-04-01" }
    ];
    localStorage.setItem('siteReviews', JSON.stringify(reviews));
  }
  renderReviewCards(reviews);
  startReviewAnimation();
}

function renderReviewCards(reviews) {
  const track = document.getElementById('liveReviewTrack');
  if (!track) return;
  const allReviews = reviews.concat(reviews);
  track.innerHTML = allReviews.map(function(r) {
    let starsStr = '';
    for(let i=0; i<5; i++) starsStr += (i < r.rating) ? '★' : '☆';
    return '<div class="review-card">' +
      '<div class="review-header"><div class="review-avatar">' + r.name.charAt(0) + '</div>' +
      '<div><h4 style="margin:0; font-size:0.95rem;">' + r.name + '</h4>' +
      '<span style="font-size:0.8rem; color:var(--primary); font-weight:600;">' + r.role + '</span></div></div>' +
      '<p style="font-size:0.9rem; line-height:1.4; color:var(--text-muted); margin-bottom:10px;">"' + r.text + '"</p>' +
      '<div style="color:var(--warning); font-size:1.1rem;">' + starsStr + '</div></div>';
  }).join('');
}

function submitReview() {
  const name = document.getElementById('rName').value.trim();
  const role = document.getElementById('rRole').value.trim();
  const text = document.getElementById('rText').value.trim();
  const rating = parseInt(document.getElementById('rRating').value);
  if (!name || !role || !text || rating === 0) {
    showToast('Бардык талааларды толтуруңуз!', 'danger');
    return;
  }
  const newReview = { name: name, role: role, text: text, rating: rating, date: new Date().toISOString().split('T')[0] };
  let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
  reviews.push(newReview);
  localStorage.setItem('siteReviews', JSON.stringify(reviews));
  renderReviewCards(reviews);
  document.getElementById('newReviewForm').reset();
  selectedRating = 0;
  document.getElementById('rRating').value = 0;
  highlightStars(0);
  showToast('✅ Пикириңиз кошулду! Рахмат!', 'success');
  addNotification('Жаңы пикир!', 'Сиздин пикириңиз кошулду', 'success');
  if (currentUser) {
    const ach = currentUser.achievements || [];
    if (!ach.includes('reviewer')) {
      ach.push('reviewer');
      currentUser.achievements = ach;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      showToast('🏆 Жаңы жетишкендик: Пикирчи!', 'success');
    }
  }
}

function startReviewAnimation() {
  const track = document.getElementById('liveReviewTrack');
  if (!track) return;
  let scrollAmount = 0;
  const speed = 0.5;
  let isPaused = false;
  track.addEventListener('mouseenter', function() { isPaused = true; });
  track.addEventListener('mouseleave', function() { isPaused = false; });
  function animate() {
    if (!isPaused) {
      scrollAmount -= speed;
      const trackWidth = track.scrollWidth / 2;
      if (Math.abs(scrollAmount) >= trackWidth) scrollAmount = 0;
    }
    track.style.transform = 'translateX(' + scrollAmount + 'px)';
    requestAnimationFrame(animate);
  }
  animate();
}

// ===== FULL DASHBOARD =====
function openDashboard() {
  if (!currentUser) {
    showToast('Системага кириңиз!', 'danger');
    openModal('authModal');
    return;
  }
  document.getElementById('mainSite').style.display = 'none';
  const dash = document.getElementById('fullDashboard');
  dash.style.display = 'flex';
  document.getElementById('dashGreeting').textContent = 'Салам, ' + currentUser.name + '! 👋';
  document.getElementById('dashAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('dashUserName').textContent = currentUser.name;
  const roleText = currentUser.role === 'teacher' ? '👨‍🏫 Мугалим' : 
                   currentUser.role === 'admin' ? '⚙️ Админ' : '👨‍🎓 Студент';
  document.getElementById('dashRoleBadge').textContent = roleText;
  buildSidebarMenu();
  switchDashTab('overview');
}

function exitDashboard() {
  document.getElementById('fullDashboard').style.display = 'none';
  document.getElementById('mainSite').style.display = 'block';
  window.scrollTo(0, 0);
}

function buildSidebarMenu() {
  const nav = document.getElementById('dashNav');
  if (!nav) return;
  let menuItems = [];
  if (currentUser.role === 'student') {
    menuItems = [
      { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
      { id: 'profile', icon: 'fa-user', label: 'Профиль' },
      { id: 'my-courses', icon: 'fa-book', label: 'Менин курстарым' },
      { id: 'certificates', icon: 'fa-certificate', label: 'Сертификаттарым' },
      { id: 'progress', icon: 'fa-chart-line', label: 'Прогресс' },
      { id: 'achievements', icon: 'fa-trophy', label: 'Жетишкендиктер' }
    ];
  } else if (currentUser.role === 'teacher') {
    menuItems = [
      { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
      { id: 'profile', icon: 'fa-user', label: 'Профиль' },
      { id: 'my-courses', icon: 'fa-book', label: 'Менин курстарым' },
      { id: 'students', icon: 'fa-users', label: 'Студенттерим' },
      { id: 'analytics', icon: 'fa-chart-bar', label: 'Аналитика' },
      { id: 'add-course', icon: 'fa-plus-circle', label: 'Курс кошуу' }
    ];
  } else if (currentUser.role === 'admin') {
    menuItems = [
      { id: 'overview', icon: 'fa-th-large', label: 'Обзор' },
      { id: 'users', icon: 'fa-users', label: 'Колдонуучулар' },
      { id: 'all-courses', icon: 'fa-book', label: 'Бардык курстар' },
      { id: 'reviews', icon: 'fa-comments', label: 'Пикирлер' },
      { id: 'analytics', icon: 'fa-chart-pie', label: 'Аналитика' }
    ];
  }
  nav.innerHTML = menuItems.map(function(item) {
    return '<a href="#" data-tab="' + item.id + '" onclick="switchDashTab(\'' + item.id + '\'); return false;"><i class="fas ' + item.icon + '"></i> ' + item.label + '</a>';
  }).join('');
}

function switchDashTab(tabId) {
  currentDashTab = tabId;
  document.querySelectorAll('.dash-nav a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.tab === tabId);
  });
  const statsGrid = document.getElementById('dashStats');
  const bodyArea = document.getElementById('dashBodyArea');
  if (currentUser.role === 'student') {
    renderStudentTab(tabId, statsGrid, bodyArea);
  } else if (currentUser.role === 'teacher') {
    renderTeacherTab(tabId, statsGrid, bodyArea);
  } else if (currentUser.role === 'admin') {
    renderAdminTab(tabId, statsGrid, bodyArea);
  }
}

// ===== STUDENT DASHBOARD =====
function renderStudentTab(tabId, statsGrid, bodyArea) {
  const enrolled = currentUser.enrolledCourses || [];
  const certs = currentUser.certificates || [];
  switch(tabId) {
    case 'overview':
      const totalProgress = enrolled.length > 0 ? Math.round(enrolled.reduce(function(s, e) { return s + e.progress; }, 0) / enrolled.length) : 0;
      statsGrid.innerHTML = 
        '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + enrolled.length + '</h3><p>Курстарым</p></div>' +
        '<div class="stat-box"><div class="stat-icon">⏱️</div><h3>' + (enrolled.length * 8) + '</h3><p>Сааттар</p></div>' +
        '<div class="stat-box"><div class="stat-icon">📜</div><h3>' + certs.length + '</h3><p>Сертификаттар</p></div>' +
        '<div class="stat-box"><div class="stat-icon">✅</div><h3>' + totalProgress + '%</h3><p>Прогресс</p></div>';
      bodyArea.innerHTML = '<h3>📚 Акыркы курстарым</h3>';
      if (enrolled.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Сиз дагы курска каттала элексиз</p><button class="btn btn-primary" onclick="exitDashboard(); scrollToCourses();">Курстарды карап чыгуу</button></div>';
      } else {
        bodyArea.innerHTML += '<div id="studentCoursesList"></div>';
        renderStudentCoursesList();
      }
      break;
    case 'profile':
      statsGrid.innerHTML = '';
      bodyArea.innerHTML = renderStudentProfile();
      break;
    case 'my-courses':
      const activeCourses = enrolled.filter(function(e) { return e.progress > 0 && e.progress < 100; }).length;
      const completedCourses = enrolled.filter(function(e) { return e.progress === 100; }).length;
      statsGrid.innerHTML = 
        '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + enrolled.length + '</h3><p>Бардыгы</p></div>' +
        '<div class="stat-box"><div class="stat-icon">▶️</div><h3>' + activeCourses + '</h3><p>Уланууда</p></div>' +
        '<div class="stat-box"><div class="stat-icon">✅</div><h3>' + completedCourses + '</h3><p>Бүтүрүлгөн</p></div>' +
        '<div class="stat-box"><div class="stat-icon">🏆</div><h3>' + (currentUser.achievements || []).length + '</h3><p>Жетишкендиктер</p></div>';
      bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3><div id="studentCoursesList"></div>';
      renderStudentCoursesList();
      break;
    case 'certificates':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📜</div><h3>' + certs.length + '</h3><p>Сертификаттар</p></div>';
      bodyArea.innerHTML = '<h3>📜 Менин сертификаттарым</h3>';
      if (certs.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📜</div><p>Сертификаттар жок. Курстарды бүтүрүңүз!</p></div>';
      } else {
        bodyArea.innerHTML += '<div class="cert-grid">' + certs.map(function(c) {
          return '<div class="cert-card"><h4>' + c.courseName + '</h4><p>' + currentUser.name + '</p><div class="cert-date">' + c.date + '</div></div>';
        }).join('') + '</div>';
      }
      break;
    case 'progress':
      const avgProgress = enrolled.length > 0 ? Math.round(enrolled.reduce(function(s, e) { return s + e.progress; }, 0) / enrolled.length) : 0;
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + avgProgress + '%</h3><p>Жалпы прогресс</p></div>';
      bodyArea.innerHTML = '<h3>📊 Прогресс</h3>';
      if (enrolled.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📊</div><p>Прогресс көрсөтүлө элек</p></div>';
      } else {
        bodyArea.innerHTML += enrolled.map(function(e) {
          const course = courses.find(function(c) { return c.id === e.courseId; });
          if (!course) return '';
          return '<div class="dash-card-item"><h4>📚 ' + course.title + '</h4>' +
            '<div style="display:flex; justify-content:space-between; margin-bottom:8px;"><span>Сабактар: ' + e.completedLessons + '/' + course.lessons + '</span><span>' + e.progress + '%</span></div>' +
            '<div class="progress-bar"><div class="progress-fill" style="width:' + e.progress + '%"></div></div>' +
            '<div style="margin-top:10px;"><button class="btn btn-primary btn-sm" onclick="continueCourse(' + course.id + ')">▶️ Улантуу</button></div></div>';
        }).join('');
      }
      break;
    case 'achievements':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">🏆</div><h3>' + (currentUser.achievements || []).length + '</h3><p>Жетишкендиктер</p></div>';
      bodyArea.innerHTML = '<h3>🏆 Жетишкендиктерим</h3>' + renderAchievements();
      break;
  }
}

function renderStudentProfile() {
  return '<div class="profile-section">' +
    '<div class="profile-card">' +
      '<div class="profile-avatar-large">' + currentUser.name.charAt(0).toUpperCase() + '</div>' +
      '<div class="profile-info"><h3>' + currentUser.name + '</h3><p>👨‍🎓 Студент</p></div>' +
      '<button class="btn btn-outline" style="margin-top:15px; width:100%;" onclick="openEditProfile()">✏️ Түзөтүү</button>' +
    '</div>' +
    '<div class="profile-details">' +
      '<h3 style="margin-bottom:20px;">Жеке маалыматтар</h3>' +
      '<div class="detail-row"><span class="detail-label">Аты-жөнү</span><span class="detail-value">' + currentUser.name + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + currentUser.email + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Телефон</span><span class="detail-value">' + (currentUser.phone || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Туулган күнү</span><span class="detail-value">' + (currentUser.birthdate || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Билими</span><span class="detail-value">' + (currentUser.education || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Катталган</span><span class="detail-value">' + new Date(currentUser.createdAt).toLocaleDateString('ky-KG') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Рол</span><span class="badge badge-success">Студент</span></div>' +
    '</div>' +
  '</div>';
}

function renderStudentCoursesList() {
  const list = document.getElementById('studentCoursesList');
  if (!list) return;
  const enrolled = currentUser.enrolledCourses || [];
  if (enrolled.length === 0) {
    list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Курстар жок</p></div>';
    return;
  }
  list.innerHTML = enrolled.map(function(e) {
    const course = courses.find(function(c) { return c.id === e.courseId; });
    if (!course) return '';
    const statusBadge = e.progress === 100 ? '<span class="badge badge-success">Бүтүрүлдү</span>' : 
                        e.progress > 0 ? '<span class="badge badge-primary">Уланууда</span>' : 
                        '<span class="badge badge-warning">Жаңы</span>';
    return '<div class="dash-card-item">' +
      '<div style="display:flex; justify-content:space-between; align-items:start;">' +
        '<h4>📚 ' + course.title + '</h4>' + statusBadge +
      '</div>' +
      '<p>' + course.desc.substring(0, 80) + '...</p>' +
      '<div class="meta">' +
        '<span>👨‍🏫 ' + course.teacher + '</span>' +
        '<span>⏱ ' + course.time + '</span>' +
        '<span>📚 ' + e.completedLessons + '/' + course.lessons + ' сабак</span>' +
      '</div>' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">' +
        '<span class="badge badge-primary">' + e.progress + '%</span>' +
        '<button class="btn btn-primary btn-sm" onclick="continueCourse(' + course.id + ')">▶️ Улантуу</button>' +
      '</div>' +
      '<div class="progress-bar" style="margin-top:8px;"><div class="progress-fill" style="width:' + e.progress + '%"></div></div>' +
    '</div>';
  }).join('');
}

function continueCourse(courseId) {
  const enrollment = currentUser.enrolledCourses.find(function(e) { return e.courseId === courseId; });
  if (!enrollment) return;
  const course = courses.find(function(c) { return c.id === courseId; });
  if (!course) return;

  // Simulate lesson completion
  if (enrollment.progress < 100) {
    enrollment.completedLessons = Math.min(enrollment.completedLessons + 1, course.lessons);
    enrollment.progress = Math.round((enrollment.completedLessons / course.lessons) * 100);
    enrollment.lastAccessed = new Date().toISOString();

    if (enrollment.progress === 100) {
      // Award certificate
      const cert = { courseId: courseId, courseName: course.title, date: new Date().toISOString().split('T')[0] };
      if (!currentUser.certificates) currentUser.certificates = [];
      currentUser.certificates.push(cert);
      showToast('🎉 Куттуктайбыз! "' + course.title + '" курсун бүтүрдүңүз! Сертификат берилди!', 'success');
      addNotification('Сертификат алдыңыз!', '"' + course.title + '" курсу үчүн', 'success');
    } else {
      showToast('✅ Сабак бүтүрүлдү! Прогресс: ' + enrollment.progress + '%', 'success');
    }

    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
    if (idx !== -1) { users[idx] = currentUser; localStorage.setItem('users', JSON.stringify(users)); }

    renderStudentCoursesList();
    checkAchievements();
    switchDashTab('progress');
  }
}

// ===== TEACHER DASHBOARD =====
function renderTeacherTab(tabId, statsGrid, bodyArea) {
  const myCourses = courses.filter(function(c) { return c.teacher === currentUser.name; });
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const myStudents = [];
  allUsers.forEach(function(u) {
    if (u.role === 'student' && u.enrolledCourses) {
      u.enrolledCourses.forEach(function(e) {
        const course = courses.find(function(c) { return c.id === e.courseId; });
        if (course && course.teacher === currentUser.name) {
          myStudents.push({
            studentName: u.name,
            studentEmail: u.email,
            courseName: course.title,
            progress: e.progress,
            enrolledAt: e.enrolledAt
          });
        }
      });
    }
  });
  switch(tabId) {
    case 'overview':
      const income = myCourses.reduce(function(s, c) { return s + c.price * c.enrolled; }, 0);
      const avgRating = myCourses.length > 0 ? (myCourses.reduce(function(s, c) { return s + c.rating; }, 0) / myCourses.length).toFixed(1) : '0.0';
      statsGrid.innerHTML = 
        '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + myCourses.length + '</h3><p>Курстарым</p></div>' +
        '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + myStudents.length + '</h3><p>Студенттер</p></div>' +
        '<div class="stat-box"><div class="stat-icon">💰</div><h3>' + income.toLocaleString() + '</h3><p>Киреше (сом)</p></div>' +
        '<div class="stat-box"><div class="stat-icon">⭐</div><h3>' + avgRating + '</h3><p>Рейтинг</p></div>';
      bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3>';
      if (myCourses.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Сиздин курстарыңыз жок</p><button class="btn btn-primary" onclick="switchDashTab(\'add-course\')">Курс кошуу</button></div>';
      } else {
        bodyArea.innerHTML += myCourses.map(function(c) {
          return '<div class="dash-card-item"><h4>📚 ' + c.title + '</h4>' +
            '<p>' + c.desc + '</p>' +
            '<div class="meta"><span>👥 ' + c.enrolled + ' студент</span><span>💰 ' + c.price.toLocaleString() + ' сом</span><span>⭐ ' + c.rating + '</span><span>⏱ ' + c.time + '</span></div></div>';
        }).join('');
      }
      break;
    case 'profile':
      statsGrid.innerHTML = '';
      bodyArea.innerHTML = renderTeacherProfile();
      break;
    case 'my-courses':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + myCourses.length + '</h3><p>Бардыгы</p></div>';
      bodyArea.innerHTML = '<h3>📚 Менин курстарым</h3>';
      if (myCourses.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📚</div><p>Курстар жок</p></div>';
      } else {
        bodyArea.innerHTML += myCourses.map(function(c) {
          return '<div class="dash-card-item"><h4>📚 ' + c.title + '</h4>' +
            '<p>' + c.desc + '</p>' +
            '<div class="meta"><span>👥 ' + c.enrolled + ' студент</span><span>💰 ' + c.price.toLocaleString() + ' сом</span><span>⭐ ' + c.rating + '</span></div>' +
            '<div style="margin-top:10px;"><button class="btn btn-outline btn-sm" onclick="viewCourseStudents(' + c.id + ')">👥 Студенттерди көрүү</button></div></div>';
        }).join('');
      }
      break;
    case 'students':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
      bodyArea.innerHTML = '<h3>👥 Менин студенттерим</h3>';
      if (myStudents.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">👥</div><p>Студенттер жок</p></div>';
      } else {
        bodyArea.innerHTML += '<table class="data-table"><thead><tr><th>Аты</th><th>Курс</th><th>Прогресс</th><th>Катталган</th></tr></thead><tbody>' +
          myStudents.map(function(s) {
            return '<tr><td>' + s.studentName + '</td><td>' + s.courseName + '</td><td><div class="progress-bar" style="width:100px; display:inline-block; vertical-align:middle;"><div class="progress-fill" style="width:' + s.progress + '%"></div></div> ' + s.progress + '%</td><td>' + new Date(s.enrolledAt).toLocaleDateString('ky-KG') + '</td></tr>';
          }).join('') + '</tbody></table>';
      }
      break;
    case 'analytics':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + myStudents.length + '</h3><p>Бардык студенттер</p></div>';
      bodyArea.innerHTML = '<h3>📊 Аналитика</h3>';
      if (myCourses.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">📊</div><p>Аналитика үчүн курстар керек</p></div>';
      } else {
        bodyArea.innerHTML += '<div class="dash-card-item"><h4>📚 Курстар боюнча статистика</h4>' +
          myCourses.map(function(c) {
            return '<p>📚 ' + c.title + ': ' + c.enrolled + ' студент, ⭐ ' + c.rating + ', 💰 ' + (c.price * c.enrolled).toLocaleString() + ' сом</p>';
          }).join('') + '</div>';
        bodyArea.innerHTML += '<div class="dash-card-item"><h4>👥 Студенттердин активдүүлүгү</h4>' +
          '<p>Активдүү студенттер: ' + myStudents.filter(function(s) { return s.progress > 0 && s.progress < 100; }).length + '</p>' +
          '<p>Бүтүргөн студенттер: ' + myStudents.filter(function(s) { return s.progress === 100; }).length + '</p>' +
          '<p>Жаңы катталгандар: ' + myStudents.filter(function(s) { return new Date(s.enrolledAt) > new Date(Date.now() - 7 * 86400000); }).length + '</p></div>';
      }
      break;
    case 'add-course':
      statsGrid.innerHTML = '';
      bodyArea.innerHTML = '<h3>➕ Жаңы курс кошуу</h3>' +
        '<form id="dashAddCourseForm" style="max-width:600px;">' +
        '<div class="form-group"><label>Курс аталышы *</label><input type="text" id="dashNewTitle" required></div>' +
        '<div class="form-group"><label>Категория *</label><select id="dashNewCat" required><option value="">Тандаңыз</option><option>Программалоо</option><option>Дизайн</option><option>Тилдер</option><option>Маркетинг</option><option>Технология</option><option>Бизнес</option></select></div>' +
        '<div class="form-group"><label>Деңгээл *</label><select id="dashNewLevel" required><option value="">Тандаңыз</option><option value="Баштапкы">Баштапкы</option><option value="Орто">Орто</option><option value="Өнүккөн">Өнүккөн</option></select></div>' +
        '<div class="form-group"><label>Узактыгы *</label><input type="text" id="dashNewTime" placeholder="Мисалы: 8 жума" required></div>' +
        '<div class="form-group"><label>Сабактар *</label><input type="number" id="dashNewLessons" min="1" value="20" required></div>' +
        '<div class="form-group"><label>Баасы (сом) *</label><input type="number" id="dashNewPrice" min="0" required></div>' +
        '<div class="form-group"><label>Сүрөттөмө *</label><textarea id="dashNewDesc" rows="3" required></textarea></div>' +
        '<button type="submit" class="btn btn-primary">💾 Сактоо</button>' +
        '</form>';
      document.getElementById('dashAddCourseForm').addEventListener('submit', function(e) {
        e.preventDefault();
        addCourseFromDashboard();
      });
      break;
  }
}

function renderTeacherProfile() {
  return '<div class="profile-section">' +
    '<div class="profile-card">' +
      '<div class="profile-avatar-large">' + currentUser.name.charAt(0).toUpperCase() + '</div>' +
      '<div class="profile-info"><h3>' + currentUser.name + '</h3><p>👨‍🏫 Мугалим</p></div>' +
      '<button class="btn btn-outline" style="margin-top:15px; width:100%;" onclick="openEditProfile()">✏️ Түзөтүү</button>' +
    '</div>' +
    '<div class="profile-details">' +
      '<h3 style="margin-bottom:20px;">Жеке маалыматтар</h3>' +
      '<div class="detail-row"><span class="detail-label">Аты-жөнү</span><span class="detail-value">' + currentUser.name + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">' + currentUser.email + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Адистиги</span><span class="detail-value">' + (currentUser.specialty || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Иш тажрыйбасы</span><span class="detail-value">' + (currentUser.experience || '0') + ' жыл</span></div>' +
      '<div class="detail-row"><span class="detail-label">Билими</span><span class="detail-value">' + (currentUser.education || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Өзү жөнүндө</span><span class="detail-value">' + (currentUser.bio || 'Көрсөтүлгөн эмес') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Катталган</span><span class="detail-value">' + new Date(currentUser.createdAt).toLocaleDateString('ky-KG') + '</span></div>' +
      '<div class="detail-row"><span class="detail-label">Рол</span><span class="badge badge-warning">Мугалим</span></div>' +
    '</div>' +
  '</div>';
}

function viewCourseStudents(courseId) {
  const course = courses.find(function(c) { return c.id === courseId; });
  if (!course) return;
  const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
  const students = [];
  allUsers.forEach(function(u) {
    if (u.role === 'student' && u.enrolledCourses) {
      const enrollment = u.enrolledCourses.find(function(e) { return e.courseId === courseId; });
      if (enrollment) {
        students.push({ name: u.name, email: u.email, progress: enrollment.progress, enrolledAt: enrollment.enrolledAt });
      }
    }
  });
  const bodyArea = document.getElementById('dashBodyArea');
  bodyArea.innerHTML = '<h3>👥 ' + course.title + ' - Студенттер</h3>' +
    '<button class="btn btn-outline btn-sm" style="margin-bottom:15px;" onclick="switchDashTab(\'my-courses\')">← Артка</button>';
  if (students.length === 0) {
    bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">👥</div><p>Бул курска эч ким каттала элек</p></div>';
  } else {
    bodyArea.innerHTML += '<table class="data-table"><thead><tr><th>Аты</th><th>Email</th><th>Прогресс</th><th>Катталган</th></tr></thead><tbody>' +
      students.map(function(s) {
        return '<tr><td>' + s.name + '</td><td>' + s.email + '</td><td><div class="progress-bar" style="width:100px; display:inline-block; vertical-align:middle;"><div class="progress-fill" style="width:' + s.progress + '%"></div></div> ' + s.progress + '%</td><td>' + new Date(s.enrolledAt).toLocaleDateString('ky-KG') + '</td></tr>';
      }).join('') + '</tbody></table>';
  }
}

function addCourseFromDashboard() {
  const newCourse = {
    id: courses.length + 1,
    title: document.getElementById('dashNewTitle').value,
    cat: document.getElementById('dashNewCat').value,
    level: document.getElementById('dashNewLevel').value,
    time: document.getElementById('dashNewTime').value,
    price: parseInt(document.getElementById('dashNewPrice').value),
    desc: document.getElementById('dashNewDesc').value,
    teacher: currentUser.name,
    lessons: parseInt(document.getElementById('dashNewLessons').value),
    color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    enrolled: 0,
    rating: 0,
    reviews: 0
  };
  courses.push(newCourse);
  if (!currentUser.courses) currentUser.courses = [];
  currentUser.courses.push(newCourse.id);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  showToast('✅ Курс кошулду! Студенттерди күтөбүз!', 'success');
  addNotification('Жаңы курс!', '"' + newCourse.title + '" кошулду', 'success');
  switchDashTab('my-courses');
  renderCourses();
}

// ===== ADMIN DASHBOARD =====
function renderAdminTab(tabId, statsGrid, bodyArea) {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
  switch(tabId) {
    case 'overview':
      const totalRevenue = courses.reduce(function(s, c) { return s + c.price * c.enrolled; }, 0);
      const avgRating = courses.length > 0 ? (courses.reduce(function(s, c) { return s + c.rating; }, 0) / courses.length).toFixed(1) : '0.0';
      statsGrid.innerHTML = 
        '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + (users.length + 1) + '</h3><p>Колдонуучулар</p></div>' +
        '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + courses.length + '</h3><p>Курстар</p></div>' +
        '<div class="stat-box"><div class="stat-icon">💬</div><h3>' + reviews.length + '</h3><p>Пикирлер</p></div>' +
        '<div class="stat-box"><div class="stat-icon">💰</div><h3>' + totalRevenue.toLocaleString() + '</h3><p>Киреше</p></div>';
      bodyArea.innerHTML = '<h3>📊 Системанын обзору</h3>' +
        '<div class="dash-card-item"><h4>👥 Колдонуучулар боюнча</h4>' +
        '<p>Студенттер: ' + users.filter(function(u) { return u.role === 'student'; }).length + '</p>' +
        '<p>Мугалимдер: ' + users.filter(function(u) { return u.role === 'teacher'; }).length + '</p>' +
        '<p>Админдер: 1</p></div>' +
        '<div class="dash-card-item"><h4>📚 Популярдуу курстар</h4>' +
        courses.sort(function(a, b) { return b.enrolled - a.enrolled; }).slice(0, 5).map(function(c) {
          return '<p>📚 ' + c.title + ' - ' + c.enrolled + ' студент, ⭐ ' + c.rating + '</p>';
        }).join('') + '</div>' +
        '<div class="dash-card-item"><h4>💰 Финансылык көрсөткүчтөр</h4>' +
        '<p>Жалпы киреше: ' + totalRevenue.toLocaleString() + ' сом</p>' +
        '<p>Орточо курс баасы: ' + Math.round(courses.reduce(function(s, c) { return s + c.price; }, 0) / courses.length).toLocaleString() + ' сом</p></div>';
      break;
    case 'users':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">👥</div><h3>' + users.length + '</h3><p>Бардыгы</p></div>';
      bodyArea.innerHTML = '<h3>👥 Колдонуучуларды башкаруу</h3>';
      const allUsers = [{ id:'admin', name:'Админ', email:'admin@edu.kg', role:'admin', createdAt: new Date().toISOString() }].concat(users);
      bodyArea.innerHTML += '<table class="data-table"><thead><tr><th>Аты</th><th>Email</th><th>Рол</th><th>Катталган</th><th></th></tr></thead><tbody>' +
        allUsers.map(function(u) {
          const roleBadge = u.role === 'admin' ? '<span class="badge badge-primary">Админ</span>' : 
                           u.role === 'teacher' ? '<span class="badge badge-warning">Мугалим</span>' : 
                           '<span class="badge badge-success">Студент</span>';
          return '<tr><td>' + u.name + '</td><td>' + u.email + '</td><td>' + roleBadge + '</td><td>' + new Date(u.createdAt).toLocaleDateString('ky-KG') + '</td>' +
            '<td>' + (u.role !== 'admin' ? '<button class="btn btn-danger btn-sm" onclick="adminDeleteUser(\'' + u.id + '\')">🗑️</button>' : '') + '</td></tr>';
        }).join('') + '</tbody></table>';
      break;
    case 'all-courses':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📚</div><h3>' + courses.length + '</h3><p>Бардык курстар</p></div>';
      bodyArea.innerHTML = '<h3>📚 Курстарды башкаруу</h3>' +
        '<table class="data-table"><thead><tr><th>Аталышы</th><th>Категория</th><th>Мугалим</th><th>Баасы</th><th>Студенттер</th><th>Рейтинг</th><th></th></tr></thead><tbody>' +
        courses.map(function(c) {
          return '<tr><td>' + c.title + '</td><td>' + c.cat + '</td><td>' + c.teacher + '</td><td>' + c.price.toLocaleString() + ' сом</td><td>' + c.enrolled + '</td><td>⭐ ' + c.rating + '</td>' +
            '<td><button class="btn btn-danger btn-sm" onclick="adminDeleteCourse(' + c.id + ')">🗑️</button></td></tr>';
        }).join('') + '</tbody></table>';
      break;
    case 'reviews':
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">💬</div><h3>' + reviews.length + '</h3><p>Пикирлер</p></div>';
      bodyArea.innerHTML = '<h3>💬 Пикирлерди башкаруу</h3>';
      if (reviews.length === 0) {
        bodyArea.innerHTML += '<div class="empty-state"><div class="empty-state-icon">💬</div><p>Пикирлер жок</p></div>';
      } else {
        bodyArea.innerHTML += reviews.map(function(r, index) {
          let starsStr = '';
          for(let i=0; i<5; i++) starsStr += (i < r.rating) ? '★' : '☆';
          return '<div class="dash-card-item"><div style="display:flex; justify-content:space-between; align-items:start;">' +
            '<div><strong>' + r.name + '</strong> <span style="color:var(--warning);">' + starsStr + '</span><p style="margin:5px 0;">' + r.text + '</p><small style="color:var(--text-muted);">' + r.role + ' • ' + r.date + '</small></div>' +
            '<button class="btn btn-danger btn-sm" onclick="adminDeleteReview(' + index + ')">🗑️</button>' +
          '</div></div>';
        }).join('');
      }
      break;
    case 'analytics':
      const catStats = {};
      courses.forEach(function(c) { catStats[c.cat] = (catStats[c.cat] || 0) + 1; });
      statsGrid.innerHTML = '<div class="stat-box"><div class="stat-icon">📊</div><h3>' + courses.length + '</h3><p>Курстар</p></div>';
      bodyArea.innerHTML = '<h3>📊 Толук аналитика</h3>' +
        '<div class="dash-card-item"><h4>📚 Категориялар боюнча</h4>' +
        Object.entries(catStats).map(function(entry) {
          return '<p>📁 ' + entry[0] + ': ' + entry[1] + ' курс</p>';
        }).join('') + '</div>' +
        '<div class="dash-card-item"><h4>👥 Активдүүлүк</h4>' +
        '<p>Бардык катталгандар: ' + users.reduce(function(s, u) { return s + (u.enrolledCourses || []).length; }, 0) + '</p>' +
        '<p>Бүтүргөн: ' + users.reduce(function(s, u) { return s + (u.enrolledCourses || []).filter(function(e) { return e.progress === 100; }).length; }, 0) + '</p></div>';
      break;
  }
}

function adminDeleteUser(id) {
  if (!confirm('Бул колдонуучуну өчүргүңүз келеби? Бул аракетти кайра кайтаруу мүмкүн эмес!')) return;
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  users = users.filter(function(u) { return u.id !== id; });
  localStorage.setItem('users', JSON.stringify(users));
  showToast('✅ Колдонуучу өчүрүлдү!', 'success');
  addNotification('Колдонуучу өчүрүлдү', 'ID: ' + id, 'warning');
  switchDashTab('users');
}

function adminDeleteCourse(id) {
  if (!confirm('Бул курсту өчүргүңүз келеби?')) return;
  const idx = courses.findIndex(function(c) { return c.id === id; });
  if (idx !== -1) {
    courses.splice(idx, 1);
    showToast('✅ Курс өчүрүлдү!', 'success');
    addNotification('Курс өчүрүлдү', 'ID: ' + id, 'warning');
    switchDashTab('all-courses');
    renderCourses();
  }
}

function adminDeleteReview(index) {
  if (!confirm('Бул пикирди өчүргүңүз келеби?')) return;
  let reviews = JSON.parse(localStorage.getItem('siteReviews') || '[]');
  reviews.splice(index, 1);
  localStorage.setItem('siteReviews', JSON.stringify(reviews));
  showToast('✅ Пикир өчүрүлдү!', 'success');
  switchDashTab('reviews');
}

// ===== ADD COURSE FROM MODAL =====
function addNewCourse() {
  if (!currentUser || currentUser.role !== 'teacher') return;
  const newCourse = {
    id: courses.length + 1,
    title: document.getElementById('newCTitle').value,
    cat: document.getElementById('newCCat').value,
    time: document.getElementById('newCTime').value,
    price: parseInt(document.getElementById('newCPrice').value),
    desc: document.getElementById('newCDesc').value,
    teacher: currentUser.name,
    lessons: parseInt(document.getElementById('newCLessons').value),
    color: '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'),
    enrolled: 0,
    rating: 0,
    reviews: 0,
    level: 'Баштапкы'
  };
  courses.push(newCourse);
  if (!currentUser.courses) currentUser.courses = [];
  currentUser.courses.push(newCourse.id);
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  closeModal('addCourseModal');
  showToast('✅ Курс кошулду! Студенттерди күтөбүз!', 'success');
  addNotification('Жаңы курс!', '"' + newCourse.title + '" кошулду', 'success');
  renderCourses();
  document.getElementById('addCourseForm').reset();
}

// ===== EDIT PROFILE =====
function openEditProfile() {
  const modal = document.getElementById('editProfileModal');
  const fields = document.getElementById('editProfileFields');
  if (currentUser.role === 'student') {
    fields.innerHTML = 
      '<div class="form-group"><label>Аты-жөнү</label><input type="text" id="editName" value="' + currentUser.name + '"></div>' +
      '<div class="form-group"><label>Телефон</label><input type="tel" id="editPhone" value="' + (currentUser.phone || '') + '"></div>' +
      '<div class="form-group"><label>Туулган күнү</label><input type="date" id="editBirthdate" value="' + (currentUser.birthdate || '') + '"></div>' +
      '<div class="form-group"><label>Билими</label><select id="editEducation"><option value="">Тандаңыз</option><option value="school">Мектеп</option><option value="college">Колледж</option><option value="bachelor">Бакалавр</option><option value="master">Магистратура</option></select></div>';
  } else {
    fields.innerHTML = 
      '<div class="form-group"><label>Аты-жөнү</label><input type="text" id="editName" value="' + currentUser.name + '"></div>' +
      '<div class="form-group"><label>Адистиги</label><input type="text" id="editSpecialty" value="' + (currentUser.specialty || '') + '"></div>' +
      '<div class="form-group"><label>Иш тажрыйбасы (жыл)</label><input type="number" id="editExp" value="' + (currentUser.experience || '') + '"></div>' +
      '<div class="form-group"><label>Өзү жөнүндө</label><textarea id="editBio" rows="2">' + (currentUser.bio || '') + '</textarea></div>';
  }
  openModal('editProfileModal');
  document.getElementById('editProfileForm').onsubmit = function(e) {
    e.preventDefault();
    saveProfile();
  };
}

function saveProfile() {
  currentUser.name = document.getElementById('editName').value;
  if (currentUser.role === 'student') {
    currentUser.phone = document.getElementById('editPhone').value;
    currentUser.birthdate = document.getElementById('editBirthdate').value;
    currentUser.education = document.getElementById('editEducation').value;
  } else {
    currentUser.specialty = document.getElementById('editSpecialty').value;
    currentUser.experience = document.getElementById('editExp').value;
    currentUser.bio = document.getElementById('editBio').value;
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  const idx = users.findIndex(function(u) { return u.id === currentUser.id; });
  if (idx !== -1) {
    users[idx] = currentUser;
    localStorage.setItem('users', JSON.stringify(users));
  }
  closeModal('editProfileModal');
  showToast('✅ Профиль жаңыртылды!', 'success');
  document.getElementById('dashAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('dashUserName').textContent = currentUser.name;
  document.getElementById('dashGreeting').textContent = 'Салам, ' + currentUser.name + '! 👋';
  switchDashTab('profile');
}

// ===== TOAST NOTIFICATIONS =====
function showToast(message, type) {
  type = type || 'success';
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type;
  toast.innerHTML = '<span>' + message + '</span>';
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(function() {
    toast.classList.add('show');
  });

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}

// ===== UTILITIES =====
function scrollToCourses() {
  document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
}

function showAlert(msg, type) {
  type = type || 'success';
  const alert = document.createElement('div');
  alert.className = 'alert alert-' + type;
  alert.textContent = msg;
  document.body.appendChild(alert);
  setTimeout(function() { alert.remove(); }, 3000);
}

function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileToggle.textContent = navLinks.classList.contains('active') ? '✖' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        mobileToggle.textContent = '☰';
      });
    });
  }
}

// ===== GLOBAL EXPORTS =====
window.openModal = openModal;
window.closeModal = closeModal;
window.selectRole = selectRole;
window.showCourseInfo = showCourseInfo;
window.enrollCourse = enrollCourse;
window.scrollToCourses = scrollToCourses;
window.openDashboard = openDashboard;
window.exitDashboard = exitDashboard;
window.switchDashTab = switchDashTab;
window.handleLogout = handleLogout;
window.viewCourseStudents = viewCourseStudents;
window.adminDeleteUser = adminDeleteUser;
window.adminDeleteCourse = adminDeleteCourse;
window.adminDeleteReview = adminDeleteReview;
window.openEditProfile = openEditProfile;
window.continueCourse = continueCourse;
window.goToPage = goToPage;
window.markRead = markRead;
