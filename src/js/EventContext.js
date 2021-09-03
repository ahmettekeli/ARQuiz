const EventEmitter = require("events");

class EventContext {
	constructor() {
		this._eventEmitter = new EventEmitter();
	}

	get eventEmitter() {
		return this._eventEmitter;
	}

	set eventEmitter(inEventEmitter) {
		this._eventEmitter = inEventEmitter;
	}
}

module.exports = EventContext;
