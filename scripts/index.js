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
        changeIconColor(result, iconPlayPlayer, iconPlayComputer);
        changeNumbers();
        changeResultText(result);
        addRoundLog(computerPlay, playerPlay, result);
        blockButtonWithTime();
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
            winner = playerWinFunc();
        } else if (computer === 'optionPaper') {
            winner = computerWinFunc();
        }
    } if (player === 'optionScissors') {
        if (computer === 'optionPaper') {
            winner = playerWinFunc();
        } else if (computer === 'optionRock') {
            winner = computerWinFunc();
        }
    } if (player === 'optionPaper') {
        if (computer === 'optionRock') {
            winner = playerWinFunc();
        } else if (computer === 'optionScissors') {
            winner = computerWinFunc();
        }
    }
    return winner;
}

function playerWinFunc() {
    playerWin++;
    return 'player'
}

function computerWinFunc() {
    computerWin++;
    return 'computer'
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
    } else if (result === 'player') {
        resultText.innerText = playerWinText;
    } else {
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
    let resultText = whichWinner(result);
    let roundLogContainer = document.querySelector('.round-log__container');
    let roundPlayDiv = document.createElement('div');
    let spanRound = document.createElement('span');
    let spanWinner = document.createElement('span');
    let iconPlayer = document.createElement('i');
    let versusText = document.createElement('span');
    let iconComputer = document.createElement('i');
    changeIconColor(result, iconPlayer, iconComputer);
    roundPlayDiv.classList.add('round-log__play');
    spanRound.classList.add('round-log__round');
    spanWinner.classList.add('round-log__winner')
    iconPlayer = addIconClasses('player', iconPlayer, playerPlay);
    versusText.classList.add('round-log__versus');
    iconComputer = addIconClasses('computer', iconComputer, computerPlay);
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

function addIconClasses(which, element, play) {
    let icon = whichIcon(play);
    element.classList.add(`round-log__icon-${which}`, 'fas', icon);
    if (which === 'player') {
        element.style.transform = 'rotate(90deg)';
        if (icon === scissors) {
            element.style.transform = 'rotate(180deg)';
        }
    } else {
        if (icon !== scissors) {
            element.style.transform = 'rotate(-90deg)';
        }
    }
    return element;
}

function whichIcon(play) {
    if (play === 'optionRock') {
        return rock;
    } else if (play === 'optionPaper') {
        return paper;
    } else {
        return scissors;
    }
}

function whichWinner(result) {
    if (result === 'computer') {
        return 'Computador';
    } else if (result === 'player') {
        return 'Você';
    } else {
        return 'Empatou';
    }
}

function blockButtonWithTime() {
    blockButton();
    setTimeout(unblockButton, 750);
}

function blockButton() {
    buttonPlay.setAttribute('disabled', 'disabled');
}

function unblockButton() {
    buttonPlay.removeAttribute('disabled');
}

function changeIconColor(result, iconPlayer, iconComputer) {
    removeIconColorClass(iconPlayer);
    removeIconColorClass(iconComputer);
    if (result === 'player') {
        iconPlayer.classList.add('result__icon--winner');
        iconComputer.classList.add('result__icon--loser');
    } else if (result === 'computer') {
        iconPlayer.classList.add('result__icon--loser');
        iconComputer.classList.add('result__icon--winner');
    }
}

function removeIconColorClass(element) {
    let iconClasses = element.classList
    for (let i = 0; i < iconClasses.length; i++) {
        if (iconClasses[i] === 'result__icon--loser') {
            element.classList.remove('result__icon--loser')
        } else if (iconClasses[i] === 'result__icon--winner') {
            element.classList.remove('result__icon--winner');
        }
    }
}