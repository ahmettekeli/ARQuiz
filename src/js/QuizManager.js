const EventContext = require("./EventContext");
const QuizHelper = require("./QuizHelper");

class QuizManager {
	constructor() {
		this.eventEmitter = new EventContext().eventEmitter;
		this.helperParams = {
			eventEmitter: this.eventEmitter,
		};
		this.quizHelper = new QuizHelper(this.helperParams);
		this.isReady = false;
	}

	initializeDB() {
		this.eventEmitter.on("onDataReceived", (data) => {
			this.onDataReceived(data);
		});
		this.quizHelper.getQuizDataFromDB();
	}

	startQuiz() {
		this.initializeQuiz();
		this.quizHelper.prepareQuiz();
		this.quizHelper.initButtonEvents();
		this.quizHelper.setNextQuestion();
	}

	initializeQuiz() {
		this.eventEmitter.on("onQuestionTimeOut", (params) => {
			this.onQuestionTimeOut(params);
		});

		this.eventEmitter.on("onAnswer", (params) => {
			this.onQuestionAnswer(params);
		});

		this.eventEmitter.on("onQuizEnd", (params) => {
			this.onQuizEnd(params);
		});

		this.eventEmitter.on("onNextQuestionReady", (isAnswered) => {
			if (isAnswered) {
				this.quizHelper.setNextQuestion();
			}
		});
	}

	onDataReceived(data) {
		this.quizHelper.handleDataReceived(data);
		this.isReady = true;
	}

	onSelection() {
		this.quizHelper.handleSelection();
	}

	onQuestionAnswer(question) {
		this.quizHelper.handleAnswer(question);
	}

	//TODO
	onNoFaceDetected() {
		// Handle when no face is detected here.
	}

	onQuestionTimeOut(question) {
		this.quizHelper.handleAnswer(question, true);
	}

	onQuizEnd(score) {
		//TODO Do something when quiz finishes.Animations, Dom manipulations etc.
		this.quizHelper.handleQuizEnd();
	}

	//Buna burada gerek var mi?
	onReplay() {
		this.quizHelper.handlePlayAgain();
	}
}
module.exports = QuizManager;
