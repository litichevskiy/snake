(function(exports){

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
            ( this.storage[eventName] || [] ).forEach(function( func ) {
                func(d);
            });
        };
    
    PubSub.prototype.unsubscribe = function ( eventName, func ) {
            var index = this.storage[eventName].indexOf(func);
            
            if ( index > -1 ) {
                this.storage[eventName].splice(index, 1);
            }
        };

    exports.PubSub = PubSub;
})(window);
