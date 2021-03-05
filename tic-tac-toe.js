const xImg = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg"
const oImg = "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg"

//atts should be a key-value pair in an array eg.[[key,pair] , [key2,pair2]]
function makeNewEl (tag, parent, ...atts) {
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
const gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameStatus;


function takeTurn(target) {
    if(currPlayer === "x") {
        makeNewEl("img", target, ["src", xImg]);
        let index = target.id[target.id.length-1];
        gameBoard[index] = "x";
        // currPlayer = "o";
    } else if (currPlayer === "o") {
        makeNewEl("img", target, ["src", oImg]);
        let index = target.id[target.id.length-1];
        gameBoard[index] = "o";
        // currPlayer = "x";
    }
    return checkStatus();
}

function checkStatus() {
    let gb = gameBoard;
    if (gb[0] === gb[1] && gb[1] === gb[2] && gb[2] != ""){
        // update gamestatus;
    }
}

window.addEventListener("DOMContentLoaded" , () => {
    
    const gBoard = document.getElementById("tic-tac-toe-board");
    
    gBoard.addEventListener("click", e => {
        let index = e.target.id[e.target.id.length - 1]
        if (!gameBoard[index]){
            takeTurn(e.target)
        }
    })
})