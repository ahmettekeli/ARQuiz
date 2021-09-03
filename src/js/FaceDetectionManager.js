//
class FaceDetectionManager {
	constructor(canvas, faceapi) {
		this.canvas = canvas;
		this.faceapi = faceapi;
	}

	startVideo(callback) {
		// var self = this;
		const constraints = {
			audio: false,
			video: {},
		};
		if (typeof navigator.mediaDevices === "undefined") {
			navigator.mediaDevices = {};
		}
		if (typeof navigator.mediaDevices.getUserMedia === "undefined") {
			navigator.mediaDevices.getUserMedia = function (constraints) {
				// First get ahold of the legacy getUserMedia, if present
				var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
				// Some browsers just don't implement it - return a rejected promise with an error
				// to keep a consistent interface
				if (!getUserMedia) {
					return Promise.reject(new Error("getUserMedia is not implemented in this browser"));
				}
				// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
				return new Promise(function (resolve, reject) {
					getUserMedia.call(navigator, constraints, resolve, reject);
				});
			};
		}

		navigator.mediaDevices
			.getUserMedia(constraints)
			.then(initSuccess)
			.catch(function (err) {
				console.log("media device error", err);
			});

		//Starting media stream (camera)
		function initSuccess(requestedStream) {
			// Older browsers may not have srcObject
			if ("srcObject" in video) {
				video.srcObject = requestedStream;
			} else {
				// Avoid using this in new browsers, as it is going away.
				video.src = window.URL.createObjectURL(stream);
			}
			video.onloadedmetadata = () => {
				video.play(); // play video for capturing
				callback();
			};
		}
	}

	loadModels(callback) {
		Promise.all([
			this.faceapi.nets.tinyFaceDetector.loadFromUri("./FaceAPI_Models/"),
			this.faceapi.nets.faceLandmark68Net.loadFromUri("./FaceAPI_Models/"),
			this.faceapi.nets.faceRecognitionNet.loadFromUri("./FaceAPI_Models/"),
			this.faceapi.nets.faceExpressionNet.loadFromUri("./FaceAPI_Models/"),
			this.faceapi.nets.ageGenderNet.loadFromUri("./FaceAPI_Models/"),
		]).then(() => {
			this.startVideo(callback);
		});
	}

	//TODO option to cancel animation from index.js
	async detectFaceFromVideoContinuous(video, callback, isDevMode = false) {
		let detections, landmarks, scale;
		const ctx = this.canvas.getContext("2d");
		const displaySize = {
			width: video.offsetWidth,
			height: video.offsetHeight,
		};
		this.faceapi.matchDimensions(this.canvas, displaySize);

		async function startDetecting(faceapi) {
			//Starting detecting here functionize this to implement image spin later.
			detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
			if (detections[0] !== undefined) {
				//when single face is expected to be detected.
				const resizedDetections = faceapi.resizeResults(detections, displaySize);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				landmarks = resizedDetections[0].landmarks.positions;
				if (isDevMode) {
					if (landmarks.length > 0) {
						// getting landmarks with their indexes.
						ctx.fillStyle = "#ff0000";
						landmarks.forEach((element) => {
							ctx.fillText(landmarks.indexOf(element), element.x, element.y);
						});
					}
				}
				scale = (2 * (landmarks[16].x - landmarks[0].x)) / canvas.width;
				callback(ctx, landmarks, scale);
			}
			// dusunelim.
			else {
				cancelAnimationFrame(startDetecting.bind(this, faceapi));
			}
			requestAnimationFrame(startDetecting.bind(this, faceapi));
		}
		startDetecting(this.faceapi);
	}
}
module.exports = FaceDetectionManager;
