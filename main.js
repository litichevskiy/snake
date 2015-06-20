
var snake = new Snake({
    field : {
        width : 10,
        height : 10
    } 
});
snake.createFood(9, 5);
snake.start();
snake.subscribe('frame', function(){
    console.clear();
    snake._dump();

    if ( snake.frameCount === 3 ) snake.direction = 'up';
})
snake.subscribe('gameover', function(){ alert('game over') })


