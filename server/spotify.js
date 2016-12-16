'use strict';
require('dotenv').config();
let SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : process.env.REDIRECT_URI
});

let spotify = require('spotify-node-applescript');

let api = {

    currentTrack: null,

    state: null,

    get position () {
        if (api.currentTrack && api.state) {
            let position = this.state.position / this.currentTrack.duration;
            position = position > 1 ? 1 : position < 0 ? 0 : position;

            return position;
        }

        return 0;
    },

    parseIdFromUri (trackId) {
        return trackId.slice(trackId.lastIndexOf(':') +1);
    },

    createkUriFromId (id, type) {
        type = type ? type : 'track';
        return `spotify:${type}:$id`;
    },

    _toPromise (fn, args) {
        return new Promise((resolve, reject) => {

            args = args ? args : [];

            args.push((err, response) => {
                if (!err) {
                    resolve(response);
                } else {
                    reject(err);
                }
            });

            fn.apply(null, args);
        })
    },

    getState () {
        return this._toPromise(spotify.getState).then((state) => {
            state.position = state.position * 1000;
            return state;
        });
    },    

    playTrack (id) {
        return this._toPromise(spotify.playTrack, [api.createkUriFromId(id)]);
    },

    getCurrentTrack () {
        return this._toPromise(spotify.getTrack);
    },

    polling: null,

    start () {
        api.polling = setInterval(() => {
            api.getState().then((state) => {            
                api.state = state;
                api._fire('update', [api.state]);
                
                if (!api.currentTrack || (api.currentTrack && state.track_id !== api.currentTrack.id)) {
                    api.getCurrentTrack().then((track) => {
                        api.currentTrack = track;
                        api._fire('trackchange', [api.currentTrack]);
                    });
                }                
            });
        }, 1000);
    },

    stop () {
        clearInterval(api.polling);
    },

    _listeners: {},

    on (event, fn) {
        if (!api._listeners[event]) {
            api._listeners[event] = [];
        }

        api._listeners[event].push(fn);
    },

    _fire (event, args) {
        if (!args) {
            args = [];
        }

        if (api._listeners[event]) {
            api._listeners[event].forEach((listener) => {
                listener.apply(api, args);
            });
        }
    }
}

module.exports = api;