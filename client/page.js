//  Make sure you import jquery before using this!

//  Use this on a website that is lucky enough to not use a javascript powered framework 
//  for a personal-website frontend

//  Make sure you import jquery before using this!

//  Use this on a website that is lucky enough to not use a javascript powered framework 
//  for a personal-website frontend

$.ajax({
    url: 'https://yourweb.site/api/currentplaying',
    type: 'get',
    dataType: 'JSON',
    success: function(resp){

        if(resp['playing'] == true){
            //console.log(resp['url']);
            //console.log(resp['playing']);
            $(spotify).removeClass(' hidden');
            var a = document.getElementById('spotify');
    
            a.className += " show";
            var songName = resp['trackname'];
            var albumTitle = resp['albumtitle'];
            var albumArtURL = resp['albumart'];
            var authors = "";

            //Getting Author(s)
            if (resp.urls.artists.length > 1) {
                for (i = 0; i < resp.urls.artists.length; i++) {
                    //authors[i] = {"name": data.body.item.artists[i].name, "url": data.body.item.artists[i].external_urls.spotify};
                    authors += resp.urls.artists[i].name + ", ";
                }

                //Remove the last , at the end of the authors string
                authors = authors.substring(0, authors.length - 2);
                
            } else {
                authors += resp.urls.artists[0].name
            }
            
            $(songname).text(songName);
            $(songartists).text("by " + authors);
            $(album).text("on "+albumTitle)
            $(albumURL).attr("href", resp.urls.albumURL)
            //$(albumURL).attr("href", "#") // Needs to be replaced with new api responses in future.
            $(songURL).attr("href", resp.urls.trackURL);
            $(albumart).attr("src", albumArtURL)
    
        }
    }
})