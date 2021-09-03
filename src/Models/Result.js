const ServiceLayer = require('../API/ServiceLayer');

class Result extends ServiceLayer {
  constructor() {
    super();
    this.mainRoute = 'aggregationresults';
  }

  getList(requestParams, callbackFn) {
    return this.get(this.mainRoute, requestParams, callbackFn);
  }

  getResultById(requestParams, callbackFn) {
    return this.getById(this.mainRoute, requestParams, callbackFn);
  }

  deleteResultById(requestParams, callbackFn) {
    return this.deleteById(this.mainRoute, requestParams, callbackFn);
  }

  postResult(requestParams, callbackFn) {
    return this.post(this.mainRoute, requestParams, callbackFn);
  }

  patchResult(requestParams, callbackFn) {
    return this.patchById(this.mainRoute, requestParams, callbackFn);
  }
}

module.exports = Result;
