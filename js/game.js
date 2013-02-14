/**
* Main entry point for the game.
* 
* Author: Fork It, We'll do it live!
*/

var gameBoard = {
  height: 512,       // Height in tiles
  width: 512,        // Width in tiles
  standardAnimationLength: 50,   // Number of frames to play animations
  score: null,
  startTime: null,
  gameTime: 60, // 60 seconds
  previousScore: null,
  gameCount: 0,
  started: false,
  sound_enabled: true,

  getHeight: function () {
    return this.height;
  },
  
  getWidth: function () {
    return this.width;
  },
  
  isOutOfBounds: function (x, y) {
    if(x < 0 || x > this.getWidth() || y < 0 || y > this.getHeight())
        return true;
    return false;
  },
  
  adjustScore: function (points) {
    if(this.score == null) this.score = 0
    this.score += points;
  },
  
  getScoreText: function () {
    return "Score: " + (this.score || 0);
  },
  
  startGame: function () {
    this.score = 0;
    this.startTime = new Date().getTime();
    this.started = true;
  },
  
  endGame: function () {
    this.previousScore = this.score;
    this.gameCount += 1;
    this.started = false;
  }
}

$(document).ready(function () {
  Crafty.init(gameBoard.getWidth(), gameBoard.getHeight());
  Crafty.scene("loading");
  
  // Disable space bar page scrolling
  window.onkeydown = function(e) { 
    return !($.inArray(e.keyCode, [33,34,35,36,37,38,39,40,72]));
  };
});
