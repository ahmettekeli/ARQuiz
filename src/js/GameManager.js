const QuizManager = require("./QuizManager");
// const dummyData = require("./data.json");

class GameManager {
	constructor() {
		// this.quizData = dummyData;
		this.quizManager = new QuizManager();
	}

	initialize() {
		this.quizManager.initializeDB();
	}

	startGame() {
		this.quizManager.startQuiz();
	}

	endGame() {
		this.quizManager.endQuiz();
	}
}
module.exports = GameManager;
