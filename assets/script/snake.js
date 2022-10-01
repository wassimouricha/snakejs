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

// corps du serpent
//  à l'interieur de l'array sera simplement des coordonnées x et y 
var snakeBody =  [];

// vitesse du serpent

var velocityX = 0;
var velocityY = 0;

// nourriture du serpent

var foodX;
var foodY;

// le gameover
var gameOver = false;


// au chargement de la page 
window.onload = function() {
    board = document.getElementById("board");
    // j'indique que la hauteur sera la variable rows multiplié par la valeur de blocksize
    board.height = rows * blockSize;
    // j'indique que la largeur sera la variable columns multiplié par la valeur de blocksize
    board.width = columns * blockSize;
    context = board.getContext("2d");   //c'est ce qui va permettre de dessiner sur le tableau 


    placeFood();
    document.addEventListener("keyup" , changeDirection);
    // update();
    setInterval(update, 1000/10); //toutes les 100 milliseconds la fonction update va s'executer

}

function update() {
    if (gameOver){
        return;
    }
    context.fillStyle="black"; //je spécifie la couleur qui sera utilisé à l'intérieur du canvas
    context.fillRect(0, 0, board.width, board.height); //on remplis du coin du canvas jusqu'a l'autre extrémité

    
    context.fillStyle="red"; //couleur du serpent
    context.fillRect(foodX,foodY , blockSize, blockSize); //coin gauche et droit puis la hauteur et la largeur du serpent

        // vérification de la position du serpent et de la nourriture pour savoir si ils sont dans exactement le meme carré
    if(snakeX == foodX && snakeY == foodY){
        // ajouter des coordonée x et y de la nourriture dans l'array de snakebody
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for( let i = snakeBody.length - 1 ; i > 0 ; i-- ){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime"; //couleur du serpent
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY , blockSize, blockSize); //coin gauche et droit puis la hauteur et la largeur du serpent
    // il faut ensuite dessiner le serpent qui à pris les coordonée x et y de la nourriture
    for( let i = 0 ; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

        // condition du game over
        if(snakeX < 0 || snakeX > columns *  blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1){
            gameOver = true;
            alert("Game over , vous avez perdu en sortant du canvas ,veuillez cliquer sur ok pour rejouer ");
            // pour recharger la page
            window.location.reload();
        }
        for (let i = 0 ; i < snakeBody.length; i++) {
            if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
                gameOver = true;
                alert("Game over , vous avez perdu en vous mordant la queue , veuillez cliquer sur ok pour rejouer ");
                // pour recharger la page
                window.location.reload();
            }
        }
}

// cette fonction va me permettre de placer la nourriture de manière "aléatoire" à l'intérieur du canvas
function placeFood(){
    // math random va donner un chiffre au hasard entre 0 et 1 et on va le multiplier par le nombre de colonne ou de rows qui va devenir donc un nombre 
    // entre 0 et 19.9999 et math.floor va enlever les décimals donc 0 et 19 et sera multiplié par blocksize soit 25 
    foodX = Math.floor(Math.random() * columns) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// fonction permettant au serpent de changer de direction 
// je vais donner un parametre e à ma fonction et je vais vérifier si il est égal à la fleche de mon clavier  alors il execute le code
// et je vais aussi empecher le serpent d'aller dans la direction opposé de la fleche appuyé afin de ne pas se mordre la queue directement
// je le verifie avec ma variable velocity
function changeDirection(e) {
    if(e.code == "ArrowUp" && velocityY != 1 ){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1 ){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1 ){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1 ){
        velocityX = 1;
        velocityY = 0;
    }
}