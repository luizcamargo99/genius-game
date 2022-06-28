let sequence = [];
let playerSequence = [];
let isMuted = false;
let gameIsBlocked = true;
const colors = [];

function Color(color, id, audio) {
    this.color = color;
    this.id = id;
    this.audio = audio;
}

function initialize() {
    colors.push(new Color('green', 1, new Audio('../assets/green.mp3')));
    colors.push(new Color('red', 2, new Audio('../assets/red.mp3')));
    colors.push(new Color('yellow', 3, new Audio('../assets/yellow.mp3')));
    colors.push(new Color('blue', 4, new Audio('../assets/blue.mp3')));   
    gameBlocked(true); 
}

function startGame() { 
    gameSettingsStart();   
    gameBlocked(true);
    getNextColor();    
    markColors(0);
    setRound();
}

function getNextColor() {
    const currentColor = Math.round(Math.random() * (4 - 1) + 1);
    sequence.push(currentColor);
}

function markColors (index) {   
    setTimeout(function() {   
        const currentColor = colors.find(x => x.id == sequence[index]);
        blinkColor(currentColor);
          index++;                   
        if (index < sequence.length) {       
            return markColors(index);        
        }
        setTimeout(function() {          
            gameBlocked(false);
        }, 700);       
      }, 1200)
}

function playGame(element) {
    if (gameIsBlocked) {
        return;
    }

    const currentColor = colors.find(x => x.color == element.id);
    blinkColor(currentColor);
    playerSequence.push(currentColor.id);

    for (let index = 0; index < playerSequence.length; index++) {
        if (playerSequence[index] != sequence[index]) {       
           return gameOver();
        }
    }
    
    if (playerSequence.length != sequence.length) {
        return;
    }

    playerSequence = [];
    startGame();
}

function blinkColor(currentColor) {
    const elementColor = document.getElementById(currentColor.color);
    elementColor.classList.add('opacity');

    if (isMuted == false) {
        currentColor.audio.play();
    }    

    setTimeout(function() {
        elementColor.classList.remove('opacity');
    }, 600);
}

function mute() {
    isMuted = !isMuted;
}

function gameBlocked(isStarted) {
    gameIsBlocked = isStarted;
    const game = document.getElementById('game');
    for (let index = 0; index <  game.children.length; index++) {
        const child = game.children[index];
        for (let index = 0; index < child.children.length; index++) {
            const color = child.children[index];
            if (gameIsBlocked) {
                color.classList.add('blocked');
            }
            else {
                color.classList.remove('blocked');
            }            
        }
    }
}

function gameOver () {
    setTimeout(function() {
        alert('GAME OVER');
        reset();
        gameSettingsEnd(); 
        gameBlocked(true);  
    }, 1000);
}

function gameSettingsStart() {
    document.getElementById('start').classList.add('invisible');
}

function gameSettingsEnd() {
    document.getElementById('start').classList.remove('invisible');
}

function reset() {
    sequence = [];
    playerSequence = [];
    document.getElementById('round-container').classList.add('invisible');
    document.getElementById('round-content').innerHTML = '';
}

function setRound () {
    document.getElementById('round-container').classList.remove('invisible');
    document.getElementById('round-content').innerHTML = sequence.length;
}

initialize();


