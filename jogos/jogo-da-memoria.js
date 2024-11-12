// Variáveis do jogo
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
const cards = [...numbers, ...numbers];
let flippedCards = [];
let matchedCards = [];

// Função para embaralhar cartas
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Função para criar o tabuleiro do jogo
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpa o tabuleiro
    shuffle(cards).forEach((number) => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.dataset.number = number;
        card.textContent = '';
        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

// Função para iniciar o jogo
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('game-controls').style.display = 'block';
    createBoard();
}

// Função para reiniciar o jogo embaralhando as cartas
function restartGame() {
    flippedCards = [];
    matchedCards = [];
    createBoard();
}

// Função para voltar ao início
function goHome() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';
}

// Função para virar a carta
function flipCard() {
    if (flippedCards.length === 2) return;
    this.classList.add('flipped');
    this.textContent = this.dataset.number;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Verifica se as cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.number === card2.dataset.number;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        checkGameOver();
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = ''; // Retorna se não forem iguais
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];
}

// Função para verificar se o jogo terminou
function checkGameOver() {
    if (matchedCards.length === cards.length) {
        document.getElementById('game-board').style.display = 'none';
        document.getElementById('game-controls').style.display = 'none';
        document.getElementById('end-screen').style.display = 'block';
    }
}

// Inicializa o jogo quando a página carrega
document.getElementById('start-game-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('home-button').addEventListener('click', goHome);
document.getElementById('play-again-button').addEventListener('click', startGame);
