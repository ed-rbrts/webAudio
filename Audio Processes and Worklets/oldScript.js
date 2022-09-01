const AudioContext = window.AudioContext || window.webkitAudioContext;

var audioCtx, pitchLFO, pitchLFO_amp, sineWave, sineWave_amp, master_vol, audioProcessor;

audioProcessor = new AudioWorkletNode(audioCtx, 'audio-processor');

var interactedYet = false;
var isPlaying = false;

const onColor = "hsl(140deg, 80%, 40%)";
const offColor = "rgb(206, 6, 6)";

audioStart.addEventListener('click', go);

function go() {
    if (!interactedYet) {
        initialiseAudio();
        interactedYet = true;
    }
    if(isPlaying) {
        isPlaying = false;
        indLED.style.background = offColor;
        audioStart.innerHTML = "Start Audio";
        sineWave_amp.gain.setValueAtTime(0., audioCtx.currentTime);
    }
    else {
        isPlaying = true;
        indLED.style.background = onColor;
        audioStart.innerHTML = "Stop Audio";
        sineWave_amp.gain.setValueAtTime(1., audioCtx.currentTime);
        
    }
}

function initialiseAudio() {

    audioCtx = new AudioContext();
    async function asyncSetup() { 
        await audioCtx.audioWorklet.addModule('audioProcessor.js')
    }
    asyncSetup();    
    
    sineWave = audioCtx.createOscillator();
    pitchLFO = audioCtx.createOscillator();
    pitchLFO_amp = audioCtx.createGain();
    sineWave_amp = audioCtx.createGain();
    master_vol = audioCtx.createGain();

    pitchLFO.type = "sine";
    pitchLFO.frequency.value = 1;
    pitchLFO_amp.gain.value = 100;
    pitchLFO.connect(pitchLFO_amp).connect(sineWave.frequency);
    sineWave.type = "sine";
    sineWave.frequency.setValueAtTime(440, audioCtx.currentTime);
    sineWave_amp.gain.value = 0;
    master_vol.gain.value = 0.5;
    audioProcessor.connect(sineWave_amp);
    sineWave.connect(sineWave_amp).connect(master_vol).connect(audioCtx.destination);
    sineWave.start();
    pitchLFO.start();
        
    
}