const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const cw = canvas.width = 480;
const ch = canvas.height = 320;


let score = 0;

const ballRadius = 10;

let paddlePosition = cw/2;
let paddleWidth = 80,
    paddleHeight = 15;

let x = 200,
    y = 200,
    dx = 2,
    dy = -2;

// Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 2 };
    }
}

function drawBg() {
    ctx.fillStyle = "#717171";
    ctx.fillRect(0,0,cw,ch);
}


function drawBall() {
    ctx.beginPath();
    ctx.arc(x,y, ballRadius,0,2*Math.PI);
    ctx.fillStyle = "#dd005d";
    ctx.fill();
//    ctx.stroke();
    ctx.closePath();

}

function drawPaddle() { 
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(paddlePosition - paddleWidth/2, ch - paddleHeight - 10, paddleWidth, paddleHeight)
}

function paddleMove(event) {
    paddlePosition = event.clientX - canvas.offsetLeft;
//    document.getElementById("coords").innerHTML = paddlePosition;
    
    if (paddlePosition < paddleWidth/2) paddlePosition = paddleWidth/2;
    else if(paddlePosition > cw - paddleWidth/2) paddlePosition = cw - paddleWidth/2;
}

function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            if(bricks[c][r].status >= 1){
                if(bricks[c][r].status == 2) ctx.fillStyle = "#0095DD";
                else if(bricks[c][r].status == 1) ctx.fillStyle = "#c300dd";
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            }    
            
        }
    }
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++){
        for(r=0; r<brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status >= 1) {
            if(x > b.x - dx && x < b.x -dx + brickWidth && y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
                dy = -dy;
                b.status--;
                score++;
            }
            }
        }
    }
}

function showScore() {
    ctx.font = "16px Calibri";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Score: "+score, 8, 20);
}

function win() {
    ctx.font = "26px Calibri";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("You won!", 200, 200);
}


function game() {
    ctx.clearRect(0,0,cw,ch);
    drawBg();
    drawBall();
    x += dx;
    y += dy;
    
    if (x >= cw - ballRadius || x <= ballRadius) {
        dx = -dx;
        }
    if (y <= ballRadius) {
        dy = -dy;
    } else if (y >= ch - 10 - paddleHeight - ballRadius) {
            if(x > paddlePosition - paddleWidth/2 - ballRadius && x < paddlePosition + paddleWidth/2 + ballRadius) {
                dy = -dy;
            } else
            {    document.getElementById("coords").innerHTML = "game over";
                document.location.reload();

             }
               }
    collisionDetection();
    drawPaddle();
    drawBricks();
    showScore();
    
    if(score == 30) win();
}


canvas.addEventListener("mousemove", paddleMove);

setInterval(game, 10);