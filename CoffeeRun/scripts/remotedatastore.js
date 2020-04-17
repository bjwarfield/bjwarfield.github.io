(function (window) {
    'use strict';
    const App = window.App || {};
    let $ = window.jQuery;

    function RemoteDataStore(url) {
        if (!url) {
            throw new Error('No remote URL supplied.');
        }
        this.serverUrl = url;
    }

    RemoteDataStore.prototype.add = function (key, val) {
        console.log(val);
        return $.post(this.serverUrl, val, (serverResponse) => {
            console.log(serverResponse);
        });
    };

    RemoteDataStore.prototype.getAll = function (cb) {
        return $.get(this.serverUrl, function (serverResponse) {
            if(cb)
            {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.get = (key, cb) => {
        console.log("APIget: ",key);
        return $.get(this.serverUrl + '/' + key, serverResponse => {
            if(cb)
            {
                console.log(serverResponse);
                cb(serverResponse);
            }
        });
    };

    RemoteDataStore.prototype.remove = function (key) {
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE'
        });
    };

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
})(window)