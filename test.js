const express = require("express")
let res = require("express/lib/response")

const readLineSync = require("readline-sync")
const {game,inputNames,welcome,displayName} = require("./game")
const { request } = require("express")
const app = express()

// let player1 = readLineSync.question(`Enter your name `)
// console.log(`${player1} You are Player1`)

// let player2 = readLineSync.question(`Enter your name `)
// console.log(`${player2} You are Player2`)

let player1
let player2
app.get("/", welcome);

app.get('/inputnames', (req,res) =>{
  player1 = request.query.player1
  
  player2 = request.query.player2
  
  res.send(`${player1} You are Player1, ${player2} You are Player2`)
  
})
app.get("/displayName")

app.get('/game', game )


app.get("/scores",(req,res) =>{
  
  if (countPlayer1 < countPlayer2) {
    res.send(`${player1} rolled set of dice ${countPlayer1} times and ${player2} rolled set of dice ${countPlayer2} times. ${player1} wins!!!`)
  }
  else {
    res.send(`${player1} rolled set of dice ${countPlayer1} times and ${player2} rolled set of dice ${countPlayer2} times. ${player2} wins!!!`)
  } 
})
const PORT = 4000
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);

// function displayName(){
  //   console.log(`Welcome to Tenzi game ${player1} and ${player2}`)
  // }
  
  // function welcome(req, res) {
//   res.send("Welcome to Tenzi Game");
// }
// function rollSetOfDice(times){
//   let diceArray = []
//   for(let dice = 1;dice <= times;dice++){
  //   diceArray.push(rollDice())
// }
// return diceArray
// }

// function rollDice(){
// number = Math.floor((Math.random() * 6) + 1)
// return number
// }

// function getMode(array) {
  // var mostFrequnet = null,mostFrequnetItem ;
  // var arr1 = array
  // arr1.sort();
  // for (var i=0;i<arr1.length;i++){
    
//    var single = arr1[i];
//    var total = (arr1.lastIndexOf(single)-arr1.indexOf(single))+1;

//    if(total > mostFrequnet) {

//        mostFrequnetItem = arr1[i];
//        mostFrequnet = total;
//        i= arr1.lastIndexOf(single)+1;

//   }
// }
// return mostFrequnetItem;
// }

// function playTenzi(playerName){
// let diceToRoll = 10;
// let rollCounter = 0;
// let setAsideDice = []
// let currentMode;
// let diceStatus = rollSetOfDice(diceToRoll)
// currentMode = getMode(diceStatus)
// rollCounter++
// while(diceStatus.includes(currentMode))
//   {
//     setAsideDice.push(diceStatus[diceStatus.indexOf(currentMode)])
//     diceStatus.splice(diceStatus.indexOf(currentMode), 1)
// }

// diceToRoll = diceToRoll - setAsideDice.length

// while (diceToRoll>0)
// {
//   diceStatus = rollSetOfDice(diceToRoll)
 
//   if(getMode(diceStatus) === currentMode)
//   {
   
//     while(diceStatus.includes(currentMode))
//     {
//       setAsideDice.push(diceStatus[diceStatus.indexOf(currentMode)])
     
//       diceStatus.splice(diceStatus.indexOf(currentMode), 1)
     
     
//       diceToRoll--
//     }
 
//   }
//   rollCounter++
// }
// return rollCounter

// }
//  const countPlayer1 = (playTenzi(player1))
//  const countPlayer2 = (playTenzi(player2))

// if (countPlayer1 < countPlayer2)
// {
//   console.log(`Tenzi!!! ${player1} wins in ${countPlayer1} steps`)
// }
// else
// {
//   console.log(`Tenzi!!! ${player2} wins in ${countPlayer2} steps`)
// }

// app.get('/random.text', (req, res) => {
//   res.send('random.text')
// })


// app.get("/roll1",(req,res) =>{
//   res.send(`${player1} rolled set of dice`)
// })

// app.get("/roll2",(req,res) =>{
//   res.send(`${player2} rolled set of dice`)
// })



const express = require("express");
const { welcome, displayName, playTenziFun } = require("./game");
const { request } = require("express");
const app = express();

let player1;
let player2;

app.get("/", welcome);

app.get("/playerNames", (req, res) => {
  if (player1 || player2) {
    res.send(
      `${displayName(
        player1,
        player2
      )}. ${player1} is now Player1, ${player2} is now Player2. Please see http://localhost:4000/instructions`
    );
  } else {
    res.send(
      `No player names provided. Please post player names first! If you have used get method to send names, please do so using post method!`
    );
  }
});

app.post("/playerNames", (req, res) => {
  req.query.player1 = player1;
  req.query.player2 = player2;

  if (player1 && player2) {
    res.send(
      `${displayName(
        player1,
        player2
      )}. ${player1} is now Player1, ${player2} is now Player2. Please see http://localhost:4000/instructions`
    );
  } else if (player1 === undefined && player2 === undefined) {
    res.send(`No inputs provided. Please send player names!`);
  } else if (player1 === undefined || player2 === undefined) {
    res.send(
      `Only one player input provided. Please resubmit your post request with both player names`
    );
  }
});

app.get("/instructions", (req, res) => {
  res.send(
    `Please curl http://localhost:4000/playgame to continue playing this game.`
  );
});

let winner;

app.get("/playgame", (req, res) => {
  if (player1) {
    const countPlayer1 = playTenziFun();
    const countPlayer2 = playTenziFun();

    if (countPlayer1 < countPlayer2) {
      winner = player1;
      res.send(
        `Tenzi!!! ${player1} rolled ${countPlayer1} times and ${player2} rolled ${countPlayer2} times. So, ${player1} wins!!!`
      );
    } else {
      winner = player2;
      res.send(
        `Tenzi!!! ${player1} rolled ${countPlayer1} times and ${player2} rolled ${countPlayer2} times. So, ${player2} wins!!!`
      );
    }
  } else {
    res.send(
      `No players found. Please pass player names using this command: curl http://localhost:4000/playerNames?player1={yourName}&player2={yourname}`
    );
  }
});

app.post("/scores",(req,res) => {
  // let name1 = player1State.name
  // let score1 = player1State.score
  // let name2 = player2State.name
  // let score2 = player2State.score
  // res.send(`${name1} : ${score1},${name2} : ${score2}`)

 
})

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
