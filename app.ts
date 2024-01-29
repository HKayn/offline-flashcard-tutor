import { createApp } from "petite-vue";
import Papa from "papaparse";
import { Flashcard, FlashcardTutor } from "./js/FlashcardTutor";
import { marked } from "marked";

let app = {
	// tutor input
	tutor: null,
	lastInputSource: null,
	lastInputFile: null,
	lastInputDate: null,

	get savedState () {
		return localStorage.getItem("state");
	},

	get savedAt() {
		return localStorage.getItem("savedAt");
	},

	async inputFile(event) {
		let target = event.target as HTMLInputElement;
		if (!target?.files?.length) return;
		this.lastInputFile = target.files[0];
		this.lastInputSource = "file";
		this.lastInputDate = new Date();
		Papa.parse(this.lastInputFile, {
			header: true,
			complete: (results) => {
				this.initTutor(results.data as Array<Flashcard>)
			},
		});
	},

	recoverSavedState() {
		this.lastInputSource = "localStorage";
		this.lastInputDate = new Date(this.savedAt);
		this.initTutor(this.savedState)
	},

	initTutor(input: Array<Flashcard> | string) {
		this.tutor = new FlashcardTutor(input);
		this.saveState();
		// for debugging purposes
		Object.defineProperty(window, 'l', {
			get: () => {return this;}
		});
	},

	// tutor session

	cardIsFlipped: false,

	get deckIsEmpty() {
		return this.tutor && !this.tutor.deck.length;
	},
	get sessionIsFinished() {
		return (
			this.tutor
			&& !this.tutor.currentCard
			&& !this.tutor.deck.length
			&& !this.tutor.failedPile.length
		);
	},

	get renderedCardFront() {
		return (
			(this?.tutor?.currentCard?.front ?? "")
			&& marked.parse(this.tutor.currentCard.front.replaceAll("\\n", "\n"))
		);
	},

	get renderedCardBack() {
		return (
			(this?.tutor?.currentCard?.back ?? "")
			&& marked.parse(this.tutor.currentCard.back.replaceAll("\\n", "\n"))
		);
	},

	flipCard() {
		this.cardIsFlipped = true;
	},
	passCard() {
		this.cardIsFlipped = false;
		this.tutor.passCurrentCard();
		if (this.sessionIsFinished) {
			this.finishSession();
		}
		else {
			this.saveState();
		}
	},
	failCard() {
		this.cardIsFlipped = false;
		this.tutor.failCurrentCard();
		if (this.sessionIsFinished) {
			this.finishSession();
		}
		else {
			this.saveState();
		}
	},
	cycleFailedCards() {
		this.tutor.cycleFailedCards();
	},
	finishSession() {

	},
	saveState() {
		localStorage.setItem("state", this.tutor.state);
		localStorage.setItem("savedAt", new Date().toISOString());
	},
	clearState() {
		localStorage.removeItem("state");
		localStorage.removeItem("savedAt");
	}
};

createApp(app).mount();