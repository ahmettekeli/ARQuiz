const Utility = require("./Utility");
const ScoreManager = require("./ScoreManager");
const Quiz = require("../Models/Quiz");
const MainContext = require("../Models/MainContext");

class QuizHelper {
	constructor(props) {
		this.timerBar = document.getElementById("timerBar");
		this.overHeadDOM = document.getElementById("questionHolder");
		this.scoreDOM = document.getElementById("scoreContainer");
		this.scoreTextDOM = document.getElementById("scoreText");
		this.answerContainerDOM = document.getElementById("answers");
		this.timerContainer = document.getElementById("progressContainer");
		this.loader = document.getElementsByClassName("spinner-border")[0];
		// this.playBtn = document.getElementById("playBtn");
		this.buttonsFooter = document.getElementById("footerContainer");
		this.playAgainBtn = document.getElementById("playAgainBtn");
		this.moreInfoBtn = document.getElementById("moreInfoBtn");
		this.ctaBtn = document.getElementById("ctaBtn");
		this.questionHolder = document.getElementById("question");
		this.questionDOM = document.getElementById("question");
		this.answersDOM = [document.getElementById("answer1"), document.getElementById("answer2")];
		this.utility = new Utility();
		this.quiz = null;
		this.scoreManager = null;
		this.timerInterval = null;

		this.eventEmitter = props.eventEmitter;
		this.apiUrl = "https://arquiz-restapi.herokuapp.com/campaigns/5f6900b97263410bf96e8190";
		// this.apiUrl = "http://localhost:3000/campaigns/5f6900b97263410bf96e8190";
		this.campaignId = this.getCampaignIdFromUrl(this.apiUrl);
	}

	initButtonEvents() {
		this.playAgainBtn.onclick = () => {
			this.utility.fireGtagEvent("CTA_Play_Again", "click");
			this.handlePlayAgain();
		};
		this.moreInfoBtn.onclick = () => {
			this.utility.fireGtagEvent("CTA_More_Info_End_Screen", "click");
			location.href = "http://www.adcolony.com";
		};
		this.ctaBtn.onclick = () => {
			this.utility.fireGtagEvent("CTA_More_Info_Start_Screen", "click");
			location.href = "http://www.adcolony.com";
		};
	}

	getQuizDataFromDB() {
		MainContext.getQuizesByCampaignId({ campaignId: this.campaignId, id: this.campaignId }, (response) => {
			if (response.status) {
				MainContext.getQuestionsByQuizId({ quizId: response.data[0]._id, id: response.data[0]._id }, (res) => {
					if (res.status) {
						let data = {
							Quiz: {
								quizId: response.data[0]._id,
								questions: [...res.data],
								scoreIncreaseAmount: response.data[0].scoreIncreaseAmount,
								timeOutAmount: response.data[0].timeOutAmount,
							},
						};
						this.eventEmitter.emit("onDataReceived", data);
					} else {
						console.error("Error fetching quiz data : ", response.message);
					}
				});
			} else {
				console.error("Error fetching campaign data : ", response.message);
			}
		});
	}

	//Extracting Campaign id from URL
	getCampaignIdFromUrl(baseUrl) {
		return baseUrl.substring(baseUrl.lastIndexOf("/") + 1);
	}

	prepareQuiz() {
		if (this.quizData) {
			this.quiz = new Quiz(this.quizData.Quiz);
			this.utility.show(this.overHeadDOM);
			this.utility.show(this.answerContainerDOM);
			this.utility.show(this.timerContainer);
		} else {
			console.warn("Could not found Question Data.");
		}
		this.utility.fireGtagEvent("Quiz_Start", "click");
	}

	//Pick the next question
	getNextQuestion() {
		if (this.quiz.currentQuestionId < this.quiz.questions.length) {
			this.quiz.questions[this.quiz.currentQuestionId].isReady = true;
			return this.quiz.questions[this.quiz.currentQuestionId];
		}
		//no more questions left.
		return null;
	}

	//Set a question to the DOM and starting the timer.
	setNextQuestion() {
		let nextQuestion;
		nextQuestion = this.getNextQuestion();
		if (nextQuestion) {
			this.printQuestion(nextQuestion);
			this.startQuestionTimer(nextQuestion);
			this.quiz.currentQuestionId += 1;
		} else {
			//no more questions left, end game here.
			this.eventEmitter.emit("onQuizEnd", this.scoreManager.score);
		}
	}

	printQuestion(question) {
		//Get child dom elements from the parent (question area and options area)
		this.questionHolder.childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerHTML = question.question;
		this.answersDOM[0].children[0].innerHTML = question.answers[0];
		this.answersDOM[1].children[0].innerHTML = question.answers[1];
	}

	startQuestionTimer(question) {
		let tempTime = 0;
		this.timerInterval = setInterval(() => {
			if (tempTime <= 100) {
				tempTime += 1;
				this.timerBar.style.width = tempTime + "%";
			} else {
				clearInterval(this.timerInterval);
				this.handleQuestionTimerEnd(question);
			}
		}, this.quizData.Quiz.timeOutAmount * 10); // 2 seconds * 1000 miliseconds / 100 (since the timerbar finishes in 100 iterations )
	}

	resetQuestionTimer() {
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
			this.timerBar.style.width = "0%";
		}
	}

	selectAnswerOption(question, selectedOption) {
		if (selectedOption == this.utility.optionEnum.RIGHT) {
			question.selectedAnswerId = 0;
		} else {
			question.selectedAnswerId = 1;
		}
	}

	revealScore() {
		let animationLength = 1;
		this.scoreTextDOM.innerText = "Your Score:" + this.scoreManager.score;
		this.overHeadDOM.childNodes[1].classList.add(this.utility.animationEnum.FADE_OUT);
		setTimeout(() => {
			this.utility.hide(this.overHeadDOM.childNodes[1]);
			this.utility.hide(this.answerContainerDOM);
			this.utility.hide(this.timerContainer);
			this.utility.show(this.scoreDOM);
			this.utility.show(this.buttonsFooter);
			this.scoreDOM.classList.add(this.utility.animationEnum.FADE_IN);
			this.buttonsFooter.classList.add(this.utility.animationEnum.FADE_IN);
		}, animationLength * 1000);
	}

	postAnswer(question) {
		// Posting answer to DB.
		let isCorrect;
		question.correctAnswerId == question.selectedAnswerId ? (isCorrect = true) : (isCorrect = false);
		MainContext.postAnswer(
			{
				quizId: `${this.quizData.Quiz.quizId}`,
				questionId: `${question._id}`,
				name: `${question.answers[Number(question.selectedAnswerId)]}`,
				isCorrect: isCorrect,
			},
			(response) => {
				if (!response.status) {
					console.error("Error posting answer data: ", response.message);
				}
			}
		);
	}

	resetAnswers() {
		setTimeout(() => {
			//Clearing answer DOM animations here.
			this.answersDOM.forEach((element) => {
				if (element.classList.contains(this.utility.animationEnum.CORRECT_ANSWER)) {
					element.classList.remove(this.utility.animationEnum.CORRECT_ANSWER);
				}
				if (element.classList.contains(this.utility.animationEnum.SELECT_ANSWER)) {
					element.classList.remove(this.utility.animationEnum.SELECT_ANSWER);
				}
				if (element.classList.contains(this.utility.animationEnum.WRONG_ANSWER)) {
					element.classList.remove(this.utility.animationEnum.WRONG_ANSWER);
				}
			});
		}, 10);
	}

	//TODO
	revealStatistics() {
		//Reveal statistics for the current question for surveys since there is no right or wrong answers in surveys.
	}

	handleModelReady() {
		// this.utility.hide(this.loader);
		// this.playBtn.classList.remove("disabled");
	}

	handleDataReceived(data) {
		this.quizData = data;
		this.scoreManager = new ScoreManager(this.quizData.Quiz.scoreIncreaseAmount);
	}

	handleQuestionTimerEnd(question) {
		this.eventEmitter.emit("onQuestionTimeOut", question);
		this.utility.fireGtagEvent("Time_Out_Question_" + this.quiz.currentQuestionId, "Status");
	}

	handleQuizEnd() {
		this.revealScore();
		this.utility.fireGtagEvent("Quiz_End", "Status");
	}

	handlePlayAgain() {
		this.utility.show(this.overHeadDOM);
		if (this.overHeadDOM.classList.contains(this.utility.animationEnum.FADE_OUT)) {
			this.overHeadDOM.classList.remove(this.utility.animationEnum.FADE_OUT);
		}
		if (this.scoreDOM.classList.contains(this.utility.animationEnum.FADE_IN)) {
			this.scoreDOM.classList.remove(this.utility.animationEnum.FADE_IN);
			this.utility.hide(this.scoreDOM);
		}
		if (this.buttonsFooter.classList.contains(this.utility.animationEnum.FADE_IN)) {
			this.buttonsFooter.classList.remove(this.utility.animationEnum.FADE_IN);
			this.utility.hide(this.buttonsFooter);
		}
		this.utility.show(this.questionDOM);
		this.utility.show(this.answerContainerDOM);
		this.utility.show(this.timerContainer);

		this.quiz.questions.forEach((element) => {
			element.selectedAnswerId = null;
			element.isAnswered = false;
			element.isReady = false;
		});
		this.quiz.currentQuestionId = 0;
		this.scoreManager.score = 0;
		this.setNextQuestion();
	}

	handleAnswer(question, isTimedOut = false) {
		if (question.isReady) {
			if (!isTimedOut) {
				if (question.correctAnswerId != -1) {
					//Quiz questions.
					this.answersDOM[question.selectedAnswerId].classList.add(this.utility.animationEnum.SELECT_ANSWER);
					setTimeout(() => {
						if (question.selectedAnswerId != question.correctAnswerId) {
							//wrong answer
							this.answersDOM[question.selectedAnswerId].classList.add(
								this.utility.animationEnum.WRONG_ANSWER
							);
							this.utility.fireGtagEvent(
								"Quiz_Question_" +
									this.quiz.currentQuestionId +
									"_Given_Answer_Option_" +
									(question.selectedAnswerId + 1) +
									"_Wrong",
								"Tilt"
							);
						} else {
							this.utility.fireGtagEvent(
								"Quiz_Question_" +
									this.quiz.currentQuestionId +
									"_Given_Answer_Option_" +
									(question.selectedAnswerId + 1) +
									"_Correct",
								"Tilt"
							);
							this.scoreManager.increaseScore();
						}
						this.answersDOM[question.correctAnswerId].classList.add(
							this.utility.animationEnum.CORRECT_ANSWER
						);
					}, 1500);
				} else {
					// Survey questions.
					setTimeout(() => {
						if (question.selectedAnswerId) {
							this.answersDOM[question.selectedAnswerId].classList.add(
								this.utility.animationEnum.SELECT_ANSWER
							);
							this.utility.fireGtagEvent(
								"Survey_Question_" +
									(this.quiz.currentQuestionId + 1) +
									"_Given_Answer_Option_" +
									(question.selectedAnswerId + 1),
								"Tilt"
							);
						}
					}, 1500);
				}
				//If the question is answered, post the answer to DB.
				this.postAnswer(question);
			} else {
				setTimeout(() => {
					this.answersDOM[question.correctAnswerId].classList.add(this.utility.animationEnum.CORRECT_ANSWER);
				}, 1000);
			}
			question.isReady = false;
			setTimeout(() => {
				this.resetQuestionTimer();
				this.resetAnswers();
				this.setNextQuestion();
			}, 3000);
		}
	}
}

module.exports = QuizHelper;
