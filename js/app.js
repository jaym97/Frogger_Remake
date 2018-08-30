// Declare globals
const characters = ['images/char-boy.png',
                    'images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png'],
    character = document.getElementById('player-sprite'),
    nextBtn = document.getElementById('next'),
    prevBtn = document.getElementById('previous'),
    selectBtn = document.getElementById('select'),
    choiceModal = document.querySelector('.player-choice_modal'),
    lives = document.querySelector('#lives-text');

let index = 0;

/** Objects **/

// Enemy object the player must avoid
class Enemy {
    constructor() {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        const possibleYValues = [60, 145, 230];
        this.y = possibleYValues[Math.floor(Math.random() * possibleYValues.length)];
        this.speed = Math.floor(Math.random() * (210 - 60 + 1)) + 60;
    };

    // Update the enemy's position. Reset position if enemy has reached end of canvas
    // Parameter: dt, a time delta between ticks
    update(dt) {
        lives.textContent = `${this.livesLeft}`;
        this.x > 505 ? this.x = Math.random() * -890 : this.x += this.speed * dt;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Player object
class Player {
    constructor() {
        this.y = 315;
        this.x = 200;
        this.sprite;
        this.livesLeft = 5;
    }

    update(dt) {
        lives.textContent = `${this.livesLeft}`;

        // Detect collision between enemy and player
        // Adapted from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
        allEnemies.forEach(enemy => {
            if (this.x + 70 > enemy.x && this.x < enemy.x + 85 && this. y + 50 > enemy.y && this.y < enemy.y + 50){
                resetPlayer();
                if(this.livesLeft === 0){
                    this.livesLeft = 0;
                }
                else {
                    lives.textContent = `${this.livesLeft--}`;

                    if (this.livesLeft === 0){
                        this.livesLeft = 5;
                        resetPlayer();
                        console.log('Display game over modal');
                    }
                }
            }
        });
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key){
        //Check if player has reached end of canvas. If yes, stay in position; otherwise, move accordingly
        key === 'left' && this.x > 0 ? this.x -= 100
        : key === 'left' && this.x < 0 ? this.x = 0
        : key === 'up' && this.y < 0 ? this.y = -25
        : key === 'up' && this.y > 0 ? this.y -= 85
        : key === 'right' && this.x < 400 ? this.x += 100
        : key === 'right' && this.x > 400 ? this.x = 400
        : key === 'down' && this.y < 400 ? this.y += 85
        : key === 'down' && this.y > 400 ? this.y = 400
        : this.x = this.x, this.y = this.y;
    }
}


// Gem object to increase score when collected
class Gem {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Gem Blue.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {
        const gemsArray = [
              'images/Gem Blue.png',
              'images/Gem Green.png',
              'images/Gem Orange.png'
            ],
            // Store possible coordinates for the gem
            xPositions = [400, 300, 200, 100],
            yPositions = [230, 145, 60];

            let xPosition = xPositions[Math.floor(Math.random() * xPositions.length)];
            let yPosition = yPositions[Math.floor(Math.random() * yPositions.length)];

        // Check if player has 'picked up' a gem and respawn a random gem
        // Check detection adapted from player-enemy collision with a few tweaks to account for the size of the gem
        if (player.x + 70 > this.x && player.x < this.x + 95 && player. y + 50 > this.y && player.y < this.y + 70){
            this.sprite = gemsArray[Math.floor(Math.random() * gemsArray.length)];
            this.x = xPosition;
            this.y = yPosition;
        }
    }
}


// Heart object to increase lives left for player
class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/Heart.png';
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    update() {

        const xPositions = [400, 300, 200, 100],
            yPositions = [245, 160, 75];
            let xPosition = xPositions[Math.floor(Math.random() * xPositions.length)];
            let yPosition = yPositions[Math.floor(Math.random() * yPositions.length)];

        // TODO Add score functionality
        // if (score > 100) {
           if (player.x + 70 > this.x && player.x < this.x + 95 && player. y + 50 > this.y && player.y < this.y + 70){
                player.livesLeft++;
                lives.textContent = `${player.livesLeft}`;
                this.x = xPosition;
            this.y = yPosition;
            }
    }  // }

}


// Instantiate objects.
const allEnemies = [];
for (let i = 0; i < 7; i++){
    const enemy = new Enemy();
    allEnemies.push(enemy);
}

const player = new Player();
const gem = new Gem(300, 60);
const heart = new Heart(100, 75);


/** Event Listeners **/
// Listen for key presses and send the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

    //Check if player has reached water then send it back to the fields.
    //TODO: change to a function call that handles input with a scoring system
    if(player.y < 0){
        setTimeout(resetPlayer, 1000);
        let possibleYValues = [230, 145, 60];
        // reset enemy positions after player reaches water
        allEnemies.forEach((enemy) => {
            enemy.y = possibleYValues[Math.floor(Math.random() * possibleYValues.length)];
        });
    }
});


// Event handlers for touch inputs. Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
// Clients are initially set to null and then reset to null
// after event has been handled to avoid jeopardizing touch position calculations
let clientX = null, clientY = null;

document.addEventListener('touchstart', (e) => {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;

    document.addEventListener('touchmove', (e) => {

        if (clientY === null){
            return;
        }

        if (clientX === null){
            return;
        }

        let deltaX, deltaY;

        deltaX = e.changedTouches[0].clientX - clientX;
        deltaY = e.changedTouches[0].clientY - clientY;

        //process left swipe
        Math.abs(deltaX) > Math.abs(deltaY) && (deltaX > 0 && player.x < 400) ? player.x += 100
        //prevent player from going off canvas
        : Math.abs(deltaX) > Math.abs(deltaY) && (deltaX > 0 && player.x > 400) ? player.x = 400

        //process right swipe
        : Math.abs(deltaX) > Math.abs(deltaY) && (deltaX < 0 && player.x > 0) ? player.x -= 100
        //prevent player from going off canvas
        : Math.abs(deltaX) > Math.abs(deltaY) && (deltaX < 0 && player.x < 0) ? player.x = 0

        //process upward swipe
        //add a check for deltaX to prevent large horizontal swipes being misread as vertical ones
        : deltaY < 0 && (deltaX >= -10 && deltaX <= 10) && Math.abs(deltaY) > deltaX && player.y > 0 ? player.y -= 85
        //prevent player from going off screen
        : deltaY < 0 && player.y < 0 ? player.y = -25

        //process downward swipe
        : deltaY > 0 && (deltaX >= -10 && deltaX <= 10) && deltaY > deltaX && player.y < 400 ? player.y += 85
        //prevent player from going off canvas
        : deltaY > 0 && player.y > 400 ? player.y = 400

        //leave player in current position if other conditions are not met
        : player.x = player.x, player.y = player.y;

        //TODO Replace with a reset function
        if (player.y < 0){
            setTimeout(resetPlayer, 1000);
        }

        clientX = null;
        clientY = null;

    }, false);
}, false);


/**
    Event listeners for player selection.
    Each listner handles a click by changing the player object's image source attribute
    based on it's position in the array that holds all character image sources
**/
// Event listener for next button
nextBtn.addEventListener('click', () => {
    index > 3 ? index = 0 : index++;
    character.setAttribute('src', characters[index]);
});

// Event listener for previous button
prevBtn.addEventListener('click', () => {
    index > 4 ? index = 0
    : index <= 0 ? index = 4
    : index--;

    character.setAttribute('src', characters[index]);
});

// Event listener for select button
selectBtn.addEventListener('click', () => {
    choiceModal.setAttribute('style', 'display: none');
    player.sprite = characters[index];
});


/** Function Declarations **/

// Set player back to initial position
function resetPlayer() {
    player.y = 315;
    player.x = 200;
}