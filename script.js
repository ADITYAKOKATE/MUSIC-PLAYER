const songs = [
    { title: "Song 1", artist: "Mashup", src: "./songs/Apna Bana Le Mashup 2023  Maan Meri Jaan  king  Bhediya  Sachin-Jigar  Arijit singh.mp3", cover: "https://cdn.siasat.com/wp-content/uploads/2023/10/arijit-singh.jpg" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3", cover: "cover2.jpg" },
    { title: "Song 3", artist: "Artist 3", src: "song3.mp3", cover: "cover3.jpg" },
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = new Audio(songs[currentSongIndex].src);
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const volumeControl = document.getElementById("volume-control");
const songTitleEl = document.getElementById("song-title");
const artistNameEl = document.getElementById("artist-name");
const coverImageEl = document.getElementById("cover-image");
const songListEl = document.getElementById("song-list");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

// Populate Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => playSong(index));
    songListEl.appendChild(li);
});

// Update Song Info
function updateSongInfo() {
    const song = songs[currentSongIndex];
    songTitleEl.textContent = song.title;
    artistNameEl.textContent = song.artist;
    coverImageEl.src = song.cover;
    audio.src = song.src;
}

// Play or Pause Song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "▶️";
    } else {
        audio.play();
        playPauseButton.textContent = "⏸️";
    }
    isPlaying = !isPlaying;
}

// Play Next Song
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    audio.play();
    playPauseButton.textContent = "⏸️";
    isPlaying = true;
}

// Play Previous Song
function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    audio.play();
    playPauseButton.textContent = "⏸️";
    isPlaying = true;
}

// Play Selected Song
function playSong(index) {
    currentSongIndex = index;
    updateSongInfo();
    audio.play();
    playPauseButton.textContent = "⏸️";
    isPlaying = true;
}

// Update Progress Bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration || 0);
});

// Seek Song
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Adjust Volume
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNext);
prevButton.addEventListener("click", playPrevious);

// Initialize Player
updateSongInfo();
