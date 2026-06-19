let a=[];
let editingFrame=3;
let onf = 5; // onionframes
let chosenKey;

//storeItem('bubbles', bubbles);
//let savedData = getItem('bubbles');


function preload(){
  preloadFonts();
}

function setup() {
  let c = createCanvas(screen.availWidth,   
               screen.availHeight);
  //createCanvas(800,800);
  c.drop(loadWorkfile);
  noCursor();
  frameRate(60);
  
  //chosenKey = "please choose \na character \nto start animating";
  chosenKey = "*";
  
  
  setupButtons(80,30);
  setupMenu();
  setupToolBox(80,30);
  
  setFont();
}

function permissionToAnimate(){
  if(keyIsPressed && 
     keyCode == 32 && 
     TBbutton[10].inputting==false) return true;
  else if (TBbutton[0].hovering(0) && mouseIsPressed) return true;
  else return false;
}

function draw() {
  
    if(permissionToAnimate()) previewAnimation();
    else displayWorkbench();
    
    
    
  
  
}

function showCursor(){
  let cursorSymbol;
  
  if(chosenKey.length > 1 && 
     ((mouseX < TBYborder) || 
     (mouseX > width-TB2Yborder))){
    cursorSymbol='*';
  } else cursorSymbol = chosenKey;
  textSize(fontSize);
  //textAlign(CENTER, CENTER);
  
  
  
  let v;
  if(isOnGrid &&
    (mouseX > TBYborder &&
    mouseX < width-TBYborder)) v=cursorOnGrid();
  else v = createVector(mouseX, mouseY);
  fill(20);
  text(cursorSymbol, v.x, v.y);
  textAlign(LEFT, BASELINE);
}

function mouseClicked(){
  
  if(fullscreen() != true) fullscreen(true);
  
  if(TBbutton[10].inputting) TBbutton[10].clicked();
  
  if(mouseX < TBYborder) TBclick();
  else if(mouseX > width-TB2Yborder) buttonClicked();
  else if(TBopen) TBopen=false;
  else mouseClickedWB();
  
  
}

function mouseWheel(event){
  if(mouseX < TBYborder){
    mouseWheelTB(event); 
  } else if (mouseX > width-TB2Yborder){
    buttonsScroll(event.delta);
  }
}




