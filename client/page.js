$.ajax({
    url: "https://yoursite.com/api/currentplaying",
    type: "get",
    dataType: "JSON",
    success: function(resp){
        console.log("DONE!");
        //console.log(resp['trackname']);
        //console.log(resp['author']);
        if(resp['playing'] == true){
            console.log(resp['url']);
            console.log(resp['playing']);
            $(spotify).removeClass(' hidden');
            var a = document.getElementById('container2');
            var b = document.getElementById('container');
    
            a.className += " spotify_add";
            b.className += " spotify_add";
            var songName = resp['trackname'];
			var artists = resp['author'];
            
            $(spotifyContext).text("Listening to Spotify: "+songName+" - "+artists);
            $(spotifyURL).attr("href", resp['url']);
    
    
        }
    }
})