const ServiceLayer = require("../API/ServiceLayer");

class Answer extends ServiceLayer {
	constructor() {
		super();
		this.mainRoute = "answers";
		this.answersByQuestion = "answers/byQuestionId";
	}

	getList(requestParams, callbackFn) {
		return this.get(this.mainRoute, requestParams, callbackFn);
	}

	getAnswerById(requestParams, callbackFn) {
		return this.getById(this.mainRoute, requestParams, callbackFn);
	}

	getAnswersByQuestionId(requestParams, callbackFn) {
		return this.getById(this.answersByQuestion, requestParams, callbackFn);
	}

	deleteAnswerById(requestParams, callbackFn) {
		return this.deleteById(this.mainRoute, requestParams, callbackFn);
	}

	postAnswer(requestParams, callbackFn) {
		return this.post(this.mainRoute, requestParams, callbackFn);
	}

	patchAnswer(requestParams, callbackFn) {
		return this.patchById(this.mainRoute, requestParams, callbackFn);
	}
}

module.exports = Answer;
