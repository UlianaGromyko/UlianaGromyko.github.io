let font=[];
let currentFont=0;
let fontSize=40;

function changeFontSize(i){ //either -1 or 1
  fontSize+=(5*i);
  fontSize=constrain(fontSize, 15, 60);
}

function nextFont(type){
  if(type == "next"){
    currentFont++;
    if(currentFont >= font.length) currentFont=0;
  } 
  else if (type == "previous"){
    currentFont--;
    if(currentFont<=0) currentFont = font.length-1;
  } 
  else if (type == "random"){
    currentFont = floor(random(font.length));
    font[currentFont].currentWeight = floor(random(font[currentFont].fontType.length));
    fontSize = random([15,20,25,30,35,40,45,50,55,60]);
  }
  setFont();
  
} //type = "next" / "previous" / "random"

function preloadFonts(){
  let f=[];
  {
    f[0] = loadFont("fonts/Azeret/AzeretMono-Black.ttf");
    f[1] = loadFont("fonts/Azeret/AzeretMono-ExtraBold.ttf");
    f[2] = loadFont("fonts/Azeret/AzeretMono-Bold.ttf");
    f[3] = loadFont("fonts/Azeret/AzeretMono-SemiBold.ttf");
    f[4] = loadFont("fonts/Azeret/AzeretMono-Medium.ttf");
    f[5] = loadFont("fonts/Azeret/AzeretMono-Regular.ttf");
    f[6] = loadFont("fonts/Azeret/AzeretMono-Light.ttf");
    f[7] = loadFont("fonts/Azeret/AzeretMono-ExtraLight.ttf");
    f[8] = loadFont("fonts/Azeret/AzeretMono-Thin.ttf");
  }
  font[0] = new FontFamily("Azeret", f, 5);
  
  {
    f=[];
    f[0] = loadFont("fonts/CourierPrime/CourierPrime-Bold.ttf");
    f[1] = loadFont("fonts/CourierPrime/CourierPrime-Regular.ttf");
  }
  font[1] = new FontFamily("CourierPrime", f, 1);
  
  {
    f=[];
    f[0] = loadFont("fonts/DM/DMMono-Light.ttf");
    f[1] = loadFont("fonts/DM/DMMono-Medium.ttf");
  }
  font[2] = new FontFamily("DM", f, 1);
  
  {
    f=[];
    f[0] = loadFont("fonts/Fragment/FragmentMono-Regular.ttf");
  }
  font[3] = new FontFamily("Fragment", f, 0);
  
  {
    f=[];
    f[0] = loadFont("fonts/Geist/GeistMono-ExtraBold.ttf");
    f[1] = loadFont("fonts/Geist/GeistMono-Bold.ttf");
    f[2] = loadFont("fonts/Geist/GeistMono-SemiBold.ttf");
    f[3] = loadFont("fonts/Geist/GeistMono-Medium.ttf");
    f[4] = loadFont("fonts/Geist/GeistMono-Regular.ttf");
    f[5] = loadFont("fonts/Geist/GeistMono-Light.ttf");
    f[6] = loadFont("fonts/Geist/GeistMono-ExtraLight.ttf");
    f[7] = loadFont("fonts/Geist/GeistMono-Thin.ttf");
  }
  font[4] = new FontFamily("Geist", f, 4);
  
  {
    f=[];
    f[0] = loadFont("fonts/IBMPlex/IBMPlexMono-Bold.ttf");
    f[1] = loadFont("fonts/IBMPlex/IBMPlexMono-SemiBold.ttf");
    f[2] = loadFont("fonts/IBMPlex/IBMPlexMono-Medium.ttf");
    f[3] = loadFont("fonts/IBMPlex/IBMPlexMono-Regular.ttf");
    f[4] = loadFont("fonts/IBMPlex/IBMPlexMono-Light.ttf");
    f[5] = loadFont("fonts/IBMPlex/IBMPlexMono-Thin.ttf");
  }
  font[5] = new FontFamily("IBMPlex", f, 3);
  
  {
    f=[];
    f[0] = loadFont("fonts/Lekton/Lekton-Bold.ttf");
    f[1] = loadFont("fonts/Lekton/Lekton-Regular.ttf");
  }
  font[6] = new FontFamily("Lekton", f, 1);
  
  {
    f=[];
    f[0] = loadFont("fonts/Nova/NovaMono-Regular.ttf");
  }
  font[7] = new FontFamily("Nova", f, 0);
  
  {
    f=[];
    f[0] = loadFont("fonts/Overpass/OverpassMono-Bold.ttf");
    f[1] = loadFont("fonts/Overpass/OverpassMono-Medium.ttf");
    f[2] = loadFont("fonts/Overpass/OverpassMono-Regular.ttf");
    f[3] = loadFont("fonts/Overpass/OverpassMono-Light.ttf");
  }
  font[8] = new FontFamily("Overpass", f, 2);
  
  {
    f=[];
    f[0] = loadFont("fonts/Roboto/RobotoMono-Bold.ttf");
    f[1] = loadFont("fonts/Roboto/RobotoMono-SemiBold.ttf");
    f[2] = loadFont("fonts/Roboto/RobotoMono-Regular.ttf");
    f[3] = loadFont("fonts/Roboto/RobotoMono-Light.ttf");
    f[4] = loadFont("fonts/Roboto/RobotoMono-ExtraLight.ttf");
    f[5] = loadFont("fonts/Roboto/RobotoMono-Thin.ttf");
  }
  font[9] = new FontFamily("Roboto", f, 2);
  
  {
    f=[];
    f[0] = loadFont("fonts/ShareTech/ShareTechMono-Regular.ttf");
  }
  font[10] = new FontFamily("ShareTech", f, 0);
  
  {
    f=[];
    f[0] = loadFont("fonts/DepartureMono-Regular.otf");
  }
  font[11] = new FontFamily("Departure", f, 0);
  
}

function setFont(){
  textFont(font[currentFont].fontType[font[currentFont].currentWeight])
}

class FontFamily{
  constructor(name, allFonts, defaultOne){
    this.name = name;
    this.fontType = allFonts;
    this.currentWeight = defaultOne;
    this.weightPercentage;
    this.getWeightPercentage();
  }
  getWeightPercentage(){
    
    if(this.fontType.length==1) this.weightPercentage = "one weight";
    else if(this.currentWeight == 0) this.weightPercentage="max";
    else if(this.currentWeight == this.fontType.length-1) this.weightPercentage="min";
    else {
      this.weightPercentage = 100-round((this.currentWeight / (this.fontType.length))*100);
      this.weightPercentage+="%"
    }
  }
  increaseWeight(){
    if(this.currentWeight < this.fontType.length-1) this.currentWeight++;
    this.getWeightPercentage();
  }
  decreaseWeight(){
    if(this.currentWeight > 0) this.currentWeight--;
    this.getWeightPercentage();
  }
}