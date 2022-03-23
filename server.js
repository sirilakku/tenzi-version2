const express = require("express");
let res = require("express/lib/response");

const { welcome, displayName, playTenziFun, player } = require("./game");
const { request } = require("express");
const app = express();

app.get("/", welcome);

app.get("/inputnames", (req, res) => {
  player.player1.name = req.query.player1;
  player.player2.name = req.query.player2;
  
  
  res.send(
    `${displayName(
      player.player1.name,
      player.player2.name
    )}. ${player.player1.name} is now Player1, ${player.player2.name} is now Player2. Please see "http://localhost:4000/instructions"`
  );
});

app.get("/instructions", (req, res) => {
  res.send(
    `Please curl "http://localhost:4000/playgame" to continue playing this game.`
  );
});

app.get("/playgame", (req, res) => {
  if (player.player1.name) {
    const countPlayer1 = playTenziFun();
    const countPlayer2 = playTenziFun();


    if (countPlayer1 < countPlayer2) {
      player.player1.score = player.player1.score + 1;
      res.send(
        `Tenzi!!! ${player.player1.name} rolled ${countPlayer1} times and ${player.player2.name} rolled ${countPlayer2} times. So, ${player.player1.name} wins!!! and Score = ${player.player1.score}`  
      );
    } else {
      player.player2.score = player.player2.score + 1;
      res.send(
        `Tenzi!!! ${player.player1.name} rolled ${countPlayer1} times and ${player.player2.name} rolled ${countPlayer2} times. So, ${player.player2.name} wins!!! and Score = ${player.player2.score}`
      );
    }
  } else {
    res.send(
      `No players found. Please pass player names using this command: curl "http://localhost:4000/inputnames?player1={yourName}&player2={yourname}"`
    );
  }
});

app.get("/restart", (req,res) =>{
  res.send(`To continue the game : curl "http://localhost:4000/playgame"`)
})

const PORT = 4000;
function echoPortNumber() {
  console.log(`Listening on port ${PORT}`);
}
app.listen(PORT, echoPortNumber);
