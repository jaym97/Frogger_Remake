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
        player.y = 315;
        player.x = 200;
    }
});
