//player 1 and player 2 buttons on load screen,
//once player button is clicked change color and turn off button,
//switch to enter username screen (possibly create username password scenario to save previous kd's),
//use username to toggle player buttons (if username leaves the webpage reactivate player button for other user),
//switch to RPS screen after username is selected,
//display a "waiting for opponent" text box if you are the first player in.
//click either rock paper or scissors,
//once your play has been selected display a "waiting for oppenent to choose" text box,
//if opponent is waiting on you display a "opponent is waiting on you" text box,
//once both players have selected a play count down "rock, paper, scissors, shoot",
//display both players choices,
//display "tie" "win" "lose",
//keep score,
//restart from beggining of RPS screen,
//You need to install a failsafe that requires players to insert a username to proceed, this could potentially break the game,
//Implement chat,


var config = {
    apiKey: "AIzaSyB6BCoJI7K25HunIs89bYFAFuNtP3k-sEU",
    authDomain: "rps-multiplayer-815b8.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-815b8.firebaseio.com",
    projectId: "rps-multiplayer-815b8",
    storageBucket: "rps-multiplayer-815b8.appspot.com",
    messagingSenderId: "884687258139"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var isPlayer1Clicked = false;
var isPlayer2Clicked = false;

var player = "";
var username = "";
var rps = "";

$(document).ready(function () {
    $("#Player1-Button").on("click", function () {
        if (isPlayer1Clicked) {
            return false;
        };

        isPlayer1Clicked = true;

        $("#Player1-Button").attr("class", "btn btn-secondary btn-lg");

        $("#player1-form").css("display", "block");

        $("#player2-card").css("display", "none");

    });

    $("#Player2-Button").on("click", function () {
        if (isPlayer2Clicked) {
            return false;
        };

        isPlayer2Clicked = true;

        $("#Player2-Button").attr("class", "btn btn-secondary btn-lg");

        $("#player2-form").css("display", "block");

        $("#player1-card").css("display", "none");

    });

    $("#submitPlayer1").on("click", function(event) {
        event.preventDefault();

        player = "player1";
        username = $("#player1-input").val().trim();
        rps = "null";

        console.log(player);
        console.log(username);
        console.log(rps);


        database.ref().push({

            player: player,
            username: username,
            rps: rps,
        });

    });

    $("#submitPlayer2").on("click", function(event) {
        event.preventDefault();

        player = "player2";
        username = $("#player2-input").val().trim();
        rps = "null";

        database.ref().push({

            player: player,
            username: username,
            rps: rps,
        });

    });

});