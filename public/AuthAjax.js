let AuthAjax = (function(){

    function AuthAjax(){

    }


    AuthAjax.prototype.getValByName = function(name){
        return this.getByName(name).value;
    };

    AuthAjax.prototype.getByName = function(name){
        return document.getElementsByName(name)[0];
    };

    return AuthAjax ;
})();
