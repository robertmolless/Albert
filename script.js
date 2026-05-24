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
  renderSearchPerson,
  renderProfile,
  renderSearchGroup,
  renderMemories,
  renderAchievements,
  renderSecretFile,
  renderAgeError,
  renderPatch,
  renderFinal,
  renderDelivered
];

function panel(html) {
  return `<section class="panel">${html}</section>`;
}

function topLine(num, title) {
  return `
    <div class="topline">
      <div class="badge"><span class="badge-number">${num}</span>${title}</div>
      <div>24.05</div>
    </div>
  `;
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
    ${topLine(1, "старт")}
    <h1 class="neon-green">Система поздравлений</h1>
    <p class="jp">誕生日プロトコル</p>

    <div class="warning">!</div>

    <div class="card card-red">
      <p><b class="neon-pink">Критический сбой:</b> День рождения.</p>
      <br>
      <p>Возраст пользователя Альберт увеличен на 1 год.</p>
      <p>Дата события: 24 мая.</p>
      <p>Версия: 27.0.</p>
      <br>
      <p>Требуется диагностика и восстановление праздничного протокола.</p>
    </div>

    <div class="japan-scene"></div>

    <button class="btn" onclick="next()">Запустить диагностику</button>
    <button class="btn btn-ghost" id="musicBtn" onclick="toggleMusic()">Музыка: включить</button>
  `);
}

function renderDiagnostic() {
  setScreen(`
    ${topLine(2, "диагностика")}
    <h2 class="neon-green">Диагностика системы</h2>
    <p>Проверяем жизненно важные параметры.</p>

    <div class="card">
      ${meter("👤", "Харизма", 98)}
      ${meter("🛡️", "Уровень адекватности", 72)}
      ${meter("⚡", "Запас энергии", 85)}
      ${meter("🧠", "Способность творить дичь", 99)}
      ${meter("💚", "Уровень дружбы", 100)}
      ${meter("🍜", "Любовь к еде", 95)}
      ${meter("🌙", "Сон 8 часов", 4)}
    </div>

    <div class="card card-pink">
      <p>Диагностика почти завершена...</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderSearchPerson() {
  setScreen(`
    ${topLine(3, "поиск личности")}
    <h2 class="neon-green">Поиск личности</h2>
    <p>Сканируем базу данных легендарных личностей.</p>

    <div class="radar-wrap">
      <div class="radar">
        <div class="radar-center">🐱</div>
      </div>
    </div>

    <div class="card">
      <p>Поиск совпадений: 87%</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть результат</button>
  `);
}

function renderProfile() {
  setScreen(`
    ${topLine(4, "Альберт найден")}
    <h2 class="neon-green">Личность найдена!</h2>

    <div class="image-frame">
      <img class="profile-img" src="assets/profile.png?v=9" alt="Альберт">
    </div>

    <div class="card card-pink">
      <div class="stat-grid">
        <div class="stat"><span>Имя</span><span>Альберт</span></div>
        <div class="stat"><span>Статус</span><span>главный персонаж</span></div>
        <div class="stat"><span>Возраст</span><span>27 лет</span></div>
        <div class="stat"><span>Редкость</span><span>легендарная</span></div>
        <div class="stat"><span>Уровень крутости</span><span>100%</span></div>
        <div class="stat"><span>Опасность</span><span>высокая, но в хорошем смысле</span></div>
      </div>
    </div>

    <button class="btn" onclick="next()">Продолжить анализ</button>
  `);
}

function renderSearchGroup() {
  setScreen(`
    ${topLine(5, "поиск окружения")}
    <h2 class="neon-green">Поиск окружения</h2>
    <p>Анализ социальных связей и ближайшего круга.</p>

    <div class="radar-wrap">
      <div class="radar">
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
      <p>Найдено: <b class="neon-pink">10+ человек</b></p>
      <p>Уровень хаоса: выше среднего.</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть архив</button>
  `);
}

function renderMemories() {
  setScreen(`
    ${topLine(6, "друзья найдены")}
    <h2 class="neon-green">Окружение обнаружено!</h2>

    <div class="image-frame">
      <img class="memory-img" src="assets/memories.jpg?v=9" alt="Архив воспоминаний" onclick="openZoom()">
    </div>

    <div class="card card-red">
      <p><b class="neon-pink">⚠ Обнаружена группа подозрительных личностей</b></p>
      <br>
      <p>Роль участников:</p>
      <div class="role-list">
        <p>Генератор хаоса</p>
        <p>Поставщик мемов</p>
        <p>Исчезает на полгода и возвращается</p>
        <p>Человек "щас выйду" на 40 минут</p>
        <p>Верный спутник приключений</p>
        <p>Мастер неожиданных идей</p>
        <p>Поддержка 24/7</p>
      </div>
    </div>

    <div class="card">
      <p>Найдено: 10+ человек.</p>
      <p>Уровень воспоминаний: максимальный.</p>
      <p class="neon-pink">Нажми на фото, чтобы приблизить.</p>
    </div>

    <button class="btn btn-ghost" onclick="openZoom()">Приблизить фото</button>
    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderAchievements() {
  setScreen(`
    ${topLine(7, "достижения")}
    <h2 class="neon-green">Достижения Альберта</h2>

    <div class="achievements">
      ${achievement("🏆", "Выжил к 27", "легенда")}
      ${achievement("🌸", "Главный персонаж", "легенда")}
      ${achievement("🎭", "Мастер приключений", "легенда")}
      ${achievement("📸", "Генератор воспоминаний", "эпично")}
      ${achievement("🫶", "Душа компании", "легенда")}
      ${achievement("✨", "Человек, которого приятно знать", "бесценно")}
    </div>

    <div class="card">
      <p>Уровень легендарности: <b class="neon-pink">100%</b></p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Все в порядке!</button>
  `);
}

function renderSecretFile() {
  setScreen(`
    ${topLine(8, "секретный файл")}
    <h2 class="neon-green">Секретный файл</h2>

    <div class="secret-folder"></div>

    <div class="card card-pink center">
      <p>Найден файл:</p>
      <p class="neon-pink"><b>ALBERT_27_SECRET.DAT</b></p>
      <br>
      <p>Доступ ограничен.</p>
      <p>Требуется подтверждение дружбы.</p>
    </div>

    <button class="btn btn-pink" onclick="next()">Подтвердить дружбу</button>
  `);
}

function renderAgeError() {
  setScreen(`
    ${topLine(9, "сбой возраста")}
    <h2 class="neon-pink">Ошибка!</h2>

    <div class="card card-red">
      <p>Возраст откатить невозможно.</p>
      <br>
      <p class="neon-pink">Причина: День рождения 24.05 🎂</p>
      <br>
      <p>Обнаружено автоматическое повышение уровня.</p>
      <p>Альберт успешно перешел на версию 27.0.</p>
      <br>
      <p>Решение: принять поздравления, подарки и внимание.</p>
    </div>

    <div class="cat-wrap">
      <img class="cat-img small" src="assets/error_cat.png?v=9" alt="Ошибка">
    </div>

    <button class="btn btn-red" onclick="next()">Понятно</button>
  `);
}

function renderPatch() {
  setScreen(`
    ${topLine(10, "загрузка патча")}
    <h2 class="neon-green">Загрузка праздничного патча</h2>
    <p>Устанавливаем улучшения для именинника.</p>

    <div class="card">
      ${meter("🍀", "Удача", 100)}
      ${meter("💸", "Деньги", 100)}
      ${meter("💚", "Здоровье", 100)}
      ${meter("✨", "Настроение", 100)}
      ${meter("⚡", "Энергия", 100)}
      ${meter("🫶", "Любовь близких", 100)}
      ${meter("🛡️", "Защита от проблем", 100)}
    </div>

    <div class="cat-wrap">
      <img class="cat-img" src="assets/group_cat.png?v=9" alt="Праздничный патч">
    </div>

    <div class="card center">
      <p><b class="neon-green">Установка завершена!</b></p>
      <p>Праздничный протокол активирован.</p>
    </div>

    <button class="btn" onclick="next()">Открыть поздравление</button>
  `);
}

function renderFinal() {
  startConfetti();
  setScreen(`
    ${topLine(11, "поздравление")}

    <div class="image-frame">
      <img class="final-img" src="assets/final.png?v=9" alt="С днем рождения, Альберт">
    </div>

    <div class="card card-pink">
      <div class="wish-list">
        ${wish("🦋", "Ярких идей и смелости их воплощать.")}
        ${wish("⭐", "Крепкого здоровья для любых побед.")}
        ${wish("🔥", "Энергии бесконечной.")}
        ${wish("🌙", "Настроения на максимуме.")}
        ${wish("🫶", "Друзей рядом и на связи.")}
        ${wish("🎉", "Приключений незабываемых.")}
      </div>
      <br>
      <p>Пусть каждый день будет как праздник, а жизнь как лучшая игра.</p>
      <br>
      <p class="neon-green"><b>Спасибо, что ты есть! ❤️</b></p>
    </div>

    <button class="btn btn-pink" onclick="next()">Принять подарок</button>
  `);
}

function renderDelivered() {
  startConfetti();
  setScreen(`
    ${topLine(12, "конец протокола")}
    <h2 class="gradient-title center">Поздравление доставлено</h2>

    <div class="cat-wrap">
      <img class="cat-img" src="assets/success_cat.png?v=9" alt="Поздравление доставлено">
    </div>

    <div class="card center">
      <p>Статус: принято сердцем.</p>
      <br>
      <p>Альберт официально стал на 1 уровень мощнее.</p>
      <br>
      <p class="neon-pink"><b>С днем рождения!</b></p>
    </div>

    <div class="music-row">
      <button class="btn" onclick="restart()">Заново</button>
      <button class="btn btn-ghost" onclick="toggleMusic()">Музыка</button>
    </div>
  `);
}

function meter(icon, label, value) {
  return `
    <div class="row">
      <span class="iconbox">${icon}</span>
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
    color: ["#63ff78", "#b8ffbf", "#ff8cc6", "#ffd0e9", "#ffe48a", "#ffffff"][Math.floor(Math.random() * 6)]
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
