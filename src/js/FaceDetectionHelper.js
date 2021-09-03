const Utility = require("./Utility");
class FaceDetectionHelper {
	constructor(canvas) {
		this.canvas = canvas;
		this.utility = new Utility();
	}

	//Returns singe over head position offsets.
	getOverHeadPositions(overHeadAsset, landmarks, scale) {
		//TODO:would it be usefull to have the option to return plain over head positions without any asset height/width calculation included?
		return {
			offsetX: landmarks[33].x - (overHeadAsset.width * scale) / 2,
			offsetY: landmarks[33].y - 2.5 * (landmarks[8].y - landmarks[33].y) - (overHeadAsset.height * scale) / 2,
		};
	}

	//Returns over head positions for quiz cases including question and 2 options offsets.
	getOverHeadPositionsForQuiz(questionBgImg, optionBgImg, landmarks, scale) {
		return {
			questionBgOffsetX: landmarks[33].x - (questionBgImg.width * scale) / 2,
			questionBgOffsetY:
				landmarks[33].y - 4 * (landmarks[8].y - landmarks[33].y) - (questionBgImg.height * scale) / 2,
			option1BgOffsetX:
				landmarks[33].x -
				(questionBgImg.width * scale) / 2 -
				(questionBgImg.width * scale) / 4 -
				(optionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 2,
			option1BgOffsetY:
				landmarks[33].y -
				4 * (landmarks[8].y - landmarks[33].y) -
				(questionBgImg.height * scale) / 2 +
				questionBgImg.height * scale +
				(optionBgImg.height * scale) / 2,
			option2BgOffsetX:
				landmarks[33].x -
				(questionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 4 -
				(optionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 2,
			option2BgOffsetY:
				landmarks[33].y -
				4 * (landmarks[8].y - landmarks[33].y) -
				(questionBgImg.height * scale) / 2 +
				questionBgImg.height * scale +
				(optionBgImg.height * scale) / 2,
			questionTextOffsetX: landmarks[33].x,
			questionTextOffsetY:
				landmarks[33].y -
				4 * (landmarks[8].y - landmarks[33].y) -
				(questionBgImg.height * scale) / 2 +
				(questionBgImg.height * scale) / 2,
			option1TextOffsetX:
				landmarks[33].x -
				(questionBgImg.width * scale) / 2 -
				(questionBgImg.width * scale) / 4 -
				(optionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 2 +
				(optionBgImg.width * scale) / 2,
			option1TextOffsetY:
				landmarks[33].y -
				4 * (landmarks[8].y - landmarks[33].y) -
				(questionBgImg.height * scale) / 2 +
				questionBgImg.height * scale +
				(optionBgImg.height * scale) / 2 +
				(optionBgImg.height * scale) / 2,
			option2TextOffsetX:
				landmarks[33].x -
				(questionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 4 -
				(optionBgImg.width * scale) / 2 +
				(questionBgImg.width * scale) / 2 +
				(optionBgImg.width * scale) / 2,
			option2TextOffsetY:
				landmarks[33].y -
				4 * (landmarks[8].y - landmarks[33].y) -
				(questionBgImg.height * scale) / 2 +
				questionBgImg.height * scale +
				(optionBgImg.height * scale) / 2 +
				(optionBgImg.height * scale) / 2,
		};
	}

	//Returns single left shoulder position offsets.
	getLeftShoulderPosition(shoulderAsset, landmarks, scale) {
		//TODO:would it be usefull to have the option to return plain over head positions without any asset height/width calculation included?
		return {
			offsetX: landmarks[0].x - (landmarks[16].x - landmarks[0].x) / 2 - (shoulderAsset.width * scale) / 2,
			offsetY: landmarks[8].y - (shoulderAsset.height * scale) / 2,
		};
	}

	//Returns single right shoulder position offsets.
	getRightShoulderPosition(shoulderAsset, landmarks, scale) {
		//TODO:would it be usefull to have the option to return plain over head positions without any asset height/width calculation included?
		return {
			offsetX: landmarks[16].x + (landmarks[16].x - landmarks[0].x) / 2 - (shoulderAsset.width * scale) / 2,
			offsetY: landmarks[8].y - (shoulderAsset.height * scale) / 2,
		};
	}

	//Returns the nose bridge position for an eyeglass. Possibly needs additional scaling and vertical positioning.
	getEyeglassPosition(eyeglass, landmarks, scale) {
		return {
			offsetX: landmarks[27].x - (eyeglass.width / 2) * scale,
			offsetY: landmarks[27].y - (eyeglass.height / 2) * scale,
		};
	}

	getFaceCenterPosition() {
		let offsetX, offsetY;
		return {
			x: offsetX,
			y: offsetY,
		};
	}

	//TODO.
	getEarPositions(landmarks) {
		//tahmini olarak alinabilir.
		return {
			leftEarPositions: {
				top: landmarks[0],
				center: landmarks[1],
				bottom: landmarks[2],
			},
			rightEarPositions: {
				top: landmarks[16],
				center: landmarks[15],
				bottom: landmarks[14],
			},
		};
	}

	getNeckPosition(neckAsset, landmarks, scale) {
		//TODO:would it be usefull to have the option to return plain over head positions without any asset height/width calculation included?
		return {
			offsetX: landmarks[8].x - (neckAsset.width * scale) / 2,
			offsetY: landmarks[8].y + (landmarks[8].y - landmarks[33].y) - (neckAsset.height * scale) / 2,
		};
	}

	//Returns only eye positions for now.
	getEyePosition(landmarks) {
		return {
			leftEye: [landmarks[42], landmarks[43], landmarks[44], landmarks[45], landmarks[46], landmarks[47]],
			rightEye: [landmarks[36], landmarks[37], landmarks[38], landmarks[39], landmarks[40], landmarks[41]],
		};
	}

	//Returns only nose positions for now.
	getNosePosition(landmarks) {
		return [
			landmarks[27],
			landmarks[28],
			landmarks[29],
			landmarks[30],
			landmarks[31],
			landmarks[32],
			landmarks[33],
			landmarks[34],
			landmarks[35],
		];
	}

	//Returns only lip positions for now.
	getLipPositions(landmarks) {
		return [
			landmarks[27],
			landmarks[28],
			landmarks[29],
			landmarks[30],
			landmarks[31],
			landmarks[32],
			landmarks[33],
			landmarks[34],
			landmarks[35],
		];
	}

	//Returns the info of the mouth being open or not.
	isMouthOpen(landmarks) {
		let distance = 30;
		if (landmarks[66].y - landmarks[62].y > distance) {
			return true;
		}
		return false;
	}

	//Returns head angle
	getHeadAngle(landmarks) {
		let dx = landmarks[27].x - landmarks[8].x;
		let dy = landmarks[27].y - landmarks[8].y;
		let theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
		theta *= 180 / Math.PI; // [0, 180] then [-180, 0]; clockwise; 0° = east
		if (theta < 0) theta += 360; // [0, 360]; clockwise; 0° = east
		return theta;
	}

	checkForHeadTilt(headAngle) {
		let rightTiltTreshold = 70,
			leftTiltTreshold = 110;
		if (headAngle < rightTiltTreshold) {
			return this.utility.optionEnum.RIGHT;
		}
		//left option is selected
		else if (headAngle > leftTiltTreshold) {
			return this.utility.optionEnum.LEFT;
		}
		return null;
	}

	getQuizPositions(landmarks, questionDOM) {
		let globalOffsetX = (this.canvas.width - window.screen.width) / 2,
			globalOffsetY = (this.canvas.height - window.screen.height) / 2;
		return {
			questionBgOffsetX: landmarks[33].x - globalOffsetX - questionDOM.getBoundingClientRect().width / 2,
			questionBgOffsetY:
				landmarks[33].y -
				globalOffsetY -
				4 * (landmarks[8].y - landmarks[33].y) -
				questionDOM.getBoundingClientRect().height / 2,
		};
	}

	getLerpLandmarks(previousLandmarks, currentLandmarks, lerpScale) {
		let tempLandmarks = [];
		for (let i = 0; i < previousLandmarks.length; i++) {
			tempLandmarks.push({
				x: this.lerp(parseInt(previousLandmarks[i].x), parseInt(currentLandmarks[i].x), lerpScale),
				y: this.lerp(parseInt(previousLandmarks[i].y), parseInt(currentLandmarks[i].y), lerpScale),
			});
		}
		return tempLandmarks;
	}

	lerp(startValue, endValue, interpolationValue) {
		return startValue + interpolationValue * (endValue - startValue);
	}

	optimizeCoordinate(startValue, endValue) {
		let tresholdPx = 3;
		if (Math.abs(startValue - endValue) > tresholdPx) {
			return true;
		}
		return false;
	}

	optimizeLandmarks(previousLandmarks, currentLandmarks) {
		for (let i = 0; i < previousLandmarks.length; i++) {
			if (this.optimizeCoordinate(previousLandmarks[i].x, currentLandmarks[i].x)) {
				previousLandmarks[i].x = currentLandmarks[i].x;
			}
			if (this.optimizeCoordinate(previousLandmarks[i].y, currentLandmarks[i].y)) {
				previousLandmarks[i].y = currentLandmarks[i].y;
			}
		}
	}
}
module.exports = FaceDetectionHelper;
