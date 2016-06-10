//CONTROL
var duckHunter = function() {
    duckX = 100;
    duckY = 250;
    stage = 0;
    XLimit = 0;
    ducksNum = Math.floor((Math.random() * 6) + 2);
    var duckHunterModel = {};
    var view;

    function playGame() {
        

        duckSpeedX = Math.floor((Math.random() * 3) + 1);
        duckSpeedY = Math.floor((Math.random() * 3) + 1);
        if (duckX >= 470) {
            XLimit = 1;
        }

        if (XLimit == 1) {
            duckX -= duckSpeedX;
        } else {
            duckX += duckSpeedX;
        }
        duckY -= duckSpeedY;

        if (duckY <= -32) {
            ducksNum -= 1;
            reset();
            if (ducksNum <= 0) {
                stage = 2;
            }
        }
    }

    function reset() {
        duckX = Math.floor((Math.random() * 500) + 1);
        duckY = 250;
        XLimit = 0;
    }

    function hitBird() {
        if (duckY <= 250) {
            duckY += 5;
        }

        if (duckY >= 250) {
            stage = 4;
        }
    }

    function setView(view) {
        this.view = view;
        if (this.view) {
            this.view.draw();

        }
    }

    function refresh() {
        requestAnimationFrame(refresh);
        //GAME
        if (stage == 1) {
            playGame();
        }

        //HIT
        if (stage == 3) {
            hitBird();
        }
    }

    (function() {

    }());

    return {
        'duckX': duckX,
        'duckY': duckY,
        'stage': stage,
        'setView': setView,
        'refresh': refresh
    }

    //Close Duck Hunter
}

//VIEW
var duckHunterView = function() {
    var draw = function() {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        loadAssets();
        paint();
    }

    function loadAssets() {
        background = document.createElement("img");
        ducks = document.createElement("img");
        dog = document.createElement("img");

        background.addEventListener("load", function() {
            ducks.src = "static/assets/ducks.png";
            console.log("Loading Bg");
            ducks.addEventListener("load", function() {
                dog.src = "static/assets/dog.png";
                console.log("Loading Duck");
                dog.addEventListener("load", function() {

                    console.log("Loading Dog");
                });
            });
        });

        background.src = "static/assets/background.jpg";
    }

    function stageOne() { //View
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#FF0000"
        context.fillRect(200, 200, 100, 40);
    }

    function playGame() { //View
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = "destination-over";
        context.drawImage(background, 0, 0);

        context.globalCompositeOperation = "source-over";
        context.drawImage(ducks, 16, 15, 28, 32, duckX, duckY, 28, 32);
    }

    function looseGame() { //VIEW
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = "destination-over";
        context.drawImage(background, 0, 0);

        context.globalCompositeOperation = "source-over";
        context.drawImage(dog, 111, 9, 29, 39, 300, 270, 29, 39);

        context.font = "20px Arial";
        context.fillText("Game Over", 200, 150);
        context.fillText("Play Again", 200, 200);

    }

    function hitBird() { //VIEW
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = "destination-over";
        context.drawImage(background, 0, 0);
        context.globalCompositeOperation = "source-over";
        context.drawImage(ducks, 55, 89, 18, 32, duckX, duckY, 18, 32);

    }

    function winner() { //VIEW
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.globalCompositeOperation = "destination-over";
        context.drawImage(background, 0, 0);

        context.globalCompositeOperation = "source-over";
        context.drawImage(dog, 10, 9, 43, 39, 300, 270, 43, 39);

        context.font = "20px Arial";
        context.fillText("YOU WIN", 200, 150);
        context.fillText("Play Again", 200, 200);

    }

    function paint() {
        requestAnimationFrame(paint);

        //INTRO
        if (stage == 0) {
            stageOne();
        }

        //GAME
        if (stage == 1) {
            playGame();
        }

        //LOOSE
        if (stage == 2) {
            looseGame();
        }

        //HIT
        if (stage == 3) {
            hitBird();
        }

        //WIN
        if (stage == 4) {
            winner();
        }
    }

    return {
        'draw': draw
    }
}

//RUN
var duckHunterGame = new duckHunter();
duckHunterGame.setView(new duckHunterView());
duckHunterGame.refresh();
console.log("Refresh Done");
console.log(duckHunterGame.stage);


//EVENTS
/****
MOUSE EVENTS
*****/

canvas.addEventListener("click", function(event) {

    var margins = canvas.getBoundingClientRect();

    if (stage == 0) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 200 && event.clientY - margins.top <= 240) {
            stage = 1;
            console.log("Click");
        }

    }
    //GAME
    if (stage == 1) {
        if (event.clientX - margins.left >= duckX && event.clientX - margins.left <= duckX + 28 && event.clientY - margins.top >= duckY && event.clientY - margins.top <= duckY + 32) {
            stage = 3;
        }
    }
    //LOOSE
    if (stage == 2) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 180 && event.clientY - margins.top <= 220) {
            stage = 1;
            ducksNum = Math.floor((Math.random() * 6) + 2);
            duckX = 100;
            duckY = 250;
        }
    }
    //WIN
    if (stage == 4) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 180 && event.clientY - margins.top <= 220) {
            stage = 1;
            ducksNum = Math.floor((Math.random() * 6) + 2);
            duckX = 100;
            duckY = 250;
        }
    }

});

//touch Events
canvas.addEventListener("touchstart", function(event) {

    var margins = canvas.getBoundingClientRect();

    if (stage == 0) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 200 && event.clientY - margins.top <= 240) {
            stage = 1;
            console.log("TAP");
        }

    }
    //GAME
    if (stage == 1) {
        if (event.clientX - margins.left >= duckX && event.clientX - margins.left <= duckX + 28 && event.clientY - margins.top >= duckY && event.clientY - margins.top <= duckY + 32) {
            stage = 3;
        }
    }
    //LOOSE
    if (stage == 2) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 180 && event.clientY - margins.top <= 220) {
            stage = 1;
            ducksNum = Math.floor((Math.random() * 6) + 2);
            duckX = 100;
            duckY = 250;
        }
    }
    //WIN
    if (stage == 4) {
        if (event.clientX - margins.left >= 200 && event.clientX - margins.left <= 300 && event.clientY - margins.top >= 180 && event.clientY - margins.top <= 220) {
            stage = 1;
            ducksNum = Math.floor((Math.random() * 6) + 2);
            duckX = 100;
            duckY = 250;
        }
    }

});
