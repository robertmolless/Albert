const screen = document.getElementById("screen");
const birthdayMusic = document.getElementById("birthdayMusic");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

const zoomModal = document.getElementById("zoomModal");
const zoomStage = document.getElementById("zoomStage");
const zoomImage = document.getElementById("zoomImage");

const state = {
  step: 0,
  confetti: [],
  runningConfetti: false,
  musicEnabled: false,
  zoom: {
    scale: 1,
    x: 0,
    y: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    baseX: 0,
    baseY: 0,
    pinchStart: 0,
    pinchScale: 1
  }
};

if (birthdayMusic) birthdayMusic.volume = 0.5;

const steps = [
  renderStart,
  renderDiagnostic,
  renderProfile,
  renderEnvironmentSearch,
  renderMemories,
  renderAchievements,
  renderSecretFile,
  renderPatch,
  renderFinal,
  renderDelivered
];

function panel(html) {
  return `<section class="panel">${html}</section>`;
}

function kicker(num, text) {
  return `<div class="kicker"><span>${num}</span>${text}</div>`;
}

function setScreen(html) {
  screen.innerHTML = panel(html);
  screen.classList.remove("fade-in");
  void screen.offsetWidth;
  screen.classList.add("fade-in");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function next() {
  await ensureMusic();
  state.step = Math.min(state.step + 1, steps.length - 1);
  steps[state.step]();
}

function restart() {
  state.step = 0;
  stopConfetti();
  steps[0]();
}

function renderStart() {
  setScreen(`
    ${kicker(1, "запуск системы")}
    <h1 class="title-gradient">Система поздравлений</h1>
    <p class="jp">お誕生日プロトコル</p>

    <div class="warning">!</div>

    <div class="card card-danger">
      <p><b class="red">Критический сбой:</b> День рождения.</p>
      <br>
      <p>Возраст пользователя Альберт увеличен на 1 год.</p>
      <p>Дата события: 24 мая.</p>
      <p>Версия: 27.0.</p>
    </div>

    <div class="hero-scene"></div>

    <button class="btn" onclick="next()">Запустить систему</button>
    <button class="btn btn-ghost" id="musicBtn" onclick="toggleMusic()">Музыка: включить</button>
  `);
}

function renderDiagnostic() {
  setScreen(`
    ${kicker(2, "диагностика")}
    <h2>Диагностика системы</h2>
    <p>Проверяем важные параметры перед запуском праздничного протокола.</p>

    <div class="card card-soft">
      ${meter("Анализ данных", 100)}
      ${meter("Проверка личности", 100)}
      ${meter("Совместимость", 100)}
      ${meter("Уровень легендарности", 100)}
      ${meter("Запас позитива", 100)}
      ${meter("Протокол дружбы", 100)}
      ${meter("Чувство юмора", 100)}
    </div>

    <div class="card card-success">
      <p><b>Диагностика завершена.</b></p>
      <p>Статус: отлично.</p>
    </div>

    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderProfile() {
  setScreen(`
    ${kicker(3, "личность найдена")}
    <h2 class="title-gradient">Альберт найден</h2>

    <div class="profile-image-wrap">
      <img class="profile-image" src="assets/profile_albert_v6.png?v=6" alt="Альберт">
    </div>

    <div class="card">
      <div class="stat-grid">
        <div class="stat"><span>Имя</span><span>Альберт</span></div>
        <div class="stat"><span>Статус</span><span>главный персонаж</span></div>
        <div class="stat"><span>Возраст</span><span>27 лет</span></div>
        <div class="stat"><span>Редкость</span><span>легендарная</span></div>
        <div class="stat"><span>Опасность</span><span>высокая, но в хорошем смысле</span></div>
      </div>
    </div>

    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderEnvironmentSearch() {
  setScreen(`
    ${kicker(4, "окружение")}
    <h2>Окружение обнаружено</h2>
    <p>Сканируем ближайший круг и архив совместных воспоминаний.</p>

    <div class="radar">
      <div class="radar-circle">
        <span class="dot d1">🌸</span>
        <span class="dot d2">🎂</span>
        <span class="dot d3">✨</span>
        <span class="dot d4">🫶</span>
        <span class="dot d5">📸</span>
        <span class="dot d6">🎮</span>
        <span class="dot d7">🦊</span>
      </div>
    </div>

    <div class="card">
      <p>Найдено: <b class="pink">7 человек</b>.</p>
      <p>Статус: лучший круг.</p>
      <br>
      <p>Анализ связей...</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть архив</button>
  `);
}

function renderMemories() {
  setScreen(`
    ${kicker(5, "архив воспоминаний")}
    <h2>Лучшие моменты</h2>
    <p>Восстановлены ключевые фотографии. Нажми на архив, чтобы приблизить.</p>

    <img class="memories-image" src="assets/memories.jpg" alt="Архив воспоминаний" onclick="openZoom()">

    <div class="card">
      <p>Обнаружено: много фотографий.</p>
      <p>Найдено: 7 человек.</p>
      <p>Уровень воспоминаний: максимальный.</p>
    </div>

    <button class="btn btn-ghost" onclick="openZoom()">Приблизить фото</button>
    <button class="btn" onclick="next()">Смотреть дальше</button>
  `);
}

function renderAchievements() {
  setScreen(`
    ${kicker(6, "достижения")}
    <h2>Достижения Альберта</h2>

    <div class="achievements">
      ${achievement("🏆", "Выжил к 27", "легенда")}
      ${achievement("🌸", "Главный персонаж", "легенда")}
      ${achievement("🎭", "Мастер приключений", "легенда")}
      ${achievement("📸", "Генератор воспоминаний", "эпично")}
      ${achievement("🫶", "Душа компании", "легенда")}
      ${achievement("✨", "Человек, которого приятно знать", "бесценно")}
    </div>

    <div class="card card-soft">
      <p>Уровень легендарности: <b class="pink">MAX</b></p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderSecretFile() {
  setScreen(`
    ${kicker(7, "секретный файл")}
    <h2>Секретный файл</h2>

    <div class="secret-folder"></div>

    <div class="card center">
      <p>Найден файл:</p>
      <p class="pink"><b>ALBERT_27_SECRET.DAT</b></p>
      <br>
      <p>Доступ ограничен.</p>
      <p>Требуется подтверждение дружбы.</p>
    </div>

    <button class="btn" onclick="next()">Подтвердить дружбу</button>
    <button class="btn btn-ghost" onclick="next()">Не сейчас</button>
  `);
}

function renderPatch() {
  setScreen(`
    ${kicker(8, "загрузка патча")}
    <h2>Праздничный патч</h2>
    <p>Устанавливаем улучшения для именинника.</p>

    <div class="card card-soft">
      ${meter("Яркие идеи", 100)}
      ${meter("Крепкое здоровье", 100)}
      ${meter("Энергия", 100)}
      ${meter("Настроение", 100)}
      ${meter("Друзья рядом", 100)}
      ${meter("Новые приключения", 100)}
      ${meter("Защита от проблем", 100)}
    </div>

    <div class="card card-success center">
      <p><b>Установка завершена.</b></p>
      <p>Праздничный протокол активирован.</p>
    </div>

    <button class="btn" onclick="next()">Открыть поздравление</button>
  `);
}

function renderFinal() {
  startConfetti();
  setScreen(`
    ${kicker(9, "финальное пожелание")}
    <h2 class="final-title title-gradient">С днем рождения, Альберт!</h2>
    <p class="center">24 мая • 27 лет</p>

    <img class="final-image" src="assets/final_birthday_v6.png?v=6" alt="С днем рождения, Альберт">

    <div class="card center">
      <p>Поздравление подготовлено и доставлено.</p>
      <br>
      <p class="pink"><b>Спасибо, что ты есть! ❤️</b></p>
    </div>

    <button class="btn" onclick="next()">Принять подарок</button>
  `);
}

function renderDelivered() {
  startConfetti();
  setScreen(`
    ${kicker(10, "конец протокола")}
    <h2 class="title-gradient">Поздравление доставлено</h2>

    <div class="hero-scene"></div>

    <div class="card center">
      <p>Статус: принято сердцем.</p>
      <br>
      <p>Альберт официально стал на 1 уровень мощнее.</p>
      <br>
      <p class="pink"><b>С днем рождения!</b></p>
    </div>

    <div class="music-row">
      <button class="btn" onclick="restart()">Заново</button>
      <button class="btn btn-ghost" onclick="toggleMusic()">Музыка</button>
    </div>
  `);
}

function meter(label, value) {
  return `
    <div class="row">
      <strong>${label}</strong>
      <b>${value}%</b>
      <div class="meter"><div style="--w:${value}%"></div></div>
    </div>
  `;
}

function achievement(icon, text, rank) {
  return `
    <div class="achievement">
      <span>${icon}</span>
      <b>${text}</b>
      <small>${rank}</small>
    </div>
  `;
}

function wish(icon, text) {
  return `<div class="wish-line"><span>${icon}</span><p>${text}</p></div>`;
}

async function ensureMusic() {
  if (!state.musicEnabled && birthdayMusic) {
    try {
      birthdayMusic.currentTime = 0;
      await birthdayMusic.play();
      state.musicEnabled = true;
      updateMusicButton();
    } catch (error) {
      state.musicEnabled = false;
    }
  }
}

async function toggleMusic() {
  if (!birthdayMusic) return;

  if (state.musicEnabled) {
    birthdayMusic.pause();
    state.musicEnabled = false;
  } else {
    try {
      await birthdayMusic.play();
      state.musicEnabled = true;
    } catch (error) {
      state.musicEnabled = false;
      alert("Нажми еще раз. iPhone иногда блокирует первый запуск звука.");
    }
  }

  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  btn.textContent = state.musicEnabled ? "Музыка: выключить" : "Музыка: включить";
}

function openZoom() {
  zoomModal.classList.add("open");
  zoomModal.setAttribute("aria-hidden", "false");
  state.zoom.scale = 1;
  state.zoom.x = 0;
  state.zoom.y = 0;
  applyZoom();
}

function closeZoom() {
  zoomModal.classList.remove("open");
  zoomModal.setAttribute("aria-hidden", "true");
}

function applyZoom() {
  zoomImage.style.transform = `translate(calc(-50% + ${state.zoom.x}px), calc(-50% + ${state.zoom.y}px)) scale(${state.zoom.scale})`;
}

function distance(t1, t2) {
  const dx = t1.clientX - t2.clientX;
  const dy = t1.clientY - t2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}

zoomStage.addEventListener("touchstart", event => {
  if (event.touches.length === 1) {
    state.zoom.dragging = true;
    state.zoom.startX = event.touches[0].clientX;
    state.zoom.startY = event.touches[0].clientY;
    state.zoom.baseX = state.zoom.x;
    state.zoom.baseY = state.zoom.y;
  }

  if (event.touches.length === 2) {
    state.zoom.dragging = false;
    state.zoom.pinchStart = distance(event.touches[0], event.touches[1]);
    state.zoom.pinchScale = state.zoom.scale;
  }
}, { passive: false });

zoomStage.addEventListener("touchmove", event => {
  event.preventDefault();

  if (event.touches.length === 1 && state.zoom.dragging) {
    const dx = event.touches[0].clientX - state.zoom.startX;
    const dy = event.touches[0].clientY - state.zoom.startY;
    state.zoom.x = state.zoom.baseX + dx;
    state.zoom.y = state.zoom.baseY + dy;
    applyZoom();
  }

  if (event.touches.length === 2) {
    const d = distance(event.touches[0], event.touches[1]);
    const nextScale = state.zoom.pinchScale * (d / state.zoom.pinchStart);
    state.zoom.scale = Math.max(1, Math.min(4, nextScale));
    applyZoom();
  }
}, { passive: false });

zoomStage.addEventListener("touchend", () => {
  state.zoom.dragging = false;
}, { passive: false });

zoomStage.addEventListener("wheel", event => {
  event.preventDefault();
  const delta = event.deltaY < 0 ? 0.15 : -0.15;
  state.zoom.scale = Math.max(1, Math.min(4, state.zoom.scale + delta));
  applyZoom();
}, { passive: false });

let mouseDragging = false;

zoomStage.addEventListener("mousedown", event => {
  mouseDragging = true;
  state.zoom.startX = event.clientX;
  state.zoom.startY = event.clientY;
  state.zoom.baseX = state.zoom.x;
  state.zoom.baseY = state.zoom.y;
});

window.addEventListener("mousemove", event => {
  if (!mouseDragging) return;
  state.zoom.x = state.zoom.baseX + event.clientX - state.zoom.startX;
  state.zoom.y = state.zoom.baseY + event.clientY - state.zoom.startY;
  applyZoom();
});

window.addEventListener("mouseup", () => {
  mouseDragging = false;
});

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth * window.devicePixelRatio;
  confettiCanvas.height = window.innerHeight * window.devicePixelRatio;
  confettiCanvas.style.width = window.innerWidth + "px";
  confettiCanvas.style.height = window.innerHeight + "px";
  ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
}

function startConfetti() {
  resizeConfetti();
  if (state.runningConfetti) return;
  state.runningConfetti = true;
  state.confetti = Array.from({ length: 160 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    r: 4 + Math.random() * 7,
    vy: 2 + Math.random() * 4,
    vx: -1.5 + Math.random() * 3,
    rot: Math.random() * Math.PI,
    vr: -.12 + Math.random() * .24,
    color: ["#ff8bc6", "#ffc2df", "#ffe08a", "#8ff6ff", "#ffffff"][Math.floor(Math.random() * 5)]
  }));
  requestAnimationFrame(drawConfetti);
}

function stopConfetti() {
  state.runningConfetti = false;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

function drawConfetti() {
  if (!state.runningConfetti) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  state.confetti.forEach(piece => {
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.rot += piece.vr;

    if (piece.y > window.innerHeight + 20) {
      piece.y = -20;
      piece.x = Math.random() * window.innerWidth;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rot);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.r / 2, -piece.r / 2, piece.r, piece.r * 1.8);
    ctx.restore();
  });

  requestAnimationFrame(drawConfetti);
}

window.addEventListener("resize", resizeConfetti);
steps[0]();
