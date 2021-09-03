 class ServiceResponse {
    constructor() { }

    get status(){
        return this._status;
    }
    get statusCode(){
        return this._statusCode;
    }
    get message(){
        return this._message;
    }
    get data(){
        return this._data;
    }

    set status(inStatus){
        this._status = inStatus;
    }
    set statusCode(inStatusCode){
        this._statusCode = inStatusCode;
    }
    set message(inMessage){
        this._message = inMessage;
    }
    set data(inData){
        this._data = inData;
    }

}
module.exports = ServiceResponse;