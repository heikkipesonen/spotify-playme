'use strict';

require('dotenv').config();
let SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : process.env.REDIRECT_URI
});

const cache = {};

const spotify = {

    setCache (path, key, value) {
        if (!cache[path]) {
            cache[path] = {};
        }
        cache[path][key] = value;
    },

    getCache (path, key) {
        return new Promise((resolve, reject) => {
            if (cache[path] && cache[path][key]) {
                resolve(cache[path][key]);
            } else {
                reject(false);
            }
        });
    },

    _respond (response) {
        return response.body;
    },

    getTrack (id) {
        return spotify.getCache('track', id).then((track) => track, () => {
            return spotifyApi.getTrack(id).then(spotify._respond).then((track) => {
                spotify.setCache('track', track.id, track);
                return track;
            });
        })
    },

    getAlbum (id) {
        return spotify.getCache('album', id).then((album) => album, () => {
            return spotifyApi.getAlbum(id).then(spotify._respond).then((album) => {
                spotify.setCache('album', album.id, album);
                return album;
            });
        });
    },

    search (query, types) {
        return spotifyApi.search(query, types).then(spotify._respond);
    }

}

module.exports = spotify;