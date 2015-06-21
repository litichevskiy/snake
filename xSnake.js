(function(exports, SnakeCore){

    var keyCodeToDirection = {
        37 : 'left',
        38 : 'up',
        39 : 'right',
        40 : 'down'
    };

    function xSnake ( o ) {
        this.core = new SnakeCore({
                field : {
                    width  : o.field.width,
                    height : o.field.height
                }
            });

        this.target = o.insideElement;
    }

    xSnake.fn = xSnake.prototype;

    xSnake.fn.start = function () {
        var that = this;

        createField.call(this, {
            width  : this.core.field.width,
            height : this.core.field.height
        });

        document.onkeydown = function ( event ) {
            var code = event.keyCode;

            if ( keyCodeToDirection.hasOwnProperty(code) ) {
                that.core.direction = keyCodeToDirection[code];
            } else if ( code === 32 ) {

                if ( that.isPaused ) {
                    that.isPaused = false;
                    that.core.start();
                } else {
                    that.isPaused = true;
                    that.core.pause();
                }
            }
        };

        this.core.field.subscribe('change', function( event ){
            var x = event.coords.x,
                y = event.coords.y,
                action = event.action,
                item   = event.content && event.content.item;

            if ( action === 'rm' ) {
                that.field[y][x].className = '';
            } else if ( action === 'put' ) {
                that.field[y][x].classList.add( item );
            }
        });

        this.core.subscribe('gameover', function(){ alert('game over') });
        this.core.start();
    };

    function createField ( o ) {
        var that = this,
            width  = o.width,
            height = o.height,
            line,
            _row,
            _cell,
            _container = document.createElement('div'),
            field  = this.field = [];

        _container.setAttribute('data-snake-game', 'container');

        for ( var y = 0; y <= width; y++ ) {
            line = [];
            _row = document.createElement('div');

            for ( var x = 0; x <= width; x++ ) {
                cell = document.createElement('span');
                _row.appendChild(cell);
                line.push(cell);
            }

            _container.appendChild(_row);
            field.push(line);
        }

        that.target.appendChild(_container);
    };

    exports.xSnake = xSnake;

})(window, SnakeCore)
