// *** VARIABLES *** //

const footerYear = document.querySelector(".date");
const closePlayerBtnMobile = document.querySelector(".close-btn");
const openPlayerBtnMobile = document.querySelector(".slide-arrow");
const playerContainer = document.querySelector(".player-wrapper");
const pads = [...document.querySelectorAll(".pads")];
const playBtn = document.querySelector(".player-btn-img");
const playerTempo = document.querySelector(".player-tempo");
const tempoValue = document.querySelector(".tempo-num");
const muteBtns = [...document.querySelectorAll(".microphone")];
const beatsSelect = [...document.querySelectorAll(".beats")];
const audios = document.querySelectorAll("audio");
let index = 0;
let bpm = 150;
let playerInterval = null;
let playBtnActive = false;

// *** EVENTS *** //

// --- year for footer --- //

window.addEventListener("DOMContentLoaded", () => {
  let year = new Date().getFullYear();
  footerYear.textContent = year;
});

// --- open&close player on mobile --- //

openPlayerBtnMobile.addEventListener("click", () => {
  playerContainer.classList.add("open-player");
});

closePlayerBtnMobile.addEventListener("click", () => {
  playerContainer.classList.remove("open-player");
});

// --- active pads --- //

pads.forEach((pad) => {
  pad.addEventListener("click", activePad);
});

// --- play --- //

playBtn.addEventListener("click", playBeat);

// --- change tracks (select) --- //

beatsSelect.forEach((beat) => {
  beat.addEventListener("change", selectTrack);
});

// --- mute tracks --- //

muteBtns.forEach((btn) => {
  btn.addEventListener("click", muteTrack);
});

// --- change tempo --- //

playerTempo.addEventListener("input", changeTempo);

// *** FUNCTIONS *** //

function activePad(event) {
  let target = event.target;
  let activeClass = target.classList[1];
  target.classList.toggle(`active-${activeClass}`);
}

function beatLoop() {
  if (index === 8) {
    index = 0;
  }
  let activeBeat = document.querySelectorAll(`[data-id="${index}"]`);
  anime({
    targets: activeBeat,
    duration: 300,
    scale: [1, 1.2],
    direction: "alternate",
    easing: "easeInOutQuad",
  });
  activeBeat.forEach((beat) => {
    if (
      beat.classList.contains("active-kick-pad") &&
      beat.classList.contains("kick-pad")
    ) {
      audios[0].currentTime = 0;
      audios[0].play();
    }
    if (
      beat.classList.contains("active-snare-pad") &&
      beat.classList.contains("snare-pad")
    ) {
      audios[1].currentTime = 0;
      audios[1].play();
    }
    if (
      beat.classList.contains("active-hihat-pad") &&
      beat.classList.contains("hihat-pad")
    ) {
      audios[2].currentTime = 0;
      audios[2].play();
    }
    if (
      beat.classList.contains("active-clap-pad") &&
      beat.classList.contains("clap-pad")
    ) {
      audios[3].currentTime = 0;
      audios[3].play();
    }
    if (
      beat.classList.contains("active-perc-pad") &&
      beat.classList.contains("perc-pad")
    ) {
      audios[4].currentTime = 0;
      audios[4].play();
    }
    if (
      beat.classList.contains("active-tom-pad") &&
      beat.classList.contains("tom-pad")
    ) {
      audios[5].currentTime = 0;
      audios[5].play();
    }
  });
  index++;
}

function playBeat() {
  let beatInterval = (60 / bpm) * 1000;
  if (!playerInterval) {
    playBtn.src = "./img/player-pause.svg";
    playBtnActive = true;
    playerInterval = setInterval(() => {
      beatLoop();
    }, beatInterval);
  } else {
    playBtn.src = "./img/player.svg";
    clearInterval(playerInterval);
    playerInterval = null;
    playBtnActive = false;
  }
}

function selectTrack(event) {
  let target = event.target;
  let targetValue = target.value;
  let targetIndex = beatsSelect.indexOf(target);
  audios[targetIndex].src = targetValue;
}

function muteTrack(event) {
  let target = event.target;
  let targetIndex = muteBtns.indexOf(target);
  if (!audios[targetIndex].muted) {
    target.src = "./img/pause.svg";
    audios[targetIndex].muted = true;
  } else {
    target.src = "./img/play.svg";
    audios[targetIndex].muted = false;
  }
}

function changeTempo(event) {
  let target = event.target;
  let targetValue = target.value;
  clearInterval(playerInterval);
  playerInterval = null;
  tempoValue.textContent = targetValue;
  bpm = Number(targetValue);
  if (playBtnActive) {
    playBeat();
  }
}
