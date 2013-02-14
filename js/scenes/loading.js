Crafty.scene("Menu", function () {
  Crafty.background("#FFF");
  Crafty.e("2D, DOM, Text").attr({ w: 515, h: 515, x: 0, y: 0 })
      .text("Kitty Fun Time!")
      .css({  "padding-top": "200px",
              "text-align": "center",
              "font-weight": "bold",
              "font-size": "24px",
              "color": "black" });
              
  var startBox = Crafty.e("2D, DOM, Text, Mouse").attr({ w: 150, h: 50, x: gameBoard.getWidth() / 2 - 75, y: gameBoard.getHeight() / 2 + 25 })
      .text("Start Game")
      .css({ "text-align": "center",
              "font-weight": "bold",
              "font-size": "24px",
              "color": "black",
              "padding-top": "15px",
              "border": "1px solid black",
              "background-color" : "rgb(250, 198, 198)",
              "cursor": "pointer"});
    startBox.bind('Click', function() {
        Crafty.scene("mainGame");
       });
       
    // Sound option
    Crafty.e("2D, DOM, Text, Mouse").attr({ w: 80, h: 35, x: 422, y: 482 })
      .text("Sound: " + (gameBoard.sound_enabled ? "ON" : "OFF"))
      .css({ "cursor": "pointer"})
      .bind('Click', function() {
        gameBoard.sound_enabled = !gameBoard.sound_enabled;
        this.text("Sound: " + (gameBoard.sound_enabled ? "ON" : "OFF"));
       });
       
    if(gameBoard.previousScore != null) {
        Crafty.e("2D, DOM, Text").attr({ w: 150, h: 50, x: gameBoard.getWidth() / 2 - 75, y: 100 })
        .text("Score: " + gameBoard.previousScore)
        .css({ "text-align": "center",
                "font-weight": "bold",
                "font-size": "24px",
                "color": "black",
                "font-family": "'Source Sans Pro', sans-serif"
            });
    }
});

Crafty.scene("loading", function () {
  //load takes an array of assets and a callback when complete
  Crafty.sprite(100, 80, "images/cats.png", {
    walkingCat: [0, 0],
    scaredCat: [1, 0]
  });
  
  Crafty.sprite(40, "images/toys.png", {
    feather: [0, 0],
    mouse: [0, 1],
    yarn: [0, 2],
    heart: [0, 3]
  });
  
   Crafty.sprite(120, "images/dog.png", {
    dog: [0, 0]
  });
  
  Crafty.audio.add({
    meow: ["sounds/cat_meow.wav", "sounds/cat_meow.mp3"],
    screech: ["sounds/cat_screech.wav", "sounds/cat_screech.mp3"],
    dog: ["sounds/dog_bark.wav", "sounds/dog_bark.mp3"]
    });
  
  //black background with some loading text
  Crafty.background("#000");
  Crafty.e("2D, DOM, Text").attr({ w: 515, h: 515, x: 0, y: 0 })
      .text("Loading...")
      .css({  "padding-top": "200px",
              "text-align": "center",
              "background-color": "black",
              "font-weight": "bold",
              "font-size": "24px",
              "color": "white" });
              
    // Simulate a load time for now to make sure this works
    setTimeout(function () {
        Crafty.scene("Menu"); //when everything is loaded, run the main scene
    }, 500);
});
