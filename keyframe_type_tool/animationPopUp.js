let TBopen=true, TBclosed=false;
let TB2open=true, TB2closed=false;

function manageAnimation(){
  if(mouseX<10 && movedX-5 && TBclosed) TBopen=true;
  if((TBopen==TBclosed) || (TB2open==TB2closed)){
    if(TBopen==false && TBclosed==false) closeBoth();
    if(TBopen==true && TBclosed==true) openTB();
    if(TB2open==true && TB2closed==true) openTB2();
    buttonsFollow();
  }
}

function closeBoth(){
  if(TBYborder>10) TBYborder = TBYborder*0.8;
  else {
    TBclosed=true;
    TBYborder=10;
  }
  
  if(TB2Yborder>10) TB2Yborder = TB2Yborder*0.8;
  else {
    TB2open=false;
    TB2closed=true;
    TB2Yborder=10;
  }
}

function openTB(){
  if(TBYborder*1.3<TBwidth+TBmargin*2) TBYborder = TBYborder*1.3;
  else {
    TBclosed=false;
    TBYborder=TBwidth+TBmargin*2;
  }
}

function openTB2(){ //if 
  if(TB2Yborder*1.3<TBwidth+TBmargin*2) TB2Yborder = TB2Yborder*1.3;
  else {
    TB2closed=false;
    TB2Yborder=TBwidth+TBmargin*2;
  }
}

function buttonsFollow(){
  for(let i=0; i<TBbutton.length; i++){
    TBbutton[i].pos.x = TBYborder-TBwidth-TBmargin;
  }
  for(let i=0; i<buttons.length; i++){
    buttons[i].pos.x = width-TB2Yborder+TBmargin;
  }
  fontPreview.pos.x = width-TB2Yborder+TBmargin;
}