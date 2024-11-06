const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// selecionar os botões e o tabuleiro
const startButton = document.getElementById('start-game');
const resetButton = document.getElementById('reset-game');
const gameBoard = document.getElementById('game-board');

// embaralhar os cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// criando os cards no html
function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
        cardElement.dataset.value = card;

        cardElement.textContent = card; // Exibe a letra no card

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// iniciar o jogo
function startGame() {
    createBoard();
    gameBoard.classList.remove('hidden');
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
}

// reiniciar o jogo
function resetGame() {
    resetBoard(); 
    createBoard();
}

// virar os cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

// verificar cards correspondentes
function checkMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

// desabilitar os cards quando formar um par
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    // verifica se todas as cartas foram combinadas
    if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
            alert('Você encontrou todos os pares. Parabéns!');
            resetGame(); 
        }, 500); 
    }

    resetBoard();
}

// desvirar os cards quando não for par
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// resetar os cards
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// adicionar eventos aos botões
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
