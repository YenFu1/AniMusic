const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SongSchema = new Schema({
    filename: String,
    type: String,
    source: String,
    title: String,
    artist: String,
});
module.exports = {
    randomSong: function(callback) {
        this.song.count().exec((err, count) => {
            let random = Math.floor(Math.random() * count); 
            this.song.findOne().skip(random).exec((err, result) => {
                return callback(result);
            });
        });
    },
    
    saveSong: function(song) {
        try {
            let songData  = {
                filename: song.file,
                type: song.title,
                source: song.source,
                title: song.song.title,
                artist: song.song.artist,
            }

            let songToSave = new this.song(songData);
            songToSave.save();
        }
        catch(e) {
            console.log(e);
        }
    },

    getAllShows: function(callback) {
        let shows = [];
        this.song.find({},(err, songs) => {
            songs.forEach(song => {
                if (!shows.includes(song.source)) {
                    shows.push(song.source);
                }
            });
            return callback(shows);
        });
    },

    song: mongoose.model('songs', SongSchema),
}