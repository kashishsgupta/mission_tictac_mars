// board setting
let BLANK = new Image()

let NOT_OCCUPIED = ' ';
let HEARTS = 'O';
let DABS = 'X';

let board = new Array()
let choice;
let active_turn = "";


let messages = ["Oops! None of you reached Mars, Try again!",
    "Congratulations! Astronaut Hearts wins the race to Mars!",
    "Congratulations! Astronaut Dabs wins the race to Mars!"];

let heartsImgPath = './images/astro5.jpg';
let dabsImgPath = './images/astro4.jpg';

let heartsImg = new Image()
let dabsImg = new Image()

let blank_src = './images/blank2.png'
let blank_on_hover_src = './images/blank.png'

heartsImg.src = heartsImgPath;
dabsImg.src = dabsImgPath;

let params = (new URL(document.location)).searchParams;
let name = params.get('name');
let size = params.get('size');
let BOARD_SIZE = size*size;
let maxWins = size + size + 2;


var moveSound = new Audio('./music/soundeffects.wav')
var loseSound = new Audio('./music/lose.wav')
var tieSound = new Audio('./music/drawresult.wav')
var winSound = new Audio('./music/win.wav')

function newboard() {
    for (let i = 0; i < BOARD_SIZE; i++) {
        board[i] = NOT_OCCUPIED;
        document.images[i].src = blank_src;

        tile = document.images[i];
        tile.onmouseover = function(){
            this.src = blank_on_hover_src;
            this.style.cursor="pointer";
        };
        tile.onmouseout = function(){
            this.src = blank_src;
            this.style.cursor="default";
        };
    }

    if (BOARD_SIZE == 9) {
        document.getElementById("size3").disabled = true;;
    }
    else if (BOARD_SIZE == 16) {
        document.getElementById("size4").disabled = true;;
    }
    else if (BOARD_SIZE == 25) {
        document.getElementById("size5").disabled = true;;
    }

    var turnInfo = document.getElementById("turnInfo");
    if (name === "dabs") {
        active_turn = "DABS";//TURN=1;
        turnInfo.innerHTML = "Astronaut Dabs as first player";
        //timer(start);
    } else if (name === "hearts") {
        active_turn = "HEARTS";//TURN=0;
        turnInfo.innerHTML = 'Astronaut Hearts as first player';
        //timer(start);
    }
}

function makeMove(pieceMove) {
    if (!isGameOver(board) && board[pieceMove] === NOT_OCCUPIED) {
        if(active_turn === "HEARTS"){
            board[pieceMove] = HEARTS;
            document.images[pieceMove].src = heartsImgPath;
            document.images[pieceMove].setAttribute("onmouseover", heartsImgPath)
            document.images[pieceMove].setAttribute("onmouseout", heartsImgPath)
            document.images[pieceMove].style.cursor="default";
            moveSound.play();
            if (!isGameOver(board)) {
                var alert = document.getElementById("turnInfo");
                active_turn = "DABS";//TURN=1;
                alert.innerHTML = "Astronaut Dabs turn";
            }
            
        }
        else if(active_turn === "DABS"){
            board[pieceMove] = DABS;
        document.images[pieceMove].src = dabsImgPath;
        document.images[pieceMove].setAttribute("onmouseover", dabsImgPath)
        document.images[pieceMove].setAttribute("onmouseout", dabsImgPath)
        document.images[pieceMove].style.cursor="default";
        moveSound.play();
        if (!isGameOver(board)) {
            var alert = document.getElementById("turnInfo");
            active_turn = "HEARTS";TURN=0;
            alert.innerHTML = "Astronaut Hearts turn";
        }
            
        }
    }
}
function makeHelp() {
   
    if(active_turn=="HEARTS")
    {
        
        minimax(board,0,-Infinity,+Infinity);
        var move=choice;
        board[move]=HEARTS;
        document.images[move].src=heartsImgPath;
        document.images[move].setAttribute("onmouseover",heartsImgPath);
        document.images[move].setAttribute("onmouseout",heartsImgPath);
        document.images[move].style.cursor="default";
        choice=[];
        active_turn="DABS";
        
        if (!isGameOver(board)) {
            var alert = document.getElementById("turnInfo");
            var a=Math.floor(Math.random() * Math.floor(3));
            if(a==1)
           { alert.innerHTML = "Into the Space!";}
           else if(a==2)
           {
               alert.innerHTML="Heading to the red planet, Mars!";
           }
           else if(a==3)
           {
            alert.innerHTML="Out of the Earths Atmosphere!";
           }
           else{
               alert.innerHTML="Think of the best strategy";
           }
            
        }

    }
    else if(active_turn="DABS")
    {
        
        minimax(board,0,-Infinity,+Infinity);
        var move=choice;
        board[move]=DABS;
        document.images[move].src=dabsImgPath;
        document.images[move].setAttribute("onmouseover",dabsImgPath);
        document.images[move].setAttribute("onmouseout",dabsImgPath);
        document.images[move].style.cursor="default";
        choice=[];
        active_turn="HEARTS";
        if (!isGameOver(board)) {
            var alert = document.getElementById("turnInfo");
            var a=Math.floor(Math.random() * Math.floor(3));
            if(a==1)
           { alert.innerHTML = "Into the Space!";}
           else if(a==2)
           {
               alert.innerHTML="Heading to the red planet, Mars!";
           }
           else if(a==3)
           {
            alert.innerHTML="Out of the Earths Atmosphere!";
           }
           else{
               alert.innerHTML="Think of the best strategy";
           }
            
        }

        }
    }
   

function gameScore(currentBoard, depth) {
    var score = checkWinningCondition(currentBoard);
    if (score === 1) {
        return 0;
    } else if (score === 2) {
        return  10-depth;
    } else if (score === 3) {
        return  depth-10;
    }else {
        return 0;
    }
}

function minimax(node, depth, alpha, beta) {
    var x=checkWinningCondition(node);
    if (x === 1 ||
        x === 2 ||
        x === 3 ||
        depth === 6){
        return gameScore(node, depth);
    }

    // the deeper the recursion, the higher the depths
    depth += 1;

    var availableMoves = getAvailableMoves(node);
    var move, result, possibleGameResult;
    if (active_turn === "HEARTS") {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
            if (result > alpha) {
                alpha = result
                if (depth === 1) {
                    choice = move
                }
            } else if (alpha >= beta) {
                return alpha;
            }
        }
        return alpha;
    } else if(active_turn="DABS") {
        for (var i = 0; i < availableMoves.length; i++) {
            move = availableMoves[i];
            possibleGameResult = getNewState(move, node);
            result = minimax(possibleGameResult, depth, alpha, beta);
            node = undoMove(node, move);
            if (result < beta) {
                beta = result
                if (depth === 1) {
                    choice = move
                }
            } else if (beta <= alpha) {
                return beta;
            }
        }
        return beta;
    }
}

function undoMove(currentBoard, move) {
    currentBoard[move] = NOT_OCCUPIED;
    changeTurn();
    return currentBoard;
}

function getNewState(move, currentBoard) {
    var piece = changeTurn();
    currentBoard[move] = piece;
    return currentBoard;
}

function changeTurn() {
    var piece;
    if (active_turn === "DABS") {
        piece = 'X';
        active_turn = "HEARTS";
    } else {
        piece = 'O';
        active_turn = 'DABS';
    }
    return piece;
}

function getAvailableMoves(currentBoard) {
    var possibleMoves = new Array();
    for (var i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] === NOT_OCCUPIED) {
            possibleMoves.push(i);
        }
    }
    return possibleMoves;
}

// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if INDIA wins//HEARTS
//   3 if RUSSIA wins//DABS
function checkWinningCondition(currentBoard) {
// checking for horizontal conditions
var INDIA=HEARTS;
var RUSSIA=DABS;
    if(BOARD_SIZE === 9){
        for(var i = 0; i <=6; i += 3){
        if (currentBoard[i] === INDIA && currentBoard[i + 1] === INDIA && currentBoard[i + 2] === INDIA)
            return 2;
        if (currentBoard[i] === RUSSIA && currentBoard[i + 1] === RUSSIA && currentBoard[i + 2] === RUSSIA)
            return 3;
        }

    // Check for vertical wins
    for (i = 0; i <= 2; i++) {
        if (currentBoard[i] === INDIA && currentBoard[i + 3] === INDIA && currentBoard[i + 6] === INDIA)
            return 2;
        if (currentBoard[i] === RUSSIA && currentBoard[i + 3] === RUSSIA && currentBoard[i + 6] === RUSSIA)
            return 3;
    }

    // Check for diagonal wins
    if ((currentBoard[0] === INDIA && currentBoard[4] === INDIA && currentBoard[8] === INDIA) ||
        (currentBoard[2] === INDIA && currentBoard[4] === INDIA && currentBoard[6] === INDIA))
        return 2;

    if ((currentBoard[0] === RUSSIA && currentBoard[4] === RUSSIA && currentBoard[8] === RUSSIA) ||
        (currentBoard[2] === RUSSIA && currentBoard[4] === RUSSIA && currentBoard[6] === RUSSIA))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] !== INDIA && currentBoard[i] !== RUSSIA)
            return 0;
    }
    return 1;}
    else if(BOARD_SIZE===16){
        for (i = 0; i <= 12; i += 4) {
        if (currentBoard[i] === INDIA && currentBoard[i + 1] === INDIA && currentBoard[i + 2] === INDIA && currentBoard[i + 3] === INDIA)
            return 2;
        if (currentBoard[i] === RUSSIA && currentBoard[i + 1] === RUSSIA && currentBoard[i + 2] === RUSSIA && currentBoard[i + 3] === RUSSIA)
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 3; i++) {
        if (currentBoard[i] === INDIA && currentBoard[i + 4] === INDIA && currentBoard[i + 8] === INDIA && currentBoard[i + 12] === INDIA)
            return 2;
        if (currentBoard[i] === RUSSIA && currentBoard[i + 4] === RUSSIA && currentBoard[i + 8] === RUSSIA && currentBoard[i + 12] === RUSSIA)
            return 3;
    }

    // Check for diagonal wins
    if ((currentBoard[0] === INDIA && currentBoard[5] === INDIA && currentBoard[10] === INDIA && currentBoard[15] === INDIA) ||
        (currentBoard[3] === INDIA && currentBoard[6] === INDIA && currentBoard[9] === INDIA && currentBoard[12] === INDIA))
        return 2;

    if ((currentBoard[0] === RUSSIA && currentBoard[5] === RUSSIA && currentBoard[10] === RUSSIA && currentBoard[15] === RUSSIA) ||
        (currentBoard[3] === RUSSIA && currentBoard[6] === RUSSIA && currentBoard[9] === RUSSIA && currentBoard[12] === RUSSIA))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] !== INDIA && currentBoard[i] !== RUSSIA)
            return 0;
    }
    return 1;
    }
    else{
        for (i = 0; i <= 20; i += 5) {
        if ((currentBoard[i] === INDIA && currentBoard[i + 1] === INDIA && currentBoard[i + 2] === INDIA && currentBoard[i + 3] === INDIA) ||
            (currentBoard[i + 1] === INDIA && currentBoard[i + 2] === INDIA && currentBoard[i + 3] === INDIA && currentBoard[i + 4] === INDIA))
            return 2;
        if ((currentBoard[i] === RUSSIA && currentBoard[i + 1] === RUSSIA && currentBoard[i + 2] === RUSSIA && currentBoard[i + 3] === RUSSIA ) || 
            (currentBoard[i + 1] === RUSSIA && currentBoard[i + 2] === RUSSIA && currentBoard[i + 3] === RUSSIA && currentBoard[i + 4] === RUSSIA))
            return 3;
    }

    // Check for vertical wins
    for (i = 0; i <= 4; i++) {
        if ((currentBoard[i] === INDIA && currentBoard[i + 5] === INDIA && currentBoard[i + 10] === INDIA && currentBoard[i + 15] === INDIA)|| 
            (currentBoard[i + 5] === INDIA && currentBoard[i + 10] === INDIA && currentBoard[i + 15] === INDIA && currentBoard[i + 20] === INDIA))
            return 2;
        if ((currentBoard[i] === RUSSIA && currentBoard[i + 5] === RUSSIA && currentBoard[i + 10] === RUSSIA && currentBoard[i + 15] === RUSSIA) ||
            (currentBoard[i + 5] === RUSSIA && currentBoard[i + 10] === RUSSIA && currentBoard[i + 15] === RUSSIA&& currentBoard[i + 20] === RUSSIA))
            return 3;
    }

    // Check for diagonal wins
    if ((currentBoard[0] === INDIA && currentBoard[6] === INDIA && currentBoard[12] === INDIA && currentBoard[18] === INDIA) ||
         (currentBoard[6] === INDIA && currentBoard[12] === INDIA && currentBoard[18] === INDIA && currentBoard[24] === INDIA) ||
          (currentBoard[1] === INDIA && currentBoard[7] === INDIA && currentBoard[13] === INDIA && currentBoard[19] === INDIA) ||
           (currentBoard[5] === INDIA && currentBoard[11] === INDIA && currentBoard[17] === INDIA && currentBoard[23] === INDIA) ||
        (currentBoard[4] === INDIA && currentBoard[8] === INDIA && currentBoard[12] === INDIA && currentBoard[16] === INDIA) ||
         (currentBoard[8] === INDIA && currentBoard[12] === INDIA && currentBoard[16] === INDIA && currentBoard[20] === INDIA) ||
         (currentBoard[3] === INDIA && currentBoard[7] === INDIA && currentBoard[11] === INDIA && currentBoard[15] === INDIA) ||
         (currentBoard[9] === INDIA && currentBoard[13] === INDIA && currentBoard[17] === INDIA && currentBoard[21] === INDIA))
        return 2;

    if ((currentBoard[0] === RUSSIA && currentBoard[6] === RUSSIA && currentBoard[12] === RUSSIA && currentBoard[18] === RUSSIA) ||
        (currentBoard[6] === RUSSIA && currentBoard[12] === RUSSIA && currentBoard[18] === RUSSIA && currentBoard[24] === RUSSIA) ||
        (currentBoard[1] === RUSSIA && currentBoard[7] === RUSSIA && currentBoard[13] === RUSSIA && currentBoard[19] === RUSSIA) ||
        (currentBoard[5] === RUSSIA && currentBoard[11] === RUSSIA && currentBoard[17] === RUSSIA && currentBoard[23] === RUSSIA) ||
        (currentBoard[4] === RUSSIA && currentBoard[8] === RUSSIA && currentBoard[12] === RUSSIA && currentBoard[16] === RUSSIA) ||
        (currentBoard[8] === RUSSIA && currentBoard[12] === RUSSIA && currentBoard[16] === RUSSIA && currentBoard[20] === RUSSIA) ||
        (currentBoard[3] === RUSSIA && currentBoard[7] === RUSSIA && currentBoard[11] === RUSSIA && currentBoard[15] === RUSSIA) ||
        (currentBoard[9] === RUSSIA && currentBoard[13] === RUSSIA && currentBoard[17] === RUSSIA && currentBoard[21] === RUSSIA))
        return 3;

    // Check for tie
    for (i = 0; i < BOARD_SIZE; i++) {
        if (currentBoard[i] !== INDIA && currentBoard[i] !== RUSSIA)
            return 0;
    }
    return 1;
    }
}


// Check for a winner.  Return
//   0 if no winner or tie yet
//   1 if it's a tie
//   2 if INDIA wins//hearts
//   3 if RUSSIA wins//dabs
function isGameOver(board) {
    var y= checkWinningCondition(board);
    if (y === 0) {
        return false
    } else if (y === 1) {
        var turnInfo = document.getElementById("turnInfo");
        tieSound.play()
        turnInfo.innerHTML = messages[0];
    } else if (y === 2) {
        var turnInfo = document.getElementById("turnInfo");
        winSound.play();
        turnInfo.innerHTML = messages[1];
    } else {
        var turnInfo = document.getElementById("turnInfo");
        loseSound.play();
        turnInfo.innerHTML = messages[2];
    }
    return true;
}