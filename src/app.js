const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $buttons = document.querySelectorAll('.bottom-nav button');

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

// Добавляем обработку кнопок
$buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        alert(`Вы нажали на кнопку ${index + 1}`);
        // Здесь можно реализовать переходы на другие страницы
        // Например: window.location.href = "page1.html";
    });
});

start();
