const express = require("express");
let res = require("express/lib/response");

const { welcome, displayName, playTenziFun } = require("./game");
const { request } = require("express");
const app = express();

app.get("/", welcome);

app.get("/inputnames", (req, res) => {
  player1 = req.query.player1;
  player2 = req.query.player2;

  res.send(
    `${displayName(
      player1,
      player2
    )}. ${player1} is now Player1, ${player2} is now Player2. Please see "http://localhost:4000/instructions"`
  );
});

app.get("/instructions", (req, res) => {
  res.send(
    `Please curl "http://localhost:4000/playgame" to continue playing this game.`
  );
});

app.get("/playgame", (req, res) => {
  if (player1) {
    const countPlayer1 = playTenziFun();
    const countPlayer2 = playTenziFun();

    if (countPlayer1 < countPlayer2) {
      res.send(
        `Tenzi!!! ${player1} rolled ${countPlayer1} times and ${player2} rolled ${countPlayer2} times. So, ${player1} wins!!!`
      );
    } else {
      res.send(
        `Tenzi!!! ${player1} rolled ${countPlayer1} times and ${player2} rolled ${countPlayer2} times. So, ${player2} wins!!!`
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
