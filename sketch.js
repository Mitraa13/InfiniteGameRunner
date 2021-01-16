
var database;
var bgimg,scene;
var playerimg,player;
var invground;
var heartimg,heartGroup;
var obstacle1img,obstacle2img,obstacle3img,obstacle4img,obstacle5img;
var obstaclesGroup,heartGroup;
var start,startimg;
var f1,f2,f3,fullimg,brokenimg;
var gvimg,gameover;
var rstimg,restart;

var score = 0;
var count = 3;

var Intro = 0;
var Play = 1;
var End = 2;
var gameState = "Intro";

function preload()
{
  bgimg = loadImage("images/space1.jpg");
  playerimg = loadImage("images/rocket.png");
  heartimg = loadImage("images/score.png");
  obstacle1img = loadImage("images/blueAlien.png");
  obstacle2img = loadImage("images/grayAlien.png");
  obstacle3img = loadImage("images/greenAlien.png");
  obstacle4img = loadImage("images/pinkAlien.png");
  obstacle5img = loadImage("images/yellowAlien.png");
  startimg = loadImage("images/start.png");
  fullimg = loadImage("images/fullheart.png");
  brokenimg = loadImage("images/brokenheart.png");
  gvimg = loadImage("images/gameover.png");
  rstimg = loadImage("images/reset.jpeg");
}

function setup() {

  createCanvas(800, 600);

  scene = createSprite(width/2,height/2,600,800);
  scene.scale=2;
  scene.addImage(bgimg);
  scene.x=scene.width/2;

  player = createSprite(100,height/2,10,10);
  player.addImage(playerimg);
  player.scale=0.4;

  heartGroup = new Group();
  obstaclesGroup = new Group();

  start = createSprite(width/2,400,10,10);
  start.addImage(startimg);

  restart = createSprite(width/2,400,10,10);
  restart.scale=0.5;
  restart.addImage(rstimg);

  gameover = createSprite(width/2,200,10,10);
  gameover.scale=0.8;
  gameover.addImage(gvimg);

  f1 = createSprite(600,20,10,10);
  f1.addImage(fullimg);
  f1.scale=0.2;
  f2 = createSprite(680,20,10,10);
  f2.addImage(fullimg);
  f2.scale=0.2;
  f3 = createSprite(760,20,10,10);
  f3.addImage(fullimg);
  f3.scale=0.2;

}


function draw() {  

  if (scene.x < 0) {
    scene.x = scene.width/2;
  }
  scene.velocityX = -(6+score/10);

  if (gameState === "Intro") {
    gameover.visible=false;
    restart.visible=false;
    background("pink");
    scene.visible = false;
    player.visible = false;
    textAlign(CENTER);
    textSize(20);
    textAlign("CENTER");
    fill("black");
    stroke("white");
    text("Read The Instructions Carefully:",width/2,150);
    fill("black");
    stroke("white");
    text("Press 'UP' Arrow to move the ship upwards",width/2,200);
    text("Press 'DOWN' Arrow to move the ship downwards",width/2,250);
    text("If you touch the aliens 3 times, the game will be over!!",width/2,300);

  }

  if (mousePressedOver(start)) {
    gameState = "Play";
  }

  if(gameState === "Play"){

    start.visible=false;
    scene.visible = true;
    player.visible = true;

    player.velocityY=0;

    if(keyDown("UP_ARROW")){
      player.velocityY=player.velocityY-5;
    }
    if(keyDown("DOWN_ARROW")){
      player.velocityY=player.velocityY+5;
    }

    spawnScores();
    spawnObstacles();
  
    if (heartGroup.isTouching(player)) {
      heartGroup.destroyEach();
      score = score + 2;
      switch (score) {
        case 10: player.scale = player.scale+0.2;
          break;
        case 20: player.scale = player.scale+0.2;
          break;
        case 30: player.scale = player.scale+0.2;
          break;
        case 40: player.scale = player.scale+0.2;  
          break;
        default: break;  
      }
    }
  }



  if(obstaclesGroup.collide(player)){
     obstaclesGroup.destroyEach();
     player.scale=player.scale-0.1;
     count = count-1;
     if(count===2){
       f3.addImage(brokenimg);
       f3.scale=0.1;
     }else if(count === 1){
       f2.addImage(brokenimg);
       f2.scale=0.1;
     }else if(count === 0){
       f1.addImage(brokenimg);
       f1.scale=0.1;
     }
     score=0;
  }

  if(count === 0){
    gameState = "End";
  }

  if(gameState === "End"){

    gameover.visible=true;
    restart.visible=true;

    scene.velocityX=0;
    player.visible=false;

    obstaclesGroup.destroyEach();
    heartGroup.destroyEach();

    obstaclesGroup.setVelocityXEach(0);
    heartGroup.setVelocityXEach(0);

    heartGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      restarti();
    }

  }

  drawSprites();

  fill("white");
  stroke("black");
  textSize(20);
  text("Score:"+score,100,20);
}

function spawnScores() {
  if (frameCount % 100 === 0) {
    var heart = createSprite(810, 0, 10, 10);
    heart.y = Math.round(random(50, 550));
    heart.addImage(heartimg);
    heart.scale = 0.1;
    heart.velocityX = -10;
    heart.lifeTime = 120;
    heartGroup.add(heart);
  }

}

function spawnObstacles(){
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(810, 0, 10, 40);
    obstacle.velocityX = -10;
    obstacle.y = Math.round(random(50,550));

    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1img);
              break;
      case 2: obstacle.addImage(obstacle2img);
              break;
      case 3: obstacle.addImage(obstacle3img);
              break;
      case 4: obstacle.addImage(obstacle4img);
              break;
      case 5: obstacle.addImage(obstacle5img);
              break;
      default: break;
    }

    obstacle.lifetime = 120;

    obstaclesGroup.add(obstacle);

    player.depth = obstacle.depth;
    player.depth = player.depth + 1;
  }
}

function restarti(){
  gameState="Play";
  gameover.visible=false;
  player.scale=0.4;
  restart.visible=false;
  score=0;
  count=3;  
  f1.addImage(fullimg);
  f1.scale=0.2;
  f2.addImage(fullimg);
  f2.scale=0.2;
  f3.addImage(fullimg);
  f3.scale=0.2;
}