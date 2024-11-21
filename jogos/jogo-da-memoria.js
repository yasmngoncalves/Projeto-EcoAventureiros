// Variáveis do jogo
const images = [
    'gameimages/card-memory1.png',
    'gameimages/card-memory2.png',
    'gameimages/card-memory3.png',
    'gameimages/card-memory4.png',
    'gameimages/card-memory5.png',
    'gameimages/card-memory6.png',
    'gameimages/card-memory7.png',
    'gameimages/card-memory8.png'
];
const cards = [...images, ...images];
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
    shuffle(cards).forEach((image) => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.dataset.image = image;

        // Adiciona a imagem na carta (escondida)
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.alt = 'Carta do jogo';
        imgElement.classList.add('hidden'); // Classe que esconde a imagem inicialmente
        card.appendChild(imgElement);

        gameBoard.appendChild(card);
        card.addEventListener('click', flipCard);
    });
}

// Função para iniciar o jogo
function startGame() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-board').style.display = 'grid';
    document.getElementById('game-controls').style.display = 'block';
    createBoard(); // Gera o tabuleiro de cartas
}

// Função para virar a carta
function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add('flipped'); // Adiciona a classe flipped
    const img = this.querySelector('img');
    img.classList.remove('hidden'); // Mostra a imagem
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Verifica se as cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.image === card2.dataset.image;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        checkGameOver();
    } else {
        setTimeout(() => {
            card1.querySelector('img').classList.add('hidden'); // Esconde imagem
            card2.querySelector('img').classList.add('hidden');
            card1.classList.remove('flipped'); // Remove classe flipped
            card2.classList.remove('flipped');
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

// Função para reiniciar o jogo e voltar à tela de início
function restartGame() {
    flippedCards = [];
    matchedCards = [];

    // Ocultar o tabuleiro e os controles
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';
    
    // Exibir a tela inicial novamente
    document.getElementById('start-screen').style.display = 'block';
    
    // Exibir a tela de fim
    document.getElementById('end-screen').style.display = 'none';
}

// Função para voltar ao início da tela inicial
function goHome() {
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('game-controls').style.display = 'none';
    document.getElementById('end-screen').style.display = 'none';
}

// Evento para o botão "Jogar Novamente"
document.getElementById('play-again-button').addEventListener('click', () => {
    restartGame();  // Reinicia o jogo
    startGame();    // Inicia o jogo novamente
});

// Evento para o botão "Voltar ao Início" na tela final
document.getElementById('home-button-end').addEventListener('click', goHome);

// Inicializa o jogo quando a página carrega
document.getElementById('start-game-button').addEventListener('click', startGame);
document.getElementById('restart-button').addEventListener('click', restartGame);
document.getElementById('home-button').addEventListener('click', goHome);
