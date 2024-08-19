class Card {
	constructor(suit, name, value) {
		this.suit = suit;
		this.name = name;
		this.value = value;
	}
}

class Deck {
	constructor() {
		this.cards = [];
		this.initializeDeck();
		this.shuffleDeck();
	}

	initializeDeck() {
		const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
		const names = [
			'2',
			'3',
			'4',
			'5',
			'6',
			'7',
			'8',
			'9',
			'10',
			'Jack',
			'Queen',
			'King',
			'Ace',
		];
		for (let suit of suits) {
			for (let i = 0; i < names.length; i++) {
				this.cards.push(new Card(suit, names[i], i + 2));
			}
		}
	}

	shuffleDeck() {
		for (let i = this.cards.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
		}
	}
}

class Player {
	constructor(name) {
		this.name = name;
		this.hand = [];
	}

	getTotalValue() {
		return this.hand.reduce((total, card) => total + card.value, 0);
	}

	sortHand() {
		this.hand.sort((a, b) => b.value - a.value);
	}

	throwCards(throwPile) {
		this.sortHand();
		throwPile.push(this.hand.pop());
		throwPile.push(this.hand.pop());
	}

	addCards(newCards) {
		this.hand = this.hand.concat(newCards);
	}
}

class Game {
	constructor() {
		this.throwPile = [];
		this.deck = new Deck();
		this.players = [];
	}

	start(playerOneName, playerTwoName) {
		this.initializePlayers(playerOneName, playerTwoName);
		this.dealInitialCards();
		this.showHands('Initial');

		this.throwCards();
		this.dealNewCards();
		this.showHands('Round 2');

		this.collectAllCards();
		this.showShuffledDeck();
	}

	initializePlayers(playerOneName, playerTwoName) {
		this.players.push(new Player(playerOneName));
		this.players.push(new Player(playerTwoName));
	}

	dealInitialCards() {
		this.deck.shuffleDeck();
		this.players[0].hand = this.deck.cards.slice(0, 5);
		this.players[1].hand = this.deck.cards.slice(5, 10);
		this.deck.cards = this.deck.cards.slice(10);
	}

	dealNewCards() {
		const newCards = this.deck.cards.splice(0, 4);
		this.players[0].addCards(newCards.slice(0, 2));
		this.players[1].addCards(newCards.slice(2, 4));
		this.players.forEach((player) => player.sortHand());
	}

	throwCards() {
		this.players.forEach((player) => player.throwCards(this.throwPile));
	}

	collectAllCards() {
		this.throwPile.push(...this.players[0].hand);
		this.throwPile.push(...this.players[1].hand);
		this.players[0].hand = [];
		this.players[1].hand = [];
	}

	showHands(round) {
		console.log(`${round} Hands:`);
		this.players.forEach((player) => {
			console.log(`${player.name}'s Hand:`);
			console.log(player.hand.map((card) => `${card.name} of ${card.suit}`));
			console.log(`Total Value: ${player.getTotalValue()}\n`);
		});
	}

	showShuffledDeck() {
		const fullDeck = [...this.throwPile, ...this.deck.cards];
		const shuffledDeck = this.shuffleDeck(fullDeck);
		console.log('Shuffled Full Deck:');
		console.log(shuffledDeck.map((card) => `${card.name} of ${card.suit}`));
	}

	shuffleDeck(deck) {
		for (let i = deck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[deck[i], deck[j]] = [deck[j], deck[i]];
		}
		return deck;
	}
}

let newGame = new Game();
newGame.start('Slim', 'Luke');
