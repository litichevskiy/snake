
(function ( exports ) { 


    exports.snake = {
   
        createField : function ( obj, createBodySnake ) {
            
            this.numbersStringField = [];

            for ( var i = 0; i < obj.field.height; i++ ) {                                

                var tagNameNumbersStringField = document.createElement('div');
                var stringField = [];
                this.numbersStringField.push( stringField );
                obj.insideElement.appendChild( tagNameNumbersStringField );

                    for ( var j = 0; j < obj.field.width; j++ ) {
                        
                        var tagNameStringField = document.createElement('span');
                        stringField.push( tagNameStringField );
                        tagNameNumbersStringField.appendChild( tagNameStringField );
        
                    };

            };

            snake.createBodySnake( obj );
            this.numbersStringField[0][2].classList.add('food');//
  
        },


        createBodySnake : function ( obj, motionSnake ) {
           
            this.body = [];

            for ( var i = 0; i < obj.snake.length; i++  ) {

                this.body.push( {x:0,y:0} );
               
            };
            snake.motionSnake( );
        },


        motionSnake : function (  ) {
            
            this.direction = 'right';
        }


    };


        snake.__proto__.move =  function  () {
           
            var snake = this;
            this.body.unshift(
            getCoordHead[this.direction]( this.body[0] )
            );
    
            var removed = this.body.pop();
    
            return {
                added   : snake.body[0],
                removed : removed
            };
        };   
   

    
    function AddLengthSnakebody( snake ) {
         
        this.snake.body.splice(1,0, {x:0,y:0} );
    };


    function food( elemClassFood, snake_numbersStringField  ) {

        var removeElemClassFood = elemClassFood;
        var duble_numbersStringField = snake_numbersStringField;
        var x = Math.floor( Math.random() * snake_numbersStringField.length ); 
        var y = Math.floor( Math.random() * snake_numbersStringField.length );
        removeElemClassFood.classList.remove('food');
        duble_numbersStringField[x][y].classList.add('food');
       
   
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
  
        //reverseMotion( snake.direction,event.keyCode);
        coordHead(event.keyCode);
    };




    function  coordHead () {
   
        var obj = {

            37 : 'left',
            38 : 'up',
            39 : 'right',
            40 : 'down'
        };

   
        return (function (event_keyCode) {

            return  snake.direction = obj[event_keyCode];

      
        })(event.keyCode);
    };


    function reverseMotion (  ) {


        if ( snake.direction === 'right' && event.keyCode === 37 ) {
            snake.body.reverse();
            snake.direction = 'left';
            return;
        };

        if ( snake.direction === 'left' && event.keyCode === 39 ) {
            snake.body.reverse();
            snake.direction = 'right';
            return;
        };

        if ( snake.direction === 'up' && event.keyCode === 40 ) {
            snake.body.reverse();
            snake.direction = 'down';
            return;
        };

        if ( snake.direction === 'down' && event.keyCode === 38 ) {
            snake.body.reverse();
            snake.direction = 'up';
            return;
        };
        

    }




    var proc = setInterval( function game ( ) {
   
        var res = snake.move();
        var add = res.added;
        var rm  = res.removed;
           
        if ( add.x === snake.numbersStringField.length || add.y === snake.numbersStringField.length ||  add.x === -1 ||  add.y === -1 ) {   

            clearInterval(proc); 
            game_over();            
            return;
        };

        if ( add.y ===  snake.numbersStringField.length || add.y === snake.numbersStringField.length ) {

            clearInterval(proc);
            game_over();
            return;
        };

        if ( snake.numbersStringField[add.y][add.x].classList.contains('snake_body_color') ) {

            clearInterval(proc);
            game_over();
            return;
        }; 
        
        snake.numbersStringField[add.y][add.x].classList.add('snake_body_color');
       
        if ( rm ) {

            snake.numbersStringField[rm.y][rm.x].classList.remove('snake_body_color');

        };
        

        if ( snake.numbersStringField[add.y][add.x].classList.contains('food') ) {
           
            food( snake.numbersStringField[add.y][add.x], snake.numbersStringField  );
            AddLengthSnakebody( snake.body );
            
        };
 
  
    },300);




})(window);







snake.createField({
    field : {
        width : 15,
        height : 15
    },
    snake : {
        length : 2
    },
    insideElement : document.querySelector('[data-snake="field"]')
});


















