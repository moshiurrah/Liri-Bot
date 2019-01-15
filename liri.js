require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

var divider = "\n------------------------------------------------------------\n";

var search = process.argv[2];
var value = process.argv.slice(3).join(" ");

runLiri(search, value);

function runLiri(search, value) {
    switch (search) {
        case "concert-this":
            showConcert(value);
            break;

        case "spotify-this-song":
            showSong(value);
            break;

        case "movie-this":
            showMovie(value);
            break;

        case "do-what-it-says":
            doThis();
            break;
    };
};



function showConcert(value) {
    console.log("Looking for your concert...");

    var URL = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

    axios.get(URL).then(function (response) {
        var jsonData = response.data[0];

        var concertData = [
            "Venue Name: " + jsonData.venue.name,
            "Venue Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
            "Date: " + moment(jsonData.datetime).format("MM/DD/YYYY")
        ].join("\n");

        fs.appendFile("log.txt", concertData + divider, function (err) {
            if (err) throw err;
        });

        console.log(divider + concertData + divider);
    }).catch(function (err) {
        console.log(err);
    });
};



function showSong(value) {
    console.log("Looking for your song...");
    console.log("\n------------------------------------------------------------\n");
    if (!value) {
        value = "The Sign, Ace of Base";
    }
    spotify.search({
        type: "track",
        query: value,
        limit: 1
    }).then(function (response) {
        var spotifyData = response.tracks.items;
        // console.log(spotifyData);
        for (var i = 0; i < spotifyData.length; i++) {

            var artist = spotifyData[i].artists[0].name;
            console.log("\nArtist(s): " + artist);
            var songName = spotifyData[i].name;
            console.log("\nSong Name: " + songName);
            var link = spotifyData[i].preview_url;
            console.log("\nLink: " + link);
            var album = spotifyData[i].album.name;
            console.log("\nAlbum: " + album);
            console.log(divider);


            fs.appendFile("log.txt", "\nArtist(s): " + artist + "\nSong Name: " + songName +
                "\nLink: " + link + "\nAlbum: " + album + divider,
                function (err) {
                    if (err) throw err;
                });
        };
    }).catch(function (err) {
        console.log(err);
    });
};

function showMovie(value) {
    console.log("Looking for your movie...");

    if (!value) {
        value = "Mr. Nobody";
    }

    var URL = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy";

    axios.get(URL).then(function (response) {
        var jsonData = response.data;

        var movieData = [
            "Movie Title: " + jsonData.Title,
            "Release Year: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
            "Country Produced: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors
        ].join("\n");


        console.log(divider + movieData + divider);

        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
        });

    }).catch(function (err) {
        console.log(err);
    });
};

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataArr = data.split(",");

        runLiri(dataArr[0], dataArr[1]);
    });
};