console.log("Welcome to snake game");

//game constants and variables
let inputDirection ={x:0, y:0};
const foodsound = new Audio('media/eat.mp3');
const gameoversound = new Audio('media/game_over.mp3');
const movesound = new Audio('media/turn.mp3');
const background_music = new Audio('media/bg_music.mp3');
let lastPaintTime=0;
let speed=20;
let snakeArr =[
    {x:15,y:15}
]

let food={x:5,y:10};
let score=0;


//Game Functions
function main(current_time){
    //making game loop
    window.requestAnimationFrame(main);
    // console.log(current_time);
    if((current_time - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=current_time;
    gameEngine();

}

function gameEngine(){
    //part 1: updating the snake array and food
    if(isCollide(snakeArr)){
        gameoversound.play();
        background_music.pause();
        inputDirection={x:0,y:0};
        alert("Game Over. Press any key to play again !")
        snakeArr=[{x:15,y:15}];
        score=0;
        background_music.play();
        document.getElementById('score').innerHTML="Score : " + score;
    }

    //if snake eaten the food increment the score and regenerate the food
    if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
        snakeArr.unshift({x: snakeArr[0].x +inputDirection.x , y: snakeArr[0].y +inputDirection.y});
        foodsound.play();
        food ={x:Math.round(1+29*Math.random()),y:Math.round(1+24*Math.random())};
        score+=1;
        document.getElementById('score').innerHTML="Score : " + score;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem('Hi-score', JSON.stringify(highscoreval));
            document.getElementById('Hi-score').innerText = "Highscore : " + highscoreval;
        }
    }

    //Moving the snake
    for( let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x +=inputDirection.x;
    snakeArr[0].y +=inputDirection.y;


function isCollide(sArr){
    //if you bump into yourself
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }

        else if(snakeArr[0].x >=30 || snakeArr[0].x <=0 || snakeArr[0].y <=0 || snakeArr[0].y>=25){
            return true;
        }
    }
    return false;
}

    
    
    //part 2: 

    // display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('snakehead');
        }
        else{
            snakeElement.classList.add('snakebody');
        }
        board.appendChild(snakeElement);
    })

    // Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('snakefood');
    board.appendChild(foodElement);

}

//  Main logic of game starts here
window.requestAnimationFrame(main);
let highscore=localStorage.getItem('Hi-score');
if(highscore === null){
    highscoreval=0;
    localStorage.setItem('Hi-score', JSON.stringify(highscoreval));
}

else{
    highscoreval = JSON.parse(highscore);
    highscore.innerHTML="Highscore : " + highscore;
}

window.addEventListener('keydown',e=>{
    inputDirection ={x:0,y:1}; //start the game
    background_music.play();
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x=0;
            inputDirection.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x=0;
            inputDirection.y=1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x=-1;
            inputDirection.y=0;
            break;

         case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x=1;
            inputDirection.y=0;
            break;
        default:
            break;

    }
});
