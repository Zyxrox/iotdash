var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express');
var app = express();
var firebase = admin.initializeApp(functions.config().firebase);
  
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});
exports.addPlantData = functions.https.onRequest((req, res) => {
    var humid = req.query.humid;
    var temp = req.query.temp;
    var light = req.query.light;
    var secret = req.query.secret;
    var url = req.originalUrl;
    var date = genDatetime();

    // res.status(200).send("url = "+text);
    return admin.database().ref('testAPI/'+secret+'/').push().set({
        humid: humid,
        temp: temp,
        light: light,
        time: date,
        timestamp: admin.database.ServerValue.TIMESTAMP
    }).then((snapshot) => {
        // return res.redirect(303, snapshot.ref.toString());
        return res.status(200).send("url = "+url);
    });
});
exports.posts = functions.https.onRequest((req, res) => {
    var postsRef = firebase.database().ref('tele/');
    postsRef.once('value').then(function (snap) {
        res.status(200).json({
            posts: snap.val()
        });
    });
});

exports.testURL = functions.https.onRequest((req, res) => {
    var text = req.originalUrl;

    res.status(200).send("url = "+text);
    res.end("url = "+text);
});

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
