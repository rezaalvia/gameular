const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');

const gameSize = 400;
const segmentSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = {};
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function createFood() {
    food.x = Math.floor(Math.random() * (gameSize / segmentSize)) * segmentSize;
    food.y = Math.floor(Math.random() * (gameSize / segmentSize)) * segmentSize;

    const foodElement = document.createElement('div');
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    foodElement.classList.add('food');
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        gameArea.removeChild(document.querySelector('.food'));
        createFood();
    } else {
        // Remove tail if not eating food
        snake.pop();
    }

    // Clear previous segments
    document.querySelectorAll('.snake-head, .snake-body').forEach(segment => segment.remove());

    // Render new snake segments
    snake.forEach((segment, index) => {
        const segmentElement = document.createElement('div');
        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.top = `${segment.y}px`;

        // Different style for head
        if (index === 0) {
            segmentElement.classList.add('snake-head');
        } else {
            segmentElement.classList.add('snake-body');
        }

        gameArea.appendChild(segmentElement);
    });

    // Check if snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            endGame();
            return;
        }
    }

    // Check if snake hits walls
    if (head.x < 0 || head.x >= gameSize || head.y < 0 || head.y >= gameSize) {
        endGame();
    }
}

function changeDirection(event) {
    const keyCode = event.keyCode;
    if (keyCode === 37 && direction.x === 0) direction = { x: -segmentSize, y: 0 }; // Left
    if (keyCode === 38 && direction.y === 0) direction = { x: 0, y: -segmentSize }; // Up
    if (keyCode === 39 && direction.x === 0) direction = { x: segmentSize, y: 0 }; // Right
    if (keyCode === 40 && direction.y === 0) direction = { x: 0, y: segmentSize }; // Down
}

function startGame() {
    score = 0;
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    scoreDisplay.textContent = score;
    gameArea.innerHTML = '';
    createFood();
    gameInterval = setInterval(moveSnake, 100);
}

function endGame() {
    clearInterval(gameInterval);
    alert('Game Over! Score: ' + score);
    startGame();
}

document.addEventListener('keydown', changeDirection);
startGame();
