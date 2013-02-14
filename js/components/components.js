Crafty.c("Collectable", {
    _speed: 5,

    // Init the speed in px per second
    Collectable: function(cSpeed) {
        this._speed = cSpeed;
        return this;
    },

    init: function() {
        this.bind("EnterFrame",function(e) {
            this.y += this._speed;
            
            if(gameBoard.isOutOfBounds(this.x, this.y)) {
                this.destroy();
            }
        });
    },
    
    collect: function () {
        gameBoard.adjustScore(this._pointValue || 0);
        Crafty.e("FloatingText").FloatingText("+ " + this._pointValue, "#88FFAA", this.x, this.y);
        this.destroy();
    }
});

Crafty.c("Feather", {
    _dir: 0,
    _last_dir_change: new Date().getTime(),

    init: function () {
        this.requires("Collectable, feather").Collectable(3);
        this._pointValue = 200;
        
        this.bind("EnterFrame",function(e) {
            var curTime = new Date().getTime();
            if((curTime - (this._last_dir_change || curTime)) / 1000 > 1) {
                this._last_dir_change = new Date().getTime();
                var rand = Math.random();
                if(rand >= 0 && rand < 0.33) this._dir = -1;
                else if(rand >= 0.33 && rand < 0.66) this._dir = 0;
                else this._dir = 1;
            }
            
            this.x = Math.min(Math.max(this.x + (1 * this._dir), 0), gameBoard.getWidth() - this.w);
        });
    } 
});

Crafty.c("Yarn", {
    init: function () {
        this._pointValue = 400;
        this._speed = 4;
    
        this.requires("Collectable, yarn").Collectable(4);
    } 
});

Crafty.c("MouseCollectable", {
    init: function () {
        this._pointValue = 500;
        this._speed = 5;
    
        this.requires("Collectable, mouse").Collectable(6);
    } 
});

Crafty.c("Heart", {
    _dir: 0,
    _last_dir_change: new Date().getTime(),

    init: function () {
        this.requires("Collectable, heart").Collectable(4);
        this._pointValue = 1000;
        
        this.bind("EnterFrame",function(e) {
            var curTime = new Date().getTime();
            if((curTime - (this._last_dir_change || curTime)) / 1000 > 0.4) {
                this._last_dir_change = new Date().getTime();
                var rand = Math.random();
                if(rand >= 0 && rand < 0.33) this._dir = -1;
                else if(rand >= 0.33 && rand < 0.66) this._dir = 0;
                else this._dir = 1;
            }
            
            this.x = Math.min(Math.max(this.x + (3 * this._dir), 0), gameBoard.getWidth() - this.w);
        });
    } 
});

Crafty.c("FloatingText", {
    FloatingText: function(text, color, positionX, positionY) {
        this.text(text);
        this.x = positionX;
        this.y = positionY;
        this._startTime =  new Date().getTime();
        this.css({
              "text-align": "center",
              "font-weight": "bold",
              "font-size": "24px",
              "color": color });
        return this;
    },

    init: function () {
        this._pointValue = 500;
        this._speed = 5;
        this.requires("2D, DOM, Text").attr({ w: 100, h: 50, x: 0, y: 0 });
        
        this.bind("EnterFrame",function(e) {
            this.y -= 1;
            if((new Date().getTime() - this._startTime) / 1000 > 2)
                this.destroy();
        });
    } 
});

Crafty.c("Facing", {
    init: function() {
        this._facing = "right";
        this.requires('Keyboard');

        // Trigger a movement in the direction
        this.bind("KeyDown",function(e) {
            if(e.key == 37 || e.key == 65) {
                if(this._facing != "left") this.flip("X");
                this._facing = "left";
            } else if(e.key == 39 || e.key == 68) {
                if(this._facing != "right") this.unflip("X")
                this._facing = "right";
            }
        });
    }
});

Crafty.c("Dog", {
    _reverse: false,

    Dog: function(reverse) {
        if(reverse) {
            this._reverse = reverse;
            this.x = gameBoard.getWidth();
            this.flip("X");
        }
        return this;
    },

    init: function () {
        this.bind("EnterFrame",function(e) {
            if(this._reverse)
                this.x -= 6;
            else
                this.x += 6;
            
            if(this.x + this.w < 0 || this.x > gameBoard.getWidth()) {
                this.destroy();
            }
        });
        if(gameBoard.sound_enabled) Crafty.audio.play("dog", 1, 0.6);
        return this;
    }
});