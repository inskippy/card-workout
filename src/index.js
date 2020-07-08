import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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

        spades.push({value: val, reps: numVal, suit: "Spade"});
        clubs.push({value: val, reps: numVal, suit: "Club"});
        hearts.push({value: val, reps: numVal, suit: "Heart"});
        diamonds.push({value: val, reps: numVal, suit: "Diamond"});
    }
    
    const deck = spades.concat(clubs, hearts, diamonds);
    return deck;
}

function NewCardButton(props) {
    return (
      <button onClick={props.onClick}>
        Draw New Card
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

class Workout extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            deck: makeDeck(),
            currentCard: {value: null, suit: null},
            cardCount: 0,
            maxCards: 20,
            suitCount: {s: 0, c: 0, h: 0, d: 0},
        }
    }

    handleClick() {
        const idx = Math.floor(Math.random()*this.state.deck.length);
        const c = this.state.deck[idx];
        const newDeck1 = this.state.deck.slice(0, idx);
        const newDeck2 = this.state.deck.slice(idx+1, this.state.deck.length)
        
        let newS = this.state.suitCount.s;
        let newC = this.state.suitCount.c;
        let newH = this.state.suitCount.h;
        let newD = this.state.suitCount.d;
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
            deck: newDeck1.concat(newDeck2),
            currentCard: c,
            cardCount: this.state.cardCount+1,
            suitCount: {s: newS, c: newC, h: newH, d: newD},
        });
    }

    render() {
        const status = "Card " + this.state.cardCount + " of " + this.state.maxCards;
        let button;
        if (this.state.cardCount === this.state.maxCards) {
            button = <CompleteWorkout />;
            
        } else {
            button = <NewCardButton onClick={this.handleClick} />;
        }

        let exercise;
        if (this.state.cardCount !== 0) {
            exercise = <ListExercise currentCard={this.state.currentCard} suitCount={this.state.suitCount} />;
        } else {
            exercise = null;
        }
        // const exercise = GetExercise({card: this.state.currentCard, suitCount: this.state.suitCount});
        return (
            <div class="workout">
                <p>Current Card: {this.state.currentCard.value} {this.state.currentCard.suit}</p>
                <p>{status}</p>
                {exercise}
                {button}
                {/* <button onClick={() => this.handleClick()}>Draw New Card</button> */}
            </div>
        );
    }
}

ReactDOM.render(
  <Workout />,
  document.getElementById('root')
);

// function Square(props) {
//     return (
//         <button className="square" onClick={props.onClick}>
//             {props.value}
//         </button>
//     );
// }

// class Board extends React.Component {  
//     renderSquare(i) {
//         return (
//             <Square 
//                 value={this.props.squares[i]}
//                 onClick={() => this.props.onClick(i)}
//             />
//         );
//     }

//   render() {
//     return (
//       <div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {    
//     constructor(props) {
//         super(props);
//         this.state = {
//             history: [{
//                 squares: Array(9).fill(null),
//             }],
//             stepNumber: 0,
//             xIsNext: true,
//         };
//     }

//     handleClick(i) {
//         const history = this.state.history.slice(0,
//     this.state.stepNumber + 1);
//         const current = history[history.length - 1];
//         const squares = current.squares.slice();
//         if (calculateWinner(squares) || squares[i]) {
//             return;
//         }
//         squares[i] = this.state.xIsNext ? 'X' : 'O';
//         this.setState({
//             history: history.concat([{
//                 squares: squares,
//             }]),
//             stepNumber: history.length,
//             xIsNext: !this.state.xIsNext,
//         });
//     }

//     jumpTo(step) {
//         this.setState({
//             stepNumber: step,
//             xIsNext: (step % 2)  === 0,
//         });
//     }
  
//     render() {
//         const history = this.state.history;
//         const current = history[this.state.stepNumber];
//         const winner = calculateWinner(current.squares);

//         const moves = history.map((step, move) => {
//             const desc = move ?
//                 'Go to move #' + move :
//                 'Go to game start';
//             return (
//                 <li key={move}>
//                     <button onClick={() => this.jumpTo(move)}>{desc}</button>
//                 </li>
//             );
//         });

//         let status;
//         if (winner) {
//             status = 'Winner: ' + winner;
//         } else {
//             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
//         }
        
//         return (
//             <div className="game">
//                 <div className="game-board">
//                 <Board 
//                     squares={current.squares}
//                     onClick={(i) => this.handleClick(i)}
//                 />
//                 </div>
//                 <div className="game-info">
//                 <div>{status}</div>
//                 <ol>{moves}</ol>
//                 </div>
//             </div>
//         );
//     }
// }

// // ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('root')
// );

// function calculateWinner(squares) {
//     const lines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let i = 0; i < lines.length; i++) {
//       const [a, b, c] = lines[i];
//       if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//         return squares[a];
//       }
//     }
//     return null;
//   }