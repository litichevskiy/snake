(function ( exports ) {

    var SNAKE_LENGTH = 4;

    function Game ( o ) {

        if ( o.field.height < 10 || o.field.width < 10 ) throw(
            'field size can not be less than 10x10'
        );

        this.height = o.field.height;
        this.width  = o.field.width;
        this.target = o.insideElement;
        this.direction = 'right';
        this.field = createField(this.height, this.width);

        this.snakeHeadCoords = putSnakeToField({
            field  : this.field,
            height : this.height,
            width  : this.width,
            length : SNAKE_LENGTH
        });

        //this.length     = o.length;
        //this.body       = 
        //this.direction  = 'right'; // down, left, up
    }

    Game.fn = Game.prototype;

    Game.fn._dump = function () {
        var field = this.field,
            view = '';

        for ( var y = 0, l = this.height; y <= l; y++ ) {

            var line = '';

            for ( var x = 0, l = this.width; x <= l; x++ ) {
                if ( !field[y][x] ) {
                    line += '. ';
                } else if ( field[y][x].type === 'snake' ) {
                    if ( this.snakeHeadCoords.x === x && this.snakeHeadCoords.y === y ) line += '# ';
                    else line += 'o ';
                }
            }

            view += line + '\n';
        }

        console.log(view);
    }

    function createField ( height, width ) {

        var field = [];

        for ( var y = 0, l = height; y <= l; y++ ) {

            var line = [];

            for ( var x = 0, l = width; x <= l; x++ ) {
                line.push(null);
            }

            field.push(line);
        }

        return field;
    }

    function putSnakeToField ( o ) {
        var y = Math.round(o.height / 2),
            x = Math.round(o.width / 2 - o.length / 2),
            field = o.field;

        for ( var l = o.length + x; x <= l; x++ ) {
            field[y][x] = { type : 'snake' };
        }

        // snake head coords 
        return {
            x : x - 1,
            y : y
        };
    }

    var getCoordHead = {
        'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
        'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
        'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
        'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
    };

    exports.Snake = Game;

})(window);

(new Snake({
    field : {
        width : 10,
        height : 10
    } 
}))._dump();
