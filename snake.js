



(function ( ) {

    var createField = {

        xx : 31,
        yy : 31,
        f  : this.f,
        getul : function () {
            var elem = document.querySelector('[data-snake="field"]');
            return elem;
        },

        field : function ( ul,f,s ) {
            this.f = [];

            for ( var x = 0; x < createField.xx; x++ ) {

                var li = document.createElement('li');
                 var string = [];
                this.f.push(string);
                ul.appendChild(li);

            for ( var y = 0; y < createField.yy; y++ ) {

                var div = document.createElement('div');
                 string.push(div);
                li.appendChild(div);
        
            }
            }
            
        },

        getarray : function () {
            return this.f
        }
    };


    function game_over(){
        alert( 'GAME OVER' );
        
    };


    function food( a, b, c  ) {

        var removed = a;
        removed.classList.remove('food');
        var f1 = b;
        var s = Math.floor(Math.random() * f1.length ); 
        var s1 = Math.floor(Math.random() * f1.length );
        var snake_body = c;
        snake_body.splice(1,0,{});//
        f1[s][s1].classList.add('food');
       
   
    };


    var getCoordHead = {
        'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
        'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
        'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
        'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
    };

    function Snake ( o ) {
        this.body = o.body; // head --> 0
        this.direction = 'right'; // down, left, up
    };



    Snake.prototype.move = function () {
        var snake = this;
    
        this.body.unshift(
            getCoordHead[this.direction]( this.body[0] )
        );
    
        var removed = this.body.pop();
    
        return {
            added   : snake.body[0],
            removed : removed
        }
    };

   (function(createField){
    var e = createField;
    var snake = new Snake({
    body : [
        { x :  4, y : 15 },
        { x :  3, y : 15 },
        { x :  2, y : 15 },
        { x :  1, y : 15 },
        { x :  0, y : 15 }
    ]
});
    

var a = document.body;

a.onkeydown = function (event) {
  
   coordHead(event.keyCode);
  
};




function  coordHead () {
    //snake.direction
    var o = {

        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down',
    };

   
    return (function (i) {


        if ( snake.direction === 'right' && i === 37 ) {
           snake.body.reverse()
           snake.direction = o[i]
        };

        if ( snake.direction === 'left' && i === 39 ){
           snake.body.reverse()
           snake.direction = o[i]
        };

        if ( snake.direction === 'up' && i === 40 ) {
           snake.body.reverse()
           snake.direction = o[i]
        };

        if (  snake.direction === 'down' && i === 38 ) {
            snake.body.reverse()
           snake.direction = o[i]
        };

      return  snake.direction =  o[i];

      
    })(event.keyCode);
};



    proc = setInterval(function func( ){
 
        createField.getarray();
        
        var res = snake.move();
        var add = res.added;
        var rm  = res.removed;
        
        if ( add.x ===  -1 || add.x === createField.f.length  ) {

            clearInterval(proc); 
            game_over();            
            return;
            };

        if (  add.y ===  -1 || add.y === createField.f.length  ) {

            clearInterval(proc);
            game_over();
            return;
        };

        if (  createField.f[add.y][add.x].classList.contains('red') ) {
            clearInterval(proc);
            game_over();
            return;
        }; 
        
        createField.f[add.y][add.x].classList.add('red');
       
        if ( rm ) {
             createField.f[rm.y][rm.x].classList.remove('red');

        };
        

        if ( createField.f[add.y][add.x].classList.contains('food') ) {
           
            food( createField.f[add.y][add.x], createField.f,  snake.body );
           
        };

     


       
}, 200);
})( createField );


createField.field( createField.getul() );

(function(createField){
    var f1 = createField.f;
    var s = 5;
    var s1 = 3;
    f1[s][s1].classList.add('food');

})(createField);


})();
