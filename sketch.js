const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var ground;
var gor;
var engine, world;
var plank;
var bg;
var b1, b2, b3, b4, b5, b6;
var o1, o2;
var sling;
var score = 0;
var gameState = "prefire";
var launchingForce=100;

function preload(){
bg = loadImage("jungle.jpg")
}

function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
    world = engine.world;

  ground = new Ground(600, 593, 1200, 10);
  gor = new Gorilla(300, 0, 60)
  //plank = new Plank(200, 400, 300, 10);
  b1 = new banana(800, 400, 50);
  b2 = new banana(880, 400, 50 );
  b3 = new banana(960, 400, 50 );
  b4 = new banana(840, 350, 50);
  b5 = new banana(920, 350, 50);
  b6 = new banana(880, 300, 50);
  o1 = new Plank(600, 500, 10, 300);
  o2 = new Plank(600, 25, 10, 150);
  sling = new SlingShot(gor.body,{x:200, y:300});

  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 1300,
      height: 600,
      wireframes: false
    }
  });
  Engine.run(engine);
}

function draw() {
  background("white");
  Engine.update(engine);

if(gameState == "launched" || gameState == "over"){
  fill("black");
  textSize(20);
  text("Score: " + score, 100, 50);
}
  
  
  ground.display();
  gor.display();
  //plank.display();
  b1.display();
  b2.display();
  b3.display();
  b4.display();
  b5.display();
  b6.display();
  o1.display();
  o2.display();
  sling.display();

  detectollision(gor,b1);
  detectollision(gor,b2);
  detectollision(gor,b3);
  detectollision(gor,b4);
  detectollision(gor,b5);
  detectollision(gor,b6);

  if(gameState == "prefire"){
    fill("black");
  textSize(20);
  text("Shoot the gorrila at the banana to score points ", 100, 50);
  }

  if(gameState == "over"){
    fill("black");
  textSize(30);
  text("Game over ", 520, 250);
  }

    
}

function mouseDragged()
{
	Matter.Body.setPosition(gor.body, {x:mouseX, y:mouseY}) 
}

function mouseReleased()
{
  sling.fly();
  gameState = "launched"
    // distance=int(dist(stoneObj.x,stoneObj.y,mango1.x,mango1.y));
}

function detectollision(lstone,lmango){
	
  gorBodyPosition=lmango.body.position
  banBodyPosition=lstone.body.position
  
  var distance=dist(banBodyPosition.x, banBodyPosition.y, gorBodyPosition.x, gorBodyPosition.y)

  	if(distance<=lmango.r+lstone.r)
    {

      Matter.Body.setStatic(lmango.body,false);
      
      score = score + 1;
      gameState = "over"
    }
   

  }
  

