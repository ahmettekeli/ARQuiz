const ServiceLayer = require("../API/ServiceLayer");

class Quiz extends ServiceLayer {
	constructor(props) {
		super();
		this.mainRoute = "quizes";
		this.quizesByCampignId = "quizes/byCampaignId";

		if (props) {
			this.questions = props.questions;
			this.currentQuestionId = 0;
		}
	}

	//Ahmet ekledi ---Begin--
	get questions() {
		return this._questions;
	}

	set questions(inQuestions) {
		this._questions = inQuestions;
	}

	get currentQuestionId() {
		return this._currentQuestionId;
	}

	set currentQuestionId(inCurrentQuestionId) {
		this._currentQuestionId = inCurrentQuestionId;
	}

	get timeOutAmount() {
		return this._timeOutAmount;
	}

	set timeOutAmount(inTimeOutAmount) {
		this._timeOutAmount = inTimeOutAmount;
	}
	//---End---

	getList(requestParams, callbackFn) {
		return this.get(this.mainRoute, requestParams, callbackFn);
	}

	getQuizById(requestParams, callbackFn) {
		return this.getById(this.mainRoute, requestParams, callbackFn);
	}

	getQuizesByCampaignId(requestParams, callbackFn) {
		return this.getById(this.quizesByCampignId, requestParams, callbackFn);
	}

	deleteQuizById(requestParams, callbackFn) {
		return this.deleteById(this.mainRoute, requestParams, callbackFn);
	}

	postQuiz(requestParams, callbackFn) {
		return this.post(this.mainRoute, requestParams, callbackFn);
	}

	patchQuiz(requestParams, callbackFn) {
		return this.patchById(this.mainRoute, requestParams, callbackFn);
	}
}

module.exports = Quiz;
