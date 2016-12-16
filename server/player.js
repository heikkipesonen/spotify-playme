'use strict';
let spotify = require('spotify-node-applescript');

let api = {

    track: null,

    state: null,

    get position () {
        if (api.track && api.state) {
            let position = api.state.position / api.track.duration;
            position = position > 1 ? 1 : position < 0 ? 0 : position;

            return position;
        }

        return 0;
    },

    get trackId () {
        return api.track ? this.parseIdFromUri(api.track.id) : false;
    },

    parseIdFromUri (uri) {
        return uri.slice(uri.lastIndexOf(':') +1);
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
            api.state = state;
            return state;
        });
    },    

    playTrack (id) {
        return this._toPromise(spotify.playTrack, [api.createkUriFromId(id)]);
    },

    getCurrentTrack () {
        return this._toPromise(spotify.getTrack).then((track) => {
            api.track = track;
            return track;
        });
    },

    getInitializedState () {
        return this.getState().then((state) => {
            return this.getCurrentTrack().then((track) => {
                return {
                    state,
                    track
                }
            })
        })
    },

    polling: null,

    start () {
        api.polling = setInterval(() => {
            api.getState().then((state) => {            
                if (!api.track || (api.track && state.track_id !== api.track.id)) {                    
                    api.getCurrentTrack().then((track) => {                        
                        api._fire('update', [api.state, api.position, api.track]);
                        api._fire('trackchange', [api.track]);
                    });
                } else {
                    api._fire('update', [api.state, api.position, api.track]);
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
                try {
                    listener.apply(null, args);                
                } catch (e) {
                    console.log(e)
                }
            });
        }
    }
}

module.exports = api;