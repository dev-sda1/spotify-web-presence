# spotify-web-presence

![image](https://user-images.githubusercontent.com/43112896/122792185-d5074580-d2b1-11eb-80ae-32d92732d225.png)

A quick way to display what your currently playing song on Spotify is on your website or elsewhere in a JSON format.
If you have any questions / improvements send me a dm or open a PR :p 
 
# Prerequisites
- NodeJS and npm (sadly this was done with express)
- Spotify Account
- A webserver to host the endpoint on

# Setting up (Server-side)
The client folder only serves as an example for how you could display it to the client.

<h2>Creating your app</h2>
1) Go to https://developer.spotify.com/dashboard, login and click "create an app" to give it a name and description.
<img src="https://i.pyxlwuff.dev/y6ij5.png" alt="App creation wizard">

2) You'll be given a Client ID and Client Secret. Store these somewhere as you'll need them later. **Make sure to keep your Secret private. The client secret should never leave the server**
<img src="https://i.pyxlwuff.dev/ot88b.png" alt="Keys">

3) Click edit settings and scroll down to the Redirect URIs section. This is what spotify uses to tell our server that authentication was a success when we get to acquiring our access and refresh tokens. As this is being used on a portfolio (personal) website hopefully, all you'll need is to add localhost. Type ``http://localhost:1337/callback`` and click add, then save.
<img src="https://i.pyxlwuff.dev/w736l.png">

<h2>Configuring the files</h2>
1) Clone the repository and uncomment lines 17 and 18 on ``app.js`` in the server folder. Insert your Client ID from the app dashboard into the clientID field between the quotes on line 7. Repeat for the client secret on line 14.
<img src="https://i.pyxlwuff.dev/3gsqj.png">

2) Open a terminal and run ``npm install && node .`` to install required packages and to start it immediately.
<img src="https://i.pyxlwuff.dev/2j05z.png">

3) Ignore any errors that may appear from an absense of no refresh token. These will disappear after we get our refresh token.
<img src="https://i.pyxlwuff.dev/xdfls.png">

4) If you've entered everything on the developer console and app.js correctly, you'll be taken to an OAuth page, where you'll need to click "Accept".
<img src="https://i.pyxlwuff.dev/7uiy9.png">

5) After clicking agree, check your console output for the tokens that spotify would've sent to you. Your access token expires after an hour, and your refresh token is used to acquire a new access token. **The refresh token never expires** unless you delete the app from your developer panel or you revoke access on your account settings. Stop the file to close the express server connection (typically ``CTRL+C``), as the callback function is now no longer needed.
<img src="https://i.pyxlwuff.dev/owuxr.png">

6) Copy the refresh token in its entirety and place it into the quotes on line 21 where it says ``REFRESH_TOKEN_HERE``. Proceed to comment out lines 17 and 18 again as they are no longer needed (for now).
<img src="https://i.pyxlwuff.dev/obeg3.png">
<img src="https://i.pyxlwuff.dev/zjrcu.png">

7) Save the file and restart it by typing ``node .``. You should now not see anything in the output.
<img src="https://i.pyxlwuff.dev/tngnz.png">

8) Open spotify and play a song. You can test your endpoint by visiting ``http://localhost:1337/api/currentplaying`` where it'll show you the track's name, author(s), a direct URL, and the playing state.
<img src="https://i.pyxlwuff.dev/aablx.png">

You now have a spotify endpoint to show on your website!

<h2>Running the API unattended</h2>
I reccomend if you wish to run the api unattended on your server, you install something like forever on your prod server with ``npm install forever -g`` and run ``forever start app.js``

# Deploying to your server
Deploying shouldn't be too much of a hassle, and chances are you'll be running this alongside your standard Apache/NGINX install. The guides below from DigitalOcean and IONOS should help!

- Nginx Users: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
- Apache users: https://www.ionos.com/digitalguide/websites/web-development/nodejs-for-a-website-with-apache-on-ubuntu/

# Closing thoughts

If you need any extra help don't be afraid to raise an issue on Github.
If you want to contribute at all for some reason, you're free to open a PR too :D

API endpoint and server security is your responsibility. This program comes with ABSOLUTELY NO WARRANTY.
