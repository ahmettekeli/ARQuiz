const APIService = require("./APIService");
const ServiceResponse = require("./ServiceResponse");

class ServiceLayer extends APIService {
	constructor() {
		super();
	}

	getList(requestMethod, requestParams, callbackFn) {
		return this.get(requestMethod, requestParams, callbackFn);
	}

	// get, post, put, delete will be extended from the APIService, can be overwritten in here if pleased
	getById(requestMethod, requestParams, callbackFn) {
		// Could be some validation for ID or just simple check
		if (requestParams.id !== undefined) {
			return this.get(requestMethod + "/" + requestParams.id, requestParams, callbackFn);
		} else {
			const responseObj = new ServiceResponse();
			responseObj.status = false;
			responseObj.message = "ID Required";
			responseObj.data = {};
			return responseObj;
		}
	}

	deleteById(requestMethod, requestParams, callbackFn) {
		// Could be some validation for ID or just simple check
		if (requestParams.id !== "") {
			return this.delete(requestMethod + "/" + requestParams.id, requestParams, callbackFn);
		} else {
			const responseObj = new ServiceResponse();
			responseObj.status = false;
			responseObj.message = "ID Required";
			responseObj.data = {};
			return responseObj;
		}
	}

	patchById(requestMethod, requestParams, callbackFn) {
		if (requestParams.id !== "") {
			return this.patch(requestMethod + "/" + requestParams.id, requestParams, callbackFn);
		} else {
			const responseObj = new ServiceResponse();
			responseObj.status = false;
			responseObj.message = "ID Required";
			responseObj.data = {};
			return responseObj;
		}
	}
}

module.exports = ServiceLayer;
