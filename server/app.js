const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
var tokenExpireEpoch = 0;

var scopes = ['user-read-currently-playing'],
    redirectUri = 'http://localhost/callback',
    clientId = 'CLIENT_ID_HERE',
    state='some-state-of-my-choice';

//Setting creds
var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: 'CLIENT_SECRET_HERE'
});

//var authURL = spotifyApi.createAuthorizeURL(scopes,state);
//console.log(authURL);

//var accessToken = "";
var refreshToken = "REFRESH_TOKEN_HERE";

//spotifyApi.setAccessToken(accessToken);
spotifyApi.setRefreshToken(refreshToken);

const app = express()

function pleaseRefreshlmao(){
    spotifyApi.refreshAccessToken().then(
        function(data){
            //console.log("The token has been refresh!");
            tokenExpireEpoch = Math.floor(Date.now() / 1000);
            spotifyApi.setAccessToken(data.body['access_token']);
        },
        function(err){
            console.log("Couldn't refresh token! Error:", err);
        }
    )
}

function getPlaying(req,res){
    spotifyApi.getMyCurrentPlayingTrack()
        .then(function(data){
            
            //console.log(data.body.item.album.images[2]["url"]);
            //console.log(data.body.item.external_urls['spotify']);
            //console.log(data.body.item.album.external_urls['spotify']);
            //console.log(data.body.item.id);
            //var artist = data.body.item.artists[0]['name'];
            //console.log(data.body.item.artists);
            //console.log(artist);
            //console.log("hi")

            if(data.body === {}){
                console.log("There is nothing.");
            }

            var artists = "";
            var i;

            if(data.body.item.artists.length >1){
                for(i=0; i < data.body.item.artists.length; i++){
                    artists += data.body.item.artists[i]['name']+ ", "
                }
            }else{
                artists += data.body.item.artists[0]['name']
            }
            
            res.json({"trackname": data.body.item.name, "author": artists, "url": data.body.item.external_urls['spotify'], "playing": data.body.is_playing});
        }, function(err){
            console.log("Something went wrong!", err);
        })
}


app.get('/api/currentplaying', function(req,res){
    var owo = Number(Math.floor(Date.now() / 1000) - tokenExpireEpoch);
    console.log(owo);
    if(owo >= 3600){
        pleaseRefreshlmao();
        getPlaying(req,res);
    }else{
	//console.log("Not hit epoch yet");
        getPlaying(req,res);
    }

    //console.log("Current UNIX: "+Math.floor(Date.now()/1000));
    //console.log("Token Epoch: "+tokenExpireEpoch);

});



app.get('/callback', function(req,res){
    var code = req.query.code;
    var state = req.query.state;

    spotifyApi.authorizationCodeGrant(code)
        .then(function(data){
            //console.log(data);
            //console.log('The token expires in ' + data['expires_in']);
            console.log('The access token is ' + data['access_token']);
            console.log('The refresh token is ' + data['refresh_token']);

            res.redirect('/');
        }, function(err){
            //res.status(err.code);
            //res.send(err.message);
            //res.sendStatus(500).json({"success": false});
            console.log("oh fuck it errored. error was: "+err.message);
        })
});

pleaseRefreshlmao();
app.listen(1337);
