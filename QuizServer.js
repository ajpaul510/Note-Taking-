/*
    Quiz API Server
*/
var express = require('express');
var app = express();
app.use(express.static('public')); // For static assets



var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var jsonParser = bodyParser.json();

const DataStore = require('nedb');
const quizDb = new DataStore({
    filename: __dirname + '/QuizDB',
    autoload: true
});

const counterDb = new DataStore({
    filename: __dirname + '/counterDB',
    autoload: true
});


app.get('/allQs', function (req, res) {
    quizDb.find({}).sort({
        _id: 1
    }).exec(function (err, docs) {
        if (err) {
            res.send("something is wrong");
        } else {
            res.json({questions: docs
            });
        }
    });
})

app.post('/addQ', jsonParser, function(req, res){
    counterDb.findOne({_id: "questionCount"}, function(err, doc){
        let count = doc.value;
        let entry = Object.assign({}, req.body.q, {_id: String(count)});
        console.log(entry);
        quizDb.insert(entry, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Added question`);
                counterDb.update({_id: "questionCount"}, {$set: {value: count + 1}});
            }
            res.json(entry);
        });
});
})

const host = '127.0.0.1';
const port = '5555';
app.listen(port, host, function () {
    console.log("QuizServer.js app listening on IPv4: " + host +
        ":" + port);
});
