var gamePattern = []
var userClickedPattern = []
var buttonColours = ["red", "blue", "green", "yellow"]
var level = 0
$(document).on("keydown", function () {
    level = 0
    gamePattern = []
    nextSequence();
})
$(".btn").on("click", function () {
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour)
    playSound(userChosenColour)
    animatePress(userChosenColour)
    checkAnswer(userChosenColour, userClickedPattern.length)

})
function nextSequence() {
    level++;
    userClickedPattern = []
    $("h1").text('level ' + level)
    var randomNumber = Math.floor(Math.random() * 4)
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}
function playSound(color) {
    var color = new Audio("sounds/" + color + ".mp3")
    color.play()
}
function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed")
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed")
    }, 100)
}
function checkAnswer(color, currentLevel) {
    if (color === gamePattern[currentLevel - 1]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
            }, 1000)
        }
    }
    else {
        var wrong = new Audio("sounds/wrong.mp3")
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200)
        $("h1").text("Game Over, Press Any Key to Restart. Your score is: " + level)
    }
}