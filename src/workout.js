import React from 'react';
import './index.css';
import Images from './images';

function makeDeck() {
    let spades = [];
    let clubs = [];
    let hearts = [];
    let diamonds = [];

    for (var i = 1; i < 14; i++) {
        let val;
        let numVal;
        if (i === 1) {
            val = "A";
            numVal = i;
        } else if (i === 11) {
            val = "J";
            numVal = 10;
        } else if (i === 12) {
            val = "Q";
            numVal = 10;
        } else if (i === 13) {
            val = "K";
            numVal = 10;
        } else {
            val = i;
            numVal = i;
        }
        
        spades.push({value: val, reps: numVal, suit: "Spade", imgSrc: 'S'+val});
        clubs.push({value: val, reps: numVal, suit: "Club", imgSrc: 'C'+val});
        hearts.push({value: val, reps: numVal, suit: "Heart", imgSrc: 'H'+val});
        diamonds.push({value: val, reps: numVal, suit: "Diamond", imgSrc: 'D'+val});
    }
    
    const deck = spades.concat(clubs, hearts, diamonds);
    return deck;
}

function NewCardButton(props) {
    return (
      <button onClick={props.onClick}>
        Next Card
      </button>
    );
}

function PrevCardButton(props) {
    return (
      <button onClick={props.onClick}>
        Previous Card
      </button>
    );
}

function CompleteWorkout(props) {
    return (
        <p>Workout Complete!</p>
    )
}

function ListExercise(props) {
    const exercise = GetExercise({card: props.currentCard, suitCount: props.suitCount});
    return (
        <p>Exercise: {exercise} | Reps: {props.currentCard.reps + 10}</p>
    )
}

function GetExercise(props) {
    if (props.card.suit === "Spade") {
        // Push exercises
        switch (props.suitCount.s) {
            case 1:
                return "Pushups";
            case 2:
                return "Pike Pushups";
            case 3:
                return "Standing Dumbell Press";
            case 4:
                return "Lat Raises";
            default:
                return "Rest";
        }
    } else if (props.card.suit === "Club") {
        // Pull exercises
        switch (props.suitCount.c) {
            case 1:
                return "Pullups";
            case 2:
                return "Dumbell Row";
            case 3:
                return "Rear Delt Flyes";
            case 4:
                return "Upright Row";
            default:
                return "Rest";
        }
    } else if (props.card.suit === "Heart") {
        // Legs exercises
        switch (props.suitCount.h) {
            case 1:
                return "Walking Lunges";
            case 2:
                return "Bulgarian Split Squat";
            case 3:
                return "Single Leg Hip Thrust";
            case 4:
                return "Nordic Ham Curl";
            default:
                return "Rest";
        }
    } else if (props.card.suit === "Diamond") {
        // Isolation exercises
        switch (props.suitCount.d) {
            case 1:
                return "Bicep Curl";
            case 2:
                return "Tricep Skullcrushers";
            case 3:
                return "Bicycle Crunch";
            case 4:
                return "Standing Calf Raise";
            default:
                return "Rest";
        }
    }
}

class Card extends React.Component {
    render() {
        let imageTag;
        if (this.props.currentCard.value === null) {
            imageTag = <img id="cardIMG" src={Images["red_back"]} alt="red back of card" />;
        } else {
            imageTag = <img id="cardIMG" src={Images[this.props.currentCard.imgSrc]} alt={this.props.currentCard.imgSrc} />;
        }
        return (
            <div>
                <p>Current Card: {this.props.currentCard.value} {this.props.currentCard.suit}</p>
                {imageTag}
            </div>
        );
    }
}

export default class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.handleForwardClick = this.handleForwardClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);
        this.state = {
            viewNo: 0,
            history: [{
                deck: makeDeck(),
                currentCard: {value: null, suit: null},
                cardCount: 0,
                maxCards: 20,
                suitCount: {s: 0, c: 0, h: 0, d: 0},
            }],
        }
    }

    handleForwardClick() {
        if (this.state.viewNo === this.state.history.length-1) {
            // draw new card from deck
            const history = this.state.history;
            const current = history[history.length - 1];
            const idx = Math.floor(Math.random()*current.deck.length);
            const c = current.deck[idx];
            const newDeck1 = current.deck.slice(0, idx);
            const newDeck2 = current.deck.slice(idx+1, current.deck.length)
            
            let newS = current.suitCount.s;
            let newC = current.suitCount.c;
            let newH = current.suitCount.h;
            let newD = current.suitCount.d;
            switch (c.suit) {
                case "Spade":
                    if (newS !== 4) {
                        newS++;
                    } else {
                        newS = 1;
                    }
                    break;
                case "Club":
                    if (newC !== 4) {
                        newC++;
                    } else {
                        newC = 1;
                    }
                    break;
                case "Heart":
                    if (newH !== 4) {
                        newH++;
                    } else {
                        newH = 1;
                    }
                    break;
                case "Diamond":
                    if (newD !== 4) {
                        newD++;
                    } else {
                        newD = 1;
                    }
                    break;
                default:
                    break;
            }

            this.setState({
                viewNo: this.state.viewNo + 1,
                history: history.concat({
                    deck: newDeck1.concat(newDeck2),
                    currentCard: c,
                    cardCount: current.cardCount+1,
                    maxCards: current.maxCards,
                    suitCount: {s: newS, c: newC, h: newH, d: newD},
                })
            });
        } else {
            // navigate forwards through already drawn cards
            this.setState({
                viewNo: this.state.viewNo + 1,
            });
        }
    }

    handleBackClick() {
        this.setState({
            viewNo: this.state.viewNo - 1,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.viewNo];
        const status = "Card " + current.cardCount + " of " + current.maxCards;
        let fwdButton;
        let bckButton;
        if (current.cardCount === current.maxCards) {
            fwdButton = <CompleteWorkout />;
            bckButton = <PrevCardButton onClick={this.handleBackClick} />;
        } else if (current.cardCount === 0) {
            fwdButton = <NewCardButton onClick={this.handleForwardClick} />;
            bckButton = null;
        } else {
            fwdButton = <NewCardButton onClick={this.handleForwardClick} />;
            bckButton = <PrevCardButton onClick={this.handleBackClick} />;
        }

        let exercise;
        if (current.cardCount !== 0) {
            exercise = <ListExercise currentCard={current.currentCard} suitCount={current.suitCount} />;
        } else {
            exercise = null;
        }
        // const exercise = GetExercise({card: this.state.currentCard, suitCount: this.state.suitCount});

        let card = <Card currentCard={current.currentCard} />;

        return (
            <div class="workout">
                {card}
                <p>{status}</p>
                {exercise}
                {bckButton}
                {fwdButton}
            </div>
        );
    }
}