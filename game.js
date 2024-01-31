// Отримання елемента canvas та контексту для малювання
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


// Завантаження зображень
const dinoImg = new Image();
dinoImg.src = 'assets/dino.png';


const cactusImg = new Image();
cactusImg.src = 'assets/cactus.png';


// Динозавр об'єкт
const dino = {
    x: 50,
    y: canvas.height - 100,
    width: 80,
    height: 80,
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


// Основна функція гри
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    dino.draw();
    cactus.draw();
    cactus.update();


    requestAnimationFrame(gameLoop);
}


// Обробник натискання клавіш
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        jump();
    }
});


// Функція стрибка динозавра
function jump() {
    if (dino.y === canvas.height - 100) {
        let jumpInterval = setInterval(function() {
            if (dino.y === canvas.height - 200) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(function() {
                    if (dino.y === canvas.height - 100) {
                        clearInterval(fallInterval);
                    } else {
                        dino.y += 5;
                    }
                }, 20);
            } else {
                dino.y -= 5;
            }
        }, 20);
    }
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


// Функція завершення гри
function endGame() {
    // Очистити екран гри
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Вивести повідомлення про кінець гри
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);


    // Зупинити головний цикл гри
    cancelAnimationFrame(gameLoop);
}


// Основна функція гри
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    dino.draw();
    cactus.draw();
    cactus.update();


    checkCollisions(); // Перевірка колізій


    requestAnimationFrame(gameLoop);
}


// Запуск головного циклу гри
gameLoop();
