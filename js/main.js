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
var isFirstClick = false

//called when page loads 
function initGame() {
    gBoard = buildBoard()

    renderBoard(gBoard)
}

function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: true,
            }

        }

    }
    return board;
}
function setMinesNegsCount() {
    var count = 0
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {

            if (i > 0 && gBoard[i - 1][j].isMine === true) // top
                count++
            if (i > 0 && (j > 0) && gBoard[i - 1][j - 1].isMine === true) // diagonal top left
                count++
            if (j < (gLevel.SIZE - 1) && gBoard[i][j + 1].isMine === true) // left
                count++
            if (j > 0 && (i < gLevel.SIZE - 1) && gBoard[i + 1][j - 1].isMine === true) //diagonal bottom left
                count++
            if (i < (gLevel.SIZE - 1) && gBoard[i + 1][j].isMine === true) //bottom
                count++
            if (i < (gLevel.SIZE - 1) && j < (gLevel.SIZE - 1) && gBoard[i + 1][j + 1].isMine === true) // diagonal bottom right
                count++
            if (j > 0 && gBoard[i][j - 1].isMine === true) //right 
                count++
            if (i > 0 && j < ((gLevel.SIZE - 1)) && gBoard[i - 1][j + 1].isMine === true) // diagonal top right
                count++
            gBoard[i][j].minesAroundCount = count
            count = 0
        }
    }
    
}
function setMine(firstx, firsty) {
    var mine1x = getRandomInt(0, 3)
    var mine1y = getRandomInt(0, 3)
    var mine2x = getRandomInt(0, 3)
    var mine2y = getRandomInt(0, 3)
    while (mine1x == firstx && mine1y === firsty) {
        var mine1x = getRandomInt(0, 3)
        var mine1y = getRandomInt(0, 3)
    }
    while (mine1x === mine2x && mine1y === mine2y|| mine2x===firstx&&mine2y===firsty) {
        mine2x = getRandomInt(0, 3)
        mine2y = getRandomInt(0, 3)
    }
    gBoard[mine1x][mine1y].isMine = true
    gBoard[mine2x][mine2y].isMine = true

}


function renderBoard() {
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

function cellClicked(elCell, i, j) {
    if (!isFirstClick) {
        setMine(i, j)
        setMinesNegsCount()
        isFirstClick= true
    }
    console.log(elCell)
    console.log('i=' + i + ' j=' + j)
    console.log(elCell)
    console.log(gBoard[i][j])
    if (gBoard[i][j].isMine == true) {
        elCell.innerText = MINE
    }
    else {
        elCell.innerText = gBoard[i][j].minesAroundCount
    }

}



