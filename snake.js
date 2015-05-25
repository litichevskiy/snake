
(function () { 

    var getCoordHead = {
    'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
    'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
    'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
    'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
};

function Snake ( o ) {
    this.body = o.body; // head --> 0
    this.direction = 'right'; // down, left, up
}

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
 

var s = 4;
var s1 = 6;


(function(){
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
    i = event.keyCode; 
    return i;
}


var i=0,
    proc = setInterval(function func(){

f1[s][s1].classList.add('food');
      
        
      
        if ( i === 40 ) { snake.direction = 'down'  };
        if ( i === 39 ) { snake.direction = 'right' };
        if ( i === 37 ) { snake.direction = 'left'  };
        if ( i === 38 ) { snake.direction = 'up'    };
        var res = snake.move();
        var add = res.added;
        var rm  = res.removed;
        
        if ( snake.body.length > 7  ) {
          setInterval( func, 200 )
          console.log(snake.body.length)
        };
         

          if ( add.x ===  -1 || add.x === f.length  ){
              clearInterval(proc); 
            alert('GAME OVER');
             
        };
         if (  add.y ===  -1 || add.y === f.length  ) {
             clearInterval(proc);
             alert('GAME OVER');

         };

          if (  f[add.y][add.x].classList.contains('red')  ){
            alert();
             clearInterval(proc);

            alert('GAME OVER');
           
           }; 
        
        f[add.y][add.x].classList.add('red');
       
         if ( rm ) {
             f[rm.y][rm.x].classList.remove('red');
        };
        

         if ( f[add.y][add.x].classList.contains('food') ) {
            food(  );
             snake.body.push({x:0,y:0}); 
            };

     

     
      
       
}, 300);
})();


function food(   ) {

     f1[s][s1].classList.remove('food');

     s = Math.floor(Math.random() * f.length ); 
     s1 = Math.floor(Math.random() * f.length );
     console.log( s + ' '+ s1 )

     f1[s][s1].classList.add('food');
    
}

var f = [];

var ul = document.getElementById('field');

for ( var x = 0; x < 31; x++ ) {
    var li = document.createElement('li');
    var string = [];
    f.push(string);
    ul.appendChild(li);
    for ( var y = 0; y < 31; y++ ) {
        var div = document.createElement('div');
        string.push(div);
        li.appendChild(div);
        
    }
}

console.log(f);
 var f1 = f;
console.log(f1[1]);

})();