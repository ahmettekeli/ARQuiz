const Quiz = require("./Quiz"),
	Question = require("./Question"),
	Campaign = require("./Campaign"),
	Answer = require("./Answer"),
	Result = require("./Result");

const quizInstance = new Quiz(),
	questionInstance = new Question(),
	campaignInstance = new Campaign(),
	answerInstance = new Answer(),
	resultInstance = new Result();

class MainContext {
	//Quiz Methods
	static getQuizList(requestParams, callbackFn) {
		quizInstance.getList(requestParams, callbackFn);
	}

	static getQuizById(requestParams, callbackFn) {
		quizInstance.getQuizById(requestParams, callbackFn);
	}

	static getQuizesByCampaignId(requestParams, callbackFn) {
		quizInstance.getQuizesByCampaignId(requestParams, callbackFn);
	}

	static deleteQuizById(requestParams, callbackFn) {
		quizInstance.deleteQuizById(requestParams, callbackFn);
	}

	static postQuiz(requestParams, callbackFn) {
		quizInstance.postQuiz(requestParams, callbackFn);
	}
	static patchQuiz(requestParams, callbackFn) {
		quizInstance.patchQuiz(requestParams, callbackFn);
	}

	//Question Methods
	static getQuestionList(requestParams, callbackFn) {
		questionInstance.getList(requestParams, callbackFn);
	}

	static getQuestionById(requestParams, callbackFn) {
		questionInstance.getQuestionById(requestParams, callbackFn);
	}

	static getQuestionsByQuizId(requestParams, callbackFn) {
		questionInstance.getQuestionsByQuizId(requestParams, callbackFn);
	}

	static getQuestionsByCampaignId(requestParams, callbackFn) {
		questionInstance.getQuestionsByCampaignId(requestParams, callbackFn);
	}

	static deleteQuestionById(requestParams, callbackFn) {
		questionInstance.deleteQuestionById(requestParams, callbackFn);
	}

	static postQuestion(requestParams, callbackFn) {
		questionInstance.postQuestion(requestParams, callbackFn);
	}
	static patchQuestion(requestParams, callbackFn) {
		questionInstance.patchQuestion(requestParams, callbackFn);
	}

	//Campaign Methods
	static getCampaignList(requestParams, callbackFn) {
		campaignInstance.getList(requestParams, callbackFn);
	}

	static getCampaignById(requestParams, callbackFn) {
		campaignInstance.getCampaignById(requestParams, callbackFn);
	}

	static deleteCampaignById(requestParams, callbackFn) {
		campaignInstance.deleteCampaignById(requestParams, callbackFn);
	}

	static postCampaign(requestParams, callbackFn) {
		campaignInstance.postCampaign(requestParams, callbackFn);
	}
	static patchCampaign(requestParams, callbackFn) {
		campaignInstance.patchCampaign(requestParams, callbackFn);
	}

	//Answer Methods

	static getAnswerList(requestParams, callbackFn) {
		answerInstance.getList(requestParams, callbackFn);
	}

	static getAnswerById(requestParams, callbackFn) {
		answerInstance.getAnswerById(requestParams, callbackFn);
	}

	static getAnswersByQuestionId(requestParams, callbackFn) {
		answerInstance.getAnswersByQuestionId(requestParams, callbackFn);
	}

	static deleteAnswerById(requestParams, callbackFn) {
		answerInstance.deleteAnswerById(requestParams, callbackFn);
	}

	static postAnswer(requestParams, callbackFn) {
		answerInstance.postAnswer(requestParams, callbackFn);
	}
	static patchAnswer(requestParams, callbackFn) {
		answerInstance.patchAnswer(requestParams, callbackFn);
	}

	//Result Methods
	static getResultList(requestParams, callbackFn) {
		resultInstance.getList(requestParams, callbackFn);
	}

	static getResultById(requestParams, callbackFn) {
		resultInstance.getResultById(requestParams, callbackFn);
	}

	static deleteResultById(requestParams, callbackFn) {
		resultInstance.deleteResultById(requestParams, callbackFn);
	}

	static postResult(requestParams, callbackFn) {
		resultInstance.postResult(requestParams, callbackFn);
	}
}

module.exports = MainContext;
