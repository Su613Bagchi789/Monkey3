var PLAY=1
var END=0
var gameState=1
var monkey , monkey_running,monkeyStop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0
var survivalTime=0
var ground
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyStop=loadImage("sprite_0.png")
}
function setup() {
 createCanvas(600,600)
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1
  
 FoodGroup=new Group()
  ObstacleGroup=new Group()
}


function draw() {
background("white")
  
   ground=createSprite(450,350,900,10)
  ground.velocityX=-4
  ground.x=ground.width/2
   
  console.log(ground.x)
  
  var survivalTime=0
  if(keyDown("space") && monkey.y>=120){
    monkey.velocityY=-12
  }
  
  monkey.velocityY=monkey.velocityY+0.8
     monkey.collide(ground)
   
  if(monkey.isTouching(FoodGroup)){
   score=score+1
    FoodGroup.destroyEach();
  }
  if(monkey.isTouching(ObstacleGroup)){
    gameState = END
    score=0
    FoodGroup.setVelocityXEach(0,0)
    ObstacleGroup.setVelocityXEach(0,0)
     survivalTime=0
    monkey.velocityX=0
    FoodGroup.destroyEach()
  monkey.addImage("monkeyStop",monkeyStop)
    monkey.velocityY=0
  }
  SpawnBananas();
  SpawnObstacles()
  
  drawSprites();
  stroke("green")
  textSize(20)
  fill("green")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SURVIVAL TIME :"+survivalTime,100,50)
  
 fill("red") 
 text("SCORE :"+score,150,70) 
}
function SpawnBananas(){
  if(frameCount % 80 ===0){
   banana = createSprite(400,Math.round(random(120,200)),20,20) 
    banana.addImage("bananaImage",bananaImage)
    banana.scale=0.1
    banana.velocityX=-8
    banana.lifetime=300
    FoodGroup.add(banana)
  }
}

function SpawnObstacles(){
  if(frameCount % 300 ===0){
    obstacle=createSprite(800,330,20,20)
    obstacle.addImage("obstacleImage",obstacleImage)
    obstacle.scale=0.1
    obstacle.velocityX=-8
    ObstacleGroup.add(obstacle)
    survivalTime=0
  }
}




