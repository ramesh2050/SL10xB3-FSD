var ctx;
var document;
var window;

window.onload = function () {
   start();
}

function start(){

  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");


  var img = document.createElement("img");
  img.src="https://mdn.mozillademos.org/files/5395/backdrop.png";
  img.onload=start;

  function start(){
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(50, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(150, 15);
    ctx.stroke();
  }
}