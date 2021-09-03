const axios = require("axios");
const ServiceResponse = require("./ServiceResponse");

class APIService {
	constructor() {
		this.service = axios;
		this.baseURL = "https://arquiz-restapi.herokuapp.com/";
		// this.baseURL = "http://localhost:3000/";
	}

	get baseURL() {
		return this._baseURL;
	}

	set baseURL(inApiURL) {
		this._baseURL = inApiURL;
	}

	get(requestMethod, requestParams, callbackFn) {
		// insert log requestmethod, requestParams, dateTime, id
		return this.service
			.get(this.baseURL + requestMethod, { params: requestParams })
			.then((response) => {
				const responseObj = new ServiceResponse();
				responseObj.status = true;
				responseObj.message = response.message;
				responseObj.data = response.data;
				// update log id -> responseParams, responseData, responseStatus
				callbackFn(responseObj);
			})
			.catch((e) => {
				const responseObj = new ServiceResponse();
				responseObj.status = false;
				responseObj.message = e.response.status === 404 ? "Request Method Not Found" : e.message;
				responseObj.data = {};
				callbackFn(responseObj);
			});
	}

	post(requestMethod, requestParams, callbackFn) {
		return this.service
			.request({
				method: "POST",
				url: this.baseURL + requestMethod,
				responseType: "json",
				data: requestParams,
			})
			.then((response) => {
				const responseObj = new ServiceResponse();
				responseObj.status = true;
				responseObj.message = response.message;
				responseObj.data = response.data;
				callbackFn(responseObj);
			})
			.catch((e) => {
				const responseObj = new ServiceResponse();
				responseObj.status = false;
				responseObj.message = e;
				responseObj.data = {};
				callbackFn(responseObj);
			});
	}

	patch(requestMethod, requestParams, callbackFn) {
		return this.service
			.request({
				method: "PATCH",
				url: this.baseURL + requestMethod,
				responseType: "json",
				data: requestParams,
			})
			.then((response) => {
				const responseObj = new ServiceResponse();
				responseObj.status = true;
				responseObj.message = response.message;
				responseObj.data = response.data;
				callbackFn(responseObj);
			})
			.catch((e) => {
				const responseObj = new ServiceResponse();
				responseObj.status = false;
				responseObj.message = e;
				responseObj.data = {};
				callbackFn(responseObj);
			});
	}

	delete(requestMethod, requestParams, callbackFn) {
		return this.service
			.delete(this.baseURL + requestMethod, { params: requestParams })
			.then((response) => {
				const responseObj = new ServiceResponse();
				responseObj.status = true;
				responseObj.message = response.message;
				responseObj.data = response.data;
				callbackFn(responseObj);
			})
			.catch((e) => {
				const responseObj = new ServiceResponse();
				responseObj.status = false;
				responseObj.message = e;
				responseObj.data = {};
				callbackFn(responseObj);
			});
	}
}
module.exports = APIService;
