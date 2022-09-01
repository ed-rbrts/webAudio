const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const oscillator = audioCtx.createOscillator();
const gain = audioCtx.createGain();
gain.gain.value = 0.;
oscillator.frequency.value = 0;
oscillator.type = "sawtooth";

const samplerate = 3000;
const frameCont = samplerate * 30;
const ampFrameCount = Math.floor(samplerate/4.);

const noteBuffer = audioCtx.createBuffer(1, frameCont, samplerate); // channels, framecount, samplerate
const ampBuffer = audioCtx.createBuffer(1, ampFrameCount, samplerate);

audioToggle.onclick = () => {
        for (let i = 0; i < frameCont; i++) {
            let ind = Math.floor(4 * i/samplerate);
            ind = (ind%7) + (ind%5) + (ind%8);
            ind = Math.round((7./4.) * (ind + (5./7.)));
            ind = Math.round((12./7.) * ind);
            let midi = ind + 36;
            let powMIDI = midi - 69;
            powMIDI /= 12.;
            let freq = 440.* Math.pow(2, powMIDI);
            noteBuffer.getChannelData(0)[i] = freq;
        }

        for (let i = 0; i < ampFrameCount; i++) {
            let phz = i/ampFrameCount;
            phz = Math.pow(phz, 0.25);
            phz *= 2.;
            phz *= Math.PI;
            ampBuffer.getChannelData(0)[i] = Math.pow(0.5 - 0.5 * Math.cos(phz), 1.5);
        }
    }

const source = audioCtx.createBufferSource();
source.buffer = noteBuffer;
source.loop = true;

const ampSource = audioCtx.createBufferSource();
ampSource.buffer = ampBuffer;
ampSource.loop = true;

source.connect(oscillator.frequency);
ampSource.connect(gain.gain);
oscillator.connect(gain).connect(audioCtx.destination);

source.start();
oscillator.start();
ampSource.start();