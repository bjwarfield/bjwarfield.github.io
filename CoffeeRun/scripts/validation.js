(function (window) {
    'use strict';
    const App = window.App || {};
    const Validation = {
        isCompanyEmail: function (email) {
            return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
        }
    };
    App.Validation = Validation;
    window.App = App;
})(window);