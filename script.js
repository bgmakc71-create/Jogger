const tg = window.Telegram.WebApp;
tg.expand(); // растягивает окно под контент

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
