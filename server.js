const fetch = require('./fetch');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const mongoose = require('mongoose');
const router = express.Router();
const async = require('async');
const cors = require('cors');
const Song = require('./models/Song')
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(cors());
app.use(bodyParser.json());
app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/animusic', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

/*router.route('/add').post((req, res) => {
    fetch.getSongsList()
        .then(data => {
            async.each(data, (song) => {
                Song.saveSong(song);
            });
        })
        .then( () => {
            res.status(200).send('Done')
        });
});*/

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
    fetch.getSongsList()
    .then(data => {
        async.each(data, (song) => {
            Song.saveSong(song);
        });
    })
    .then( () => {
        res.status(200).send('Done')
    });
});

const gameState = {
    players: {},
}

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('JOIN', () => {
        gameState.players[socket.id] = {
            score: 0,
            username: 'avilo',
        }
    });

    socket.on('GETRANDOMSONG', () => {
        Song.randomSong(song => {
            socket.emit('SONG', song);
        });
    });

    socket.on('GETALLSHOWS', () => {
        Song.getAllShows(shows => {
            socket.emit('SHOWS', shows)
        });
    });

    socket.on('UPDATE', (isAnswerCorrect) => {
        if (isAnswerCorrect) {
            gameState.players[socket.id].score += 1;
        }
    });
    socket.on('GETPLAYERS', () => {
        socket.emit('PLAYERS', gameState.players);
    });
    
});

http.listen(8000, () => console.log(`App listening on port: ${8000}`));