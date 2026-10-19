const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
      "Arctic Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Who wrote the national anthem of India?",
    options: [
      "Rabindranath Tagore",
      "Mahatma Gandhi",
      "Bankim Chandra Chattopadhyay",
      "Sarojini Naidu",
    ],
    answer: "Rabindranath Tagore",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["CO2", "O2", "H2O", "NaCl"],
    answer: "H2O",
  },
  {
    question: "How many continents are there in the world?",
    options: ["Five", "Six", "Seven", "Eight"],
    answer: "Seven",
  },
  {
    question: "Which is the fastest land animal?",
    options: ["Lion", "Cheetah", "Tiger", "Horse"],
    answer: "Cheetah",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    answer: "Tokyo",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
    answer: "Carbon dioxide",
  },
  {
    question: "Who is known as the Father of the Nation in India?",
    options: [
      "Jawaharlal Nehru",
      "Subhas Chandra Bose",
      "Mahatma Gandhi",
      "Sardar Patel",
    ],
    answer: "Mahatma Gandhi",
  },
  {
    question: "What is 12 × 8?",
    options: ["86", "96", "108", "112"],
    answer: "96",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.querySelector("#quiz-container");

function loadQuestion() {
  let currentQuizData = quizQuestions[currentQuestionIndex];
  quizContainer.innerHTML = "";
  let questionTitle = document.createElement("h2");
  questionTitle.textContent = currentQuizData.question;
  quizContainer.appendChild(questionTitle);

  currentQuizData.options.forEach((element) => {
    const optionButton = document.createElement("button");
    optionButton.textContent = element;

    optionButton.addEventListener("click", (e) => {
      console.log(`User clicked ${e.target.textContent}`);
      if (e.target.textContent === currentQuizData.answer) {
        score++;
        console.log("Right answer");
      } else {
        console.log("Wrong answer");
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
      } else {
        quizContainer.innerHTML = `<h2>quiz finished! </h2><p>Your score is: ${score} / ${quizQuestions.length}</p>`;
      }
    });

    quizContainer.appendChild(optionButton);
  });
}
loadQuestion();
