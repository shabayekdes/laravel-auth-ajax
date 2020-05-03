let AuthAjax = (function(){

    function AuthAjax(info){
        this.formId = info.form;
        this.inputArray = info.input;

        // eval('this.' + this.formId + '(this);')
        this.ajaxForm(this);

    }

    AuthAjax.prototype.input = [
        ['name', 'required'],
        ['email', 'required'],
        ['password', 'required'],
        ['password_confirmation', 'required'],
        ['_token', 'required']
    ];

    AuthAjax.prototype.ajaxForm = function (thisClass) {
        this.addEvent(this.formId, 'submit', function () {
            let info = thisClass.GetInfo();
            if (info !== false) {
                thisClass.sendRequest(info, thisClass);
            } else {
                console.log("Fill All Inputs");
            }
        });
    };

    AuthAjax.prototype.sendRequest = function(info, thisClass) {
            let url = this.getUrl();
            window.ajax()
                .post(url, info)
                .then(function(response) {
                    console.log(response)
                    if (response == true) {
                        location.reload();
                    }
                });
        };

    AuthAjax.prototype.GetInfo = function () {
        var object = {};
        console.log(this.checkInput())
        for (var i = 0; i < this.checkInput().length; i++) {
            if (typeof this.checkInput()[i] == "object") {
                if (this.checkInput()[i][1] == 'required' && this.getValByName(this.checkInput()[i][0]) == "") {
                    return false;
                }
                object[this.checkInput()[i][0]] = this.getValByName(this.checkInput()[i][0]);
            } else {
                object[this.checkInput()[i]] = this.getValByName(this.checkInput()[i]);
            }
        }
        return object;
    };

    AuthAjax.prototype.addEvent = function (id, action, callback) {
        this.getById(id).addEventListener(action, function (event) {
            event.preventDefault();
            callback();
        })
    };

    AuthAjax.prototype.checkInput = function () {
        return this.inputArray === undefined ? this.input : this.inputArray;
    };

    AuthAjax.prototype.getUrl = function () {
        return this.getById(this.formId).action;
    };

    AuthAjax.prototype.getById = function (id) {
        return document.getElementById(id);
    };

    AuthAjax.prototype.getValByName = function(name){
        return this.getByName(name).value;
    };

    AuthAjax.prototype.getByName = function(name){
        return document.getElementsByName(name)[0];
    };

    return AuthAjax ;
})();
