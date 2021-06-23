const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
const config = require("./config.json");
var tokenExpireEpoch = 0;
var cors = require('cors');
const e = require("express");

var scopes = ['user-read-currently-playing'],
    redirectUri = 'http://localhost:1337/callback',
    clientId = config.ClientToken,
    state = 'some-state-of-my-choice';

//Setting creds
var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: config.ClientSecret
});

//var authURL = spotifyApi.createAuthorizeURL(scopes,state);
//console.log(authURL);

//var accessToken = "";
var refreshToken = config.RefreshToken;

//spotifyApi.setAccessToken(accessToken);
spotifyApi.setRefreshToken(refreshToken);

const app = express()
app.use(cors())

function pleaseRefreshlmao() {
    //Check to see if a token exists on the config.
    spotifyApi.refreshAccessToken().then(
        function (data) {
            console.log("The token has been refresh!");
            tokenExpireEpoch = Math.floor(Date.now() / 1000);
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function (err) {
            console.log("Couldn't refresh token! Error:", err);
        }
    )
}

function generateToken() {
    var authURL = spotifyApi.createAuthorizeURL(scopes, state);
    console.log("A refresh token is missing from your config! Either add the token to your config.json or visit the URL below to create one:\n" + authURL + "\n\nURL not working? Make sure you followed the tutorial on the GitHub repository. Otherwise, create an issue and i'll take a look");
}

function getPlaying(req, res) {
    spotifyApi.getMyCurrentPlayingTrack()
        .then(function (data) {

            //console.log(data.body.item.album.images[2]["url"]);
            //console.log(data.body.item.external_urls['spotify']);
            //console.log(data.body.item.album.external_urls['spotify']);
            //console.log(data.body.item.album.name);
            //var artist = data.body.item.artists[0]['name'];
            //console.log(data.body.item.artists);
            //console.log(artist);
            //console.log("hi")

            if (data.body === {}) {
                console.log("There is nothing.");
            }

            var artists = "";
            var i;

            try {
                if (data.body.item.artists.length > 1) {
                    for (i = 0; i < data.body.item.artists.length; i++) {
                        artists += data.body.item.artists[i]['name'] + ", "
                    }
                } else {
                    artists += data.body.item.artists[0]['name']
                }

                res.json({
                    "trackname": data.body.item.name,
                    "author": artists,
                    "url": data.body.item.external_urls['spotify'],
                    "albumtitle": data.body.item.album.name,
                    "albumart": data.body.item.album.images[1]["url"],
                    "playing": data.body.is_playing,
                    "urls": { "authorURL": "", "albumURL": "", "songURL": "" }
                });

            } catch (e) {
                res.json({ "notice": "No sound playing" });
            }

        }, function (err) {
            res.json({ "error": "An error occured. See console log for details." });
            console.log(err);
        })
}


app.get('/api/currentplaying', function (req, res) {
    var owo = Number(Math.floor(Date.now() / 1000) - tokenExpireEpoch);
    console.log(owo);
    if (owo >= 3600) {
        pleaseRefreshlmao();
        getPlaying(req, res);
    } else {
        //console.log("Not hit epoch yet");
        getPlaying(req, res);
    }

    //console.log("Current UNIX: "+Math.floor(Date.now()/1000));
    //console.log("Token Epoch: "+tokenExpireEpoch);

});



app.get('/callback', function (req, res) {
    var code = req.query.code;
    var state = req.query.state;

    if (refreshToken != "") {
        res.json({ "error": "Token already exists." });
        res.destroy();
    } else {
        spotifyApi.authorizationCodeGrant(code)
            .then(function (data) {
                //console.log(data);
                console.log("Success! Copy and paste the full refresh token into your config.json, then restart the app and you should be all good to go.")
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                res.json({"message": "Success! Check console for token outputs."});
                res.destroy();
            }, function (err) {
                //res.status(err.code);
                //res.send(err.message);
                //res.sendStatus(500).json({"success": false});
                console.log("oh fuck it errored. error was: " + err.message);
            })
    }
});


if (refreshToken == "") {
    generateToken();
} else {
    pleaseRefreshlmao();
}

app.listen(1337);