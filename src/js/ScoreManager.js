class ScoreManager {
	constructor(scoreIncreaseAmount) {
		this.score = 0;
		this.increaseAmount = scoreIncreaseAmount;
	}

	get score() {
		return this._score;
	}

	set score(inScore) {
		this._score = inScore;
	}

	increaseScore() {
		// console.log("increasing score from " + this.score + " to " + (this.score + this.increaseAmount));
		this.score += this.increaseAmount;
	}
}

module.exports = ScoreManager;
