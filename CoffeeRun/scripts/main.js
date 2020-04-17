(function (window) {
    'use strict';


    //   // Your web app's Firebase configuration
    // var firebaseConfig = {
    //     apiKey: "AIzaSyAAtO8553PStXo1tN28DSUlheaPHLfOzKY",
    //     authDomain: "coffeerun-99b73.firebaseapp.com",
    //     databaseURL: "https://coffeerun-99b73.firebaseio.com",
    //     projectId: "coffeerun-99b73",
    //     storageBucket: "coffeerun-99b73.appspot.com",
    //     messagingSenderId: "499609835078",
    //     appId: "1:499609835078:web:934b8df494fa1c85205c47"
    // };
    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);


    let FORM_SELECTOR = '[data-coffee-order="form"]';
    let PAYMENT_SELECTOR = '[data-coffee-order="payment"]';
    let CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    // let SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    let SERVER_URL = ' https://us-central1-coffeerun-99b73.cloudfunctions.net/app/api';
    let App = window.App;
    let Truck = App.Truck;
    let DataStore = App.DataStore;
    let RemoteDataStore = App.RemoteDataStore;
    let FormHandler = App.FormHandler;
    let Validation = App.Validation;
    let CheckList = App.CheckList;
    let remoteDS = new RemoteDataStore(SERVER_URL);
    let Payment = App.Payment;
    let myTruck = new Truck("ncc-1701", remoteDS );
    window.myTruck = myTruck;
    let checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    let formHandler = new FormHandler(FORM_SELECTOR);
    let paymentHandler = new FormHandler(PAYMENT_SELECTOR);
    let myPayment = new Payment(PAYMENT_SELECTOR);

    formHandler.addSubmitHandler(data => {
        return myTruck.createOrder.call(myTruck, data)
            .then(()=>{
                checkList.addRow.call(checkList, data);
            });
    });
    paymentHandler.addSubmitHandler(data =>{
        myPayment.Pay.call(myPayment,data);
    });

    formHandler.addInputHandler(Validation.isCompanyEmail);
    myTruck.printOrders(checkList.addRow.bind(checkList));
    
})(window);