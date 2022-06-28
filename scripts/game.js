let sequence = [];
let playerSequence = [];
let isMuted = false;
let gameIsBlocked = true;
let colors = [];

const messages = {
    gameOver: 'game over 😔',
    tryAgain: 'try again!'
};

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
    addClassById(currentColor.color, 'opacity');

    if (isMuted == false) {
        currentColor.audio.play();
    }    

    setTimeout(function() {
        removeClassById(currentColor.color, 'opacity');
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
        gameOverAlert();
        reset();
        // gameSettingsEnd(); 
        gameBlocked(true);  
    }, 1000);
}

async function gameOverAlert() {
    Swal.fire({
        title: messages.gameOver,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        },
        width: 600,
        padding: '3em',
        color: '#716add',
        backdrop: `
        #563D67
        `,
         confirmButtonText: messages.tryAgain
      }).then((result) => {
        if (result.isConfirmed) {
            startGame();
        }
      })
}

function gameSettingsStart() {
    addClassById('start', 'invisible');
}

function reset() {
    sequence = [];
    playerSequence = [];
    addClassById('round-container', 'invisible');
    emptyValueById('round-content');
}

function setRound () {
    removeClassById('round-container', 'invisible');
    document.getElementById('round-content').innerHTML = sequence.length;
}

initialize();


