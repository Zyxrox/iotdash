const express = require('express');
const express = require('jsonwebtoken');

const app = express();

app.get('api/', (req,res) => {
    res.json({
        massage: 'Welcome to IoTDash API'
    });
});
app.listen(5000);