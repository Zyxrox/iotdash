var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express');
var app = express();
var firebase = admin.initializeApp(functions.config().firebase);

exports.widget = functions.https.onRequest((req, res) => {
    res.redirect('../widget.html');
});
  
exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase!");
});
exports.addData = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    // var name = req.query.name;
    // var val = req.query.value;
    var text = req.originalUrl;

    var dayFormat = new Date();

    // js date
    var date =
        dayFormat.getDate().toString() +
        '-' +
        (dayFormat.getMonth() + 1) +
        '-' +
        (dayFormat.getFullYear() + 543);

    var time =
        dayFormat.getHours().toString() +
        ':' +
        dayFormat.getMinutes().toString();

    res.status(200).send("url = "+text);
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    // return admin.database().ref('tele/').push({
    //     data_name: name,
    //     value: val,
    //     time: date + " " + time,
    // }).then((snapshot) => {
    //     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //     return res.redirect(303, snapshot.ref.toString());
    // });
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


exports.cloneDash = functions.https.onRequest((req, res) => {
    var secret = req.query.secret;
    res.status(200).send();
});