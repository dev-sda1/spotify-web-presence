//  Make sure you import jquery before using this!

//  Use this on a website that is lucky enough to not use a javascript powered framework 
//  for a personal-website frontend

$.ajax({
    url: 'https://yourweb.site/api/currentplaying',
    type: 'get',
    dataType: 'JSON',
    success: function(resp){
        //console.log("DONE!");
        //console.log(resp['trackname']);
        //console.log(resp['author']);
        //console.log(resp);
        if(resp['playing'] == true){
            //console.log(resp['url']);
            //console.log(resp['playing']);
            $(spotify).removeClass(' hidden');
            var a = document.getElementById('spotify');
    
            a.className += " show";
            var songName = resp['trackname'];
		var artists = resp['author'];
            var albumTitle = resp['albumtitle'];
            var albumArtURL = resp['albumart'];
            
            $(songname).text(songName);
            $(songartists).text("by "+artists);
            $(album).text("on "+albumTitle)
            $(spotifyURL).attr("href", resp['url']);
            $(albumart).attr("src", albumArtURL)
    
        }
    }
})
