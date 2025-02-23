const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

function drawGame() {
    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
    } else {
        snake.pop();
    }

    // Check collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        snake = [{ x: 10, y: 10 }];
        dx = 0;
        dy = 0;
        score = 0;
    }

    // Draw
    ctx.fillStyle = '#9bbc0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f380f';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });

    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

    ctx.fillStyle = '#d3d3d3';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    setTimeout(drawGame, 100);
}

// Desktop controls
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp': if (dy !== 1) { dx = 0; dy = -1; } break;
        case 'ArrowDown': if (dy !== -1) { dx = 0; dy = 1; } break;
        case 'ArrowLeft': if (dx !== 1) { dx = -1; dy = 0; } break;
        case 'ArrowRight': if (dx !== -1) { dx = 1; dy = 0; } break;
    }
});

// Mobile controls
document.getElementById('up').addEventListener('click', () => { if (dy !== 1) { dx = 0; dy = -1; } });
document.getElementById('down').addEventListener('click', () => { if (dy !== -1) { dx = 0; dy = 1; } });
document.getElementById('left').addEventListener('click', () => { if (dx !== 1) { dx = -1; dy = 0; } });
document.getElementById('right').addEventListener('click', () => { if (dx !== -1) { dx = 1; dy = 0; } });

drawGame();