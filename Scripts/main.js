let sequence = [];
let playerSequence = [];
const colors = [];
const firstIndex = 0;

function Color(color, id) {
    this.color = color;
    this.id = id;
}

colors.push(new Color('green', 1));
colors.push(new Color('red', 2));
colors.push(new Color('yellow', 3));
colors.push(new Color('blue', 4));

function startGame() {
    getNextColor();
    markColors(firstIndex);
}

function getNextColor() {
    const min = 1;
    const max = 4;
    const currentColor = Math.round(Math.random() * (max - min) + min);
    sequence.push(currentColor);
}

function markColors (index) {   
    setTimeout(function() {   
        const id = colors.find(x => x.id == sequence[index]).color;
        const elementColor = document.getElementById(id);
        elementColor.classList.add('opacity'); 
        setTimeout(function() {
            elementColor.classList.remove('opacity');
          }, 500);
          index++;                   
        if (index < sequence.length) {       
            return markColors(index);        
        }                
      }, 1000)
}

function playGame(element) {
    playerSequence.push(colors.find(x => x.color == element.id).id);

    for (let index = 0; index < playerSequence.length; index++) {
        if (playerSequence[index] != sequence[index]) {
            return alert('GAME OVER');
        }
    }
    
    if (playerSequence.length != sequence.length) {
        return;
    }

    playerSequence = [];
    startGame();
}





