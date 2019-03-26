var functions = require('firebase-functions');
var admin = require('firebase-admin');
var express = require('express');
var app = express();
var path = require('path');
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

    admin.database().ref('testAPI/' + secret + '/').push().set({
        humid: humid,
        temp: temp,
        light: light,
        time: date,
        timestamp: admin.database.ServerValue.TIMESTAMP
    }).then((snapshot) => {
        // return res.redirect(303, snapshot.ref.toString());
        return res.status(200).send("url = " + url);
    });
});


exports.getDashboard = functions.https.onRequest((req, res) => {
    var secret = req.query.secret;

    // res.sendFile(path.join(__dirname, '../public', 'widget.html') );
    if (secret) {
        res.redirect(301, 'https://iotdash.firebaseapp.com/widget.html?secret='+secret);
        // res.redirect(301, 'http://localhost/iotdash/public/widget.html?secret='+secret);
    } else {
        res.redirect(404, 'https://iotdash.firebaseapp.com/404.html');
        // res.redirect(404, 'http://localhost/iotdash/public/404.html');
    }

    // return res.status(200).send("url = " + text);
});

function genDatetime() {
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

    return date + " " + time;
}