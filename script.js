var runStart = 0;
var music =new Audio("game_music.mp3")
function keyCheck(event) {
    if (event.which == 13) {
        if (runWorkerId == 0) {
            runWorkerId = setInterval(run, 100);
            runStart = 1;
            runSound.play();
            backgroundWorkerId = setInterval(movebackground, 100);
            scoreWorkerId = setInterval(updateScore, 100);
            createBlockWorkerId = setInterval(createBlock, 100);
            moveBlockWorkerId = setInterval(moveBlocks, 100);
            music.loop=true;
            music.play();
            
            
        }
    }

    if (event.which == 32) {
        if (runStart == 1) {
            if (jumpWorkerId == 0) {
                clearInterval(runWorkerId);
                runSound.pause();
                runWorkerId = -1;
                jumpWorkerId = setInterval(jump, 100);
                jumpSound.play();
            }
        }

    }
}


// run function

var player = document.getElementById("player");
var runImageNumber = 1;
var runWorkerId = 0;

// applying run sound
var runSound = new Audio("run.mp3");
runSound.loop = true;


function run() {
    runImageNumber++
    if (runImageNumber == 12) {
        runImageNumber = 1;
    }
    player.src = "Run (" + runImageNumber + ").png";


}


//jump function

var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMargineTop = 320;
var jumpSound = new Audio("jump.mp3");

function jump() {
    jumpImageNumber++

    if (jumpImageNumber <= 7) {
        playerMargineTop = playerMargineTop - 20;
        player.style.marginTop = playerMargineTop + "px";
    }

    if (jumpImageNumber >=8) {
        playerMargineTop = playerMargineTop + 20;
        player.style.marginTop = playerMargineTop + "px";
    }

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run, 100);
        runSound.play();
    }

    player.src = "jump (" + jumpImageNumber + ").png";
}


// move background

var background = document.getElementById("background");
var backgroundX = 0;
backgroundWorkerId = 0;
function movebackground() {
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px";
}

// function update score

var scoreWorkerId = 0;
var score = document.getElementById("score");
var newScore = 0;
function updateScore() {
    newScore = newScore + 5;
    score.innerHTML = newScore;

}

//clame create


var createBlockWorkerId = 0;
var playerMarginLeft = 600;
var blockId = 1;
function createBlock() {
    var block = document.createElement("div");
    block.className = "block";
    block.id = "block" + blockId;
    blockId++;


    var gap = Math.random() * (1000 - 400) + 400;
    playerMarginLeft = playerMarginLeft + gap;
    block.style.marginLeft = playerMarginLeft + "px";
    background.appendChild(block);
}

//move blocks
var moveBlockWorkerId = 0;
function moveBlocks() {
    
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentBlock.style.marginLeft = newMarginLeft + "px";



                //181-81

        if(newMarginLeft<=181){
            if(newMarginLeft>=81){
                if(playerMargineTop<=320){
                    if(playerMargineTop>=290){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(createBlockWorkerId);
                        clearInterval(moveBlockWorkerId);
                        deadWorkerId=setInterval(dead,100);
                        deadSound.play();
                        
                    }
                }
            }
        }

     

    }
}


// function dead
var deadImageNumber=1;
var deadWorkerId=0;
var deadSound = new Audio("dead.mp3");

function dead(){
    deadImageNumber++
    if(deadImageNumber==18){
        deadImageNumber=17;
        player.style.marginTop = "320px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("endScore").innerHTML = newScore;
        music.pause();
    }
     
    player.src="Dead ("+deadImageNumber+").png"
}

var vid = document.getElementById("myVideo");
vid.playbackRate = 3.0;






var trySound= new Audio("newlevel.mp3");
function restart() {
    location.reload();
   
    
    
}

