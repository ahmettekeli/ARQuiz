const ServiceLayer = require("../API/ServiceLayer");

class Question extends ServiceLayer {
	constructor(props) {
		super();
		this.mainRoute = "questions";
		this.questionsByQuizId = "questions/byQuizId";
		this.questionsByCampaignId = "questions/byCampaignId";
		if (props) {
			this.question = props.question;
			this.answer = props.answer;
			this.answerOptions = props.answers;
			this.correctAnswerId = props.correctAnswerId;
			this.selectedAnswerId = null;
			this.isAnswered = false;
			this.isReady = false;
		}
	}

	get question() {
		return this._question;
	}

	set question(inQuestion) {
		this._question = inQuestion;
	}

	get answer() {
		return this._answer;
	}

	set answer(inAnswer) {
		this._answer = inAnswer;
	}

	get answerOptions() {
		return this._answerOptions;
	}

	set answerOptions(inAnswerOptions) {
		this._answerOptions = inAnswerOptions;
	}

	get isAnswered() {
		return this._isAnswered;
	}

	set isAnswered(inIsAnswered) {
		this._isAnswered = inIsAnswered;
	}

	get isReady() {
		return this._isReady;
	}

	set isReady(inIsReady) {
		this._isReady = inIsReady;
	}

	get correctAnswerId() {
		return this._correctAnswerId;
	}

	set correctAnswerId(inCorrectAnswerId) {
		this._correctAnswerId = inCorrectAnswerId;
	}

	get selectedAnswerId() {
		return this._selectedAnswerId;
	}

	set selectedAnswerId(inSelectedId) {
		this._selectedAnswerId = inSelectedId;
	}

	getList(requestParams, callbackFn) {
		return this.get(this.mainRoute, requestParams, callbackFn);
	}

	getQuestionById(requestParams, callbackFn) {
		return this.getById(this.mainRoute, requestParams, callbackFn);
	}

	getQuestionsByQuizId(requestParams, callbackFn) {
		return this.getById(this.questionsByQuizId, requestParams, callbackFn);
	}

	getQuestionsByCampaignId(requestParams, callbackFn) {
		return this.getById(this.questionsByCampaignId, requestParams, callbackFn);
	}

	deleteQuestionById(requestParams, callbackFn) {
		return this.deleteById(this.mainRoute, requestParams, callbackFn);
	}

	postQuestion(requestParams, callbackFn) {
		return this.post(this.mainRoute, requestParams, callbackFn);
	}

	patchQuestion(requestParams, callbackFn) {
		return this.patchById(this.mainRoute, requestParams, callbackFn);
	}
}

module.exports = Question;
