'use strict';
let spotify = require('./spotify');
let io = require('./socket');


io.on('connect', (socket) => {
    socket.emit('update', spotify.state);    
});


spotify.start();

spotify.on('update', (state) => {
    socket.emit('update', state);    
});

spotify.on('trackchange', (state) => {
    socket.emit('trackchange', state);    
});


// spotify.getCurrentTrack().then((track) => {
//     console.log('..-------...')
//     console.log(track)
//     console.log('..-------...')
// }, (error) => {
//     console.log(error)
// })

