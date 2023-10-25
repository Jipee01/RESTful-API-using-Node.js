var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listSongs', function (req, res) {
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});

var song = {
    "song6": {
        "song": "Ben&Ben - Leaves feat. Young K | Official Music Video",
        "artist": "Ben&Ben",
        "genre": "folk music",
        "link": "https://www.youtube.com/watch?v=5oxxi0d7AQI&ab_channel=Ben%26Ben",
        "id": 6
    }
};

app.post('/addSong', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        var songs = JSON.parse(data);
        songs["song6"] = song["song6"];
        fs.writeFile(__dirname + "/songs.json", JSON.stringify(songs), 'utf8', function (err) {
            console.log("Song added:", song);
            res.end(JSON.stringify(songs));
        });
    });
});

app.get('/:id', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        var songs = JSON.parse(data);
        var song = songs["song" + req.params.id];
        console.log(song);
        res.end(JSON.stringify(song));
    });
});

app.delete('/deleteSong/:id', function (req, res) {
    // First read existing songs.
    fs.readFile(__dirname + "/songs.json", 'utf8', function (err, data) {
        var songs = JSON.parse(data);
        var idToDelete = req.params.id;
        if (songs["song" + idToDelete]) {
            delete songs["song" + idToDelete];
            fs.writeFile(__dirname + "/songs.json", JSON.stringify(songs), 'utf8', function (err) {
                console.log("Song with ID " + idToDelete + " deleted.");
                res.end(JSON.stringify(songs));
            });
        } else {
            res.status(404).send("Song not found");
        }
    });
});
