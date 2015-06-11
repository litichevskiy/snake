
(function ( w ) { 


    window.snake = {
   
        CreateGame : function ( o ) {

            this.direction = 'right';
            this.heights = [];
            this.widthts = [];
            var x = 0;
            this.body = [];

            for ( var i = 0; i < o.snake.length; i++  ) {

                this.body.push( {x:0,y:2} );
                x++
            };
       
            for ( var x = 0; x < o.field.height; x++ ) {

                var div = document.createElement('div');
                this.widthts = [];
                this.heights.push( this.widthts );
                o.insideElement.appendChild( div );

                    for ( var y = 0; y < o.field.width; y++ ) {
        
                        var span = document.createElement('span');
                        this.widthts.push( span );
                        div.appendChild( span );
        
                    };

            };

            this.heights[1][1].classList.add('food');
  
        },
     
        move : function () {

            var snake = this;
            this.body.unshift(
            getCoordHead[this.direction]( this.body[0] )
            );
    
            var removed = this.body.pop();
    
            return {
                added   : snake.body[0],
                removed : removed
            }
        }   
   

    
    };




    function food( a, b, c  ) {

        var removedFood = a;
        removedFood.classList.remove('food');
        var duble_heights = b;
        var x = Math.floor( Math.random() * snake.widthts.length ); 
        var y = Math.floor( Math.random() * snake.heights.length );
        var snake_body = c;
        snake_body.splice( 1, 0, {} );
        duble_heights[x][y].classList.add('food');
       
   
    };

    var getCoordHead = {

        'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
        'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
        'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
        'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
    };


    function game_over ( ) {

        alert( 'GAME OVER' );
        
    };


    var get_keyCode = document.body;

    get_keyCode.onkeydown = function (event) {
  
        coordHead(event.keyCode);
  
    };




    function  coordHead () {
   
        var o = {

            37 : 'left',
            38 : 'up',
            39 : 'right',
            40 : 'down',
        };

   
        return (function (i) {


        // if ( snake.direction === 'right' && i === 37 ) {
        //    snake.body.reverse()
        //    snake.direction = o[i]
        // };

        // if ( snake.direction === 'left' && i === 39 ){
        //    snake.body.reverse()
        //    snake.direction = o[i]
        // };

        // if ( snake.direction === 'up' && i === 40 ) {
        //    snake.body.reverse()
        //    snake.direction = o[i]
        // };

        // if (  snake.direction === 'down' && i === 38 ) {
        //     snake.body.reverse()
        //    snake.direction = o[i]
        // };

            return  snake.direction =  o[i];

      
        })(event.keyCode);
    };




    proc = setInterval(function game( o ){
   
        var res = snake.move();
        var add = res.added;
        var rm  = res.removed;
           
        if ( add.x === snake.widthts.length || add.y === snake.heights.length ||  add.x === -1 ||  add.y === -1 ) {   

            clearInterval(proc); 
            game_over();            
            return;
        };

        if (  add.y ===  snake.heights.length || add.y === snake.heights.length  ) {

            clearInterval(proc);
            game_over();
            return;
        };

        if (  snake.heights[add.y][add.x].classList.contains('snake_body_color') ) {
            clearInterval(proc);
            game_over();
            return;
        }; 
        
        snake.heights[add.y][add.x].classList.add('snake_body_color');
       
        if ( rm ) {
            snake.heights[rm.y][rm.x].classList.remove('snake_body_color');

        };
        

        if ( snake.heights[add.y][add.x].classList.contains('food') ) {
           
            food( snake.heights[add.y][add.x], snake.heights,  snake.body );
          
        };
 
  
    },300);


    (function func( o ){
        var x = 1;
        var y = 2;
        snake.heights[x][y].classList.add('food'); 
    }) 


})(window);










snake.CreateGame({
    field : {
        width : 20,
        height : 20
    },
    snake : {
        length : 4
    },
     insideElement : document.querySelector('[data-snake="field"]')
});
















