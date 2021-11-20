class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question(
        "Combien y'a t-il d'habitant dans la capitale Française ",
        ["16 millions", "12 millions", "8 millions", "2 millions"],
        "2 millions"),
    new Question(
        "Combien le Zevent de l'année 2020 a rapporter d'argent",
        ["10 millions", "5.7 millions", "9 millions", "3 millions"],
       "5.7 millions"),
    new Question(
        "Combien de Parc Walt Disney éxiste t'il ",
        ["4 ", "3 ", "5", "8"],
        "5"),
    new Question(
        "Combien existe t'il d'espèce animal sur terre",
        ["7.85 millions", "3.54 millions", "8.24 millions", "7.77 millions"],
        "7.77 millions"),
    new Question(
        "quelle est la fortune d'Elon Musk",
        ["50 millions", "253.5 milliards", "286.7 milliards", "442.2 milliards"],
        "286.7 milliards")
];
  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h3> Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>`;
      this.elementShown("quiz", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
    } else {
      display.question();
      display.choices();
      display.progress();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);
  
  