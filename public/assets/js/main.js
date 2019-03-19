var mainApp = {};

(function(){  
    var firebase = app_firebase;
    uid = null;
    firebase.auth().onAuthStateChanged(function(user) {
    if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid; 
            checkNewUser();
    }
        else{
            uid = null;
            window.location.replace("index.html");
        }
    });

    function massageHandler(err) {
        if (!!err) {
            console.log(err);
        } else {
            console.log("success");
        }
    }

    function createUser() {
        var path = 'users/' + uid;
        var data = {
            name: name
        }
        console.log('create new user...');
        app_firebase.databaseApi.create(path, data, massageHandler);
    }

    function checkNewUser() {
        console.log('checking user...');
        firebase.database().ref('users/').child(uid).once('value').then(function (snap) {
            if (!snap.exists()) {
                createUser();
            } else {
                console.log('user is existed...');
            }
        });
    }

    function logOut() {
        firebase.auth().signOut();
        alert("Sign out");
    }

    function createDevice(d_name,d_type,secret,stamp) {
        var path = 'users/' + uid + '/device/';
        var time = genDatetime();
        var data = {
            name: d_name,
            type: d_type,
            secret: secret,
            time: time,
            timestamp: stamp
        }
        console.log('created new device...');
        app_firebase.databaseApi.push(path, data, massageHandler);
        checkDeviceSecret(secret, d_type);
    }

    function checkDeviceSecret(secret, type) {
        console.log('checking device...');
        firebase.database().ref('telemetry/').child(secret).once('value').then(function (snap) {
            if (!snap.exists()) {
                registDeviceKey(secret, type);
                console.log('new device secret is registed...');
            } else {
                console.log('device secret is existed...');
            }
        });
    }

    function registDeviceKey(secret, type) {
        var path = 'telemetry/' + secret + '/';
        var data = {
            status: 1,
            type: type
        };
        app_firebase.databaseApi.create(path, data, massageHandler);
        path = 'dashboard/' + secret + '/';
        app_firebase.databaseApi.create(path, data, massageHandler);
    }

    function updateDevice(newName,key) {
        var path = 'users/' + uid + '/device/' + key +'/';
        var data = {
            name: newName
        };
        app_firebase.databaseApi.update(path, data, massageHandler);
        console.log('updated device...');
    }

    function deleteDevice(key, secret) {
        var path = 'users/' + uid + '/device/' + key +'/';
        app_firebase.databaseApi.delete(path, massageHandler);
        console.log('deleted device...');
        clearDeviceKey(secret);
    }

    function clearDeviceKey(secret) {
        var path = 'telemetry/' + secret + '/';
        app_firebase.databaseApi.delete(path, massageHandler);
        console.log('clear registry...');
    }

    function addWidget(type, mData, secret) {
        var path = 'dashboard/' + secret + '/';
        var data = {
            type: type,
            data: mData,
        };
        app_firebase.databaseApi.push(path, data, massageHandler);
        console.log('added widget...');
    }

    function fnCreate() {        
        var path = 'users/' + uid;
        var data = {
            name : name
        }
        app_firebase.databaseApi.create(path, data, massageHandler);
    }

    function fnRead() {
        var path = 'users/' + uid;
        app_firebase.databaseApi.read(path, successFn, massageHandler);
        function successFn(snapShot) {
            if (!!snapShot) {
                console.log(snapShot.val());
            } else {
                console.log('No data found :(');
            } 
        }
    }
    function fnUpdate() {
        var path = 'users/' + uid;
        var data = {
            testUpdate : "Aye"
        };
        app_firebase.databaseApi.update(path, data, massageHandler);
    }

    function fnDelete() {
        var path = 'users/' + uid;
        app_firebase.databaseApi.delete(path, massageHandler);
    }

    function genDatetime(){
        var dayFormat = new Date();

        var date =
            dayFormat.getDate().toString() +
            '-' +
            (dayFormat.getMonth() + 1) +
            '-' +
            (dayFormat.getFullYear() + 543);

        var time =
            dayFormat.getHours().toString() +
            ':' +
            dayFormat.getMinutes().toString() +
            ':' +
            dayFormat.getMilliseconds().toString();

        return date+" "+time;
    }

    mainApp.Create = fnCreate;
    mainApp.Read = fnRead;
    mainApp.Update = fnUpdate;
    mainApp.Delete = fnDelete;
    mainApp.CreateDevice = createDevice;
    mainApp.logOut = logOut;
    mainApp.GenTime = genDatetime;
    mainApp.UpdateDevice = updateDevice;
    mainApp.DeleteDevice = deleteDevice;
    mainApp.AddWidget = addWidget;

})()