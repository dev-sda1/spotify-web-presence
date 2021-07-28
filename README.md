# spotify-web-presence

![image](https://user-images.githubusercontent.com/43112896/124996845-91e2fb80-e041-11eb-83fd-72e3cd4b003f.png)
![image](https://user-images.githubusercontent.com/43112896/124996818-842d7600-e041-11eb-8ea5-cbfda9c09212.png)

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

<h2>Configuring the server</h2>
1) Clone the repository into your directory of choice for the endpoint and enter the config.json file in the server folder, where you'll need to paste your client token and secret into the labelled fields. Keep the refresh token space blank that is how spotify will know it's you later.
<img src="https://i.pyxlwuff.dev/3xsa3.png">


2) Save the config.json file and exit out, then open a terminal and run ``npm install && node .`` to install the 14 trillion node dependencies and to start it immediately.
<img src="https://i.pyxlwuff.dev/2j05z.png">

3) Once everything is installed, you'll be prompted in the console / terminal output to visit an auth url on Spotify's website to verify yourself. Make sure you're signed into the right spotify account before continuing.
<img src="https://i.pyxlwuff.dev/kiqsw.png">

4) If you've entered everything on the developer console and app.js correctly, you'll be taken to an OAuth page, where you'll need to click "Accept".
<img src="https://i.pyxlwuff.dev/7uiy9.png">

5) After clicking agree, check your console output for the tokens that spotify would've sent to you. Your access token expires after an hour, and your refresh token is used to acquire a new access token. **The refresh token never expires** unless you delete the app from your developer panel or you revoke access on your account settings, therefore it is absoloutely essential you keep your server secure and the refresh token secret.
<img src="https://i.pyxlwuff.dev/01t6x.png">

6) Copy the refresh token in it's entirety and paste it into the `RefreshToken` column, save the json, then stop the application. If you're doing this on a linux-based SSH session (which is likely), you'll need to exit out of the node process before you're able to edit the config. (Done by pressing CTRL+C).
<img src="https://i.pyxlwuff.dev/zi6js.png">

7) Restart the application, where it should now only notify you that your (access) token has been refreshed. If you get a Spotify API error complaining about an invalid refresh token, check you pasted it correctly then try again.
<img src="https://i.pyxlwuff.dev/3dplq.png">

8) Open spotify and play a song. You can test your endpoint by visiting ``http://localhost:1337/api/currentplaying`` where it'll show you the track's name, author(s), a direct URL, albumn art URL from their CDN, and the playing state. (Screenshot was from MS Edge Devtools. You can use this if you find the output json in the browser hard to read properly)
![image](https://user-images.githubusercontent.com/43112896/127400600-5e9a13c9-ef33-4624-9cf4-e88bb42e8729.png)

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
