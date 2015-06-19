(function ( exports ) {

    var PubSub = (function(){

        function PubSub ( ) {
            this.storage = {};
        }
        
        PubSub.prototype.subscribe = function ( eventName, func ) {
                if ( !this.storage.hasOwnProperty(eventName) ) {
                    this.storage[eventName] = [];
                }
                this.storage[eventName].push(func);
            };
        
        PubSub.prototype.publish = function ( eventName, d ) {
                this.storage[eventName].forEach(function( func ) {
                    try {
                        func(d);
                    } catch ( error ) {
                        console.log('ERROR: ', error);
                    }
                });
            };
        
        PubSub.prototype.unsubscribe = function ( eventName, func ) {
                var index = this.storage[eventName].indexOf(func);
                
                if ( index > -1 ) {
                    this.storage[eventName].splice(index, 1);
                }
            };

        return PubSub;
    })();
    
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

        this.target = o.insideElement;
        this.direction = 'right';
        this.active = false;
        this.process;
        this.frameCount = 0;
        this.speed = 1; // max 5
        this.field = new Field({
            height : o.field.height,
            width  : o.field.width
        });
        //createField.call(this, this.height, this.width);

        this.body = putSnakeToField.call(this);

    }

    Game.prototype = Object.create( PubSub.prototype );
    Game.prototype.constructor = Game;

    Game.fn = Game.prototype;

    Game.fn.createFood = createFood;

    Game.fn.start = function () {

        if ( this.active ) return;

        this.active = true;

        var that = this;

        this.process = setInterval(
            function(){
                that.frameCount++;
                that.publish('frame')
            },
            SPEED_TO_FRAME_RATE[this.speed]
        );
    };

    Game.fn.pause = function () {
        this.active = false;
        clearInterval(this.process);
    };

    Game.fn.increaseSpeed = function () {
        if ( !SPEED_TO_FRAME_RATE[this.speed + 1] ) return;

        this.speed++;

        this.pause();
        this.start();
    };

    Game.fn.moveSnake = function () {
        var newCoords = getCoordHead[this.direction](this.body[0].coords),
            part = {
                item : 'snake',
                coords : newCoords
            };

        this.body.unshift(part);
        
        this.field.put(newCoords.x, newCoords.y, part);

        this.body.pop();

        this.field.rm(newCoords.x, newCoords.y);
    };

    Game.fn._dump = function () {
        var field = this.field._field,
            view = '';

        for ( var y = 0, l = this.field.height; y <= l; y++ ) {

            var line = '';

            for ( var x = 0, l = this.field.width; x <= l; x++ ) {
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


    function putSnakeToField () {
        var y = Math.round(this.field.height / 2),
            x = Math.round(this.field.width / 2 - SNAKE_LENGTH / 2),
            field = this.field,
            body = [];

        for ( var l = SNAKE_LENGTH + x; x < l; x++ ) {

            var part = {
                item : 'snake',
                coords : {
                    x : x,
                    y : y
                }
            };

            body.unshift( this.field.put(x, y, part) );
        }

        return body;
    }

    function createFood () {
        var free = this.field.getFreeCells(),
            random = Math.round( Math.random() * ( free.length - 1 ) ), 
            coords = free[random];

        this.field.put(coords.x, coords.y, {
            item : 'food',
            coords : {
                x : coords.x,
                y : coords.y
            }
        });
    }

    var Field = (function(){
        function Field ( o ) {
            this._freeCells = {};
            this.width  = o.width;
            this.height = o.height;
            this._field = createField.call(this, this.height, this.width);
        }

        Field.fn = Field.prototype;

        Field.fn.put = function ( x, y, data ) {
            pushFreeCell.call(this, x, y);

            return this._field[y][x] = data;
        }

        Field.fn.get = function ( x, y ) {
            return this._field[y][x];
        }

        Field.fn.getFreeCells = function () {
            return Object.keys(this._freeCells).map(function(str){
                return coordsFromString(str)
            });
        }

        Field.fn.rm = function ( x, y ) {
            this._field[y][x] = null;

            popFreeCell.call(this, x, y);
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

})(window);

var snake = new Snake({
    field : {
        width : 10,
        height : 10
    } 
});

snake.createFood();

snake._dump();

snake.moveSnake();

snake._dump();

snake.moveSnake();

snake._dump();
