let media;
let s;
let m=100;
let v=200;
let a=0, b=0;

function preload(){
  media = createAudio('Layan Hamada audio.m4a');
}

function setup() {
  createCanvas(1790, 960);
  media.autoplay();
  
  textAlign(CENTER);
  textSize(20);
  textFont('Courier New');
  fill(200);
  
  displaytextG('Hello');
  media.addCue(1, displaytext, 'Hello dear');
  media.addCue(2.9, displaytextG, 'They are shooting at us');
  media.addCue(5.2, displaytext, 'Hello');
  media.addCue(6.9, displaytextG, 'They are shooting at us');
  media.addCue(8.7, displaytextG, 'The tank is next to me');
  media.addCue(10.3, displaytext, 'Are you hiding?');
  media.addCue(11.9, displaytextG, 'Yes, in the car,\nwe are next to the tank');
  media.addCue(15.3, displaytext, 'Are you inside the car?');
  media.addCue(17.3, shoot, 32);
  media.addCue(19.6, shoot, 32);
  media.addCue(23.7, displaytext, 'Hello?');
}

function draw() {
  background(0,2);
  if(a>1){
    fill(200,20,20);
    noStroke();
    circle(random(width),random(height),random(60,300));
    a--;
  } else if(b>0){
    circle(random(width),random(height),random(60,300));
    b--;
  }
}

function displaytext(t){
  background(90);
  text(t, width/2, height/2);
}
function displaytextG(t){
  background(200,100,100);
  text(t, width/2, height/2);
}

function shoot(times){
  if(a == 0){
    a = times;
  } else {
    b = times;
  }
}
