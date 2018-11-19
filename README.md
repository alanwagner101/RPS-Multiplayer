# RPS-Multiplayer

https://alanwagner101.github.io/RPS-Multiplayer/

This is my rendition of the classic game "rock, paper, scissors" with added online multiplayer functionality.

The challenge with this game was utilizing Google Firebase to allow data persistance and to keep track of how many players are on the website and detect when single users disconnect from the site to allow new users to enter.

When you first open the webpage you are presented with two options, either chose to be player 1 on the left side of the screen or player 2 on the right side of the screen.

When you choose which player you would like to be you are then asked to input a username for the purpose of identifying your side of the screen as well as identifying yourself in the chat screen. The option for the second player to choose that player position is removed from their screen immediately after submitting the username you selected.

Once the username is selected you are then sent to the main screen, if you are the first person on the screen you will see a "waiting for other player to join" text box on the oppostie players section of the screen. If you are not the first person in you will see both sections of the screen occupied by username, "rock, paper, scissors" options, and "win, lose, tie" score board.

You can type in the enter message box in the middle of the screen to chat with the other play. upon submitting your message you will notice a username tag will appear next to your message to allow easier readability. the messages empty themselves in the server everytime you send a message so that when you leave a new player cannot look into the conversation you were having.

When you select whether you want "rock, paper, or scissors" from the icons, the other icons you did not select disapear. if the other player has selected their choice then the game will proceed, if not you will have to wait until the other player chooses. once both players have chosen the middle screen will count down in the traditional "Rock!, Paper!, Scissors!, Shoot!" fasion. When the countdown reaches "Shoot!" the other players choice will be made visible to you and the result of the game will be automatically logged onto the scoreboard for you.

The game will wait a few seconds for you to process the outcome and will then reset the buttons to allow you another go at it.

If you or your opponent leaves the game, the side of the screen occupied by you or them will become open again on the main screen for another player to join in.

I hope you enjoy playing my game!

