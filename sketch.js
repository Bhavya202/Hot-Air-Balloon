var balloon, balloonImage1, balloonImage2;

// create database and position variable here
var database, position;

function preload(){
  //preload the images and files
  bg = loadImage("cityImage.png");
  balloonImage1 = loadAnimation("hotairballoon1.png");
  balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon1.png",
  "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
  "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  //sets the database
  database = firebase.database();

  //create the canvas
  createCanvas(1500,700);

  //create the balloon sprite
  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  balloon_db = database.ref('balloon/position');
  balloon_db.on("value", readPosition, showError);
}

// function to display UI
function draw() {
  //create the background
  background(bg);

  //add the commands to the balloon
  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(-1, 0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(1, 0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(0, -1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    changePosition(0, 1);
  }

  //makes the sprite visible
  drawSprites();

  //adds the text
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon**", 40, 40);
}

function readPosition(data){
  position = data.val();
  console.log("position :",position.x);
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error In Writting To The database")
}

function changePosition(x,y){
  console.log("val : ",position.x)
  database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}