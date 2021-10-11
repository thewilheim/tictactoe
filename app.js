// Tic Tac Toe

const boardContainer = document.querySelector('.container');
const statusDisplay = document.querySelector('.gameStatus');
const resetGame = document.getElementById('reset');

// Winning Comb
let currentPlayer = "X";

// Result messages
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's Player ${currentPlayer}'s turn!`;

statusDisplay.innerHTML = currentPlayerTurn();


const gameBoard = (() => {


    let gameActive = true;

    let gameState = ['','','','','','','','',''];

    const winningCombo = [[0,1,2],
                          [3,4,5],
                          [6,7,8],

                          [0,3,6],
                          [1,4,7],
                          [2,5,8],

                          [0,4,8],
                          [2,4,6]];


    // Creates the play area with the approriately assigned class and data attribute.
    const createGrid = (() => {
        for (let i = 0; i < gameState.length; i++) {

            newDiv = document.createElement('div');

            newDiv.setAttribute('data-index', i);

            newDiv.classList.add('box');

            boardContainer.appendChild(newDiv)
            
        }
    })();

    // Adds the players selection to the playing field
    const boxMarked = (clickedBox, clickedBoxIndex) =>

    {
        gameState[clickedBoxIndex] = currentPlayer;

        clickedBox.innerHTML = currentPlayer;
    }


    // Changes between 'X' and 'O'
    const changePlayer = () => {

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        
        statusDisplay.innerHTML = currentPlayerTurn();
    }

    // Caculates the results of the match determining who won or if it was a draw
    const result = () => {
        let roundWon = false;

        // Loops through 8 times checking 
        for (let i = 0; i <= 7; i++) {

            const winCondition = winningCombo[i];

            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];

            if (a === '' || b === '' || c === '') {
                continue;
            }

            if (a === b && b === c) {
                roundWon = true;
                break
            }
        }

        if (roundWon) {
            statusDisplay.innerHTML = winningMessage();
            gameActive = false;
            return;
        }

        let roundDraw = !gameState.includes('');

        if (roundDraw) {
            statusDisplay.innerHTML = drawMessage();
            gameActive = false;
            return;
        }

        changePlayer();
    }


    // Gets the attibutes from which grid the player has chosen
    const boxClicked = (clickedBoxEvent) => {


        const clickedBox = clickedBoxEvent.target;

        const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-index'));

        if (gameState[clickedBoxIndex] !== '' || !gameActive) {
            return;
        }


        boxMarked(clickedBox,clickedBoxIndex);
        result();
    }


    // restarts the game
    const restartGame = () => {
        gameActive = true;
        currentPlayer = "X";
        gameState = ['','','','','','','','',''];
        statusDisplay.innerHTML = currentPlayerTurn();

        gameBox.forEach(box => box.innerHTML = "");
    }


    // Assign
    const gameBox = document.querySelectorAll('.box');
    gameBox.forEach(box => box.addEventListener('click', boxClicked));

    // Restart Game
    resetGame.addEventListener('click', restartGame);


})();