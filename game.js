// Pobierz canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ustawienia gry
const pacManSize = 20;
let pacManX = canvas.width / 2;
let pacManY = canvas.height / 2;
let pacManSpeed = 2;
let pacManDirection = 'right';

// Funkcja rysowania Pac-Mana
function drawPacMan() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacManX, pacManY, pacManSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Funkcja obsługi klawiatury
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacManDirection = 'up';
            break;
        case 'ArrowDown':
            pacManDirection = 'down';
            break;
        case 'ArrowLeft':
            pacManDirection = 'left';
            break;
        case 'ArrowRight':
            pacManDirection = 'right';
            break;
    }
});

// Funkcja aktualizacji gry
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aktualizuj pozycję Pac-Mana
    switch (pacManDirection) {
        case 'up':
            pacManY -= pacManSpeed;
            break;
        case 'down':
            pacManY += pacManSpeed;
            break;
        case 'left':
            pacManX -= pacManSpeed;
            break;
        case 'right':
            pacManX += pacManSpeed;
            break;
    }

    // Zapobiegaj wyjściu poza ekran
    if (pacManX < 0) pacManX = 0;
    if (pacManX > canvas.width) pacManX = canvas.width;
    if (pacManY < 0) pacManY = 0;
    if (pacManY > canvas.height) pacManY = canvas.height;

    drawPacMan();

    requestAnimationFrame(updateGame);
}

// Uruchom grę
updateGame();