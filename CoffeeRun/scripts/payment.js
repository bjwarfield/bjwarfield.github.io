(function (window) {
    const App = window.App || {};
    const $ = window.jQuery;

    function Payment(selector) {
        console.log("Payment::Constructor");
        if (!selector) {
            throw new Error("No Selector Provided");
        }
        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    Payment.prototype.Pay = function (info) {

        $("#PayModal").html(
         `<p>Than you for your purchanse, ${info.title} ${info.username}</p>`
        );

        $("#PayModal").modal();

    }

    App.Payment = Payment;
    window.App = App;
})(window);
0