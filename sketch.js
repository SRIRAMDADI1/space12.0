var BgImg;
var TechDragon, TDImg;
var RedGem, Rgimg;
var SmallRedGem, SRGimg;
var Obstacle, Obsimg;
var ground;
var SmallGemGroup, ObstacleGroup, GemGroup;
var highground;
var score = 0;
var GameState = "PLAY";
var EXPsound



function preload(){
  BgImg = loadImage("Background.png")  
  TDImg = loadImage("Hi-Tech.png")
  Rgimg = loadImage("RedGem.png")
  SRGimg = loadImage("SmallerRedGem.png")
  Obsimg = loadImage("FlyingObstacle.png")
  EXPsound = loadSound("explosion.wav")
  res = loadImage("ress-removebg-preview.png")

}

function setup() {
  createCanvas(1100,500);
  TechDragon = createSprite(100,450,40,40)
  TechDragon.velocityY = TechDragon.velocityY +0.8
  TechDragon.addImage("TDimg", TDImg)
  TechDragon.scale = 0.6

  ground = createSprite(0,460,1200,10)
  ground.visible = false

  highground = createSprite(0,0,1200,10)
  highground.visible = false

  SmallGemGroup = new Group();
  ObstacleGroup = new Group();
  GemGroup = new Group();

  restart = createSprite(550,250,10,10)
  restart.addImage(res)
  restart.visible = false;
}



function draw() {
  background(BgImg);
  fill("white")
  textSize(40)
  text("Score: "+score,50,50)

  if(GameState==="PLAY"){
    TechDragon.collide(ground)  
  
    if(keyDown("UP_ARROW")){
      TechDragon.y = TechDragon.y-5
    }
  
    if(keyDown("DOWN_ARROW")){
      TechDragon.y = TechDragon.y+5
    }

    TechDragon.debug = false;
    TechDragon.setCollider("rectangle", 0,0,130,170)

    for(var i = 0;i<SmallGemGroup.length;i++){
      if(SmallGemGroup.isTouching(TechDragon)){
        SmallGemGroup.get(i).destroy(i)
        score = score+1
      }
    }

    
    if(GemGroup.isTouching(TechDragon)){
      GemGroup.destroyEach();
      score = score+5
    }
    SpawnObstacle();
    SpawnGem();
    SpawnSmallGem();
    EXPsound.stop()
  }
  


 for(var i = 0;i<ObstacleGroup.length;i++){
  if(ObstacleGroup.isTouching(TechDragon)){
    ObstacleGroup.get(i).destroy(i)
    GameState = "END"
    EXPsound.play()
  }
}
if(mousePressedOver(restart)){
  reset();
}

 if(GameState === "END"){
   GemGroup.setVelocityXEach(0)
   ObstacleGroup.setVelocityXEach(0)
   SmallGemGroup.setVelocityXEach(0)
   GemGroup.setLifetimeEach(-1)
   SmallGemGroup.setLifetimeEach(-1)
   ObstacleGroup.setLifetimeEach(-1)
   restart.visible =  true;
 }
  

  drawSprites();
}

function SpawnObstacle(){
  if(frameCount % 50 === 0){
    Obstacle = createSprite(1200,100,30,30)
    Obstacle.y = Math.round(random(50,350))
    Obstacle.addImage(Obsimg)
    Obstacle.scale = 0.3;
    Obstacle.velocityX = -15
    Obstacle.lifetime = 150;
    ObstacleGroup.add(Obstacle)
  }
}

function SpawnGem(){
  if(frameCount%300 === 0){
    RedGem = createSprite(1200,100,30,30)
    RedGem.y = Math.round(random(50,350))
    RedGem.addImage(Rgimg)
    RedGem.scale = 0.5
    RedGem.velocityX = -18
    RedGem.lifetime = 100
    GemGroup.add(RedGem)
  }
}

function SpawnSmallGem(){
  if(frameCount % 30 === 0){
    SmallRedGem = createSprite(1200,100,30,30)
    SmallRedGem.y = Math.round(random(50,350))
    SmallRedGem.addImage(SRGimg)
    SmallRedGem.scale = 0.5
    SmallRedGem.velocityX = -15
    SmallRedGem.lifetime = 100;
    SmallGemGroup.add(SmallRedGem)
  }
}


function reset(){
  GameState="PLAY"
    restart.visible=false;
    score=0;
    GemGroup.destroyEach();
    SmallGemGroup.destroyEach();
    ObstacleGroup.destroyEach();

}