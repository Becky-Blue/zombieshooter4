var bg,bgImg;
var player, shooterImg, shooter_shooting, zombieImg1, zombieImg2, zombieImg3, zombie;
var bullet, bulletImg, bulletGroup;
var gameOver, gameOverImg;
var bsound;

var score = 0;

var zombieGroup
var gameState = "play"

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bulletImg = loadImage("assets/bullet.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg1 = loadImage("assets/zombie.png")
  zombieImg2 = loadImage("assets/zombie2.png")
  zombieImg3 = loadImage("assets/zombie3.png")

  gameOverImg = loadImage("assets/gameover.jpg")

  bsound = loadSound("assets/bullet.mp3")
  dieSound = loadSound("assets/explosion.mp3")
  overSound = loadSound("assets/win.mp3")
  
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2,displayHeight/2,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.5
    

  //creating the player sprite
  player = createSprite(displayWidth-1150, displayHeight-200, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.5
  
  player.setCollider("rectangle",0,0,300,300)


  zombieGroup = new Group()

  bulletGroup = new Group()

  gameOver = createSprite(displayWidth/2, displayHeight/2)
  gameOver.addImage(gameOverImg)
  gameOver.visible = false
}


function draw() {
  background(0); 

  console.log(mouseY)
  
  if (gameState === "play"){

    //Score : <value>

    //moving the player up and down and making the game mobile compatible using touches
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }

    if(keyDown("DOWN_ARROW")||touches.length>0){
      player.y = player.y+30
    }


    //release bullets and change the image of shooter to shooting position when space is pressed
    if(keyWentDown("space")){
    
      player.addImage(shooter_shooting)

      bsound.play()

      spawnBullet()
    }

    //player goes back to original standing image once we stop pressing the space bar
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
      
    }
    
    spawnZombie();

    if(bulletGroup.isTouching(zombieGroup)){
      bulletGroup.destroyEach()
      zombieGroup.destroyEach()

      dieSound.play()

      score = score+10
    }

    if (player.isTouching(zombieGroup)){

      gameState = "end"
      overSound.play()
    }


  }

  if (gameState === "end"){
    
      bulletGroup.destroyEach()
      zombieGroup.destroyEach()
      player.destroy()
      bg.destroy()

     
      
      gameOver.visible = true
  }



  drawSprites();

  textSize(32)
  fill("black")
  text("Score : "+ score , 100,100)

}


function spawnZombie(){

  if(frameCount % 250 === 0){

    zombie = createSprite(displayWidth+400 ,round(random(150,displayHeight-100))  , 30,30)
    zombie.velocityX = -10
    zombie.debug = false

    zombie.setCollider("rectangle", 0, 0, 200, 300)
    
    var num = round(random(1,3))

    if (num === 1){
      zombie.addImage(zombieImg1)
      zombie.scale = 0.3
      
    }

    else if(num === 2){
      zombie.addImage(zombieImg2)
    }
    else{
      zombie.addImage(zombieImg3)
      zombie.scale = 0.5
    }

    zombieGroup.add(zombie)

 
 
 
  }
}


function spawnBullet(){
  bullet = createSprite(player.x+90, player.y -36, 10,10)
  bullet.velocityX = 10
  bullet.addImage(bulletImg)
  bullet.scale = 0.2
  bullet.debug = false

  bullet.setCollider("rectangle" , 0 , 0 , 200,50 )

  bulletGroup.add(bullet)
}