( (window ) =>
{
    'use strict';
    let App = window.App || {};

    function Truck ( truckId, db )
    {
        this.truckId = truckId;
        this.db = db;
    };

    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function ( customerId )
    {
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    };

    Truck.prototype.printOrders = function (printFn)
    {
        return this.db.getAll()
            .then(function(orders){
                let custmerIdArray = Object.keys( orders );
                console.log( 'Truck #' + this.truckId + ' has pending orders:');
                custmerIdArray.forEach( function (id ) {
                    console.log(orders[id]);
                    if(printFn){
                        printFn(orders[id])
                    }
                }, this );
            }.bind(this));
    };

    App.Truck = Truck;
    window.App = App;
})( window )