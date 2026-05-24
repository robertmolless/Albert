
const screen = document.getElementById("screen");
const birthdayMusic = document.getElementById("birthdayMusic");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");

const zoomModal = document.getElementById("zoomModal");
const zoomStage = document.getElementById("zoomStage");
const zoomImage = document.getElementById("zoomImage");

const state = {
  step: 0,
  lang: localStorage.getItem("birthdayLang") || "ru",
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

const L = {
  ru: {
    date: "24.05",
    start: "старт",
    diag: "диагностика",
    searchPerson: "поиск личности",
    foundAlbert: "Альберт найден",
    searchGroup: "поиск окружения",
    friendsFound: "друзья найдены",
    achievements: "достижения",
    analysisDone: "анализ завершен",
    ageError: "сбой возраста",
    patch: "загрузка патча",
    final: "поздравление",

    startTitle: "Система<br>поздравлений",
    startBadge: "誕生日プロトコル",
    startSub: "Праздничный протокол для Альберта запущен.",
    startAlertTitle: "Критический сбой:",
    startAlertValue: "День рождения.",
    startAge: "Возраст пользователя Альберт увеличен на 1 год.",
    startDate: "Дата события: 24 мая.",
    startVersion: "Версия: 27.0.",
    startNeed: "Требуется диагностика и восстановление праздничного протокола.",
    startButton: "Запустить диагностику",
    musicOn: "Музыка: включить",
    musicOff: "Музыка: выключить",

    diagTitle: "Диагностика системы",
    diagSub: "Проверяем жизненно важные параметры.",
    charisma: "Харизма",
    adequacy: "Уровень адекватности",
    reserve: "Запас энергии",
    chaosSkill: "Способность творить дичь",
    friendship: "Уровень дружбы",
    foodLove: "Любовь к еде",
    sleep: "Сон 8 часов",
    diagAlmost: "Диагностика почти завершена...",
    continue: "Продолжить",

    searchPersonTitle: "Поиск личности",
    searchPersonSub: "Сканируем базу данных легендарных личностей.",
    match: "Поиск совпадений: 87%",
    openResult: "Открыть результат",

    profileTitle: "Личность найдена!",
    name: "Имя",
    status: "Статус",
    age: "Возраст",
    rarity: "Редкость",
    coolness: "Уровень крутости",
    danger: "Опасность",
    albert: "Альберт",
    mainCharacter: "главный персонаж",
    ageValue: "27 лет",
    legendary: "легендарная",
    dangerValue: "высокая, но в хорошем смысле",
    continueAnalysis: "Продолжить анализ",

    groupTitle: "Поиск окружения",
    groupSub: "Анализ социальных связей и ближайшего круга.",
    found: "Найдено:",
    people: "10+ человек",
    chaosLevel: "Уровень хаоса: выше среднего.",
    openArchive: "Открыть архив",

    memoriesTitle: "Окружение обнаружено!",
    suspicious: "⚠ Обнаружена группа подозрительных личностей",
    roles: "Роль участников:",
    r1: "Генератор хаоса",
    r2: "Поставщик мемов",
    r3: "Исчезает на полгода и возвращается",
    r4: "Человек «щас выйду» на 40 минут",
    r5: "Верный спутник приключений",
    r6: "Мастер неожиданных идей",
    r7: "Поддержка 24/7",
    memoryLevel: "Уровень воспоминаний: максимальный.",
    zoomHint: "Нажми на фото, чтобы приблизить.",
    zoomButton: "Приблизить фото",

    achievementsTitle: "Достижения Альберта",
    ach1: "Выжил к 27",
    ach2: "Главный персонаж",
    ach3: "Мастер приключений",
    ach4: "Генератор воспоминаний",
    ach5: "Душа компании",
    ach6: "Человек, которого приятно знать",
    rankLegend: "легенда",
    rankEpic: "эпично",
    rankPriceless: "бесценно",
    legendLevel: "Уровень легендарности:",
    ok: "Все в порядке!",

    analysisTitle: "Анализ завершен",
    conclusion: "Вывод системы:",
    analysis1: "Этот человек причина множества крутых моментов, смеха, дичи и воспоминаний.",
    analysis2: "Ценность для вселенной: неизмеримо высока.",
    analysis3: "Рекомендуется: поздравить, обнять, угостить и радовать.",

    errorTitle: "Ошибка!",
    rollback: "Возраст откатить невозможно.",
    reason: "Причина: День рождения 24.05 🎂",
    levelUp: "Обнаружено автоматическое повышение уровня.",
    versionUp: "Альберт успешно перешел на версию 27.0.",
    solution: "Решение: принять поздравления, подарки и внимание.",
    understood: "Понятно",

    patchTitle: "Загрузка праздничного патча",
    patchSub: "Устанавливаем улучшения для именинника.",
    luck: "Удача",
    money: "Деньги",
    health: "Здоровье",
    mood: "Настроение",
    energy: "Энергия",
    love: "Любовь близких",
    protection: "Защита от проблем",
    installed: "Установка завершена!",
    active: "Праздничный протокол активирован.",
    openGreeting: "Открыть поздравление",

    wish1: "Ярких идей и смелости их воплощать.",
    wish2: "Крепкого здоровья для любых побед.",
    wish3: "Энергии бесконечной.",
    wish4: "Настроения на максимуме.",
    wish5: "Друзей рядом и на связи.",
    wish6: "Приключений незабываемых.",
    finalWish: "Пусть каждый день будет как праздник, а жизнь как лучшая игра.",
    thanks: "Спасибо, что ты есть! ❤️",
    restart: "Заново",
    music: "Музыка",
    audioWarn: "Нажми еще раз. iPhone иногда блокирует первый запуск звука."
  },
  jp: {
    date: "5月24日",
    start: "スタート",
    diag: "診断",
    searchPerson: "人物検索",
    foundAlbert: "アルベルト確認",
    searchGroup: "仲間検索",
    friendsFound: "仲間を確認",
    achievements: "実績",
    analysisDone: "分析完了",
    ageError: "年齢エラー",
    patch: "パッチ適用",
    final: "お祝い",

    startTitle: "お祝い<br>システム",
    startBadge: "誕生日プロトコル",
    startSub: "アルベルトのための誕生日プロトコルを起動しました。",
    startAlertTitle: "重大な異常:",
    startAlertValue: "誕生日を検出。",
    startAge: "ユーザー「アルベルト」の年齢が1つ上がりました。",
    startDate: "発生日: 5月24日。",
    startVersion: "バージョン: 27.0。",
    startNeed: "診断と誕生日プロトコルの復旧が必要です。",
    startButton: "診断を開始",
    musicOn: "音楽: オン",
    musicOff: "音楽: オフ",

    diagTitle: "システム診断",
    diagSub: "重要パラメータを確認しています。",
    charisma: "カリスマ",
    adequacy: "安定度",
    reserve: "エネルギー残量",
    chaosSkill: "面白いことを起こす力",
    friendship: "友情レベル",
    foodLove: "食への愛",
    sleep: "8時間睡眠",
    diagAlmost: "診断はまもなく完了します...",
    continue: "続ける",

    searchPersonTitle: "人物検索",
    searchPersonSub: "伝説級人物データベースをスキャンしています。",
    match: "一致率: 87%",
    openResult: "結果を開く",

    profileTitle: "人物を確認!",
    name: "名前",
    status: "ステータス",
    age: "年齢",
    rarity: "レア度",
    coolness: "かっこよさ",
    danger: "危険度",
    albert: "アルベルト",
    mainCharacter: "主人公",
    ageValue: "27歳",
    legendary: "レジェンド",
    dangerValue: "高い。ただし良い意味で",
    continueAnalysis: "分析を続ける",

    groupTitle: "仲間を検索",
    groupSub: "交友関係と身近な仲間を分析しています。",
    found: "検出:",
    people: "10人以上",
    chaosLevel: "カオス度: やや高め。",
    openArchive: "アーカイブを開く",

    memoriesTitle: "仲間を確認!",
    suspicious: "⚠ あやしいほど最高な仲間たちを検出",
    roles: "参加者の役割:",
    r1: "カオス生成担当",
    r2: "ミーム供給担当",
    r3: "半年消えて突然戻る人",
    r4: "「今出る」と言って40分後の人",
    r5: "冒険の頼れる相棒",
    r6: "予想外のアイデア職人",
    r7: "24時間サポート",
    memoryLevel: "思い出レベル: 最大。",
    zoomHint: "写真をタップすると拡大できます。",
    zoomButton: "写真を拡大",

    achievementsTitle: "アルベルトの実績",
    ach1: "27歳まで到達",
    ach2: "主人公",
    ach3: "冒険マスター",
    ach4: "思い出生成者",
    ach5: "場を明るくする人",
    ach6: "一緒にいて心地よい人",
    rankLegend: "伝説",
    rankEpic: "エピック",
    rankPriceless: "プライスレス",
    legendLevel: "伝説度:",
    ok: "問題なし!",

    analysisTitle: "分析完了",
    conclusion: "システム判定:",
    analysis1: "この人物は、たくさんの楽しい瞬間、笑い、最高の思い出を生み出しています。",
    analysis2: "宇宙にとっての価値: 計測不能なほど高い。",
    analysis3: "推奨: 祝う、抱きしめる、ごちそうする、喜ばせる。",

    errorTitle: "エラー!",
    rollback: "年齢を戻すことはできません。",
    reason: "理由: 5月24日は誕生日 🎂",
    levelUp: "自動レベルアップを検出しました。",
    versionUp: "アルベルトはバージョン27.0へ正常に移行しました。",
    solution: "解決策: お祝い、プレゼント、注目を受け入れる。",
    understood: "了解",

    patchTitle: "誕生日パッチ適用中",
    patchSub: "主役のための強化をインストールしています。",
    luck: "幸運",
    money: "お金",
    health: "健康",
    mood: "気分",
    energy: "エネルギー",
    love: "大切な人からの愛",
    protection: "トラブル耐性",
    installed: "インストール完了!",
    active: "誕生日プロトコルが有効化されました。",
    openGreeting: "お祝いを開く",

    wish1: "明るいアイデアと、それを形にする勇気を。",
    wish2: "どんな勝負にも負けない健康を。",
    wish3: "尽きないエネルギーを。",
    wish4: "いつも最高の気分を。",
    wish5: "そばにいてくれる友達を。",
    wish6: "忘れられない冒険を。",
    finalWish: "毎日が祭りみたいに楽しく、人生が最高のゲームみたいでありますように。",
    thanks: "いてくれてありがとう! ❤️",
    restart: "最初から",
    music: "音楽",
    audioWarn: "もう一度タップしてください。iPhoneが最初の音声再生を止めることがあります。"
  }
};

const steps = [
  renderStart,
  renderDiagnostic,
  renderSearchPerson,
  renderProfile,
  renderSearchGroup,
  renderMemories,
  renderAchievements,
  renderAnalysisDone,
  renderAgeError,
  renderPatch,
  renderFinal
];

function t(key) {
  return L[state.lang][key] || L.ru[key] || key;
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem("birthdayLang", lang);
  steps[state.step]();
}

function langSwitcher() {
  return `
    <div class="lang-switch">
      <button class="${state.lang === "ru" ? "active" : ""}" onclick="setLang('ru')">RU</button>
      <button class="${state.lang === "jp" ? "active" : ""}" onclick="setLang('jp')">JP</button>
    </div>
  `;
}

function panel(html) {
  return `<section class="panel ${state.lang === "jp" ? "jp-mode" : ""}">${html}</section>`;
}

function topLine(num, key) {
  return `
    <div class="topline">
      <div class="badge"><span class="badge-number">${num}</span>${t(key)}</div>
      <div>${t("date")}</div>
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
    ${topLine(1, "start")}
    ${langSwitcher()}
    <div class="start-hero">
      <div class="start-badge">${t("startBadge")}</div>
      <h1 class="neon-green">${t("startTitle")}</h1>
      <p>${t("startSub")}</p>
    </div>
    <div class="alert-orb"><div class="alert-mark">!</div></div>
    <div class="card card-red start-card">
      <p><b class="neon-pink">${t("startAlertTitle")}</b> ${t("startAlertValue")}</p>
      <br>
      <p>${t("startAge")}</p>
      <p>${t("startDate")}</p>
      <p>${t("startVersion")}</p>
      <br>
      <p>${t("startNeed")}</p>
    </div>
    <button class="btn" onclick="next()">${t("startButton")}</button>
    <button class="btn btn-ghost" id="musicBtn" onclick="toggleMusic()">${state.musicEnabled ? t("musicOff") : t("musicOn")}</button>
  `);
}

function renderDiagnostic() {
  setScreen(`
    ${topLine(2, "diag")}
    <h2 class="neon-green">${t("diagTitle")}</h2>
    <p>${t("diagSub")}</p>
    <div class="card">
      ${meter("👤", t("charisma"), 98)}
      ${meter("🛡️", t("adequacy"), 72)}
      ${meter("⚡", t("reserve"), 85)}
      ${meter("🧠", t("chaosSkill"), 99)}
      ${meter("💚", t("friendship"), 100)}
      ${meter("🍜", t("foodLove"), 95)}
      ${meter("🌙", t("sleep"), 4)}
    </div>
    <div class="card card-pink"><p>${t("diagAlmost")}</p><div class="progress"><div></div></div></div>
    <button class="btn" onclick="next()">${t("continue")}</button>
  `);
}

function renderSearchPerson() {
  setScreen(`
    ${topLine(3, "searchPerson")}
    <h2 class="neon-green">${t("searchPersonTitle")}</h2>
    <p>${t("searchPersonSub")}</p>
    <div class="radar-wrap"><div class="radar"><div class="radar-center">🐱</div></div></div>
    <div class="card"><p>${t("match")}</p><div class="progress"><div></div></div></div>
    <button class="btn" onclick="next()">${t("openResult")}</button>
  `);
}

function renderProfile() {
  setScreen(`
    ${topLine(4, "foundAlbert")}
    <h2 class="neon-green">${t("profileTitle")}</h2>
    <div class="image-frame"><img class="profile-img" src="assets/profile.webp?v=10" alt="Albert"></div>
    <div class="card card-pink">
      <div class="stat-grid">
        <div class="stat"><span>${t("name")}</span><span>${t("albert")}</span></div>
        <div class="stat"><span>${t("status")}</span><span>${t("mainCharacter")}</span></div>
        <div class="stat"><span>${t("age")}</span><span>${t("ageValue")}</span></div>
        <div class="stat"><span>${t("rarity")}</span><span>${t("legendary")}</span></div>
        <div class="stat"><span>${t("coolness")}</span><span>100%</span></div>
        <div class="stat"><span>${t("danger")}</span><span>${t("dangerValue")}</span></div>
      </div>
    </div>
    <button class="btn" onclick="next()">${t("continueAnalysis")}</button>
  `);
}

function renderSearchGroup() {
  setScreen(`
    ${topLine(5, "searchGroup")}
    <h2 class="neon-green">${t("groupTitle")}</h2>
    <p>${t("groupSub")}</p>
    <div class="radar-wrap">
      <div class="radar">
        <span class="dot d1">🌸</span><span class="dot d2">🎂</span><span class="dot d3">✨</span>
        <span class="dot d4">🫶</span><span class="dot d5">📸</span><span class="dot d6">🎮</span><span class="dot d7">🦊</span>
      </div>
    </div>
    <div class="card"><p>${t("found")} <b class="neon-pink">${t("people")}</b></p><p>${t("chaosLevel")}</p><div class="progress"><div></div></div></div>
    <button class="btn" onclick="next()">${t("openArchive")}</button>
  `);
}

function renderMemories() {
  setScreen(`
    ${topLine(6, "friendsFound")}
    <h2 class="neon-green">${t("memoriesTitle")}</h2>
    <div class="image-frame"><img class="memory-img" src="assets/memories.webp?v=10" alt="Memories" onclick="openZoom()"></div>
    <div class="card card-red">
      <p><b class="neon-pink">${t("suspicious")}</b></p>
      <br><p>${t("roles")}</p>
      <div class="role-list">
        <p>${t("r1")}</p><p>${t("r2")}</p><p>${t("r3")}</p><p>${t("r4")}</p>
        <p>${t("r5")}</p><p>${t("r6")}</p><p>${t("r7")}</p>
      </div>
    </div>
    <div class="card"><p>${t("found")} ${t("people")}.</p><p>${t("memoryLevel")}</p><p class="neon-pink">${t("zoomHint")}</p></div>
    <button class="btn btn-ghost" onclick="openZoom()">${t("zoomButton")}</button>
    <button class="btn" onclick="next()">${t("continue")}</button>
  `);
}

function renderAchievements() {
  setScreen(`
    ${topLine(7, "achievements")}
    <h2 class="neon-green">${t("achievementsTitle")}</h2>
    <div class="achievements">
      ${achievement("🏆", t("ach1"), t("rankLegend"))}
      ${achievement("🌸", t("ach2"), t("rankLegend"))}
      ${achievement("🎭", t("ach3"), t("rankLegend"))}
      ${achievement("📸", t("ach4"), t("rankEpic"))}
      ${achievement("🫶", t("ach5"), t("rankLegend"))}
      ${achievement("✨", t("ach6"), t("rankPriceless"))}
    </div>
    <div class="card"><p>${t("legendLevel")} <b class="neon-pink">100%</b></p><div class="progress"><div></div></div></div>
    <button class="btn" onclick="next()">${t("ok")}</button>
  `);
}

function renderAnalysisDone() {
  setScreen(`
    ${topLine(8, "analysisDone")}
    <h2 class="neon-green">${t("analysisTitle")}</h2>
    <div class="card">
      <p>${t("conclusion")}</p><br>
      <p><b class="neon-green">${t("analysis1")}</b></p><br>
      <p><b class="neon-green">${t("analysis2")}</b></p><br>
      <p>${t("analysis3")}</p>
    </div>
    <div class="cat-wrap"><img class="cat-img" src="assets/success_cat_model.webp?v=13" alt="OK"></div>
    <button class="btn" onclick="next()">${t("ok")}</button>
  `);
}

function renderAgeError() {
  setScreen(`
    ${topLine(9, "ageError")}
    <h2 class="neon-pink">${t("errorTitle")}</h2>
    <div class="card card-red">
      <p>${t("rollback")}</p><br>
      <p class="neon-pink">${t("reason")}</p><br>
      <p>${t("levelUp")}</p><p>${t("versionUp")}</p><br>
      <p>${t("solution")}</p>
    </div>
    <div class="cat-wrap"><img class="cat-img small" src="assets/error_cat_model.webp?v=13" alt="Error"></div>
    <button class="btn btn-red" onclick="next()">${t("understood")}</button>
  `);
}

function renderPatch() {
  setScreen(`
    ${topLine(10, "patch")}
    <h2 class="neon-green">${t("patchTitle")}</h2>
    <p>${t("patchSub")}</p>
    <div class="card">
      ${meter("🍀", t("luck"), 100)}
      ${meter("💸", t("money"), 100)}
      ${meter("💚", t("health"), 100)}
      ${meter("✨", t("mood"), 100)}
      ${meter("⚡", t("energy"), 100)}
      ${meter("🫶", t("love"), 100)}
      ${meter("🛡️", t("protection"), 100)}
    </div>
    <div class="cat-wrap"><img class="cat-img" src="${state.lang === 'jp' ? 'assets/group_cat_model_jp.webp?v=17' : 'assets/group_cat_model_ru_v2.webp?v=19'}" alt="Patch"></div>
    <button class="btn" onclick="next()">${t("openGreeting")}</button>
  `);
}

function renderFinal() {
  startConfetti();
  setScreen(`
    ${topLine(11, "final")}
    <div class="image-frame"><img class="final-img" src="${state.lang === 'jp' ? 'assets/final_jp.webp?v=16' : 'assets/final_ru_v3.webp?v=20'}" alt="Final"></div>
    <div class="card card-pink">
      <div class="wish-list">
        ${wish("🦋", t("wish1"))}${wish("⭐", t("wish2"))}${wish("🔥", t("wish3"))}
        ${wish("🌙", t("wish4"))}${wish("🫶", t("wish5"))}${wish("🎉", t("wish6"))}
      </div>
      <br><p>${t("finalWish")}</p><br>
      <p class="neon-green"><b>${t("thanks")}</b></p>
    </div>
    <div class="music-row">
      <button class="btn" onclick="restart()">${t("restart")}</button>
      <button class="btn btn-ghost" onclick="toggleMusic()">${t("music")}</button>
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
  return `<div class="achievement"><span>${icon}</span><b>${text}</b><small>${rank}</small></div>`;
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
      alert(t("audioWarn"));
    }
  }
  updateMusicButton();
}

function updateMusicButton() {
  const btn = document.getElementById("musicBtn");
  if (!btn) return;
  btn.textContent = state.musicEnabled ? t("musicOff") : t("musicOn");
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

function preloadImages() {
  [
    "assets/profile.webp?v=10",
    "assets/final.webp?v=10",
    "assets/final_ru_v3.webp?v=20",
    "assets/final_jp.webp?v=16",
    "assets/memories.webp?v=10",
    "assets/group_cat_model.webp?v=13",
    "assets/group_cat_model_ru_v2.webp?v=19",
    "assets/group_cat_model_jp.webp?v=17",
    "assets/success_cat_model.webp?v=13",
    "assets/error_cat_model.webp?v=13"
  ].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

window.addEventListener("resize", resizeConfetti);
steps[0]();
preloadImages();
