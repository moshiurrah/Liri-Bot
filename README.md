# Liri-Bot App
A Node-based app similar to SIRI that searches OMDB, BandsInTown and Spotify APIs.

## Instructions
To use, enter the following `commands` in Terminal/Bash:

* `concert-this`
* `spotify-this-song`
* `movie-this`
* `do-what-it-says`

See the examples below for further details.

### Search BandsInTown (`concert-this`)
Search for artists currently on tour using `node liri.js concert-this **any artist on tour**`. LIRI will search the BandsInTown API for the selected artist and return the next available concert. See example below:

![image1](/images/concert-this.png)

### Search Spotify (`spotify-this-song`)
Search for any song using `node liri.js spotify-this-song **any song**`. LIRI will search the node-spotify-api for the selected song and return the first result. See example below:

![image2](/images/spotify-this-song.png)

If no song is selected:

![image3](/images/spotify-this-song-nobody.png)

### Search OMDB (`movie-this`)
Search for any movie using `node liri.js movie-this **any movie**`. LIRI will search the OMDB API for the selected movie and return the first result. See example below:

![image4](/images/movie-this.png)

If no movie is selected:

![image5](/images/movie-this-nobody.png)

### Random Search (`do-what-it-says`)
Searches the text file and runs the search listed along with the listed parameter using `node liri.js do-what-it-says`. See example below:

![image6](/images/do-what-it-says.png)

@Mohammad Moshiur Rahman