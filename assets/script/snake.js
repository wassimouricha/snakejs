// la majorité du script va se abser sur le systme de canvas

// tableau/planche 

var blockSize = 25;
var rows = 20;
var columns = 20;
var board;
var context;

// tete du serpent
// j'indique que le serpent va commencer 5 cases sur l'axe X et 5 cases sur l'axe Y 
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

// nourriture du serpent

var foodX = blockSize * 10;
var foodY = blockSize * 10;

// au chargement de la page 

window.onload = function() {
    board = document.getElementById("board");
    // j'indique que la hauteur sera la variable rows multiplié par la valeur de blocksize
    board.height = rows * blockSize;
    // j'indique que la largeur sera la variable columns multiplié par la valeur de blocksize
    board.width = columns * blockSize;
    context = board.getContext("2d");   //c'est ce qui va permettre de dessiner sur le tableau 

    update();

}

function update() {
    context.fillStyle="black"; //je spécifie la couleur qui sera utilisé à l'intérieur du canvas
    context.fillRect(0, 0, board.width, board.height); //on remplis du coin du canvas jusqu'a l'autre extrémité

    context.fillStyle="lime"; //couleur du serpent
    context.fillRect(snakeX,snakeY , blockSize, blockSize); //coin gauche et droit puis la hauteur et la largeur du serpent

    context.fillStyle="red"; //couleur du serpent
    context.fillRect(foodX,foodY , blockSize, blockSize); //coin gauche et droit puis la hauteur et la largeur du serpent
}