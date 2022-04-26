//Create variables here
var dog, happyDog, hungryDog, database, foodS, foodStock;

function preload(){
	hungryDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
	createCanvas(500,500);
  
  database = firebase.database()
  
  var dog = createSprite(200,200,20,20);
  dog.addImage(hungryDog);
  dog.scale = 0.25;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw(){
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    dog.addImage(happyDog);
    writeStock(foodS);
  }

  //readStock();
  
  drawSprites();
  //add styles here
  stroke("black");
  fill("black");
  textSize(20);
  text("Food remaining: "+foodS,20,100);
  text("NOTE: Press the UP arrow to feed Drage the milk", 10,150);


}

function readStock(data) {
  foodS=data.val();
}

function writeStock(x) {
  if(x<=0){
    x=0;
  } else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}