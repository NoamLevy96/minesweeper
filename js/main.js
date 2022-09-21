'use strict'

// an object by which the board size is set
var gLevel = {
    SIZE: 4,
    MINES: 2
}
//an object in which you can keep and update the current game state
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}
const MINE = '💣'
const EMPTY = ''

var gBoard

//called when page loads 
function initGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    var board = [];
    for (var i=0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j=0; j < gLevel.SIZE ; j++) {
            board[i][j] = {
                minesAroundCount: 1,
                isShown: false,
                isMine: false,
                isMarked: true,
            }
            if(i===1&&j===1||i===3&&j===2){
                board[i][j].isMine=true
            }
        }
    
    }
    return board;
}

function renderBoard(gBoard) {
    // console.table(board);
    var strHTML = '';
    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr>\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            var className = currCell ? 'occupied' : ''
            strHTML += `<td class="${className}"
            data-i="${i}" data-j="${j}"
            onclick="cellClicked(this,${i},${j})">
            </td>`
        }
        strHTML += `</tr>\n`
    }
    // console.log('strHTML', strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML  
}

function cellClicked(elCell, i, j){
    console.log(elCell)
    console.log('i='+i+' j='+j)
    console.log(elCell)
    console.log(gBoard[i][j])
    if(gBoard[i][j].isMine==true){
        elCell.innerText = MINE
    }
    else{
        elCell.innerText =gBoard[i][j].minesAroundCount
    }

    }



