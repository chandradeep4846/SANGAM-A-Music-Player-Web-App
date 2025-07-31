const songs = [
  {
    title: 'Song One',
    artist: 'Artist A',
    src: 'songs/song1.mp3',
  },
  {
    title: 'Song Two',
    artist: 'Artist B',
    src: 'songs/song2.mp3',
  },
  {
    title: 'Song Three',
    artist: 'Artist C',
    src: 'songs/song3.mp3',
  },
];

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = '❚❚';
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = '▶';
}

playBtn.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
  loadSong(songs[currentSongIndex]);
  playSong();
});

nextBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex > songs.length - 1) currentSongIndex = 0;
  loadSong(songs[currentSongIndex]);
  playSong();
});

audio.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progress.addEventListener('input', () => {
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

function formatTime(time) {
  if (isNaN(time)) return '0:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

loadSong(songs[currentSongIndex]);
