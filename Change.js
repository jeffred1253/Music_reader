(function () {
    var song = 0
    var songs = [
        {
            picture: 'cover-1.png',
            name: 'Lost in the City Lights',
            author: 'Cosmo Sheldrake',
            song: 'lost-in-city-lights-145038.mp3'
        },
        {
            picture: 'cover-2.png',
            name: 'Forest Lullaby',
            author: 'Lesfm',
            song: 'forest-lullaby-110624.mp3'
        }
    ]

    function init() {
        document.images[0].src = "javascript-music-player/" + songs[song].picture
        document.querySelector("#name").innerHTML = songs[song].name
        document.querySelector("#author").innerHTML = songs[song].author
        document.querySelector("audio").setAttribute('src', 'javascript-music-player/' + songs[song].song)
    }
    init()
    
    var audio = document.querySelector('.affiche audio')
    var currentTime = document.querySelector('.currentTime')
    currentTime.innerHTML = parseInt(audio.currentTime / 60) + ":" + parseInt(audio.currentTime % 60)

    function nan() {
        var stop = 0
        var nan = setInterval(function () {
            if (!isNaN(audio.duration)) {
                document.querySelector(".duration").innerHTML = parseInt(audio.duration / 60) + ":" + parseInt(audio.duration % 60)
                console.log(audio.duration)
                clearInterval(nan)
            } else {
                if (stop == 100) {
                    clearInterval(nan)
                }
                document.querySelector(".duration").innerHTML = "0:0"
            }
            stop = stop + 1
        }, 200)
    }
    nan()

    function reinit() {
        audio.parentElement.querySelector('div').style.width = "0%"
        audio.parentElement.querySelector('div').setAttribute('aria-valuenow', 0)
        currentTime.innerHTML = "0:0"
        nan()
        init()
    }

    document.querySelector('#previous').addEventListener('click', function () {
        if (song > 0) {
            if (!audio.paused) {
                clearInterval(play)
                document.querySelector('.play img').setAttribute('src', 'javascript-music-player/play_fill.svg')
            }
            song = song - 1
            reinit()
        }
    })
    document.querySelector('#next').addEventListener('click', function () {
        if (song < songs.length - 1) {
            if (!audio.paused) {
                clearInterval(play)
                document.querySelector('.play img').setAttribute('src', 'javascript-music-player/play_fill.svg')
            }
            song = song + 1
            reinit()
        }
    })

    audio.parentElement.addEventListener('click', (e) => {
        var charge = (((e.clientX - audio.parentElement.querySelector('div').getBoundingClientRect().left) * 100) / parseInt(getComputedStyle(audio.parentElement).getPropertyValue('width')))
        audio.parentElement.querySelector('div').style.width = charge + "%"
        audio.currentTime = (charge * audio.duration) / 100
        currentTime.innerHTML = parseInt((audio.currentTime + .5) / 60) + ":" + parseInt((audio.currentTime + .5) % 60)
    })
    
    var play
    document.querySelector('.play').onclick = function () {
        if (audio.paused) {
            play = setInterval(function () {
                audio.parentElement.querySelector('div').style.width = (((audio.currentTime + 1) * 100) / audio.duration) + "%"
                audio.parentElement.querySelector('div').setAttribute('aria-valuenow', audio.currentTime.toString())
                console.log(audio.currentTime)
                currentTime.innerHTML = parseInt((audio.currentTime + .5) / 60) + ":" + parseInt((audio.currentTime + .5) % 60)
            }, 500)
            audio.play()
            document.querySelector('.play img').setAttribute('src', 'javascript-music-player/pause.svg')
        } else {
            audio.pause()
            clearInterval(play)
            document.querySelector('.play img').setAttribute('src', 'javascript-music-player/play_fill.svg')
        }
    }
    audio.addEventListener('ended', function () {
        clearInterval(play)
        document.querySelector('.play img').setAttribute('src', 'javascript-music-player/play_fill.svg')
    })
    
})()