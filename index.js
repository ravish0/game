let userClickedPattern = [];
let gamePattern = [];
let colour = ["green", "red", "yellow", "blue"]
let level = 0;
let started = false;

$(document).keypress(function (event) {
    if (!started) {
        let a = event.key;
        if (a == 'Enter') {


            $("#level-title").text("Level " + level);
            run();
            started = true;
        }
    }
});



$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAns(userClickedPattern.length - 1);
});


function checkAns(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("sucess");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                run();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press enter Key to Restart");

        startOver();
    }
}

function run() {
    userClickedPattern = [];

    let randomNo = Math.floor(Math.random() * 4);
    // $("#" + b[a[i]-1]).fadeIn(1000).fadeOut(1000).fadeIn(1000);
    level++;
    $("#level-title").text("Level " + level);

    gamePattern.push(colour[randomNo]);
    $("#" + colour[randomNo]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colour[randomNo]);


}


function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}



function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}