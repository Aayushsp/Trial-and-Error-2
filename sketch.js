
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var tree,stone;
var ground;
var boyImage;
var mango1, mango2, mango3, mango4, mango5;
var catapult;

function preload()
{
  boyImage = loadImage("boy.png");
  tree = loadImage("tree.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

  //Create the Bodies Here.
  ground = new Ground();

	stone = new Stone();

	mango1 = new Mango(600,400,25);
	mango2 = new Mango(660,370,20);
	mango3 = new Mango(730,390,25);
	mango4 = new Mango(630,330,25);
  mango5 = new Mango(690,300,28);
  
  catapult = new Catapult(stone.body,{x:88, y:505});
	

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background("grey");
  
  ground.display();
  imageMode(CENTER);
  image(tree,650,445,320,400);

  // This is our boy.
  imageMode(CENTER);
  image(boyImage,130,570,150,300);

  stone.display();

  // Your favorite mangoes go here. 
  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  
  catapult.display();

  detectCollision(stone, mango1);
  detectCollision(stone, mango2);
  detectCollision(stone, mango3);
  detectCollision(stone, mango4);
  detectCollision(stone, mango5);
  
  drawSprites();

}
function mouseDragged(){
  Matter.Body.setPosition(stone.body,{x:mouseX , y: mouseY});
}

function mouseReleased(){
  catapult.fly();
}
function detectCollision(stonel, mangol){
  stoneBodyPosition = stonel.body.position;
  mangoBodyPosition = mangol.body.position;


  var distance = dist(stoneBodyPosition.x, stoneBodyPosition.y, mangoBodyPosition.x, mangoBodyPosition.y);

  if(distance<= mangol.r + stonel.r){
    Matter.Body.setStatic(mangol.body, false);
  }
}
function keypressed(){
  if(keyCode === 32){
    Matter.Body.setPosition(stone.body,{x:88, y: 505});

    catapult.attach(stone.body);
  }
}