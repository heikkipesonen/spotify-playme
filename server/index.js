'use strict';
let player = require('./player');
let io = require('./socket');
let spotify = require('./spotify');
let server = require('./server');

player.start();


// server.use((req, res, next) => {
//     if (req.headers.kissa) {
//         return next();
//     }

//     res.send(500, {true: false});
// })

server.get('/search', (req, res, next) => {
    spotify.search(req.params.q, req.params.types.split(',')).then((response) => {
        res.send(200, response);
    }, (error) => {
        res.send(500, error);
    });
});

io.on('connect', (socket) => {
    player.getInitializedState().then(() => {
        spotify.getTrack(player.trackId).then((track) => {        
            socket.emit('trackchange', track);
        });
    })

    // socket.on('search', (data) => {
    //     spotify.search(data.query, data.types.split(',')).then((response) => {
    //         socket.emit('searchresults', response);
    //     });
    // });
});

player.on('update', () => {
    io.emit('update', {
        state: player.state,
        position: player.position
    });        
});

player.on('trackchange', () => {
    spotify.getTrack(player.trackId).then((track) => {        
        io.emit('trackchange', track);
    });
});

