var currentColor=
  { red:50,
    green:50,
    blue:0
  }
var windowHeight;





//create a single dynamic bhulding that refreshes 
  function createbuildings(){
  console.log('creating buildings')
  console.log(currentColor)
  var width = Math.floor(Math.random()*100)
  var size = Math.floor(Math.random()*10+2)
  var height = Math.floor(Math.random()*40+1)

  var building = $('<div>')
  building.addClass('building')
  building.attr('style', "right:"+width+"%; width:"+size+"%; transform:scaleY("+height+"); background-color:rgba("+currentColor.red+","+currentColor.green+","+currentColor.blue+",.2)")
  $('.skyLine2').append(building);

      }







 function createMeteor(){
  var red = Math.floor(Math.random()*255)
  var green=Math.floor(Math.random()*255)
  var blue= Math.floor(Math.random()*255)
  var width = Math.floor(Math.random()*80+10)
  var size = Math.floor(Math.random()*10+2)
    var randid = Math.floor(Math.random()*255)


  var newMeteor = $('<div>');

  $(newMeteor).addClass('meteor');
  $(newMeteor).attr("style", "background-image:linear-gradient(to top, rgba("+red+","+green+","+blue+",.4), rgba("+red+","+green+","+blue+",0)); right:"+width+"%; width:"+size+"px")
  $(newMeteor).html('<svg id='+randid+' class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.28 246.36"><defs><style>.cls-'+randid+'{fill:rgba('+red+','+green+','+blue+',1);fill-rule:evenodd;}</style></defs><polygon class="cls-'+randid+'" points="91.92 84.56 0 96.65 71.55 155.61 47.81 246.36 129.28 202.11 211.47 246.36 187.73 155.61 259.28 96.65 166.97 85.03 130.01 0 91.92 84.56"/></g></g></svg>');
    // $(newMeteor).html('<svg id='+randid+' class="star" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 259.28 246.36"><defs>< radialgradient id = '+randid+' cx="50%" cy="50%" r="50%" fx="50%" fy="50%" fill:rgba('+red+','+green+','+blue+',1);fill-rule:evenodd;}</style></defs><polygon class="cls-'+randid+'" points="91.92 84.56 0 96.65 71.55 155.61 47.81 246.36 129.28 202.11 211.47 246.36 187.73 155.61 259.28 96.65 166.97 85.03 130.01 0 91.92 84.56"/></g></g></svg>');


  $('.meteorSky').append(newMeteor);

}

{/* <svg height="150" width="500">
<defs>
  <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
    <stop offset="0%" style="stop-color:rgb(255,255,255);
    stop-opacity:0" />
    <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
  </radialGradient>
</defs>
<ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>  */}





   

function explode(event){
  var chosenStar=$(event.target).parent(); 
  var color = chosenStar.css("background-image");
  color=color.split("rgba")
  color=color[1];
  color=color.split(", 0.4");
  color = color[0]+")"
  color="rgb"+color;
  console.log(color);
  createPallet(color);
  for(let i=0;i<15;i++){
    let piece = $("<div>");
    piece.addClass("piece");
    piece.css("background-color",color);
    let randPath = Math.floor(Math.random()*20)
    let randsize= Math.floor(Math.random()*15)
    piece.addClass("path"+randPath);
    piece.css("height",randsize+"px");
    piece.css("width",randsize+"px");
    chosenStar.append(piece);
    var foreBushes = $('.bush');
    foreBushes.css("background-color",color);
    setTimeout(() => {
      foreBushes.css("background-color",'black');
    },400);

}
}



$(document).on('mouseover',".star",event=>{
event.preventDefault();
event.stopPropagation();
explode(event);
// creategradientsky(event);
var tail = $(event.target).parent();
tail.css("opacity",".5")
setTimeout(() => {
  tail.css("opacity","1")
  setTimeout(() => {
    tail.remove()
    
  }, 1200);
  
}, 100);
event.target.remove();

})





function init(){

  var meteorInterval=setInterval(() => {
    createMeteor()
    setTimeout(() => {
      createMeteor()
      createMeteor()
      
    }, 200);
    setTimeout(() => {
      createMeteor()
      
    }, 400);
   
   
    
  }, 3000);
 var clearMEteorInterval = setInterval(() => {
    $('.meteorSky').html('')
    
  }, 50000);
  

}

init();
buildForeground();
buildMidground();
buildBackground();

function getWindowBottom(){
windowHeight = $('.ground').css("top");
    windowHeight= windowHeight.split("px")
    windowHeight=parseInt(windowHeight[0])
    console.log(windowHeight)
    groundtop=$('.ground').css("height");
    groundtop=groundtop.split('.px')
    groundtop=parseInt(groundtop[0]);
    console.log(groundtop)
    windowHeight+=groundtop
    console.log(windowHeight);
}
getWindowBottom();
$(window).on("resize",event=>{
  getWindowBottom();

})

    windowHeight = $('.ground').css("top");
    windowHeight= windowHeight.split("px")
    windowHeight=parseInt(windowHeight[0])
    console.log(windowHeight)
    groundtop=$('.ground').css("height");
    groundtop=groundtop.split('.px')
    groundtop=parseInt(groundtop[0]);
    console.log(groundtop)
    windowHeight+=groundtop
    console.log(windowHeight);


setTimeout(() => {
setInterval(() => {
  var stars = $(".star")
  for(let i=0;i<stars.length;i++){
    star = stars[i].getBoundingClientRect();
    let tail = $(stars[i]).parent()
    console.log(tail)
    let color = tail.css("background-image");
    color=color.split("rgba")
    color=color[1];
    color=color.split(", 0.4");
    color = color[0]+",0.3)"
    color="rgb"+color;
    console.log(color);
    starposition = star.top;
    starLocation = starposition
    console.log(starLocation);
   
   if(starLocation>windowHeight&&starLocation<windowHeight+100){
     $(".skyLight").css("background-image","linear-gradient(to top, "+color+", 10%, rgb(0, 0, 0)");
     setTimeout(() => {
      $(".skyLight").css("background-image","linear-gradient(to top, "+color+", 5%, rgb(0, 0, 0)");
      setTimeout(() => {
        $(".skyLight").css("background-image","linear-gradient(to top, black, rgb(0, 0, 0)");   
       }, 200);  
     }, 200);
   }
  }  
}, 1000);
}, 3000);

function createPallet(color){
  var pallet = $("<div>")
  pallet.addClass("ammo")
  pallet.addClass('intoMag')
  pallet.css("background-color",color);
  $('.store').append(pallet)

}

function buildForeground(){
  for(i=0;i<10;i++){
    let bush = $("<div>");
    bush.addClass("bush")
    let randWidth = Math.random()*20+5;
    let randHeight = Math.random()*200+100
    let randplace=Math.random()*90;
    let innerBush = $("<div>");
    innerBush.addClass("innerBushFore");
    bush.append(innerBush);
    bush.css('height',randHeight+"%");
    bush.css('width',randWidth+"%");
    bush.css("left",randplace+"%");
    // bush.css("background-color","darkgreen");
    $('.foreground').append(bush);

  }
}
function buildMidground(){
  for(i=0;i<10;i++){
    let bush = $("<div>");
    bush.addClass("bush")
    let randWidth = Math.random()*10+5;
    let randHeight = Math.random()*80+20
    let randplace=Math.random()*90;
    let innerBush = $("<div>");
    innerBush.addClass("innerBushMid");
    bush.append(innerBush);
    bush.css('height',randHeight+"%");
    bush.css('width',randWidth+"%");
    bush.css("left",randplace+"%");
    bush.css("top","-10%");
    // bush.css("background-color","darkgreen");
    $('.midground').append(bush);

  }
}

function buildBackground(){
  for(i=0;i<10;i++){
    let bush = $("<div>");
    bush.addClass("bush")
    let randWidth = Math.random()*5+5;
    let randHeight = Math.random()*10+20
    let randplace=Math.random()*90;
    let innerBush = $("<div>");
    innerBush.addClass("innerBushBack");
    bush.append(innerBush);
    bush.css('height',randHeight+"%");
    bush.css('width',randWidth+"%");
    bush.css("left",randplace+"%");
    bush.css("top","20%");
    // bush.css("background-color","darkgreen");
    $('.background').append(bush);

  }
}

function createOneFirework(color){
  console.log('ball')
  var ball = $("<div>");
  ball.addClass("fireworksBall")
  ball.css("background-color",color);

  for(let i=0;i<35;i++){
    let piece = $("<div>");
    piece.addClass("piece");
    piece.css("background-color",color);
    let randPath = Math.floor(Math.random()*20)
    let randsize= Math.floor(Math.random()*15)
    piece.addClass("path"+randPath);
    piece.css("height",randsize+"px");
    piece.css("width",randsize+"px");
    piece.css("animation-delay","1.5s");
    piece.css("bottom","50%");

    ball.append(piece);
    $('.meteorSky').append(ball);

    var foreBushes = $('.bush');
  setTimeout(() => {
    

    foreBushes.css("background-color",color);
    setTimeout(() => {
      foreBushes.css("background-color",'black');
    },400);
  }, 1500);

}
}

function fireWorks(){
  console.log("firework")
  var ammocache = $(".ammo")
  for(let i=0;i<ammocache.length;i++){
    setTimeout(() => {
      let color = $(ammocache[i]).css("background-color");
      createOneFirework(color)
      $(ammocache[i]).remove()
      
    }, i*500);
  }
}
$('.store').on("click",event=>{
  console.log('fireworkds')
  event.stopPropagation();
  event.preventDefault();
  fireWorks()
})


// background-image: linear-gradient(to top, rgb(73, 64, 46), 10%, rgb(0, 0, 0));
// Window height: 824px
// var bodyRect = document.body.getBoundingClientRect(),
//     elemRect = element.getBoundingClientRect(),
//     offset   = elemRect.top - bodyRect.top;