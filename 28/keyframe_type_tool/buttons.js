let buttons=[];
let margin = 10;
let fontPreview;

function displayButtons(){
  fontPreview.display(height);
  for(let i=0; i<buttons.length; i++){
    buttons[i].display(true);
    if( buttons[i].hovering()) explainFont(i);
  }
}

function explainFont(i){
  let t;
  
  {
    if(i==0) t="click to randomize";
    else if(i==1)t="scroll to adjust"
    else if(i==2){
      if (font[currentFont].fontType.length==1) t="single font in font family - font orphan :(";
      else t="scroll to adjust";
    }
    else if(i==3) t="function in maintanance";
    else t="";
    
    if(i==2){
      if (buttons[2].name){}
    }
  }
  
  
  {
    let h=buttons[i].size.y;
    textSize(h/2);
    let w = textWidth(t)+margin*2;
    
    let x=buttons[i].pos.x-
      (w+
      TBmargin*2);
    let y=buttons[i].pos.y;
    
    fill(20);
    rect(x,y,w,h);
    fill(200);
    text(t,x+margin, y+h*0.7);
  }
}

function buttonClicked(){
  if(buttons[0].hovering()) {
    nextFont("random");
    updateButtomNames();
    setFont();
  }
}

function buttonsScroll(delta){
  if(buttons[0].hovering()){
    if(delta>0) nextFont("next");
    else nextFont("previous");
  } else if(buttons[1].hovering()){
    if(delta>0) changeFontSize(1); 
    else changeFontSize(-1); 
  } else if(buttons[2].hovering()){
    if(delta>0) font[currentFont].increaseWeight();
    else font[currentFont].decreaseWeight();
  }
  
  updateButtomNames();
  setFont();
}

function updateButtomNames(){
  buttons[0].name = 'font: ' + font[currentFont].name;
  buttons[1].name = 'size: ' + fontSize;
  buttons[2].name = 'weight: ' + font[currentFont].weightPercentage;
  updateGrid();
}

function setupButtons(y,h){
  // icons: ◁ ▷
  // hovering: ◄ ►
  
  
  
  {
    
    let i=0;
    let w=TBwidth;
    let x=width-TBmargin-w;

    buttons[i] = new Button('font: ' + font[currentFont].name,x,y,w,h);
    y+=(h+margin);

    i++; buttons[i] = new Button('size: ' + fontSize,x,y,w,h);
    y+=(h+margin);

    i++; buttons[i] = new Button('weight: ' + font[currentFont].weightPercentage,x,y,w,h);
    y+=(h+margin);

    i++; buttons[i] = new Button('color: black',x,y,w,h);
    y+=(h+margin);
    
    fontPreview = new FontPreview(x,y,w);
  }
  
  currentFont=5;
  fontSize=25;
  updateButtomNames();
  
}

class FontPreview{
  constructor(x,y,w){
    this.pos = createVector(x,y);
    this.wide = w;
  }
  display(limit){
    let m=fontSize;
    let m2=fontSize*2;
    let pm= m;
    fill(20);
    
    textSize(m);

    let x=this.pos.x +m, y=this.pos.y + m2;

    for(let i=33; i<127; i++){
      if(x > this.pos.x+this.wide-m){
        x=this.pos.x +m;
        y+= m2;
      }
      if (y < limit-margin) text(char(i), x,y);
      else i=127;
      x+= m2;
    }

    noFill();
    let high= y-this.pos.y +m;
    high = constrain(high, 0, limit-this.pos.y-margin)
    rect(this.pos.x, this.pos.y, this.wide, high);

  }
}

class Button{
  constructor(name, x,y,w,h, func){
    this.pos = createVector(x,y);
    this.size = createVector(w,h);
    this.name = name;
    this.func = func;
    this.clickable = true;
  }
  display(boxedIn){
    
    if (boxedIn) {
      if(this.hovering() && this.clickable) noFill();
      else fill(170,130);
      rect(this.pos.x, this.pos.y, 
          this.size.x, this.size.y);
    }
    
    fill(20);
    textSize(this.size.y/2);
    text(this.name, this.pos.x+margin, this.pos.y+this.size.y*0.7);

  }
  hovering(){
    if(mouseX+gridw/2 > this.pos.x && 
       mouseX+gridw/2 < this.pos.x+this.size.x && 
       mouseY-gridh/2 > this.pos.y && 
       mouseY-gridh/2 < this.pos.y+this.size.y){
      return true;
    } else return false;
  }
  execute(){
    if(this.hovering()) this.func();
  }
}