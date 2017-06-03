(function() {
   function SongPlayer($rootScope,Fixtures) {
        var SongPlayer = {};
       
       /**
        * @desc Assign the Fixtures' albumPicasso Object to currentAlbum
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();
       
        /**
 * @desc Active song object from list of songs
 * @type {Object}
 */

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
        	if (currentBuzzObject) {
        		stopSong(song);
                // currentBuzzObject.stop();
                // SongPlayer.currentSong.playing = null;
        		
        	}

        	currentBuzzObject = new buzz.sound(song.audioUrl, {
        		formats: ['mp3'],
        		preload: true
        	});
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
          });

        	SongPlayer.currentSong = song;
        };
       
       /**
        * @function playSong
        * @desc Starts playing the currently selected song and sets the song.playing Boolean flag
        * @param {Object} song
        */
       
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
             SongPlayer.volume = currentBuzzObject.getVolume();
         };
       
       /** 
        * @function stopSong
        * @desc Stops playing the currently selected song and clears the song.playing Boolean flag
        * @param {Object} song
        */
       
       var stopSong = function(song) {
           currentBuzzObject.stop();
           SongPlayer.currentSong.playing = null; 
       };
       
       
       /**
        * @desc Album index number of current song
        * @type {Number}
        * @param {Object} song
        */
       
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
       
       /**
       * @desc Active song object from list of songs
        * @type {Object}
        */
       
        SongPlayer.currentSong = null;
         /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
        SongPlayer.currentTime = null;
       
       /**
       
        /**
        * @des Hold the current volume level of a playing song
        * @type {Number}
        */
        SongPlayer.volume = null;
       
       
       
       /**
        * @method SongPlayer.play
        * @desc Checks to see if the song clicked was already the selected song and, if not,
        * sets the clicked song as the current song & plays it or, if so, and if paused,
        * resumes playing.
        * @param {Object} song
        */

        SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
        	 if (SongPlayer.currentSong !== song) {
        		 setSong(song);
                 playSong(song);
        	} else if (SongPlayer.currentSong === song) {
        		if (currentBuzzObject.isPaused()) {
        			currentBuzzObject.play();
        		}
        	}
        };
       
       /**
        * @method SongPlayer.pause
        * @desc Pauses the currently playing song and clears the song.playing Boolean flag
        * @param {Object} song
        */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
        	currentBuzzObject.pause();
        	song.playing = false;
        };
       
        /**
        * @method SongPlayer.previous
        * @desc Changes the current song to that which precedes it in the album order
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
       
       SongPlayer.next = function() {
           var currentSongIndex = getSongIndex(SongPlayer.currentSong);
           currentSongIndex++;
           
           if (currentSongIndex >= Fixtures.getAlbum().songs.length) {
               stopSong(song);
               // currentBuzzObject.stop();
               // SongPlayer.currentSong.playing = null;

           } else {
               var song = currentAlbum.songs[currentSongIndex];
               setSong(song);
               playSong(song);
           }
       };
       
    /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
       
        /**
         * @function setVolume
         * @des Set volume of currently playing song
         * @param {Number} time
         */
       
       SongPlayer.setVolume = function(volume) {
           if (currentBuzzObject) {
               currentBuzzObject.setVolume(volume);
           }  
       };
         

        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();