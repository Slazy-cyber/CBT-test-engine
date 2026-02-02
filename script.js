
// Array of questions (you can add/edit as many as you want)
const questions = [
    {
    question: "What year was Liverpool FC founded?",
    options: [
        "1878",
        "1892",
        "1901",
        "1910"
    ],
    correct: 1
},
{
    question: "What is the name of Liverpool’s home stadium?",
    options: [
        "Old Trafford",
        "Anfield",
        "Etihad Stadium",
        "St James' Park"
    ],
    correct: 1
},
{
    question: "What are Liverpool’s traditional team colors?",
    options: [
        "Blue and white",
        "Red and white",
        "Green and black",
        "Yellow and blue"
    ],
    correct: 1
},
{
    question: "Which trophy did Liverpool win in the 2019–2020 season?",
    options: [
        "UEFA Champions League",
        "English Premier League",
        "FA Cup",
        "Europa League"
    ],
    correct: 1
},
{
    question: "What is the nickname of Liverpool FC?",
    options: [
        "The Gunners",
        "The Reds",
        "The Blues",
        "The Citizens"
    ],
    correct: 1
},
{
    question: "Who is Liverpool’s legendary manager that led them in the 1980s?",
    options: [
        "Jose Mourinho",
        "Sir Alex Ferguson",
        "Bill Shankly",
        "Arsène Wenger"
    ],
    correct: 2
},
{
    question: "Which river is associated with Liverpool’s anthem “You’ll Never Walk Alone” being sung?",
    options: [
        "River Thames",
        "River Mersey",
        "River Severn",
        "River Tyne"
    ],
    correct: 1
},
{
    question: "Which Liverpool player won the UEFA Men’s Player of the Year in 2019?",
    options: [
        "Virgil van Dijk",
        "Sadio Mané",
        "Mohamed Salah",
        "Roberto Firmino"
    ],
    correct: 0
},
{
    question: "Who scored the winning penalty for Liverpool in the 2005 Champions League final shootout?",
    options: [
        "Steven Gerrard",
        "Xabi Alonso",
        "Andriy Shevchenko",
        "Toni Kroos"
    ],
    correct: 1
},
{
    question: "What is the famous sign displayed at Anfield that welcomes players and fans?",
    options: [
        "This is Spurs",
        "This is Anfield",
        "You'll Walk Alone",
        "Welcome to Liverpool"
    ],
    correct: 1
}

];


// ──────────────────────────────────────────────
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
const total = questions.length;

// Elements
const startScreen = document.getElementById('start-screen');
const quizDiv = document.getElementById('quiz');
const navigation = document.getElementById('navigation');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const resultDiv = document.getElementById('result');
const scoreText = document.getElementById('scoreText');
const performance = document.getElementById('performanceText');
const currentNum = document.getElementById('currentQuestionNum');
const totalNum = document.getElementById('totalQuestions');


// Initialize
function init() {
    totalNum.textContent = total;
    renderQuestion(0);
}

// Render single question
function renderQuestion(index) {
    currentQuestion = index;
    currentNum.textContent = index + 1;

    quizDiv.innerHTML = '';

    const q = questions[index];
    const div = document.createElement('div');
    div.className = 'question-container active';

    div.innerHTML = `
    <h5 class="mb-4">${index + 1}. ${q.question}</h5>
  `;

    q.options.forEach((option, i) => {
        const id = `q${index}-opt${i}`;
        const checked = userAnswers[index] === i ? 'checked' : '';

        div.innerHTML += `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="q${index}" 
               id="${id}" value="${i}" ${checked}>
        <label class="form-check-label option-label w-100" for="${id}">
          ${option}
        </label>
      </div>
    `;
    });

    quizDiv.appendChild(div);

    // Update buttons
    prevBtn.disabled = index === 0;
    nextBtn.style.display = index === total - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = index === total - 1 ? 'inline-block' : 'none';
}


// Save answer when radio changes
quizDiv.addEventListener('change', (e) => {
    if (e.target.type === 'radio') {
        const value = parseInt(e.target.value);
        userAnswers[currentQuestion] = value;
    }
});


// Navigation
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        renderQuestion(currentQuestion - 1);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < total - 1) {
        renderQuestion(currentQuestion + 1);
    }
});

submitBtn.addEventListener('click', showResult);


// Calculate & Show Result
function showResult() {
    let score = 0;
    userAnswers.forEach((ans, i) => {
        if (ans === questions[i].correct) score++;
    });

    scoreText.textContent = `${score} / ${total}`;

    let message = "";
    let color = "";

    const percent = (score / total) * 100;
    if (percent >= 80) {
        message = "Excellent! Keep it up! 🎉";
        color = "text-success";
    } else if (percent >= 60) {
        message = "Good job! You can do even better.";
        color = "text-primary";
    } else if (percent >= 40) {
        message = "Fair. Try studying more.";
        color = "text-warning";
    } else {
        message = "You need more practice. Don't give up!";
        color = "text-danger";
    }

    performance.textContent = message;
    performance.className = `lead ${color}`;

    quizDiv.style.display = 'none';
    navigation.style.display = 'none';
    resultDiv.style.display = 'block';
}


// Start / Restart
document.getElementById('startBtn').addEventListener('click', () => {
    startScreen.style.display = 'none';
    quizDiv.style.display = 'block';
    navigation.style.display = 'flex';
    init();
});

document.getElementById('restartBtn').addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers.fill(null);
    resultDiv.style.display = 'none';
    startScreen.style.display = 'block';
});

