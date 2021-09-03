class Utility {
	// optionEnum eklenecek
	constructor() {
		this.optionEnum = Object.freeze({
			RIGHT: "right",
			LEFT: "left",
		});
		this.animationEnum = Object.freeze({
			CORRECT_ANSWER: "correctAnswer",
			WRONG_ANSWER: "wrongAnswer",
			SELECT_ANSWER: "selectedAnswer",
			FADE_IN: "fadeIn",
			FADE_OUT: "fadeOut",
		});
		this.gtag = null;
	}

	eventInitializer(eventName, element, eventHandler) {
		element.addEventListener(eventName, eventHandler);
	}

	eventDispatcher(eventName, element, data) {
		const customEvent = new CustomEvent(eventName, data);
		element.dispatchEvent(customEvent);
	}

	getCampaignIdFromUrl = (url) => {
		return url.substring(url.lastIndexOf("/") + 1);
	};

	fireGtagEvent(eventName, eventCategory) {
		gtag("event", eventCategory, {
			event_category: eventName,
			event_label: "AR_Quiz_Test",
		});
	}

	initGoogleAnalytics(gtag) {
		const gtagScript = document.createElement("script");
		gtagScript.async = true;
		gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + gtag;
		document.head.append(gtagScript);
		const gtagEmitScript = document.createElement("script");
		gtagEmitScript.type = "text/javascript";
		gtagEmitScript.innerText =
			"window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); }gtag('js', new Date());gtag('config','" +
			gtag +
			"');";
		document.head.append(gtagEmitScript);
	}

	getOrientation() {
		// if (window.orientation === 90 || window.orientation === -90) {
		if (window.matchMedia("(orientation: landscape)").matches) {
			return "landscape";
		}
		return "portrait";
	}

	reloadPage() {
		window.location.reload();
	}

	hide(component) {
		// component.style.display = "none";
		// component.setAttribute("style", "display:none");
		component.style.visibility = "hidden";
	}
	show(component) {
		// component.style.display = "";
		// component.setAttribute("style", "display:block");
		component.style.visibility = "visible";
	}
}

module.exports = Utility;
