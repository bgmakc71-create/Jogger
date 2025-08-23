const tg = window.Telegram.WebApp;

// Инициализация приложения
function initApp() {
    const isTelegram = !!tg.initData;
    
    if (isTelegram) {
        document.body.classList.add('telegram-environment');
        tg.ready();
        tg.expand();
        console.log('✅ Запущено в Telegram');
        
        // Загружаем баланс звезд
        updateStarsBalance();
    } else {
        console.log('🌐 Запущено в браузере');
        applyFallbackTheme();
        document.getElementById('balance').textContent = 'Баланс звезд: 100 (demo)';
    }
    
    applyTheme();
}

// Покупка звезд
function buyStars(amount) {
    if (!tg.initData) {
        // Режим демо в браузере
        showThankYouMessage(amount);
        return;
    }

    // Создаем инвойс для оплаты
    const invoice = {
        title: `Покупка ${amount} звезд`,
        description: `Поддержка разработчика на ${amount} звезд`,
        currency: 'XTR', // Валюта Telegram Stars
        prices: [{ label: 'Stars', amount: amount * 100 }], // В минимальных единицах (1 звезда = 100 единиц)
        payload: JSON.stringify({ stars: amount, type: 'donation' })
    };

    // Открываем окно оплаты
    tg.openInvoice(invoice, function(status) {
        console.log('Статус оплаты:', status);
        
        if (status === 'paid') {
            // Оплата прошла успешно
            showThankYouMessage(amount);
            updateStarsBalance();
        } else if (status === 'failed') {
            tg.showAlert('Оплата не прошла. Попробуйте еще раз. ❌');
        } else if (status === 'cancelled') {
            console.log('Пользователь отменил оплату');
        }
    });
}

// Показываем сообщение благодарности
function showThankYouMessage(amount) {
    const message = `
        💫 Спасибо большое! 
        Вы поддержали нас ${amount} звездами!
        Ваша поддержка очень важна для нас! 🌟
    `;

    if (tg.initData) {
        // В Telegram используем нативный alert
        tg.showAlert(message);
    } else {
        // В браузере показываем красивый попап
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you-message';
        thankYouDiv.innerHTML = `
            <h2>💫 Спасибо!</h2>
            <p>Вы поддержали нас ${amount} звездами! 🌟</p>
            <p>Ваша поддержка очень важна!</p>
            <button class="tg-button" onclick="this.parentElement.remove()">
                Закрыть
            </button>
        `;
        document.body.appendChild(thankYouDiv);
    }
}

// Обновляем баланс звезд
function updateStarsBalance() {
    if (tg.initData) {
        // В реальном приложении здесь бы был запрос к серверу
        // Для демо используем случайное число
        const randomBalance = Math.floor(Math.random() * 100) + 50;
        document.getElementById('balance').textContent = 
            `Баланс звезд: ${randomBalance} ⭐`;
    }
}

// Закрываем приложение
function closeApp() {
    if (tg.initData) {
        tg.close();
    } else {
        alert("Приложение закрылось бы в Telegram");
    }
}

// Применяем тему Telegram
function applyTheme() {
    const theme = tg.themeParams || {};
    
    document.documentElement.style.setProperty('--tg-theme-bg-color', 
        theme.bg_color || '#18222d');
    document.documentElement.style.setProperty('--tg-theme-text-color', 
        theme.text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-button-color', 
        theme.button_color || '#2ea6ff');
    document.documentElement.style.setProperty('--tg-theme-button-text-color', 
        theme.button_text_color || '#ffffff');
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', 
        theme.secondary_bg_color || '#2d4263');
    document.documentElement.style.setProperty('--tg-theme-hint-color', 
        theme.hint_color || '#7c8b9a');
}

// Тема для разработки в браузере
function applyFallbackTheme() {
    tg.themeParams = {
        bg_color: '#18222d',
        text_color: '#ffffff',
        button_color: '#2ea6ff',
        button_text_color: '#ffffff',
        secondary_bg_color: '#2d4263',
        hint_color: '#7c8b9a'
    };
}

// Обработчик изменений темы
tg.onEvent('themeChanged', applyTheme);

// Запускаем приложение
document.addEventListener('DOMContentLoaded', initApp);

// Покажем информацию о пользователе
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    console.log('👤 Пользователь:', tg.initDataUnsafe.user);
}
