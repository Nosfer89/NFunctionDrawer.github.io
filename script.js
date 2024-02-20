/* Variables : */

var board = document.getElementById("board");
var ctx = board.getContext("2d");
var equation = document.getElementById("equation");
var eq;
var drawbtn = document.getElementById("drawbtn");
var clearbtn = document.getElementById("clearbtn");
var dbtn = document.getElementById("dbtn");
var zoomer = document.getElementById("zoomer");
var red = document.getElementById("red");
var blue = document.getElementById("blue");
var green = document.getElementById("green");
var r;
var g;
var b;
var colored = document.getElementById("colored");
/* Math functions : */

var cos = Math.cos;
var tan = Math.tan;
var sin = Math.sin;
var p = Math.pow;
var sqrt = Math.sqrt;
var abs = Math.abs;
var log = Math.log10;
var random = Math.random;
var e = Math.e;
var pi = Math.PI;
/* Screen : */


board.width = 1600;
board.height = board.width*80/100;



/* Canvas : */

ctx.translate(board.width/2,board.height/2);
function drawArea(){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(-board.width/2,0);
    ctx.lineTo(board.width/2,0);
    ctx.moveTo(0,-board.height/2);
    ctx.lineTo(0,board.height/2);


    for(i=-board.height/2;i<board.height/2;i+=20){
        ctx.moveTo(-5,i);
        ctx.lineTo(5,i);
        ctx.stroke();
    }
    for(i=-board.width/2;i<board.width/2;i+=20){
        ctx.moveTo(i,-5);
        ctx.lineTo(i,5);
        ctx.stroke();
    }
    for(i=-board.height/2;i<board.height/2;i+=20){
        ctx.lineWidth =0.5;
        ctx.moveTo(-board.width/2,i);
        ctx.lineTo(board.width/2, i);
        ctx.stroke();
    }
    for(i=-board.width/2;i<board.width/2;i+=20){
        ctx.lineWidth =0.5;
        ctx.moveTo(i,-board.height/2);
        ctx.lineTo(i,board.height/2);
        ctx.stroke();
    }
    ctx.stroke();
    ctx.closePath();
}
drawArea();


/* Eq var : */

var x;
var x1;
var y;
var y1;
var f;
var f1;
var d = 0.000001;

var dx;
var dy;
var dx1;
var dy1;


/* Conditions */

var isDrawing = false;



/* colors : */

function coloring(){
    g=green.value;
    b=blue.value;
    r=red.value;
    colored.style.background = "rgb("+r+","+g+","+b+")";
    colored.style.boxShadow = "10px 10px 10px rgba("+r+","+g+","+b+",0.5) ,-10px 10px 10px rgba("+r+","+g+","+b+",0.5) ,10px -10px 10px rgba("+r+","+g+","+b+",0.5) ,-10px -10px 10px rgba("+r+","+g+","+b+",0.5) ";
    requestAnimationFrame(coloring);
}
coloring();


/* Equations : */

equation.onchange = function(){
    eq = equation.value;
    x=-board.width/2;
}


drawbtn.onclick = function draw(){
    equation.value = "";
        if(x<board.width/2){
            x1=x+1;
            y = eq.replaceAll("x","*"+x/20);
            f = -eval(y)*20;
            y1 = eq.replaceAll("x","*"+x1/20);
            f1 = -eval(y1)*20;
            ctx.lineWidth = 2;
            ctx.strokeStyle =  "rgb("+r+","+g+","+b+")";
            ctx.beginPath();
            ctx.moveTo(x,f);
            ctx.lineTo(x1,f1);
            ctx.stroke();
            ctx.closePath();
            if(Math.round(f)==0){
                console.log("x=",x/20);
            }
            if(Math.round(f1)==0){
                console.log("x1=",x1/20);
            }
            x++;
           
            requestAnimationFrame(draw);
        }
        
}
clearbtn.onclick = function clear(){
    ctx.clearRect(-board.width/2,-board.height/2,board.width,board.height);
    drawArea();
}
dbtn.onclick = function derive(){
        if (x < board.width / 2) {
            x1 = x + 1;
            dx = x+d;
            dx1 = x1+d;
            y = eq.replaceAll("x", "*" + x / 20);
            dy = eq.replaceAll("x","*"+dx/20);
            dy1 = eq.replaceAll("x","*"+dx1/20)
            f = -((eval(dy)-eval(y))/(dx-x))*20*20;
            y1 = eq.replaceAll("x", "*" + x1 /20);
            f1 = -((eval(dy1)-eval(y1))/(dx1-x1))*20*20;
            ctx.lineWidth = 2;
            ctx.strokeStyle =  "rgb("+r+","+g+","+b+")";
            ctx.beginPath();
            ctx.moveTo(x, f);
            ctx.lineTo(x1, f1);
            ctx.stroke();
            ctx.closePath();
            x++;
            requestAnimationFrame(derive);
        }
    
}



