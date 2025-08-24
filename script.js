const tg = window.Telegram.WebApp;

// Растягиваем окно под fullscreen
tg.expand();

// Если мы на второй странице — включаем кнопку "Назад"
if (window.location.pathname.includes("page2.html")) {
  tg.BackButton.show();

  if (window.location.pathname.includes("index.html")) {
tg.CloseButton.show()
  }

  tg.CloseButton.onClick(() => {
    tg.close(); // закрыть аппу
  });
}
  tg.BackButton.onClick(() => {
    window.location.href = "index.html"; // возвращаем на главную
  });
}

// Кнопка на главной странице
const startBtn = document.getElementById("startBtn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    tg.showConfirm("Перейти на вторую страницу?", (ok) => {
      if (ok) {
        window.location.href = "page2.html";
      }
    });
  });
}

// Кнопки на второй странице
const alert1 = document.getElementById("alert1");
if (alert1) {
  alert1.addEventListener("click", () => {
    tg.showAlert("Ты нажал кнопку №1 🎉");
  });
}

const alert2 = document.getElementById("alert2");
if (alert2) {
  alert2.addEventListener("click", () => {
    tg.showAlert("Ты нажал кнопку №2 🚀");
  });
}
