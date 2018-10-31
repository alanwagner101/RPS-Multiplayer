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

var areYouPlayer1 = false;
var areYouPlayer2 = false;

var player1 = "";
var username1 = "";
var rps1 = "";
var player2 = "";
var username2 = "";
var rps2 = "";

var chat1 = "";
var chat2 = "";

var i=0
var intervalID;
var timeout;

var win1 = 0;
var lose1 = 0;
var tie1 = 0;
var win2 = 0;
var lose2 = 0;
var tie2 = 0;

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

        player1 = "player1";
        username1 = $("#player1-input").val().trim();

        areYouPlayer1 = true;

        console.log(player1);
        console.log(username1);


        Player1database = database.ref("/players/" + 1)
        
        Player1database.set({
            player1: player1,
            username1: username1,
        });

        Player1database.onDisconnect().remove()

        $("#container1").css("display", "none");
        $("#chatSubmit1").css("display", "block");
        $("#container2").css("display", "block");



    });

    $("#submitPlayer2").on("click", function(event) {
        event.preventDefault();

        player2 = "player2";
        username2 = $("#player2-input").val().trim();

        areYouPlayer2 = true;

        Player2database = database.ref("/players/" + 2)
        
        Player2database.set({
            player2: player2,
            username2: username2,
        });

        Player2database.onDisconnect().remove()

        $("#container1").css("display", "none");
        $("#chatSubmit2").css("display", "block");
        $("#container2").css("display", "block");
        $("#name2").text(username2);


    });


    database.ref("/players/").on("value", function(snapshot) {

        if(snapshot.child("1").exists()) {
            $("#rps1").css("display", "block");
            $("#waiting1").css("display", "none");
            isPlayer1Clicked = true;
            $("#player1-card").css("display", "none");
        } else {
            $("#waiting1").css("display", "block");
            $("#rps1").css("display", "none");
            isPlayer1Clicked = false;
            $("#player1-card").css("display", "block");
        };

        if(snapshot.child("2").exists()) {
            $("#rps2").css("display", "block");
            $("#waiting2").css("display", "none");
            isPlayer2Clicked = true;
            $("#player2-card").css("display", "none");
        } else {
            $("#waiting2").css("display", "block");
            $("#rps2").css("display", "none");
            isPlayer2Clicked = false;
            $("#player2-card").css("display", "block");
        };


        if (snapshot.child("/1/rps1").exists() && snapshot.child("/2/rps2").exists()) {
            rps1 = snapshot.child("/1/rps1").val().rps1;
            rps2 = snapshot.child("/2/rps2").val().rps2;
            intervalID = setInterval(countdown, 1000);
            timeout = setTimeout(function(){
                $("#rock1").css("visibility", "visible")
                $("#paper1").css("visibility", "visible")
                $("#scissors1").css("visibility", "visible")
                $("#rock2").css("visibility", "visible")
                $("#paper2").css("visibility", "visible")
                $("#scissors2").css("visibility", "visible")
                database.ref("/players/1/rps1").remove();
                database.ref("/players/2/rps2").remove();
                i=0
                $("#countdown").html("")
            }, 8000)
        }


    });

    $("#chatSubmit1").on("click", function(event) {
        event.preventDefault();

        chat1 = $("#chatInput").val().trim()

        var chatDatabase1 = database.ref("/players/1/" + "chat1");

        chatDatabase1.set({
            chat1: chat1,
            username1: username1
        })

    })

    $("#chatSubmit2").on("click", function(event) {
        event.preventDefault();

        chat2 = $("#chatInput").val().trim()

        var chatDatabase1 = database.ref("/players/2/" + "chat2");

        chatDatabase1.set({
            chat2: chat2,
            username2: username2
        })

    })

    database.ref("/players/1/chat1/").on("value", function(snapshot) {

        var chatMessages1 = $("<p>");

        chatMessages1.append(snapshot.val().username1 + "--" + snapshot.val().chat1);

        $("#chatBox").prepend(chatMessages1);

        database.ref("/players/1/chat1").remove();
    
    });

    database.ref("/players/2/chat2/").on("value", function(snapshot) {

        var chatMessages2 = $("<p>");

        chatMessages2.append(snapshot.val().username2 + "--" + snapshot.val().chat2);

        $("#chatBox").prepend(chatMessages2);

        database.ref("/players/2/chat2").remove();
    
    });

    database.ref("/players/1/").on("value", function(snapshot) {
        
        $("#name1").text(snapshot.val().username1);

    })

    database.ref("/players/2/").on("value", function(snapshot) {

        $("#name2").text(snapshot.val().username2);

    })

    $(".rpsimg1").on("click", function() {
        if (areYouPlayer2) {
            return false
        };

        console.log(this.id)

        if (this.id == "rock1") {
            rps1 = "rock";
            $("#paper1").css("visibility", "hidden");
            $("#scissors1").css("visibility", "hidden");
            database.ref("/players/1/" + "rps1").set({
                rps1: rps1
            });
        } else if (this.id == "paper1") {
            rps1 = "paper";
            $("#rock1").css("visibility", "hidden");
            $("#scissors1").css("visibility", "hidden");
            database.ref("/players/1/" + "rps1").set({
                rps1: rps1
            });
        } else if (this.id == "scissors1") {
            rps1 = "scissors";
            $("#rock1").css("visibility", "hidden");
            $("#paper1").css("visibility", "hidden");
            database.ref("/players/1/" + "rps1").set({
                rps1: rps1
            });
        };


    });

    $(".rpsimg2").on("click", function() {
        if (areYouPlayer1) {
            return false;
        }

        console.log(this.id)

        if (this.id == "rock2") {
            rps2 = "rock";
            $("#paper2").css("visibility", "hidden");
            $("#scissors2").css("visibility", "hidden");
            database.ref("/players/2/" + "rps2").set({
                rps2: rps2
            });
        } else if (this.id == "paper2") {
            rps2 = "paper";
            $("#rock2").css("visibility", "hidden");
            $("#scissors2").css("visibility", "hidden");
            database.ref("/players/2/" + "rps2").set({
                rps2: rps2
            });
        } else if (this.id == "scissors2") {
            rps2 = "scissors";
            $("#rock2").css("visibility", "hidden");
            $("#paper2").css("visibility", "hidden");
            database.ref("/players/2/" + "rps2").set({
                rps2: rps2
            });
        };


    });

    function countdown() {
        i++

        var countdownRPS = ["","Rock!", "Paper!", "Scissors!", "Shoot!"]

        $("#countdown").html("<h1>" + countdownRPS[i] + "</h1>")

        if (i == 4) {
            clearInterval(intervalID)
            console.log(rps1);
            console.log(rps2);
            if (rps1 == "rock") {
                $("#paper1").css("visibility", "hidden");
                $("#scissors1").css("visibility", "hidden");
                if (rps2 == "rock") {
                    tie1++;
                    tie2++;
                } else if (rps2 == "paper") {
                    lose1++;
                    win2++;
                } else if (rps2 == "scissors") {
                    win1++;
                    lose2++;
                };
            } else if (rps1 == "paper") {
                $("#rock1").css("visibility", "hidden");
                $("#scissors1").css("visibility", "hidden");
                if (rps2 == "rock") {
                    win1++;
                    lose2++;
                } else if (rps2 == "paper") {
                    tie1++;
                    tie2++;
                } else if (rps2 == "scissors") {
                    lose1++;
                    win2++;
                } ;
            } else if (rps1 == "scissors") {
                $("#rock1").css("visibility", "hidden");
                $("#paper1").css("visibility", "hidden");
                if (rps2 == "rock") {
                    lose1++;
                    win2++;
                } else if (rps2 == "paper") {
                    win1++;
                    lose2++;
                } else if (rps2 == "scissors") {
                    tie1++;
                    tie2++;
                };
            };

            if (rps2 == "rock") {
                $("#paper2").css("visibility", "hidden");
                $("#scissors2").css("visibility", "hidden");
            } else if (rps2 == "paper") {
                $("#rock2").css("visibility", "hidden");
                $("#scissors2").css("visibility", "hidden");
            } else if (rps2 == "scissors") {
                $("#rock2").css("visibility", "hidden");
                $("#paper2").css("visibility", "hidden");
            };

            $("#wins1").text("Wins : " + win1);
            $("#losses1").text("Losses : " + lose1);
            $("#ties1").text("Ties : " + tie1);
            $("#wins2").text("Wins : " + win2);
            $("#losses2").text("Losses : " + lose2);
            $("#ties2").text("Ties : " + tie2);
        }
    }



});