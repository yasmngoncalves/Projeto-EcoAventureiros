// Perguntas do quiz
const questions = [
    { question: "Você terminou de lanchar e ficou com uma garrafa de plástico vazia. O que você faz?", options: ["Coloco no lixo reciclável.", "Jogo no lixo comum."], answer: 0, image: "gameimages/banner-quiz1.png" },
    { question: "Você está escovando os dentes. O que faz com a torneira?", options: [" Deixo a torneira fechada enquanto escovo.", "Deixo a torneira aberta o tempo todo."], answer: 0, image: "gameimages/banner-quiz2.png" },
    { question: "Você vai sair da sala onde estava brincando. O que você faz com a luz?", options: ["Deixo a luz acesa para quando eu voltar.", "Apago a luz antes de sair."], answer: 1, image: "gameimages/banner-quiz3.png" },
    { question: "Você está no mercado e vai pegar uma fruta para levar para casa. O que você faz?", options: ["Levo uma sacola reutilizável.", "Uso uma sacola plástica descartável."], answer: 0, image: "gameimages/banner-quiz4.png" },
    { question: "Você vai almoçar e tem várias opções de alimentos. O que você faz?", options: ["Pego mais comida do que preciso.", "Pego só o que vou comer."], answer: 1, image: "gameimages/banner-quiz5.png" }
];

// Variáveis e estado do quiz
let currentQuestion = 0;
let score = 0;

// Função para iniciar o quiz
function startQuiz() {
    document.getElementById("intro").style.display = "none"; 
    document.getElementById("quiz").style.display = "block"; 
    document.getElementById("result").style.display = "none"; 
    loadQuestion();
}

// Função para carregar a pergunta atual
function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionElements = document.querySelectorAll(".option");
    const questionImage = document.getElementById("question-image");

    questionElement.innerText = questions[currentQuestion].question;
    questionImage.src = questions[currentQuestion].image;
    questionImage.style.display = "block"; 

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
            option.classList.add("correct"); 

        } else if (index === selectedIndex) {
            option.classList.add("incorrect"); 
            
        }
    });

    if (selectedIndex === correctAnswer) {
        score++;
    }

    document.getElementById("next-btn").style.display = "inline-block"; 
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
    document.getElementById("quiz").style.display = "none"; 
    document.getElementById("result").style.display = "block"; 

    const resultMessage = document.getElementById("result-message");
    const resultImage = document.getElementById("result-image");

    if (score > 3) {
        resultMessage.innerText = `Parabéns! Você acertou ${score} de ${questions.length} perguntas! 🎉`;
        resultImage.src = "gameimages/banner-comemoracao.png"; 
        resultImage.alt = "Imagem comemorativa de parabéns";
    } else {
        resultMessage.innerText = `Você acertou ${score} de ${questions.length} perguntas. Tente novamente e continue aprendendo! 🌱`;
        resultImage.src = "gameimages/banner-quiz-tentativa.png"; 
        resultImage.alt = "Imagem encorajadora para tentar novamente";
    }
}


// Reinicia o quiz e volta para a tela inicial
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById("result").style.display = "none"; 
    document.getElementById("intro").style.display = "block"; 
}
