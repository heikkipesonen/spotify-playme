'use strict';
let spotify = require('./spotify');
let io = require('./socket');


io.on('connect', (socket) => {
    socket.emit('update', spotify.state);    
});


spotify.start();

spotify.on('update', (state) => {    
    io.emit('update', state);    
});

spotify.on('trackchange', (state) => {    
    io.emit('trackchange', state);    
});


// spotify.getCurrentTrack().then((track) => {
//     console.log('..-------...')
//     console.log(track)
//     console.log('..-------...')
// }, (error) => {
//     console.log(error)
// })

