(function ( exports ) {

    var SNAKE_LENGTH = 4;

    function Game ( o ) {

        if ( o.field.height < 10 || o.field.width < 10 ) throw(
            'field size can not be less than 10x10'
        );

        this.freeCells = {};
        this.height = o.field.height;
        this.width  = o.field.width;
        this.target = o.insideElement;
        this.direction = 'right';
        this.field = createField.call(this, this.height, this.width);

        this.body = putSnakeToField.call(this, {
            field  : this.field,
            height : this.height,
            width  : this.width,
            length : SNAKE_LENGTH
        });

    }

    Game.fn = Game.prototype;

    Game.fn.createFood = createFood;

    Game.fn.pushFreeCell = function ( x, y ) {
        this.freeCells[ coordsToString(x, y) ] = true;
    };
    Game.fn.popFreeCell = function ( x, y ) {
        delete this.freeCells[ coordsToString(x, y) ];
    };

    Game.fn._dump = function () {
        var field = this.field,
            view = '';

        for ( var y = 0, l = this.height; y <= l; y++ ) {

            var line = '';

            for ( var x = 0, l = this.width; x <= l; x++ ) {
                if ( !field[y][x] ) {
                    line += '. ';
                } else if ( field[y][x].item === 'snake' ) {
                    if ( this.body[0].coords.x === x && this.body[0].coords.y === y ) line += '# ';
                    else line += 'o ';
                } else if ( field[y][x].item === 'food' ) {
                    line += '@ ';
                }
            }

            view += line + '\n';
        }

        console.log(view);
    };

    function coordsToString ( x, y ) {
        return x + ':' + y;
    }

    function coordsFromString ( str ) {

        var arr = str.split(':');

        return {
            x : arr[0],
            y : arr[1]
        }
    }

    function createField ( height, width ) {

        var field = [];

        for ( var y = 0, l = height; y <= l; y++ ) {

            var line = [];

            for ( var x = 0, l = width; x <= l; x++ ) {
                line.push(null);

                this.pushFreeCell(x, y);
            }

            field.push(line);
        }

        return field;
    }

    function putSnakeToField ( o ) {
        var y = Math.round(o.height / 2),
            x = Math.round(o.width / 2 - o.length / 2),
            field = o.field,
            body = [];

        for ( var l = o.length + x; x < l; x++ ) {

            var part = {
                item : 'snake',
                coords : {
                    x : x,
                    y : y
                }
            };

            body.unshift( field[y][x] = part );

            this.popFreeCell(x, y);
        }

        // snake head coords 
        return body;
    }

    function createFood () {
        var free = Object.keys(this.freeCells),
            random = Math.round( Math.random() * ( free.length - 1 ) ), 
            coords = coordsFromString( free[random] );

        this.field[coords.y][coords.x] = {
            item : 'food',
            coords : {
                x : coords.x,
                y : coords.y
            }
        };

        this.popFreeCell( coords.x, coords.y );
    }

    var getCoordHead = {
        'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
        'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
        'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
        'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
    };

    exports.Snake = Game;

})(window);

var snake = new Snake({
    field : {
        width : 10,
        height : 10
    } 
})

snake.createFood();

snake._dump();

console.log( Object.keys(snake.freeCells).length );
