let gameSeq = [] ;
let userSeq = [] ;
let highscore = localStorage.getItem("highscore") || 0  ; // for local storage (if not ,it default to 0 )
// let highScore = [] ;
let btns = ["yellow" , "red", "purple" , "green"];
let started = false ;
let level = 0 ;

let scoreText = document.querySelector(".status");
// let score = document.querySelector(".score");


let resetbtn = document.querySelector(".res");
let scoreDisplay = document.querySelector(".score");
scoreDisplay.innerText = `High Score :${highscore}`;  // initial 

// keypress
document.addEventListener("keypress", function (e){
  if(e.key ==="Enter" && !started ){
   console.log("Game Started ");
   started = true ; 
   levelUP();
  }
});

function gameFlash(btn){
  btn.classList.add("flash");
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
}  

function userFlash(btn){
  btn.classList.add("userflash");
  setTimeout(function(){
    btn.classList.remove("userflash");
  },250);
}  


// level Increase 
function levelUP(){
  userSeq = [];
  level++;
  scoreText.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4 );
  let randomcolor = btns[randIdx]; 
  let randbtns = document.querySelector(`.${randomcolor}`);

  gameSeq.push(randomcolor);
  console.log(gameSeq);
 gameFlash(randbtns);
}

function checkans(idx){
  if(userSeq[idx] === gameSeq[idx]){
    if(userSeq.length === gameSeq.length){
      setTimeout(levelUP,1000);
    }
  } else {
if(level > highscore ){
  highscore = level; 
  localStorage.setItem("highscore" ,highscore);  
  scoreDisplay.innerText = `High Score : ${highscore}`;
}

scoreText.innerHTML = `Game Over! Your Score Was ${level}  <br> Press Enter key to start    `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    } ,150);
    gamesound();
  reset ();
  }
}  
// 
function btnpress(){
 let bttn = this;
 userFlash(bttn);
 usercolor = bttn.getAttribute("id");
userSeq.push(usercolor);
gamesound();  
 checkans(userSeq.length-1);
}
let allbtn  = document.querySelectorAll(".btn");
for(btn of allbtn){
  btn.addEventListener("click", btnpress );
}
// sound Add 
 function gamesound(){
  let audio = new Audio("game_sound.mp3");
  audio.play();
}
// // High Score 
//   function highscoreMax(highscore){
//     return Math.max(...highscore);
//   } 
 resetbtn.addEventListener("dblclick",function(e){
    //  reset();
    if(started=== true ){
          e.preventDefault();
      reset();
      scoreText.innerText = `Press Enter Keys to Start The Game `;     
    }
   console.log(" RESET BUTTON CLICKED ");
  });

// extra reset button 
document.addEventListener("keydown" , function(e){
  if((e.ctrlKey && e.key === "r" ) && started){
    e.preventDefault();
    reset();
    scoreText.innerText = `Press Enter Keys to Start The Game `;     
  }
  console.log(" RESET BUTTON CLICKED by cntl + R  ");
})
// Reset game status 
function reset(){
  started  = false ;
  gameSeq = [] ;
  userSeq = [] ;
  level = 0 ;
  }









