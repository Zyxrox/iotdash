var app_firebase = {};
(function(){
    var config = {
        apiKey: "AIzaSyD-6IzYBipiBsBqmLCDizMG4w3zK273LBw",
        authDomain: "iotdash.firebaseapp.com",
        databaseURL: "https://iotdash.firebaseio.com",
        projectId: "iotdash",
        storageBucket: "iotdash.appspot.com",
        messagingSenderId: "595945601133"
    };
    firebase.initializeApp(config);
    app_firebase = firebase;

    function fnCreate (path, body, callBack){
        if (!path || !body) return;         
        app_firebase.database().ref(path).set(body, callBack);
    }
    function fnPush (path, body, callBack){
        if (!path || !body) return;      
        app_firebase.database().ref(path).push().set(body, callBack);   
        // var push = app_firebase.database().ref(path).push();
        // var push_key = push.getKey();
        // app_firebase.database().ref(path).child(push_key).set(body, callBack);
    }
    function fnRead(path, successFunction, errorFunction) {
        if (!path || !successFunction || !errorFunction) return;
        app_firebase.database().ref(path).once('value').then(successFunction, errorFunction);
    }
    function fnUpdate(path, body, callBack) {
        if (!path || !body) return;
        app_firebase.database().ref(path).update(body, callBack);
    }
    function fnDelete(path, callBack) {
        if (!path) return;
        app_firebase.database().ref(path).remove(callBack);
    }

    app_firebase.databaseApi = {
        create: fnCreate,
        push: fnPush,
        read: fnRead,
        update: fnUpdate,
        delete: fnDelete
    }
})()
