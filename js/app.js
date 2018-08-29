// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y;
    this.speed = 50;
};

// Update the enemy's position. Reset position if enemy has reached end of canvas
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x > 505 ? this.x = 0 : this.x += this.speed * dt;

    //check for collisions
    //TODO Replace to a reset function
    if (player.x < this.x + 75 && player.x + 75 > this.x && player.y < this.y + 50 && 50 + player.y > this.y){
        player.x = 200;
        player.y = 315;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// const characters = ['images/char-boy.png',
//                     'images/char-cat-girl.png',
//                     'images/char-horn-girl.png',
//                     'images/char-pink-girl.png',
//                     'images/char-princess-girl.png'],
//         character = document.getElementById('player-sprite'),
//         nextBtn = document.getElementById('next'),
//         selectBtn = document.getElementById('select'),
//         choiceModal = document.querySelector('.player-choice_modal');

//  let index = 0, selectedPlayer;

//   nextBtn.addEventListener('click', () => {
//             index > 3 ? index = 0 : index++;
//             character.setAttribute('src', characters[index]);
//             return selectedPlayer = characters[index];

//             selectBtn.addEventListener('click', () => {
//                 choiceModal.setAttribute('style', 'display: none');
//             });
//         });

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor() {
        this.y = 315;
        this.x = 200;
    }

    update(dt) {

    }

    render() {
        this.sprite = 'images/char-boy.png';
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const enemy1 = new Enemy(), enemy2 = new Enemy(), enemy3 = new Enemy(), enemy4 = new Enemy(), enemy5 = new Enemy(), enemy6 = new Enemy(),
                enemy7 = new Enemy(), enemy8 = new Enemy();

enemy1.y = 60, enemy2.y = 60;
enemy3.y = 145, enemy4.y = 145, enemy8.y = 145;
enemy5.y = 230, enemy6.y = 230, enemy7.y = 230;
enemy1.speed = 45;
enemy2.speed = 200;

const allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8];

const player = new Player();


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
        setTimeout(() => {
            player.y = 315;
            player.x = 200;
        }, 2000);
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
        console.log(`deltaX = ${deltaX} deltaY = ${deltaY}`);

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
            setTimeout(() => {
                player.x = 200;
                player.y = 315;
            }, 1000);
        }

        clientX = null;
        clientY = null;

    }, false);
}, false);

