const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $buttons = document.querySelectorAll('.bottom-nav button');

const maxClicks = 300; // Максимум кликов
let totalClicks = getScore(); // Счётчик кликов

let maxEnergy = 1500; // Максимальная энергия
let currentEnergy = 1500; // Текущая энергия

const progressBarFill = document.getElementById("progress-bar-fill");
const energyLevelDisplay = document.getElementById("energy-level");

// Обновление шкалы кликов
function updateClickProgress() {
    const clickPercentage = (totalClicks / maxClicks) * 100;
    progressBarFill.style.width = `${clickPercentage}%`;

    if (totalClicks >= maxClicks) {
        alert("Поздравляем! Вы достигли цели в 20,000 кликов!");
    }
}

// Обновление энергии
function updateEnergyDisplay() {
    energyLevelDisplay.textContent = `${currentEnergy} / ${maxEnergy}`;
}

// Уменьшение энергии
function decreaseEnergy() {
    if (currentEnergy > 0) {
        currentEnergy -= 1;
        updateEnergyDisplay();
    }
}

// Восстановление энергии
function recoverEnergy() {
    if (currentEnergy < maxEnergy) {
        currentEnergy += 1;
        updateEnergyDisplay();
    }
}

// Таймер для восстановления энергии
setInterval(recoverEnergy, 1000);

// Обработчик кликов
function handleClick() {
    if (currentEnergy > 0) {
        totalClicks++;
        decreaseEnergy();
        updateClickProgress();
    } else {
        alert("Недостаточно энергии!");
    }
}

// Добавляем событие на клик
document.querySelector(".circle img").addEventListener("click", handleClick);


function start() {
    setScore(getScore());
    setImage();
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    setScore(getScore() + 1);
    setImage();
}

function setImage() {
    if (getScore() >= 52) {
        $circle.setAttribute('src', './assets/timaa.png');
    }
}

// Добавляем движение круга при клике
$circle.addEventListener('click', (event) => {
    const rect = $circle.getBoundingClientRect();

    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    const DEG = 45;

    const tiltX = (offsetY / rect.height) * DEG;
    const tiltY = (offsetX / rect.width) * -DEG;

    $circle.style.setProperty('--tiltX', `${tiltX}deg`);
    $circle.style.setProperty('--tiltY', `${tiltY}deg`);

    // Возврат круга в исходное состояние
    setTimeout(() => {
        $circle.style.setProperty('--tiltX', `0deg`);
        $circle.style.setProperty('--tiltY', `0deg`);
    }, 100);

    // Создаем элемент "+1"
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = '+1';
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    $circle.parentElement.appendChild(plusOne);

    // Увеличиваем счет и запускаем анимацию
    addOne();

    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Добавляем активный класс для текущей страницы

const pages = ['index.html', 'mine.html', 'friends.html', 'earn.html', 'airdrop.html'];

// Установка активного класса и обработчиков событий
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop(); // Получаем имя текущей страницы
    const navButtons = document.querySelectorAll('.bottom-nav button');

    navButtons.forEach((button, index) => {
        // Устанавливаем активный класс
        if (currentPath === pages[index]) {
            button.classList.add('active');
        }

        // Добавляем обработчик клика для перехода
        button.addEventListener('click', () => {
            window.location.href = pages[index];
        });
    });
});

start();
