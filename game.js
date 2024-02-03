// Отримання елемента canvas та контексту для малювання
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Завантаження зображень
const dinoImg = new Image();
dinoImg.src = 'assets/dino.png';


const cactusImg = new Image();
cactusImg.src = 'assets/cactus.png';


// Динозавр 
const dino = {
    x: 50,
    y: canvas.height - 400,
    width: 100,
    height: 100,
    draw() {
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    }
};


// Перешкоди об'єкт
const cactus = {
    x: canvas.width,
    y: canvas.height - 70,
    width: 60,
    height: 70,
    speed: 10,
    draw() {
        ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
    },
    update() {
        this.x -= this.speed;
        if (this.x + this.width < 0) {
            this.x = canvas.width;
        }
    }
};

// Обробник натискання клавіш
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


// Функція стрибка динозавра
const JUMP_HEIGHT = 250; // Висота стрибка
const JUMP_SPEED = 5; // Швидкість стрибка
let score = 0;
function jump() {
    if (dino.y === canvas.height - 100) {
        let jumpSound = document.getElementById('jumpSound');
        jumpSound.play(); // Відтворення звуку при стрибку
        let jumpInterval = setInterval(function() {
            if (dino.y === canvas.height - JUMP_HEIGHT) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function() {
                    if (dino.y === canvas.height - 100) {
                        clearInterval(fallInterval);
                    } else {
                        dino.y += JUMP_SPEED; // Змінено на позитивне значення для спуску
                    }
                }, 20);
            } else {
                dino.y -= JUMP_SPEED; // Змінено на від'ємне значення для стрибка вгору
            }
        }, 20);
    }
    
        // Оновлення рахунку при успішному стрибку
        score++;
    }

// Функція перевірки
function checkCollisions() {
    if (dino.x < cactus.x + cactus.width &&
        dino.x + dino.width > cactus.x &&
        dino.y < cactus.y + cactus.height &&
        dino.y + dino.height > cactus.y) {
        endGame();
    }
}


// Додайте змінну, яка вказуватиме, чи гра активна
let isGameActive = true;

// Функція, яка реагує на натискання клавіші Enter
document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        if (isGameActive) {
            // Якщо гра активна, зупиніть гру
            endGame();
        } else {
            // Якщо гра неактивна, почніть гру
            startGame();
        }
    } else if (event.code === 'Space') {
        // Якщо натиснута клавіша Space, і гра активна, виконайте стрибок
        if (isGameActive) {
            jump();
        }
    }
});

// Функція початку гри
function startGame() {
    isGameActive = true;
    // Очистити рахунок при початку нової гри
    score = 0;
    
    // Відновлення позицій та властивостей динозавра та перешкод
    dino.y = canvas.height - 100;
    cactus.x = canvas.width;

    // Запуск головного циклу гри
    gameLoop();
    // Виведення рахунку на екран
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Рахунок: ' + score, 20, 30);
}

//Завершення гри
function endGame() {
    isGameActive = false;

    // Відтворення звуку
    let gameOverSound = document.getElementById('gameOverSound');
    gameOverSound.play();

    // Очистити екран
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Вивести повідомлення про кінець гри
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    // Додати текст 
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Натисніть Enter для продовження', canvas.width / 2 - 80, canvas.height / 2 + 30);
}

// Основна функція гри
function gameLoop() {
    if (isGameActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dino.draw();
        cactus.draw();
        cactus.update();

        checkCollisions(); // Перевірка колізій

        // Відображення рахунку
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Рахунок: ' + score, 20, 30); // Розміщення рахунку у верхньому лівому куті

        requestAnimationFrame(gameLoop);
    }
}

// Запуск гри при завантаженні сторінки
startGame();