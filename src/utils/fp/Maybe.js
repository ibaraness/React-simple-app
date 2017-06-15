/**
 * Maybe monad - create a functor that wraps value and enable us
 * to map through it again and again
 */
const Maybe = function(val){
    this.__value = val;
};

/**
 * A better object creator than using a the 'new' keyword
 */
Maybe.of = function(val){
    return new Maybe(val);
};

Maybe.prototype.isNothing = function(){
    return (this.__value === null || this.__value === undefined);
}

/**
 * If the Maybe's value is null or undefined, the map will return a Maybe with 
 * null value and won't execute the function set on map
 */
Maybe.prototype.map = function(f){
    if(this.isNothing()){
        return Maybe.of(null);
    }
    return Maybe.of(f(this.__value));
};

Maybe.prototype.join = function(){
    return this.__value;
}

Maybe.prototype.chain = function(f){
    if(this.isNothing()){
        return Maybe.of(null);
    }
    return this.map(f).join()
};

/**
 * If Maybe value is null or undefined we can execute an alternative behaviour
 */
Maybe.prototype.orElse = function(def){
    if(this.isNothing()){
        return Maybe.of(def);
    }
    return this;
}
export default Maybe;