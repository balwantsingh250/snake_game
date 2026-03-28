let t = document.querySelector("#t");
let b = document.querySelector("#b");
let l = document.querySelector("#l");
let r = document.querySelector("#r");

//tyour code

const canvas=document.querySelector("canvas");
const ctx=canvas.getContext("2d");

function setCanvasSize(){
canvas.height=450;
canvas.width=330;   
}
setCanvasSize();

window.addEventListener("resize",function(dets){
setCanvasSize();
});

const cellSize=20;
let x=0;
let y=0;
let dx=cellSize;
let dy=0;
let lastTime=0;
let speed=200;

let food={x:0,y:0};

let snake=[{x:60,y:0},{x:40,y:0},{x:20,y:0}];

 function gameloop(time){
    if(time-lastTime>=speed){
        update();
        draw();
        lastTime=time;}
    requestAnimationFrame(gameloop);
 };

 function update(){
  let newHead={x:snake[0].x+dx, y:snake[0].y+dy};
  snake.unshift(newHead);

  
    if(Math.abs(snake[0].x===food.x) && Math.abs(snake[0].y===food.y)){
        generateFood();
    }
    else{
  snake.pop();
    }
    if(snake[0].x>canvas.width) snake[0].x=0;
    if(snake[0].x<0) snake[0].x=canvas.width;
    if(snake[0].y<0) snake[0].y=canvas.height;
    if(snake[0].y>canvas.height) snake[0].y=0;

    for(let i=1;i<snake.length; i++){
    if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
        alert("Game Over");
        restartGame();
    }
}

 };
function draw(){
    ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="lime";
for(let i=0;i<snake.length;i++){
ctx.fillRect(snake[i].x,snake[i].y,cellSize,cellSize);
}
 ctx.fillStyle="red";
drawfood();
}

gameloop();

document.addEventListener("keydown",function(e){
    if((e.key==="ArrowRight")&& dx===0){
        dx=cellSize;
        dy=0;
    }

    else if(e.key==="ArrowDown"&& dy===0){
        dy=cellSize;
        dx=0;
    }

    else if(e.key==="ArrowLeft"&& dx===0){
        dx=-cellSize;
        dy=0;
    }

    else if(e.key==="ArrowUp"&& dy===0){
        dx=0;
        dy=-cellSize;
    }
})

function drawfood(){
    ctx.beginPath();
    ctx.arc(
        food.x+cellSize/2,
        food.y+cellSize/2,
        cellSize/2,
        0,
        Math.PI*2
    );
    
    ctx.fill();
    }

    function generateFood(){
        let col=(canvas.width/cellSize);
        let row=(canvas.height/cellSize);
        
        let newFood;

        while(true){
        newFood={
            x: Math.floor(Math.random()*col)*cellSize,
            y: Math.floor(Math.random()*row)*cellSize
        };
    

    let collison=false;
    for(let i=0;i<snake.length;i++)
    {
        if(snake[i].x===newFood.x && snake[i].y===newFood.y){
            collison=true;
            break;
        }
    
    }
if(!collison)break;
    }
    food=newFood;
}

function restartGame(){
    snake=[{x:60,y:0},{x:40,y:0},{x:20,y:0}];
    dx=cellSize;
    dy=0;

    generateFood();
}

b.addEventListener("click",function(){
   if(dy==0){
    dy=cellSize;
    dx=0;
   } 
})
l.addEventListener("click",function(){
    if(dx===0){
dx=-cellSize;
        dy=0;
    }
    
})
t.addEventListener("click",function(){
    if(dy===0){
     dy=-cellSize;
        dx=0;}
})
r.addEventListener("click",function(){
    if(dx===0){
     dx=cellSize;
        dy=0;
    }
})