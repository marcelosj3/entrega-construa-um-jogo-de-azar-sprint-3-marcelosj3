const buttonPlay = document.querySelector('#optionPlay');
const inputPlay = document.querySelectorAll('.option__item');
const iconPlayComputer = document.querySelector('#iconComputer');
const iconPlayPlayer = document.querySelector('#iconPlayer');
const resultContainerComputer = document.querySelector('#resultComputer');
const resultContainerPlayer = document.querySelector('#resultPlayer');
const roundNumber = document.querySelector('#roundValue');
const resultText = document.querySelector('#resultText');
const scorePlayer = document.querySelector('#scorePlayer');
const scoreComputer = document.querySelector('#scoreComputer');
const scoreDraw = document.querySelector('#scoreDraw');

buttonPlay.addEventListener('click', startPlay);

let paper = 'fa-hand-paper';
let rock = 'fa-hand-rock';
let scissors = 'fa-hand-scissors';
let playerWin = 0;
let computerWin = 0;
let draw = 0;
let round = 0;
let computerWinText = 'Ah não, você perdeu!';
let playerWinText = 'Parabéns, você venceu!!';
let drawText = 'Empatou!'

function startPlay() {
    let playerPlay = checkedInput();
    if (playerPlay !== undefined) {
        addAndRemoveAnimationClass();
        removeIconClass(iconPlayComputer);
        removeIconClass(iconPlayPlayer);
        implementPlayerPlay();
        let computerPlay = selectComputerPlay();
        let result = returnWinnerOrDraw(computerPlay, playerPlay);
        changeNumbers();
        changeResultText(result);
        addRoundLog(computerPlay, playerPlay, result);
    } else {

    }
}

function checkedInput() {
    let checked;
    for (let i = 0; i < inputPlay.length; i++) {
        if (inputPlay[i].checked === true) {
            checked = inputPlay[i].id;
        }
    }
    return checked;
}

function randomNumber() {
    return Math.floor(Math.random() * 300);
}

function selectComputerPlay() {
    iconPlayComputer.style.transform = 'rotate(0deg)'
    let number = randomNumber();
    let computerPlay;
    if (number < 100) {
        iconPlayComputer.classList.add(`${rock}`);
        computerPlay = 'optionRock';
    } else if (number < 200) {
        iconPlayComputer.classList.add(`${paper}`);
        computerPlay = 'optionPaper';
    } else {
        iconPlayComputer.classList.add(`${scissors}`);
        iconPlayComputer.style.transform = 'rotate(90deg)'
        computerPlay = 'optionScissors';
    }
    return computerPlay;
}

function implementPlayerPlay() {
    let playerChoose = checkedInput();
    iconPlayPlayer.style.transform = 'rotate(0deg)'
    if (playerChoose === 'optionRock') {
        iconPlayPlayer.classList.add(`${rock}`);
    } else if (playerChoose === 'optionPaper') {
        iconPlayPlayer.classList.add(`${paper}`);
    } else {
        iconPlayPlayer.classList.add(`${scissors}`);
        iconPlayPlayer.style.transform = 'rotate(90deg)'
    }
}

function removeIconClass(icon) {
    let iconClass = icon.classList
    for (let i = 0; i < iconClass.length; i++) {
        if (iconClass[i] === paper) {
            iconClass.remove(`${paper}`)
        } else if (iconClass[i] === rock) {
            iconClass.remove(`${rock}`)
        } else if (iconClass[i] === scissors) {
            iconClass.remove(`${scissors}`)
        }
    }
}

function checkWinner(computerPlay, playerPlay) {
    let player = playerPlay;
    let computer = computerPlay;
    let winner;
    if (player === 'optionRock') {
        if (computer === 'optionScissors') {
            playerWin++;
            winner = 'player';
        } else if (computer === 'optionPaper') {
            computerWin++;
            winner = 'computer';
        }
    } if (player === 'optionScissors') {
        if (computer === 'optionPaper') {
            playerWin++;
            winner = 'player';
        } else if (computer === 'optionRock') {
            computerWin++;
            winner = 'computer';
        }
    } if (player === 'optionPaper') {
        if (computer === 'optionRock') {
            playerWin++;
            winner = 'player';
        } else if (computer === 'optionScissors') {
            computerWin++;
            winner = 'computer';
        }
    }
    return winner;
}

function returnWinnerOrDraw(computerPlay, playerPlay) {
    let winnerOrDraw;
    if (computerPlay === playerPlay) {
        draw++;
        winnerOrDraw = 'draw';
    } else {
        winnerOrDraw = checkWinner(computerPlay, playerPlay);
    }
    return winnerOrDraw;
}

function changeResultText(result) {
    if (result === 'computer') {
        resultText.innerText = computerWinText;
    } if (result === 'player') {
        resultText.innerText = playerWinText;
    } if (result === 'draw') {
        resultText.innerText = drawText;
    }
}

function changeNumbers() {
    round++;
    roundNumber.innerText = round;
    scorePlayer.innerText = playerWin;
    scoreComputer.innerText = computerWin;
    scoreDraw.innerText = draw;
}

function removeAnimationClass() {
    let computer = resultContainerComputer;
    let player = resultContainerPlayer;
    computer.classList.remove('result__play--computer-animation');
    player.classList.remove('result__play--player-animation');
}

function addAndRemoveAnimationClass() {
    let computer = resultContainerComputer;
    let player = resultContainerPlayer;
    computer.classList.add('result__play--computer-animation');
    player.classList.add('result__play--player-animation');
    setTimeout(removeAnimationClass, 750);
}

function addRoundLog(computerPlay, playerPlay, result) {
    let computerIcon = whichIcon(computerPlay);
    let playerIcon = whichIcon(playerPlay);
    let resultText = whichWinner(result);
    let roundLogContainer = document.querySelector('.round-log__container');
    let roundPlayDiv = document.createElement('div');
    let spanRound = document.createElement('span');
    let spanWinner = document.createElement('span');
    let iconPlayer = document.createElement('i');
    let versusText = document.createElement('span');
    let iconComputer = document.createElement('i');
    roundPlayDiv.classList.add('round-log__play');
    spanRound.classList.add('round-log__round');
    spanWinner.classList.add('round-log__winner')
    iconPlayer.classList.add('round-log__icon-player', 'fas', playerIcon);
    versusText.classList.add('round-log__versus');
    iconComputer.classList.add('round-log__icon-computer', 'fas', computerIcon);
    spanRound.innerText = round;
    spanWinner.innerText = resultText;
    versusText.innerText = 'vs';
    roundPlayDiv.appendChild(spanRound);
    roundPlayDiv.appendChild(spanWinner);
    roundPlayDiv.appendChild(iconPlayer);
    roundPlayDiv.appendChild(versusText);
    roundPlayDiv.appendChild(iconComputer);
    roundLogContainer.appendChild(roundPlayDiv);
}

function whichIcon(play) {
    if (play === 'optionRock') {
        return rock;
    } if (play === 'optionPaper') {
        return paper;
    } if (play === 'optionScissors') {
        return scissors;
    }
}

function whichWinner(result) {
    if (result === 'computer') {
        return 'Computador';
    } if (result === 'player') {
        return 'Você';
    } if (result === 'draw') {
        return 'Empatou';
    }
}