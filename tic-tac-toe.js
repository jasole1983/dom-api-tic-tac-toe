const xImg = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
const oImg = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"

//atts should be a key-value pair in an array eg.[[key,pair] , [key2,pair2]]
function makeNewEl(tag, parent, ...atts) {
    let newEl = document.createElement(tag);
    atts.forEach(pair => {
        let key = pair[0];
        let val = pair[1];
        newEl.setAttribute(key, val);
    });
    parent.appendChild(newEl);
    return newEl;
}

let currPlayer = "x";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameStatus;

window.addEventListener("DOMContentLoaded", () => {
    const gBoard = document.getElementById("tic-tac-toe-board");
    const hDiv = document.getElementById('game-status');
    const newGame = document.querySelector("div.actions button:first-child");
    const giveUp = document.querySelector("div.actions button:last-child");

    newGame.disabled = true;

    function saveGameState () {
        let state = {
            'currPlayer': currPlayer,
            'gameBoard': gameBoard,  
        }
        let status = JSON.stringify(state);
        localStorage.setItem('status', status)
    }

    function setupGame(){
        for (let i = 0; i < gameBoard.length; i++){
            let sq = gameBoard[i];
            let parent = document.getElementById(`square-${i}`)
            if ( sq === 'x'){
                makeNewEl('img', parent, ['src', xImg])
            } else if ( sq === 'o'){
                makeNewEl('img', parent, ['src', oImg])

            }
        }
    }

    function restoreGameState () {
        
        if (localStorage.getItem('status') != null){
            let saved = localStorage.getItem('status')
            let parsed = JSON.parse(saved)
            currPlayer = parsed.currPlayer;
            gameBoard = parsed.gameBoard;
            newGame.disabled = true;
            giveUp.disabled = false;
            setupGame();
        }
    }
    restoreGameState ()
    function takeTurn(target) {
        if (currPlayer === "x") {
            makeNewEl("img", target, ["src", xImg]);
            let index = target.id[target.id.length - 1];
            gameBoard[index] = "x";
            // currPlayer = "o";
        } else if (currPlayer === "o") {
            makeNewEl("img", target, ["src", oImg]);
            let index = target.id[target.id.length - 1];
            gameBoard[index] = "o";
            // currPlayer = "x";
        }

        return checkStatus();
    }
    const checkForTie = () => {
        for (let el of gameBoard) {
            if (el === '') {
                return false;
            }
        }
        // if it's a tie set the current player to "none" as the game is over
        currPlayer = 'none';
        return true;
    }

    function checkStatus() {
        let gb = gameBoard;
        if (gb[0] === gb[1] && gb[1] === gb[2] && gb[2] != "") {
            endGame()
        } else if (gb[3] === gb[4] && gb[4] === gb[5] && gb[5] != "") {
            endGame()

        } else if (gb[6] === gb[7] && gb[7] === gb[8] && gb[8] != "") {
            endGame()

        } else if (gb[0] === gb[3] && gb[3] === gb[6] && gb[6] != "") {
            endGame()

        } else if (gb[1] === gb[4] && gb[4] === gb[7] && gb[7] != "") {
            endGame()

        } else if (gb[2] === gb[5] && gb[5] === gb[8] && gb[8] != "") {
            endGame()

        } else if (gb[0] === gb[4] && gb[4] === gb[8] && gb[8] != "") {
            endGame()

        } else if (gb[2] === gb[4] && gb[4] === gb[6] && gb[6] != "") {
            endGame()

        } else if (checkForTie()) {
            endGame()

        } else {
            if (currPlayer === 'x') {
                currPlayer = 'o';
            } else if (currPlayer === 'o') {
                currPlayer = 'x';
            }
        }
        saveGameState();
    }

    function makeNewGame() {
        newGame.disabled = true;
        giveUp.disabled = false;
        localStorage.removeItem('status')

        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currPlayer = "x";
        gBoard.innerHTML = `<div id="square-0" class="square row-1 col-1"></div>
                            <div id="square-1" class="square row-1 col-2"></div>
                            <div id="square-2" class="square row-1 col-3"></div>
                            <div id="square-3" class="square row-2 col-1"></div>
                            <div id="square-4" class="square row-2 col-2"></div>
                            <div id="square-5" class="square row-2 col-3"></div>
                            <div id="square-6" class="square row-3 col-1"></div>
                            <div id="square-7" class="square row-3 col-2"></div>
                            <div id="square-8" class="square row-3 col-3"></div>`;
        hDiv.innerHTML = "";
    }
    function endGame() {
        gameBoard.forEach((el, i) => (el === '') ? gameBoard[i] = 'T' : el = el)
        hDiv.innerHTML = `WINNER:${currPlayer.toUpperCase()}`;

        newGame.disabled = false;
        giveUp.disabled = true;
        

    }

    giveUp.addEventListener('click', e => {
        if (currPlayer === 'x'){
            currPlayer = 'o'
        } else if ( currPlayer === 'o'){
            currPlayer = 'x'
        }
        endGame();
    })
    
    gBoard.addEventListener("click", e => {
        let index = e.target.id[e.target.id.length - 1]
        if (!gameBoard[index]) {
            takeTurn(e.target)
        }
    })
    newGame.addEventListener("click", e => {
        makeNewGame();
    })
})