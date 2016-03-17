/**
 * Created by Alex on 15/03/2016.
 */

"use strict";

var express = require('express');
var app = express();

var positionHandler = {
    position: -90,
    getPosition: function () {
        return this.position;
    },
    setPosition: function (newPos) {
        this.position = newPos;
        return this.position;
    }
};

app.use(express.static('public'));

app.get('/', function (req, res) {
    console.log(__dirname);
});

app.get('/setPosition', function (req, res) {
    var x = positionHandler.setPosition(req.query.pos);
    console.log('x' + x);
    res.json({success: true});
});
app.get('/getPosition', function (req, res) {
    console.log('positionHandler.position in get', positionHandler.position);

    res.json({success: true, position: positionHandler.getPosition()});
});

app.listen(3999, function () {
    console.log("app is listening on port 3999");
});
