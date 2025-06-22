let TBwidth = 300, TBmargin = 20;
let TBYborder = TBwidth+TBmargin*2, TB2Yborder=TBYborder;
let TBbutton = []; 
let inp=10;

function setupToolBox(y,h){
  
  let names = ["play from frame ...",        //0
               
               "frame ... out of total ...", //1
               "scroll through frames",      //2
               "jump to beginning / end",    //3
               
               "automatic flip on/off",      //4
               "insert empty frame",         //5
               "duplicate frame",            //6
               "set frame as reference",     //7
               "onion frames: ...",          //8
               "delete frame",               //9
               
               "input",                      //10
               "frames per second: ...",     //11
               "on / off grid",              //12
               
               "delete all frames",          //13
               "safe in browser",            //14
               "typography settings"];       //15

  
  for(let i=0; i<names.length; i++){
    if(names[i] == "input"){
      TBbutton.push(new Input(TBmargin, y,
                          TBwidth, h));
      inp=i;
    }
    else {
      TBbutton.push( new Button(names[i],
                           TBmargin, y,
                           TBwidth, h));
    }
    
    if(i==0 || i==3 || i==12 || i==9) y+=TBmargin;
    y += (h+TBmargin/2);
  }
  
  updateToolBox();
}

function displayToolBox(){
  
  fill(200,130);
  rect(0, 0, TBYborder, height);
  rect(width-TB2Yborder, 0, TB2Yborder, height)
  
  if(TBopen || TBclosed==false) {
    for(let i=0; i<TBbutton.length; i++){
    
    if(i==1)TBbutton[i].display(false);
    
    else TBbutton[i].display(true);
    
    if(TBbutton[i].hovering()) {
      explain(i);
    }
  }
  }
  
  if(TB2open) displayButtons();
  
  manageAnimation();
}

function explain(b){
  
  let t;
  
  if(b==0) t="shortcut SPACEBAR";
  
  else if (b==1) t="just thought you might wanna know";
  else if (b==2) t="shortcut LEFT ARROW & RIGHT ARROW";
  else if (b==3) t="click to go to first or last frame";
  else if (b==4) t="skips to next frame after placing a character";
  
  else if (b==5) t="shortcut UP ARROW & DOWN ARROW";
  else if (b==6) t="shortcut ALT or OPTION";
  else if (b==7) t="scroll to adjust the opacity of the reference";
  else if (b==8) t="shadows of previous & next frames (green & red), SCROLL to adjust the visible amount";
  else if (b==9) t="duh";
  
  else if (b==10) t="shortcut ENTER";
  else if (b==11) t="more FPS = faster = better motion quality = more work. Scroll to adjust";
  else if (b==12) t="grid adds that authentic ASCII feel, but removes the full freedom of motion";
  
  else if (b==13) t="total wipeout, maybe safe before deleting animation?";
  else if (b==14) t="this will override previous safe";
  else if (b==15) t="adjust and preview type";
  else t="";
  
  {
    let h=TBbutton[b].size.y;
    textSize(h/2);
    let w = textWidth(t)+margin*2;
    
    let x=TBbutton[b].pos.x+
      TBbutton[b].size.x+
      TBmargin*2;
    let y=TBbutton[b].pos.y;
    
    fill(20);
    rect(x,y,w,h);
    fill(200);
    text(t,x+margin, y+h*0.7);
  }
}

function mouseWheelTB(event) {
  
  if(TBbutton[0].hovering())
  {
    if(event.delta > 0) {
      previewStartFrame++;
    } else {
      previewStartFrame--;
    }
    previewStartFrame = constrain(previewStartFrame, 0, a.length-10);
    
    animationFrame=previewStartFrame;
  } 
  
  
  if(TBbutton[2].hovering())
  {
    if(event.delta > 0) {
      editingFrame++;
    } else {
      editingFrame--;
    }
    editingFrame = constrain(editingFrame, 0, a.length);
  }
  
  
  if(TBbutton[7].hovering())
  {
    if(event.delta > 0) {
      referenceOpacity+=10;
    } else {
      referenceOpacity-=10;
    }
    referenceOpacity = constrain(referenceOpacity, 0, 255);
  } 
  
  
  if(TBbutton[8].hovering())
  {
    if(event.delta > 0) {
      onf++;
    } else {
      if (onf>0) onf--;
    }
    onf = constrain(onf, 1, 9);
  }
  
  
  if(TBbutton[11].hovering())
  {
    if(event.delta > 0) changeFramerate(0.5);
    else changeFramerate(2);
  }
  
  
  if(TBbutton[12].hovering())
  {
    isOnGrid = (isOnGrid==false);
  } 
  
  updateToolBox();
}

function TBclick(){
  
  if(TBbutton[0].hovering()) ;
  else if(TBbutton[1].hovering()) ;
  else if(TBbutton[2].hovering()) ;
  else if(TBbutton[3].hovering()) 
  {
    if(editingFrame == a.length) {
       editingFrame = 0;
    } else {
      editingFrame = a.length;
    }
  }
  
  else if(TBbutton[4].hovering()) automaticFlip = (automaticFlip==false);
  else if(TBbutton[5].hovering()) insertFrame(1);
  else if(TBbutton[6].hovering()) duplicateFrame();
  else if(TBbutton[7].hovering()) setReference(editingFrame);
  else if(TBbutton[8].hovering()) ;
  else if(TBbutton[9].hovering()) deleteFrame(editingFrame);
  
  else if(TBbutton[inp].hovering()) TBbutton[inp].clicked();
  else if(TBbutton[11].hovering()) ;
  else if(TBbutton[12].hovering()) isOnGrid = (isOnGrid==false);
  
  else if(TBbutton[13].hovering()) reset();
  else if(TBbutton[14].hovering()) storeItem('a', a); 
  else if(TBbutton[15].hovering()) TB2open=true; 
  
  updateToolBox();
}
  
function changeFramerate(change){
  FPSrate = round(FPSrate*change);
  FPSrate = constrain(FPSrate, 1,64);
}

function deleteFrame(frame){
  a.splice(frame, 1);
  previewStartFrame--;
  previewStartFrame=constrain(previewStartFrame, 0, a.length);
}

function updateToolBox(){
  
  TBbutton[0].name = "play from frame " +previewStartFrame;
  TBbutton[1].name = "frame " +editingFrame+ " out of total " +a.length;
  TBbutton[8].name = "onion frames: " +(onf-1);
  TBbutton[11].name = "frames per second: " +FPSrate;
  
  let opacity = round(map(referenceOpacity,0,255,0,100));
  TBbutton[7].name = "set frame as reference (" +opacity+ "%)";
  
  
  if (editingFrame<a.length) TBbutton[3].name = "jump to end"; 
  ///this is wrong, jumps at default to the end first then beginning
  else TBbutton[3].name = "jump to beginning";
  
  if(automaticFlip) TBbutton[4].name = "automatic flip: on";
  else TBbutton[4].name = "automatic flip: off";
  
  if(isOnGrid) TBbutton[12].name = "on grid";
  else TBbutton[12].name = "off grid";
  
  
} 

function setReference(frame){
  if(frame<a.length){
    referencedFrame = frame;
    referenceFrame = new Elem(a[frame].pos[0].x,
                              a[frame].pos[0].y,
                              a[frame].k[0])
    for(let i=1; i<a[frame].k.length; i++){
      referenceFrame.add(a[frame].pos[i].x,
                         a[frame].pos[i].y,
                         a[frame].k[i])
    }
  }
}

class Input{
  constructor(x,y,w,h){
    this.pos = createVector(x,y);
    this.size = createVector(w,h);
    this.txt = 'type here';
    this.inputting = false;
  }
  display(){
    
    
    fill(20);
    textSize(this.size.y/2);
    
    //this.size.x=textWidth(this.txt)+margin*2;
    
    if(this.inputting){
      if(millis()%600 < 300){
        text("_", this.pos.x+margin+textWidth(this.txt), this.pos.y+this.size.y*0.7);
      }
    }
    
    
    text(this.txt, this.pos.x+margin,
           this.pos.y+this.size.y*0.7);
    
    
    
    if(this.hovering()) noFill();
    else fill(20,20);
    rect(this.pos.x, this.pos.y, 
         this.size.x, this.size.y);
    fill(20);
    
    
    
    
    //if(this.hovering())text(i, mouseX, mouseY);
  }
  hovering(){
    if(mouseX+gridw/2 > this.pos.x && 
       mouseX+gridw/2 < this.pos.x+this.size.x && 
       mouseY-gridh/2 > this.pos.y && 
       mouseY-gridh/2 < this.pos.y+this.size.y){
      
      return true;
    } else return false;
  }
  clicked(){
    if(this.inputting){
      this.inputting = false;
      this.txt = 'type here';
    } else {
      this.inputting = true;
      this.txt = '';
    }
  }
  type(){
    if (keyCode == 32 || (ignoreKeys()==false &&
        ignoreArrows()==false)) {
      if (keyCode == BACKSPACE || keyCode == DELETE) {
        this.txt = this.txt.substr(0, this.txt.length - 1);
      } else this.txt += key;
    }
    chosenKey = this.txt;
  }
}