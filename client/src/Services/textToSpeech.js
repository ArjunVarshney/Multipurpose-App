export let speech = new SpeechSynthesisUtterance();
let currentSpeechIndex = 0;

speech.addEventListener("boundary", (e) => {
  currentSpeechIndex = e.charIndex;
});

export const getVoices = () => {
  let voices = speechSynthesis.getVoices();
  if (!voices.length) {
    let utterance = new SpeechSynthesisUtterance("");
    speechSynthesis.speak(utterance);
    voices = speechSynthesis.getVoices();
  }
  return voices;
};

export const startPlaying = (text, rate, voice, startIndex) => {
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }

  if (speechSynthesis.speaking) return;

  speech.volume = 1;
  speech.voice = voice;
  speech.text = startIndex ? text.substring(startIndex) : text;
  speech.rate = rate || 1;
  speechSynthesis.speak(speech);
};

export const updateSpeech = (rate, voice) => {
  cancelSpeech();
  startPlaying(speech.text.substring(currentSpeechIndex), rate, voice);
};

export const pauseSpeech = () => {
  if (speechSynthesis.speaking) speechSynthesis.pause();
};

export const cancelSpeech = () => {
  speechSynthesis.resume();
  speechSynthesis.cancel();
};

// speech.addEventListener("end",)
