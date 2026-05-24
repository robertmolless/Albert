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

if (birthdayMusic) {
  birthdayMusic.volume = 0.48;
}

const steps = [
  renderStart,
  renderDiagnostic,
  renderSearchAlbert,
  renderAlbertFound,
  renderSearchGroup,
  renderMemoriesFound,
  renderAnalysisDone,
  renderAgeError,
  renderPatch,
  renderSystemRestored,
  renderCongrats,
  renderWish
];

function panel(html) {
  return `<div class="panel">${html}</div>`;
}

function stepLabel(num, text) {
  return `<div class="step-label"><span>${num}</span>${text}</div>`;
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
    ${stepLabel(1, "старт")}
    <h1>Система поздравлений</h1>
    <p class="jp">誕生日プロトコル</p>

    <div class="warning"></div>

    <div class="card alert-card">
      <p class="red">Критический сбой: День рождения.</p>
      <br>
      <p>Возраст пользователя Альберт увеличен на 1 год.</p>
      <p>Дата события: 24 мая.</p>
      <p>Новая версия: 27.0.</p>
      <br>
      <p>Требуется диагностика и восстановление праздничного протокола.</p>
    </div>

    <div class="mount"></div>

    <button class="btn" onclick="next()">Запустить диагностику</button>
    <button class="btn btn-pink btn-small" id="musicBtn" onclick="toggleMusic()">Музыка: включить</button>
  `);
}

function renderDiagnostic() {
  setScreen(`
    ${stepLabel(2, "диагностика")}
    <h2>Диагностика системы</h2>
    <p>Проверяем жизненно важные параметры...</p>

    <div class="card card-green">
      ${meter("Харизма", 97)}
      ${meter("Адекватность", 62)}
      ${meter("Запас энергии", 41)}
      ${meter("Творить дичь", 99)}
      ${meter("Уровень дружбы", 100)}
      ${meter("Любовь к еде", 95)}
      ${meter("Сон 8 часов", 4)}
    </div>

    <div class="card">
      <p class="type" id="typed"></p>
    </div>

    <button class="btn" onclick="next()">Продолжить</button>
  `);
  typeText("Диагностика почти завершена. Обнаружен подозрительно высокий уровень легендарности.", "typed");
}

function renderSearchAlbert() {
  setScreen(`
    ${stepLabel(3, "поиск личности")}
    <h2>Поиск личности</h2>
    <p>Сканируем базу данных легендарных личностей...</p>

    <div class="radar-wrap">
      <div class="radar">
        <span class="dot d1">🐱</span>
        <span class="dot d2">🌸</span>
        <span class="dot d3">✨</span>
        <span class="dot d4">🍜</span>
        <span class="dot d5">🎂</span>
      </div>
    </div>

    <div class="card card-green">
      <p>Поиск совпадений: 87%</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть результат</button>
  `);
}

function renderAlbertFound() {
  setScreen(`
    ${stepLabel(4, "Альберт найден")}
    <h2>Личность найдена!</h2>

    <img class="photo tall" src="assets/albert.jpg" alt="Альберт">

    <div class="card">
      <p>Имя: <span class="yellow">Альберт</span></p>
      <p>Статус: главный персонаж</p>
      <p>Возраст: 27 лет</p>
      <p>Редкость: легендарный</p>
      <p>Уровень крутости: ██████████ 100%</p>
      <p>Опасность: высокая, но в хорошем смысле</p>
    </div>

    <button class="btn" onclick="next()">Продолжить анализ</button>
  `);
}

function renderSearchGroup() {
  setScreen(`
    ${stepLabel(5, "поиск окружения")}
    <h2>Поиск окружения</h2>
    <p>Анализ социальных связей и ближайшего круга...</p>

    <div class="radar-wrap">
      <div class="radar">
        <span class="dot d1">🐱</span>
        <span class="dot d2">🌸</span>
        <span class="dot d3">✨</span>
        <span class="dot d4">🍜</span>
        <span class="dot d5">🎂</span>
        <span class="dot d6">🎮</span>
        <span class="dot d7">🦊</span>
      </div>
    </div>

    <div class="card card-green">
      <p>Найдено: 7 человек.</p>
      <p>Обнаружен архив воспоминаний.</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть архив</button>
  `);
}

function renderMemoriesFound() {
  setScreen(`
    ${stepLabel(6, "архив воспоминаний")}
    <h2>Архив найден</h2>
    <p>Восстанавливаем окружение и ключевые моменты...</p>

    <img class="memory-photo" src="assets/memories.jpg" alt="Архив воспоминаний" onclick="openZoom()">

    <div class="card">
      <p>Обнаружено: <span class="yellow">много фотографий</span>.</p>
      <p>Найдено: 7 человек.</p>
      <p>Уровень воспоминаний: критически высокий.</p>
      <br>
      <p class="pink">Нажми на фото, чтобы приблизить и рассмотреть детали.</p>
    </div>

    <button class="btn btn-pink" onclick="openZoom()">Приблизить фото</button>
    <button class="btn" onclick="next()">Продолжить</button>
  `);
}

function renderAnalysisDone() {
  setScreen(`
    ${stepLabel(7, "анализ завершен")}
    <h2>Анализ завершен</h2>

    <div class="card">
      <p>Вывод системы:</p>
      <br>
      <p>Альберт является причиной множества крутых моментов, смеха, дичи и воспоминаний.</p>
      <br>
      <p>Ценность для вселенной: неизмеримо высокая.</p>
      <br>
      <p>Рекомендуется: поздравить, обнять, угостить и радовать.</p>
    </div>

    <div class="cat">🐱✨</div>

    <button class="btn" onclick="next()">Все в порядке!</button>
  `);
}

function renderAgeError() {
  setScreen(`
    ${stepLabel(8, "сбой возраста")}
    <h2 class="red glitch">Ошибка!</h2>

    <div class="card alert-card">
      <p>Возраст откатить невозможно.</p>
      <br>
      <p class="red">Причина: День рождения 24.05 🎂</p>
      <br>
      <p>Обнаружено автоматическое повышение уровня.</p>
      <p>Альберт успешно перешел на версию 27.0.</p>
      <br>
      <p>Решение: принять поздравления, подарки и внимание.</p>
    </div>

    <div class="cat">🐾</div>

    <button class="btn btn-red" onclick="next()">Понятно</button>
  `);
}

function renderPatch() {
  setScreen(`
    ${stepLabel(9, "загрузка патча")}
    <h2>Загрузка праздничного патча</h2>
    <p>Устанавливаем улучшения для именинника...</p>

    <div class="card card-green">
      ${meter("Удача", 100)}
      ${meter("Деньги", 100)}
      ${meter("Здоровье", 100)}
      ${meter("Настроение", 100)}
      ${meter("Энергия", 100)}
      ${meter("Любовь близких", 100)}
      ${meter("Защита от проблем", 100)}
    </div>

    <div class="card center">
      <p class="yellow">Установка завершена!</p>
      <p>Праздничный протокол активирован.</p>
    </div>

    <button class="btn" onclick="next()">Перезагрузить систему</button>
  `);
}

function renderSystemRestored() {
  setScreen(`
    ${stepLabel(10, "система восстановлена")}
    <h2>Система восстановлена</h2>

    <div class="cat">✅🐱</div>

    <div class="card center">
      <p>Все модули работают в нормальном режиме.</p>
      <br>
      <p>Праздничный протокол активирован.</p>
      <p>Дата: 24 мая.</p>
      <p>Пользователь: Альберт.</p>
      <p>Версия: 27.0.</p>
    </div>

    <button class="btn" onclick="next()">Открыть поздравление</button>
  `);
}

function renderCongrats() {
  startConfetti();
  setScreen(`
    ${stepLabel(11, "поздравление")}
    <div class="final-title">С днем<br>рождения!</div>
    <div class="cake">🎂</div>

    <div class="card center">
      <p class="yellow">Альберт, легенда, оставайся собой!</p>
      <p class="jp">お誕生日おめでとう</p>
    </div>

    <button class="btn" onclick="next()">Открыть пожелание</button>
  `);
}

function renderWish() {
  startConfetti();
  setScreen(`
    ${stepLabel(12, "финальное пожелание")}
    <h2>Альберт, с 27-летием!</h2>

    <div class="card">
      <p>Желаю тебе денег больше, чем проблем.</p>
      <p>Настроения всегда на максималке.</p>
      <p>Здоровья крепкого.</p>
      <p>Энергии бесконечной.</p>
      <p>Друзей верных.</p>
      <p>Приключений незабываемых.</p>
      <br>
      <p>Пусть каждый день будет как праздник, а жизнь как лучшая игра.</p>
      <br>
      <p class="yellow">Спасибо, что ты есть! ❤️</p>
    </div>

    <div class="music-row">
      <button class="btn" onclick="restart()">Заново</button>
      <button class="btn btn-pink" onclick="toggleMusic()">Музыка</button>
    </div>
  `);
}

function meter(label, value) {
  return `
    <div class="row">
      <span>${label}</span>
      <div class="bar"><div class="fill" style="--w:${value}%"></div></div>
      <span>${value}%</span>
    </div>
  `;
}

function typeText(text, id) {
  const el = document.getElementById(id);
  if (!el) return;
  let i = 0;
  const timer = setInterval(() => {
    el.textContent = text.slice(0, i);
    i += 1;
    if (i > text.length) clearInterval(timer);
  }, 22);
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
  state.confetti = Array.from({ length: 140 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    r: 4 + Math.random() * 7,
    vy: 2 + Math.random() * 4,
    vx: -1.5 + Math.random() * 3,
    rot: Math.random() * Math.PI,
    vr: -.12 + Math.random() * .24,
    color: ["#68ff7c", "#ffe08a", "#ff4d6d", "#ffffff", "#ff8ccf", "#8ff6ff"][Math.floor(Math.random() * 6)]
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
