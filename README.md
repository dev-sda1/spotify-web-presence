# spotify-web-presence
Shows on my [website](https://pyxlwuff.dev) what song i'm currently listening to on Spotify with direct url to track. Created with spotify-web-api.

If you have any questions / improvements don't be afraid to contact or submit a PR :p
 
# Prerequisites
- NodeJS and npm
- Spotify Account
- A webserver to host the endpoint on

# Setting up (Server-side only)
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

3) Once everything is installed, you'll be prompted in the console / terminal output to visit an auth url on Spotify's website to verify yourself. Make sure you're signed into the right spotify account before continuing.
<img src="https://i.pyxlwuff.dev/kiqsw.png">

4) If you've entered everything on the developer console and app.js correctly, you'll be taken to an OAuth page, where you'll need to click "Accept".
<img src="https://i.pyxlwuff.dev/7uiy9.png">

5) After clicking agree, check your console output for the tokens that spotify would've sent to you. Your access token expires after an hour, and your refresh token is used to acquire a new access token. **The refresh token never expires** unless you delete the app from your developer panel or you revoke access on your account settings.
<img src="https://i.pyxlwuff.dev/01t6x.png">

6) Copy the refresh token in it's entirety and paste it into the `RefreshToken` column, save the json, then stop the application. If you're doing this on a linux-based SSH session (which is likely), you'll need to exit out of the node process before you're able to edit the config. (Done by pressing CTRL+C).
<img src="https://i.pyxlwuff.dev/zi6js.png">

7) Restart the application, where it should now only notify you that your (access) token has been refreshed. If you get a Spotify API error complaining about an invalid refresh token, check you pasted it correctly then try again.
<img src="https://i.pyxlwuff.dev/3dplq.png">

8) Open spotify and play a song. You can test your endpoint by visiting ``http://localhost:1337/api/currentplaying`` where it'll show you the track's name, author(s), a direct URL, albumn art URL from their CDN, and the playing state.
<img src="https://i.pyxlwuff.dev/s9icy.png">

You now have a spotify endpoint to show on your website!

<h2>Running the API unattended</h2>
There are many different ways that you're able to run this unattended on your production instance, I reccomend using something like PM2, although other alternatives are available.


# Deploying to your server
Deploying shouldn't be too much of a hassle, and chances are you'll be running this alongside your standard Apache/NGINX install. The guides below from DigitalOcean and IONOS should help!

- Nginx Users: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04 (Also includes tutorial for those who just want to set it up with PM2 and not with Nginx)

- Apache users: https://www.ionos.com/digitalguide/websites/web-development/nodejs-for-a-website-with-apache-on-ubuntu/

# Closing thoughts

If you need any extra help don't be afraid to raise an issue on Github.
If you want to contribute at all for some reason, you're free to open a PR too :D

**API endpoint and server security is your responsibility. This program comes with ABSOLUTELY NO WARRANTY.**
