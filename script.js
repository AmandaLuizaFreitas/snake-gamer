//definir elementos HTML
const board = document.getElementById("gamer-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

// variável do jogo
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let highScore = 0;
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

//Desenhe o mapa do jogo, cobra, comida
function draw(){
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore()
};
//Desenhe a cobra
function drawSnake(){
snake.forEach((segment)=>{
 const snakeElement = createGameElement('div','snake');
 setPosition(snakeElement,segment);
 board.appendChild(snakeElement )
})
};
// criar cobra e a comida cubo/div
function createGameElement(tag, className){
  const element = document.createElement(tag);
  element.className = className;
  return element;
  
};
// posição da cobra e da comida
function setPosition(element,position){
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;

}



// função desenhar comida
function drawFood(){
  if(gameStarted){
    const foodElement = createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
  }
  

};
// gerar comida
function generateFood(){
 const x = Math.floor(Math.random() * gridSize) + 1 ;
 const y = Math.floor(Math.random() * gridSize) + 1 ;
 return {x,y}
};
// movimento da cobra
function move(){
const head = {...snake[0]};
switch(direction){
 case 'up':
  head.y--;
  break;
 case 'down':
  head.y++;
  break;
 case 'left':
  head.x--;
  break;
 case 'right':
  head.x++;
  break;
}
snake.unshift(head);
//snake.pop();
if(head.x === food.x && head.y === food.y){
  food = generateFood();
  increasesSpeed();
  clearInterval(gameInterval) // limpando o intervalo anterior
   
  gameInterval = setInterval(()=>{
    move();
    checkCollision();
    draw();
  },gameSpeedDelay);
}else{
  snake.pop();
}


}
// movimento de direção da cobra
//setInterval(()=>{
  //move();//Mova-se primeiro
  //draw();
//},200);
// inicio do jogo
function startGame(){
  gameStarted= true; // Acompanhe uma corrida
  instructionText.style.display = "none";
  logo.style.display = "none";
  gameInterval = setInterval(()=>{
    move();
    checkCollision();
    draw();
  },gameSpeedDelay);
}
// ouvinte de evento de barra de espaço de tecla

function handleKeyPress(event){
if((!gameStarted && event.code === "Space")||
   (!gameStarted && event.key === "")
){
  startGame()
}else{
  switch(event.key){
    case 'ArrowUp':
      direction ='up';
      break;
    case 'ArrowDown':
      direction ='down';
      break;
    case 'ArrowLeft':
      direction ='left';
      break;
    case 'ArrowRight':
      direction ='right';
      break;

      
  }
}
};
document.addEventListener("keydown",handleKeyPress);
// velocidade do jogo 
function increasesSpeed(){
  
  if(gameSpeedDelay > 150){
    gameSpeedDelay -= 5;
  }else if(gameSpeedDelay > 100){
    gameSpeedDelay -= 3;
  }
  else if(gameSpeedDelay > 50){
    gameSpeedDelay -= 2;
  }
  else if(gameSpeedDelay > 25){
    gameSpeedDelay -= 1;
  }
  
}

function checkCollision(){
 const head = snake[0];
 if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){
  resetGame();
 }

 for(let i = 1; i < snake.length; i++){
   if(head.x === snake[i].x && head.y === snake[i].y){
    resetGame();
   }
 }
}
// função de reiniciar 
function resetGame(){
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();

};
// função da pontuação
function updateScore(){
   const currentScore = snake.length -1;
   score.textContent = currentScore.toString().padStart(3,"0");
  
  }
 // função de parar o jogo 
  function stopGame(){
    clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
 }

// função da pontuação mais alta
function updateHighScore(){
 const currentScore = snake.length -1;
 if(currentScore > highScore){
  highScore = currentScore;
  highScoreText.textContent =   highScore.toString().padStart(3,'0');
  highScoreText.style.display = 'block';
 }

};

