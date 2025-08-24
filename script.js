// Telegram Mini App logic
const tg = window.Telegram?.WebApp;

// Всегда расширяем до fullscreen внутри WebApp
try { tg?.expand(); } catch(e){}

// Главная страница: показать форму после клика
const startBtn = document.getElementById("startBtn");
const loginForm = document.getElementById("loginForm");
const loginInput = document.getElementById("loginInput");
const passwordInput = document.getElementById("passwordInput");

// ⚠️ Намеренно «прозрачно» храним учетные данные в коде для игрового пазла
const GAME_LOGIN = 'ctrlsh0t';
const GAME_PASSWORD = 'SYNTHZONE';

if (startBtn && loginForm) {
  startBtn.addEventListener("click", () => {
    loginForm.classList.remove("hidden");

    // Спрячем системные кнопки на главной (на всякий случай)
    try { tg?.BackButton?.hide(); tg?.CloseButton?.hide(); } catch(e){}

    // Фокус на логин
    setTimeout(() => loginInput?.focus(), 0);
  });

  // Сабмит формы с проверкой
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = (loginInput?.value || "").trim();
    const pass = (passwordInput?.value || "").trim();

    if (login === GAME_LOGIN && pass === GAME_PASSWORD) {
      try { tg?.showAlert("Доступ разрешён. Переходим на страницу 2 ✨"); } catch(e){}
      window.location.href = "page2.html";
    } else {
      try { tg?.showAlert("Неверный логин или пароль."); } catch(e){ alert("Неверный логин или пароль."); }
    }
  });

  // Обработка Enter на полях ввода
  [loginInput, passwordInput].forEach(el => {
    el?.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        loginForm.requestSubmit?.();
      }
    });
  });
}

// Страница 2: системные кнопки Back + Close и два алерта
if (typeof window !== "undefined" && window.location.pathname.includes("page2.html")) {
  try {
    tg?.BackButton?.show();
    tg?.CloseButton?.show();

    tg?.BackButton?.onClick(() => {
      window.location.href = "index.html";
    });

    tg?.CloseButton?.onClick(() => {
      try { tg.close(); } catch(e){ window.history.back(); }
    });
  } catch(e){}

  const alert1 = document.getElementById("alert1");
  const alert2 = document.getElementById("alert2");

  alert1?.addEventListener("click", () => {
    try { tg?.showAlert("Ты нажал кнопку №1 🎉"); } catch(e){ alert("Кнопка 1"); }
  });

  alert2?.addEventListener("click", () => {
    try { tg?.showAlert("Ты нажал кнопку №2 🚀"); } catch(e){ alert("Кнопка 2"); }
  });
}
