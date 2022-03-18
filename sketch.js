//mousePressed not working
//lives messing up
//so gamestate end not working
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var bgimg, buntingImg, joystickImg, reindeerImg, santaImg, stockingImg;
var treeImg, wreathImg, gift2, giftImg;
var obj, img, gifts = [];
var boyImg, girlImg, boy, girl;
var snowAnime, score=0, gameState = "play";
var reset, resetImg, lives =3, objects = [], blank;
var giftGrp, objGrp;
var sad, happy;

function preload()
{
  bgimg = loadImage("assets/bg2.png");
  buntingImg = loadImage("assets/bunting.png");
  joystickImg = loadImage("assets/joystick.png");
  reindeerImg = loadImage("assets/reindeer.png");
  santaImg =loadImage("assets/santa.png");
  stockingImg = loadImage("assets/stocking.png");
  treeImg = loadImage("assets/tree.png");
  wreathImg = loadImage("assets/wreath.png");
  giftImg = loadImage("assets/gift.png");
  girlImg = loadImage("assets/girl.png");
  boyImg = loadImage("assets/boy.png");
  snowAnime = loadAnimation("assets/snow.gif");
  resetImg = loadImage("assets/reset.png");
  sad = loadSound("assets/sad.mp3");
  happy = loadSound("assets/happy.mp3");
}

function setup() {
  createCanvas(1200,600)

  engine = Engine.create();
  world = engine.world;

  giftGrp = new Group();
  objGrp = new Group();

  girl = createSprite(600,500);
  girl.addImage('girl',girlImg);
  girl.scale = 0.35;
  
  /*reset = createButton("");
  reset.class("resetButton");
  reset.position(80,130);
  reset.size(50,50);*/

  reset = createSprite(80,130,50,50);
  reset.addImage('reset',resetImg);
  reset.scale =0.05;

  
}

function draw() 
{
  background(51);
  imageMode(CENTER);
  image(bgimg,600,300,1200,600);
  textSize(20);
  text("Score: "+score,80,120);
  text("lives: "+lives,80,90);

  if(gameState === "play") {
          girl.x = mouseX;
          spawnGifts();
          //console.log(gifts.length);
        for(var i=0;i<gifts.length;i++) 
        {
                if(gifts[i].isTouching(girl)) {
                        gifts[i].visible = false;
                        gifts[i].destroy();
                        score += 1;
                        happy.play();
                        happy.setVolume(0.5);

                        var x = random(50,230);
                        var y = random(530,570);
                        objects[i].velocityY = 0;
                        objects[i].x = x;
                        objects[i].y = y;
                }
                else if(gifts[i].y>600) {
                        
                        //gifts[i].destroy();
                        //objects[i].destroy();
                        sad.play();
                        lifeover(i);
                }
        }  
  }
  if(gameState === "end") {
          giftGrp.setLifetimeEach(-1);
          objGrp.setLifetimeEach(-1);
        gameOver();
  }

  if(mousePressedOver(reset)) {
          restart();
  }
  

  //gift.display();
  Engine.update(engine);
  drawSprites();
}

function spawnGifts() {
  if (frameCount % 80 === 0) {
    var x = random(250,1000)
    gift2 = createSprite(x,-10,80,80);
    gift2.addImage('gift',giftImg);
    gift2.addAnimation('snow',snowAnime);
    gift2.scale = 0.17;
    gift2.velocityY = (3+score/100);
    giftGrp.add(gift2);
    giftGrp.setLifetimeEach(601);
    gifts.push(gift2);

    obj = createSprite(gift2.position.x,gift2.position.y+10,60,60);
    obj.velocityY = gift2.velocityY;
    objGrp.add(obj);
    objGrp.setLifetimeEach(600);
    objects.push(obj);

    gift2.depth = obj.depth+1;

    var rand = Math.round(random(1,7));
    switch(rand){
      case 1: obj.addImage(buntingImg);
              obj.scale = 0.2;
      break;
      case 2: obj.addImage(joystickImg);
              obj.scale = 0.05;
      break;
      case 3: obj.addImage(reindeerImg);
              obj.scale = 0.15;
      break;
      case 4: obj.addImage(santaImg);
              obj.scale = 0.015;
      break;
      case 5: obj.addImage(stockingImg);
              obj.scale = 0.2;
      break;
      case 6: obj.addImage(treeImg);
              obj.scale = 0.05;
      break;
      case 7: obj.addImage(wreathImg);
              obj.scale = 0.3;
      break;
      default : break;
    }
  }
}
function lifeover(index){
   lives = lives - 1;
   if(lives>=1) {
           //objects = [];
           gifts[index].y = -10;
           objects[index].y = -10;
           //giftGrp.destroyEach();
           //objGrp.destroyEach();
         gameState = "play";
         console.log(gameState);
   }
   else {
          gameState = "end";
   }
}
function gameOver() {
  swal({
    title: "Game Over",
    text: "Thanks for playing",
    imageUrl:
    "./assets/mc.png",
    imageSize: "100x100",
    confirmButtonText: "Play Again"
  },
  function(isConfirm){
    if(isConfirm){
      location.reload();
    }
  }
  );
}
function restart() {
        gameState = "play"; 
  objGrp.destroyEach();
  giftGrp.destroyEach();
  score = 0;
}
//