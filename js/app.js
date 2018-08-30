// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
Enemy.prototype.update = function(dt) {
    this.x > 505 ? this.x = Math.random() * -890 : this.x += this.speed * dt;

    // Detect collision between enemy and player
    // Adapted from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Collision_detection
    if (player.x + 70 > this.x && player.x < this.x + 85 && player. y + 50 > this.y && player.y < this.y + 50){
        resetPlayer();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const characters = ['images/char-boy.png',
                    'images/char-cat-girl.png',
                    'images/char-horn-girl.png',
                    'images/char-pink-girl.png',
                    'images/char-princess-girl.png'],
    character = document.getElementById('player-sprite'),
    nextBtn = document.getElementById('next'),
    prevBtn = document.getElementById('previous'),
    selectBtn = document.getElementById('select'),
    choiceModal = document.querySelector('.player-choice_modal');


let index = 0;

nextBtn.addEventListener('click', () => {
    index > 3 ? index = 0 : index++;
    character.setAttribute('src', characters[index]);
});

prevBtn.addEventListener('click', () => {
    index > 4 ? index = 0
    : index <= 0 ? index = 4
    : index--;

    character.setAttribute('src', characters[index]);
});

selectBtn.addEventListener('click', () => {
    choiceModal.setAttribute('style', 'display: none');
    player.sprite = characters[index];
});

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.y = 315;
        this.x = 200;
        this.sprite;
    }

    update(dt) {

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

        // Check if player has 'picked up' a gem and respawn a random gem
        // Check detection adapted from player-enemy collision with a few tweaks to account for the size of the gem
        if (player.x + 70 > this.x && player.x < this.x + 95 && player. y + 50 > this.y && player.y < this.y + 70){
            this.sprite = gemsArray[Math.floor(Math.random() * gemsArray.length)];
            let xPosition = xPositions[Math.floor(Math.random() * xPositions.length)];
            let yPosition = yPositions[Math.floor(Math.random() * yPositions.length)];
            this.x = xPosition;
            this.y = yPosition;
        }
    }
}


// class Heart {
//     constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.sprite = 'images/Heart.png';
//     }

//     render() {

//     }
// }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(), enemy2 = new Enemy(), enemy3 = new Enemy(), enemy4 = new Enemy(),
        enemy5 = new Enemy(), enemy6 = new Enemy(), enemy7 = new Enemy();

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

const player = new Player();

let gem = new Gem(100, 230);

function resetPlayer() {
    player.y = 315;
    player.x = 200;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
    }
});

let clientX = null, clientY = null;

//Event handlers for touch inputs. Adapted from https://developer.mozilla.org/en-US/docs/Web/API/Touch/clientX
//clients are initially set to null and then reset to null after event has been handled to avoid jeopardizing touch position calculations
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


