// Pobierz canvas i punkty
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

// Ustawienia Pac-Mana
const pacManSize = 20;
let pacManX = pacManSize / 2;
let pacManY = pacManSize / 2;
let pacManSpeed = 2;
let pacManDirection = 'right';
let score = 0;

// Ustawienia ducha (przeciwnika)
let ghostX = canvas.width - pacManSize / 2;
let ghostY = canvas.height - pacManSize / 2;
let ghostSpeed = 2;
let ghostDirection = 'left';
let gameOver = false;

// Utwórz prostą planszę (20x20)
const tileCount = 20;
const tileSize = canvas.width / tileCount;

// Tablica punktów (true - punkt istnieje, false - zebrany)
const points = [];
for (let i = 0; i < tileCount; i++) {
    points[i] = [];
    for (let j = 0; j < tileCount; j++) {
        points[i][j] = true; // wszystkie punkty dostępne na początku
    }
}

// Funkcja rysowania Pac-Mana
function drawPacMan() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacManX, pacManY, pacManSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Funkcja rysująca ducha
function drawGhost() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(ghostX, ghostY, pacManSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// Funkcja rysująca punkty do zebrania
function drawPoints() {
    ctx.fillStyle = 'black';
    for (let i = 0; i < tileCount; i++) {
        for (let j = 0; j < tileCount; j++) {
            if (points[i][j]) {
                ctx.beginPath();
                ctx.arc(
                    i * tileSize + tileSize / 2,
                    j * tileSize + tileSize / 2,
                    3,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
        }
    }
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

// Funkcja losowego ruchu ducha
function moveGhost() {
    const directions=['up','down','left','right'];
    
    if(Math.random()<0.05){ // losowa zmiana kierunku z prawdopodobieństwem ~5%
        ghostDirection=directions[Math.floor(Math.random()*directions.length)];
    }

    switch(ghostDirection){
        case'up':ghostY-=ghostSpeed;break;
        case'down':ghostY+=ghostSpeed;break;
        case'left':ghostX-=ghostSpeed;break;
        case'right':ghostX+=ghostSpeed;break;
    }


    // Zapobiegaj wyjściu ducha poza ekran
    if(ghostX<pacManSize/2) ghostX=pacManSize/2;
    if(ghostX>canvas.width-pacManSize/2) ghostX=canvas.width-pacManSize/2;
    if(ghostY<pacManSize/2) ghostY=pacManSize/2;
    if(ghostY>canvas.height-pacManSize/2) ghostY=canvas.height-pacManSize/2;  
}

// Sprawdzenie kolizji Pac-Mana z duchem
function checkCollision(){
    const distance=Math.sqrt((pacManX-ghostX)**2+(pacManY-ghostY)**2);
    if(distance<pacManSize*0.8){
       gameOver=true; 
       gameOverElement.style.display='block'; // pokaż komunikat końca gry
    }
 }

// Funkcja aktualizacji gry
function updateGame(){
    if(gameOver)return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Aktualizacja pozycji Pac-Mana zgodnie z kierunkiem ruchu
   switch(pacManDirection){
    case'up':pacManY-=pacManSpeed;break;
    case'down':pacManY+=pacManSpeed;break;
    case'left':pacManX-=pacManSpeed;break;
    case'right':pacManX+=pacManSpeed;break;}


    // Zapobiegaj wyjściu poza ekran
    if (pacManX < pacManSize / 2) pacManX = pacManSize / 2;
    if (pacManX > canvas.width - pacManSize / 2) pacManX = canvas.width - pacManSize / 2;
    if (pacManY < pacManSize / 2) pacManY = pacManSize / 2;
    if (pacManY > canvas.height - pacManSize / 2) pacManY = canvas.height - pacManSize / 2;

    // Sprawdź czy Pac-Man zebrał punkt
    const gridX = Math.floor(pacManX / tileSize);
    const gridY = Math.floor(pacManY / tileSize);

    if (points[gridX][gridY]) {
        points[gridX][gridY] = false; // usuń punkt z planszy
        score += 10;                  // zwiększ wynik o 10 punktów
        scoreElement.textContent = `Punkty: ${score}`;
    }

    moveGhost();
    checkCollision();
    drawPoints();
    drawPacMan();
    drawGhost();
    requestAnimationFrame(updateGame);
}

// Uruchom grę
updateGame();
