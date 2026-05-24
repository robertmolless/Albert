const screen = document.getElementById("screen");
const birthdayMusic = document.getElementById("birthdayMusic");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

const state = {
  step: 0,
  confetti: [],
  runningConfetti: false,
  musicEnabled: false
};

if (birthdayMusic) {
  birthdayMusic.volume = 0.45;
}

const steps = [
  renderStart,
  renderDiagnostic,
  renderSearchAlbert,
  renderAlbertFound,
  renderSearchGroup,
  renderGroupFound,
  renderAnalysisDone,
  renderAgeError,
  renderPatch,
  renderSystemRestored,
  renderCongrats,
  renderWish
];

function wrap(html) {
  return `<div class="screen-inner">${html}</div>`;
}

function setScreen(html) {
  screen.innerHTML = wrap(html);
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
    <h1>Система поздравлений</h1>
    <p class="red">Обнаружен критический сбой</p>

    <div class="warning-triangle"></div>

    <div class="card alert-card">
      <p>Возраст пользователя Альберт увеличен на 1.</p>
      <p>Дата события: 24 мая.</p>
      <p>Новая версия: 27.0.</p>
      <br>
      <p>Требуется диагностика и восстановление праздничного протокола.</p>
    </div>

    <button class="btn" onclick="next()">Начать диагностику</button>
    <button class="btn btn-small" id="musicBtn" onclick="toggleMusic()">Музыка: включить</button>
  `);
}

function renderDiagnostic() {
  setScreen(`
    <h2>Диагностика системы</h2>
    <p>Выполняется анализ пользователя...</p>

    <div class="card">
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
    <h2>Поиск личности</h2>
    <p>Сканирование базы данных на предмет главного персонажа...</p>

    <div class="grid-lines">
      <div class="radar">
        <span class="dot d1"></span>
        <span class="dot d2"></span>
        <span class="dot d3"></span>
        <span class="dot d4"></span>
        <span class="dot d5"></span>
      </div>
    </div>

    <div class="card">
      <p>Поиск совпадений: 87%</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть результат</button>
  `);
}

function renderAlbertFound() {
  setScreen(`
    <h2>Личность найдена</h2>

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
    <h2>Поиск окружения</h2>
    <p>Анализ социальных связей и ближайшего окружения...</p>

    <div class="grid-lines">
      <div class="radar">
        <span class="dot d1"></span>
        <span class="dot d2"></span>
        <span class="dot d3"></span>
        <span class="dot d4"></span>
        <span class="dot d5"></span>
        <span class="dot d6"></span>
        <span class="dot d7"></span>
      </div>
    </div>

    <div class="card">
      <p>Найдено: 7 человек.</p>
      <p>Уровень хаоса: выше среднего.</p>
      <div class="progress"><div></div></div>
    </div>

    <button class="btn" onclick="next()">Открыть архив</button>
  `);
}

function renderGroupFound() {
  setScreen(`
    <h2>Окружение найдено</h2>

    <img class="photo" src="assets/company.jpg" alt="Компания">

    <div class="card">
      <p>Состав группы:</p>
      <p>Генератор хаоса.</p>
      <p>Поставщик мемов.</p>
      <p>Исчезает на полгода и возвращается.</p>
      <p>Человек "щас выйду" на 40 минут.</p>
      <p>Верные спутники приключений.</p>
      <p>Поддержка 24/7.</p>
    </div>

    <button class="btn" onclick="next()">Завершить анализ</button>
  `);
}

function renderAnalysisDone() {
  setScreen(`
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

    <div class="hero-icon">✅</div>

    <button class="btn" onclick="next()">Исправить ошибку</button>
  `);
}

function renderAgeError() {
  setScreen(`
    <h2 class="red glitch">Ошибка</h2>

    <div class="card alert-card">
      <p>Возраст откатить невозможно.</p>
      <br>
      <p class="red">Причина: День рождения 🎂</p>
      <br>
      <p>Обнаружено автоматическое повышение уровня.</p>
      <p>Альберт успешно перешел на версию 27.0.</p>
      <br>
      <p>Решение: принять поздравления, подарки и внимание.</p>
    </div>

    <button class="btn btn-red" onclick="next()">Продолжить</button>
  `);
}

function renderPatch() {
  setScreen(`
    <h2>Загрузка праздничного патча</h2>
    <p>Устанавливаем улучшения для Альберта...</p>

    <div class="card">
      ${meter("Удача", 100)}
      ${meter("Деньги", 100)}
      ${meter("Здоровье", 100)}
      ${meter("Настроение", 100)}
      ${meter("Энергия", 100)}
      ${meter("Любовь близких", 100)}
      ${meter("Защита от проблем", 100)}
    </div>

    <div class="card">
      <p>Установка завершена! 🎉</p>
    </div>

    <button class="btn" onclick="next()">Перезагрузить систему</button>
  `);
}

function renderSystemRestored() {
  setScreen(`
    <h2>Система восстановлена</h2>

    <div class="hero-icon">✅</div>

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
    <div class="final-title">С днем<br>рождения!</div>
    <div class="cake">🎂</div>

    <div class="card center">
      <p class="yellow">Альберт, легенда, оставайся собой!</p>
    </div>

    <button class="btn" onclick="next()">Открыть пожелание</button>
  `);
}

function renderWish() {
  startConfetti();
  setScreen(`
    <h2>Финальное пожелание</h2>

    <div class="card">
      <p>Альберт, с 27-летием!</p>
      <br>
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
      <button class="btn" onclick="toggleMusic()">Музыка</button>
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
      alert("Нажми еще раз, iPhone иногда блокирует первый запуск звука.");
    }
  }

  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  btn.textContent = state.musicEnabled ? "Музыка: выключить" : "Музыка: включить";
}

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
  state.confetti = Array.from({ length: 130 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    r: 4 + Math.random() * 7,
    vy: 2 + Math.random() * 4,
    vx: -1.5 + Math.random() * 3,
    rot: Math.random() * Math.PI,
    vr: -.12 + Math.random() * .24,
    color: ["#44ff63", "#ffd95a", "#ff3d3d", "#ffffff", "#6be8ff"][Math.floor(Math.random() * 5)]
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
