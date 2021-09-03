require("regenerator-runtime");
const FaceDetectionManager = require("./FaceDetectionManager");
const FaceDetectionHelper = require("./FaceDetectionHelper");
const GameManager = require("./GameManager");
const Utility = require("./Utility");

const video = document.getElementById("video"),
	canvas = document.getElementById("canvas"),
	playBtn = document.getElementById("playBtn"),
	ctx = canvas.getContext("2d"),
	faceDetectionManager = new FaceDetectionManager(canvas, faceapi),
	faceDetectionHelper = new FaceDetectionHelper(canvas),
	gameManager = new GameManager(),
	utility = new Utility();
let isGameReady = false;

//preventing zoom here.
document.body.addEventListener("wheel", (e) => {
	if (e.ctrlKey) {
		event.preventDefault();
	}
});

playBtn.addEventListener("click", () => {
	playBtn.setAttribute("disabled", "disabled");
	$("#startModal").modal("hide");
	//Loading Face Detection models here.
	faceDetectionManager.loadModels(async () => {
		let quizPositions,
			optimizedLandmarks = null,
			headAngle,
			selectedOption;
		canvas.width = video.offsetWidth;
		canvas.height = video.offsetHeight;
		gameManager.quizManager.quizHelper.handleModelReady();

		faceDetectionManager.detectFaceFromVideoContinuous(video, (ctx, landmarks, scale) => {
			scale = scale * 2;
			if (optimizedLandmarks == null) {
				optimizedLandmarks = [];
				landmarks.forEach((element) => {
					optimizedLandmarks.push({
						x: element.x,
						y: element.y,
					});
				});
			}
			faceDetectionHelper.optimizeLandmarks(optimizedLandmarks, landmarks);
			quizPositions = faceDetectionHelper.getQuizPositions(optimizedLandmarks, questionHolder);

			questionHolder.style.transform = `translate(${parseInt(quizPositions.questionBgOffsetX)}px , ${parseInt(
				quizPositions.questionBgOffsetY
			)}px)`;

			// Dom elementi olan question blok unun anlik scale edilme kodu
			// testImg.style.transform = `translate(${quizOffsets.questionBgOffsetX}px , ${quizOffsets.questionBgOffsetY}px) scale(${scale})`;

			if (isGameReady) {
				headAngle = faceDetectionHelper.getHeadAngle(landmarks);
				selectedOption = faceDetectionHelper.checkForHeadTilt(headAngle);
				if (selectedOption != null) {
					const currentQuestion =
						gameManager.quizManager.quizHelper.quiz.questions[
							gameManager.quizManager.quizHelper.quiz.currentQuestionId - 1
						];
					if (currentQuestion.isReady) {
						if (!currentQuestion.isAnswered) {
							gameManager.quizManager.quizHelper.selectAnswerOption(currentQuestion, selectedOption);
							gameManager.quizManager.eventEmitter.emit("onAnswer", currentQuestion);
						}
					}
				}
			}
		});

		if (gameManager.quizManager.isReady) {
			gameManager.startGame();
			isGameReady = true;
		} else {
			console.warn("Quiz Data could not be retrieved.");
		}
	});
});

window.onload = () => {
	// utility.initGoogleAnalytics("UA-154899583-21");
	gameManager.initialize();
	$("#startModal").modal("show");
};

ctx.drawImage(video, 0, 0);

//TODO
//  1 - Yuz yok veya isik yetersiz uyarisi yapilmali.
