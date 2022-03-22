# tenzi-game-1

This program is Tenzi Game for two players. The backend is written in JavaScript and uses express to handle web requests.
When the game starts it takes two inputs (player names).

The Game :  Players give their names and the game is directed in the hyperlinks to follow the steps to continue. It runs the logic and displays the winners with names and the scores of how many times each player rolled their set of dice. 

Here are the end points that can be reached in this program:
'/' - Welcome message with hyperlink to curl/web for player1 and player2 names.
'/inputnames' - Address players and assigns the player numbers. And give the next link to continue.
'/instructions' - Asks players to further continue to start the game.
'/playgame' - Will run the game and displays winner along with each of the player's count (number of times rolled).
