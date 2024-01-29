import shuffle from "just-shuffle";

export interface Flashcard {
	front: string;
	back: string;
}

export class FlashcardTutor {
	deck: Array<Flashcard> = [];
	currentCard: Flashcard | null = null;
	passedPile: Array<Flashcard> = [];
	failedPile: Array<Flashcard> = [];

	constructor(input: Array<Flashcard> | string) {
		if (Array.isArray(input)) {
			this.deck = shuffle(input);
			this.drawCard();
		}
		else if (typeof input === "string") {
			let recoveredState = JSON.parse(input);

			this.deck = recoveredState.deck;
			this.currentCard = recoveredState.currentCard;
			this.passedPile = recoveredState.passedPile;
			this.failedPile = recoveredState.failedPile;
		}
	}

	get state() {
		return JSON.stringify({
			deck: this.deck,
			currentCard: this.currentCard,
			passedPile: this.passedPile,
			failedPile: this.failedPile,
		});
	}

	init(flashcards: Array<Flashcard>) {
		this.clear();
		this.deck = shuffle(flashcards);
	}
	clear() {
		this.deck = [];
		this.currentCard = null
		this.passedPile = [];
		this.failedPile = [];
	}
	drawCard() {
		if (!this.currentCard) {
			let drawnCard = this.deck.pop();
			if (drawnCard !== undefined) {
				this.currentCard = drawnCard;
			}
		}
	}
	passCurrentCard() {
		if (this.currentCard === null) return;
		this.passedPile.push(this.currentCard);
		this.currentCard = null;
		this.drawCard();
	}
	failCurrentCard() {
		if (this.currentCard === null) return;
		this.failedPile.push(this.currentCard);
		this.currentCard = null;
		this.drawCard();
	}
	cycleFailedCards() {
		this.deck = this.deck.concat(this.failedPile);
		this.failedPile = [];
		this.drawCard();
	}
}