(function ( exports, PubSub ) {

    if ( !PubSub ) throw('the Snake core requires PubSub module');

    var SNAKE_LENGTH = 4,
        SPEED_TO_FRAME_RATE = {
            1 : 700,
            2 : 600,
            3 : 500,
            4 : 400,
            5 : 300
        };

    function Game ( o ) {

        if ( o.field.height < 10 || o.field.width < 10 ) throw(
            'field size can not be less than 10x10'
        );

        PubSub.call(this);

        this.isInited = false;
        this.direction = 'right';
        this.paused = false;
        this.isActive = true;
        this.process;
        this.frameCount = 0;
        this.speed = 1; // max 5
        this.field = new Field({
            height : o.field.height,
            width  : o.field.width
        });
        this.body = putSnakeToField.call(this);

    }

    Game.prototype = Object.create( PubSub.prototype );
    Game.prototype.constructor = Game;

    Game.fn = Game.prototype;

    Game.fn.createFood = function ( x, y ) {
        var free = this.field.getFreeCells(),
            random = Math.round( Math.random() * ( free.length - 1 ) ), 
            coords = free[random],
            x = x || coords.x,
            y = y || coords.y;

        this.field.put(x, y, {
            item : 'food',
            type : 'regular',
            coords : {
                x : x,
                y : y
            }
        });
    };

    Game.fn.start = function () {

        if ( this.paused || !this.isActive ) return;

        this.paused = true;

        var that = this;

        this.process = setInterval(
            function(){
                that.frameCount++;
                that.publish('frame')
            },
            SPEED_TO_FRAME_RATE[this.speed]
        );

        if ( !this.isInited ) {
            this.isInited = true;
            this.subscribe('frame', this.moveSnake.bind(this));
        }
    };

    Game.fn.pause = function () {
        this.paused = false;
        clearInterval(this.process);
    };

    Game.fn.gameOver = function () {
        this.isActive = false;
        clearInterval(this.process);
        this.publish('gameover');
    };

    Game.fn.increaseSpeed = function () {
        if ( !SPEED_TO_FRAME_RATE[this.speed + 1] ) return;

        this.speed++;

        this.pause();
        this.start();
    };

    Game.fn.moveSnake = function () {
        var newCoords = getCoordHead[this.direction](this.body[0].coords),
            toCell = this.field.get(newCoords.x, newCoords.y),
            head = {
                item : 'snake',
                type : 'head',
                coords : newCoords
            };

        if ( toCell instanceof Error || (toCell && toCell.item === 'snake') ) {
            return this.gameOver();
        }

        this.body[0].type = 'body';

        this.body.unshift(head);
        
        this.field.put(newCoords.x, newCoords.y, head);

        if ( toCell && toCell.item === 'food' ) {
            this.createFood();
        } else {
            var last = this.body.pop();
            this.field.rm(last.coords.x, last.coords.y);
        }
    };

    Game.fn._dump = function () {
        var field  = this.field._field,
            height = this.field.height,
            width  = this.field.width,
            view   = '';

        for ( var y = 0, l = height; y <= l; y++ ) {

            var line = '';

            for ( var x = 0, l = width; x <= l; x++ ) {
                if ( !field[y][x] ) {
                    line += '. ';
                } else if ( field[y][x].item === 'snake' ) {
                    if ( field[y][x].type === 'body' ) line += 'o ';
                    else line += '# ';
                } else if ( field[y][x].item === 'food' ) {
                    line += '@ ';
                }
            }

            view += line + '\n';
        }

        console.log(view);
    };


    function putSnakeToField () {
        var y = Math.round(this.field.height / 2),
            x = Math.round(this.field.width / 2 - SNAKE_LENGTH / 2),
            field = this.field,
            body = [];

        for ( var l = SNAKE_LENGTH + x - 1; x < l; x++ ) {

            var part = {
                item : 'snake',
                type : 'body',
                coords : {
                    x : x,
                    y : y
                }
            };

            body.unshift( this.field.put(x, y, part) );
        }

        body.unshift(this.field.put(x, y, {
            item : 'snake',
            type : 'head',
            coords : {
                x : x,
                y : y
            }
        }));

        return body;
    }

    var Field = (function(){
        function Field ( o ) {
            PubSub.call(this);
            this._freeCells = {};
            this.width  = o.width;
            this.height = o.height;
            this._field = createField.call(this, this.height, this.width);
        }

        Field.prototype = Object.create( PubSub.prototype );
        Field.prototype.constructor = Field;

        Field.fn = Field.prototype;

        Field.fn.put = function ( x, y, data ) {
            pushFreeCell.call(this, x, y);

            this._field[y][x] = data;

            this.publish('change', {
                action  : 'put',
                coords  : {
                        x : x,
                        y : y
                    },
                content : data
            });

            return data;
        }

        Field.fn.get = function ( x, y ) {

            return x > this.height || x > this.width || x < 0 || y < 0
                ? new Error('out of field')
                : this._field[y][x];
        }

        Field.fn.getFreeCells = function () {
            return Object.keys(this._freeCells).map(function(str){
                return coordsFromString(str)
            });
        }

        Field.fn.rm = function ( x, y ) {
            this._field[y][x] = null;

            popFreeCell.call(this, x, y);

            this.publish('change', {
                action  : 'rm',
                coords  : {
                        x : x,
                        y : y
                    }
            });
        }

        function createField ( height, width ) {

            var field = [];

            for ( var y = 0, l = height; y <= l; y++ ) {

                var line = [];

                for ( var x = 0, l = width; x <= l; x++ ) {
                    line.push(null);

                    pushFreeCell.call(this, x, y);
                }

                field.push(line);
            }

            return field;
        }

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

        function pushFreeCell ( x, y ) {
            this._freeCells[ coordsToString(x, y) ] = true;
        };

        function popFreeCell ( x, y ) {
            delete this._freeCells[ coordsToString(x, y) ];
        };


        return Field;
    })();

    var getCoordHead = {
        'up'    : function ( c ) { return { x : c.x    , y : c.y - 1 } },
        'down'  : function ( c ) { return { x : c.x    , y : c.y + 1 } },
        'left'  : function ( c ) { return { x : c.x - 1, y : c.y     } },
        'right' : function ( c ) { return { x : c.x + 1, y : c.y     } },
    };

        exports.Snake = Game;

})(window, PubSub);
