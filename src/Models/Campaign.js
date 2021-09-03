const ServiceLayer = require("../API/ServiceLayer");

class Campaign extends ServiceLayer {
	constructor() {
		super();
		this.mainRoute = "campaigns";
	}

	getList(requestParams, callbackFn) {
		return this.get(this.mainRoute, requestParams, callbackFn);
	}

	getCampaignById(requestParams, callbackFn) {
		return this.getById(this.mainRoute, requestParams, callbackFn);
	}

	deleteCampaignById(requestParams, callbackFn) {
		return this.deleteById(this.mainRoute, requestParams, callbackFn);
	}

	postCampaign(requestParams, callbackFn) {
		return this.post(this.mainRoute, requestParams, callbackFn);
	}

	patchCampaign(requestParams, callbackFn) {
		return this.patchById(this.mainRoute, requestParams, callbackFn);
	}
}

module.exports = Campaign;
