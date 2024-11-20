// Perguntas do quiz
const questions = [
    { question: "Você terminou de lanchar e ficou com uma garrafa de plástico vazia. O que você faz?", options: ["Coloco no lixo reciclável.", "Jogo no lixo comum."], answer: 0, image: "images/oceanos.jpg" },
    { question: "Você está escovando os dentes. O que faz com a torneira?", options: [" Deixo a torneira fechada enquanto escovo.", "Deixo a torneira aberta o tempo todo."], answer: 0, image: "images/plastico.jpg" },
    { question: "Você vai sair da sala onde estava brincando. O que você faz com a luz?", options: ["Deixo a luz acesa para quando eu voltar.", "Apago a luz antes de sair."], answer: 1, image: "images/solar.jpg" },
    { question: "Você está no mercado e vai pegar uma fruta para levar para casa. O que você faz?", options: ["Levo uma sacola reutilizável.", "Uso uma sacola plástica descartável."], answer: 0, image: "images/co2.jpg" },
    { question: "Você vai almoçar e tem várias opções de alimentos. O que você faz?", options: ["Pego mais comida do que preciso.", "Pego só o que vou comer."], answer: 1, image: "images/oceanos-mundo.jpg" }
];

// Variáveis e estado do quiz
let currentQuestion = 0;
let score = 0;

// Função para iniciar o quiz
function startQuiz() {
    document.getElementById("intro").style.display = "none"; // Oculta a introdução
    document.getElementById("quiz").style.display = "block"; // Mostra o quiz
    document.getElementById("result").style.display = "none"; // Garante que o resultado esteja oculto
    loadQuestion();
}

// Função para carregar a pergunta atual
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionElements = document.querySelectorAll(".option");
    const questionImage = document.getElementById("question-image");

    questionElement.innerText = questions[currentQuestion].question;
    questionImage.src = questions[currentQuestion].image;
    questionImage.style.display = "block"; // Exibe a imagem da questão

    optionElements.forEach((option, index) => {
        option.innerText = questions[currentQuestion].options[index];
        option.disabled = false;
        option.classList.remove("correct", "incorrect");
    });

    document.getElementById("next-btn").style.display = "none";
}


// Função chamada ao selecionar uma resposta
function selectAnswer(selectedIndex) {
    const correctAnswer = questions[currentQuestion].answer;
    const optionElements = document.querySelectorAll(".option");

    optionElements.forEach((option, index) => {
        option.disabled = true;
        if (index === correctAnswer) {
            option.classList.add("correct"); // Marca a resposta correta como verde
        } else if (index === selectedIndex) {
            option.classList.add("incorrect"); // Marca a resposta incorreta como vermelha
        }
    });

    if (selectedIndex === correctAnswer) {
        score++;
    }

    document.getElementById("next-btn").style.display = "inline-block"; // Mostra o botão Próxima
}

// Avança para a próxima pergunta ou exibe o resultado final
function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Função para exibir o resultado final
function showResult() {
    document.getElementById("quiz").style.display = "none"; // Oculta o quiz
    document.getElementById("result").style.display = "block"; // Mostra o resultado
    document.getElementById("result-message").innerText = `Parabéns! Você acertou ${score} de ${questions.length} perguntas!`;
}

// Reinicia o quiz e volta para a tela inicial
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").style.display = "none"; // Oculta o resultado
    document.getElementById("intro").style.display = "block"; // Mostra a introdução
}
