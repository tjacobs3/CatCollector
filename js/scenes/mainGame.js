 Crafty.scene("mainGame", function () {
  Crafty.background("#FFF");
  gameBoard.startGame();
  var gameNumber = gameBoard.gameCount;
 
  var player = Crafty.e("2D, DOM, Twoway, Gravity, Collision, Player, walkingCat, Facing")
       .attr({w:100, h:80, x:126, y:200, z: 5})
       .twoway(5, 7)
        .gravity("Floor")
       .collision([0,80], [100,80], [100,30], [0, 30])
       .bind('Moved', function(from) {
            if(this._scared || this.x < 0 || this.x > gameBoard.getWidth() - this.w){
                this.attr({x: from.x, y:from.y});
            }
        });

    Crafty.e("2D, DOM, Color, Image")
        .image("images/background.png", "repeat")
		.color("#CCCCCC")
		.attr({h:340, w:512, x:0, y:0 });

  var floor = Crafty.e("2D, DOM, Color, Collision, Floor, Image")
        .image("images/carpet.png", "repeat")
		.color("#CCCCCC")
		.attr({h:380, w:512, x:0, y:380 })
		.collision();
        
  Crafty.e("2D, DOM, Color, Image")
        .image("images/carpet.png", "repeat")
		.color("#CCCCCC")
		.attr({h:40, w:512, x:0, y:340 });
        
    player.onHit("Block",function(hit) {
        this.attr({x: this._x + hit[0].normal.y * hit[0].overlap * 1.1, 
               y: this._y + hit[0].normal.x * hit[0].overlap * 1.1});
    });
    
    player.onHit("Collectable",function(hit) {
        if(hit[0].obj.has("Heart") && gameBoard.sound_enabled) Crafty.audio.play("meow", 1, 0.6);
    
        hit[0].obj.collect();
    });
    
    player.onHit("Dog",function(hit) {
        if(this._scared == true) return;
    
        this.removeComponent("walkingCat");
        this.addComponent("scaredCat");
        this._scared = true;
        var that = this;
        
        gameBoard.adjustScore(-1000);
        Crafty.e("FloatingText").FloatingText("- 1000", "#CC0000", this.x, this.y);

        setTimeout(function(){
            that.removeComponent("scaredCat");
            that.addComponent("walkingCat");
            that._scared = false;
        }, 2000);
        
        if(gameBoard.sound_enabled) Crafty.audio.play("screech", 1, 0.6);
    });
    
    var spawnCollectable = function () {
        if(!gameBoard.started || gameNumber != gameBoard.gameCount) return;
        
        var rand = Math.random();
        var type = "Feather";
        
        if(rand > 0.9)
            type = "Heart";
        if(rand <= 0.9 && rand > 0.7)
            type = "MouseCollectable";
        if(rand < 0.7 && rand >= 0.4)
            type = "Yarn";
    
        Crafty.e("2D, DOM, Color, Collision, " + type)
        .color("green")
        .attr({h:40, w:40, x:Math.floor(Math.random()*gameBoard.getWidth() - 32), y:0 })
        .collision([0, 40], [40, 40], [40, 0], [0, 0]);
        
        setTimeout(spawnCollectable, Math.floor(Math.random()*2000) + 1000);
    };
    
    var spawnDog = function () {
        if(!gameBoard.started || gameNumber != gameBoard.gameCount) return;

        var reverse = Math.random() <= 0.4;
    
        Crafty.e("2D, DOM, Collision, dog, Dog")
        .attr({h:85, w:120, x:-120, y:295 })
        .collision([0,85], [120,85], [120,10], [0, 10])
        .Dog(reverse);
        
        setTimeout(spawnDog, Math.floor(Math.random()*10000) + 4000);
    };
    
    // Spawn Loop
    setTimeout(function(){
        spawnCollectable();
        },Math.floor(Math.random()*2000) + 1000);
        
    setTimeout(function(){
        spawnDog();
        },Math.floor(Math.random()*10000) + 4000);
        
    // Point text
    Crafty.e("2D, DOM, Text").attr({ w: 200, h: 100, x: 10, y: 10 })
      .text("Score: 0")
      .bind("EnterFrame",function(e) {
        this.text(gameBoard.getScoreText());
      });
      
    // Sound option
    Crafty.e("2D, DOM, Text, Mouse").attr({ w: 80, h: 35, x: 422, y: 482 })
      .text("Sound: " + (gameBoard.sound_enabled ? "ON" : "OFF"))
      .css({ "cursor": "pointer"})
      .bind('Click', function() {
        gameBoard.sound_enabled = !gameBoard.sound_enabled;
        this.text("Sound: " + (gameBoard.sound_enabled ? "ON" : "OFF"));
       });
      
    // Timer
    Crafty.e("2D, DOM, Text").attr({ w: 100, h: 100, x: gameBoard.getWidth() - 100, y: 10 })
      .text("Time Left: ")
      .bind("EnterFrame",function(e) {
        var curTime = new Date().getTime();
        this.text("Time Left: " + Math.floor((gameBoard.gameTime - ((curTime - (gameBoard.startTime || curTime)) / 1000))));
        
        if((gameBoard.gameTime - ((curTime - (gameBoard.startTime || curTime)) / 1000)) < 0) {
            gameBoard.endGame();
            Crafty.scene("Menu");
        }
      });
 });