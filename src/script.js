
var myGamePiece;
var counter = 0;
const MOVEMENT_STEP = 10; 
const RESIZE_VERTICAL_STEP = 1;
const RESIZE_HORIZONTAL_STEP = 2;

function startGame() {
    myGamePiece = new component(100, 100, "./images/giphy.gif" , 10, 120,"image");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 850;
        this.canvas.height = 380;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
              this.x,
              this.y,
              this.width, this.height);
        } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        }
    this.setWidth = function(value) {
        this.width += value;
    }
    this.setHeight = function(value) {
        this.height += value;
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.key && myGameArea.key == 37) {moveleft(); }
    if (myGameArea.key && myGameArea.key == 39) {moveright(); }
    if (myGameArea.key && myGameArea.key == 38) {moveup(); }
    if (myGameArea.key && myGameArea.key == 40) {movedown(); }   
    myGamePiece.update();
}

function moveup() {
    // myGamePiece.setHeight(RESIZE_VERTICAL_STEP);
    myGamePiece.y -= MOVEMENT_STEP;
    steps(); 
}

function movedown() {
    // myGamePiece.setHeight(-RESIZE_VERTICAL_STEP);
    myGamePiece.y += MOVEMENT_STEP;
    steps(); 
}

function moveleft() {
    // myGamePiece.setWidth(-RESIZE_HORIZONTAL_STEP);
    myGamePiece.x -= MOVEMENT_STEP; 
    steps(); 
}

function moveright() {
    // myGamePiece.setWidth(RESIZE_HORIZONTAL_STEP);
    myGamePiece.x += MOVEMENT_STEP; 
    steps(); 
}

function steps(){
    counter ++;
    document.getElementById("steps").innerHTML = counter;
}

function dMode() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}