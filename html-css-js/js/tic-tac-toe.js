var board = []
var turn = 'O';
var game = document.getElementsByClassName('game')[0];
var eTurn = document.getElementsByClassName('current-turn')[0];
var eResult = document.getElementsByClassName('result')[0];

function createBoard() {
    let count = 0;
    game.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        let temp = `<div class="row">`;
        board[i] = [];
        for (let j = 0; j < 3; j++) {
            board[i][j] = null;
            temp += `<div class="box">
                        <button id="${count}" class="tic-tac-toe" onclick=handleClick(this)></button>
                    </div>`;
            count++;
        }
        temp += `</div>`;
        game.innerHTML += temp;
    }
}

function setTurn() {
    eTurn.textContent = turn;
}

function handleClick(self) {   
    self.textContent = turn;
    self.disabled = true;
    const index = Number(self.id);
    board[Math.floor(index / 3)][index % 3] = turn;
    if (checkWin()) {
        const btn = document.getElementsByClassName('tic-tac-toe');
        for (let i = 0; i < btn.length; i++) {
            btn[i].disabled = true;
        }
        eResult.textContent = checkWin().turn ? `${checkWin().turn} thắng` : 'Hòa';
        eResult.className = checkWin().turn ? 'text-win' : 'text-draw';
        return;
    }
    turn === 'O' ? turn = 'X' : turn = 'O';
    setTurn();
}

function checkWin() {
    let result = true;
    for (let i = 0; i < 3; i++) {     //duong cheo 1
        result = result && (board[i][i] == turn);
    }
    if (result) {
        return gameResult = {
            result: result,
            turn: turn
        };
    }

    result = true;
    for (let i = 0; i < 3; i++) {  //duong cheo 2
        result = result && (board[2 - i][i] == turn);
    }
    if (result) {
        return gameResult = {
            result: result,
            turn: turn
        };
    }

    for (let i = 0; i < 3; i++) {
        result = true;
        for (var j = 0; j < 3; j++) {      //dong 
            result = result && (board[i][j] == turn);
        }
        if (result) {
            return gameResult = {
                result: result,
                turn: turn
            };
        }

        result = true;
        for (let j = 0; j < 3; j++) {      //cot
            result = result && (board[j][i] == turn);
        }
        if (result) {
            return gameResult = {
                result: result,
                turn: turn
            };
        }
    }

    let checkDraw = true;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!board[i][j]) checkDraw = false;
        }
    }
    return checkDraw;
}

function refresh() {
    turn = 'O';
    eResult.textContent = '';
    createBoard();
    setTurn();
}

createBoard();
setTurn();