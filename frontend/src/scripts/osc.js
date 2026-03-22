const NUM_HARMONICS = 8;
const MIN_FREQ = 55;
const MAX_FREQ = 880;
const MAX_MASTER_VOL = 0.04;

function initOsc() {
    window.addEventListener("click", function () {
        const audioCtx = new AudioContext();
        const masterGain = audioCtx.createGain();
        masterGain.gain.value = MAX_MASTER_VOL;
        masterGain.connect(audioCtx.destination);

        const harmonics = [];
        for (let i = 1; i <= NUM_HARMONICS; i++) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.value = MIN_FREQ * i;
            gain.gain.value = i === 1 ? 1.0 : 0.0;
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start(0);
            harmonics.push({ osc, gain, index: i });
        }

        document.addEventListener("mousemove", function (e) {
            const xRatio = e.pageX / window.innerWidth;
            const yRatio = e.pageY / window.innerHeight;

            const fundamental = MIN_FREQ + xRatio * (MAX_FREQ - MIN_FREQ);

            for (const h of harmonics) {
                h.osc.frequency.value = fundamental * h.index;

                if (h.index === 1) {
                    h.gain.gain.value = 1.0 / h.index;
                } else {
                    const threshold = (h.index - 1) / NUM_HARMONICS;
                    const t = Math.max(0, Math.min(1, (yRatio - threshold) / (1 - threshold)));
                    const smooth = t * t * (3 - 2 * t);
                    h.gain.gain.value = smooth / h.index;
                }
            }
        });

        window.addEventListener("beforeunload", () => {
            audioCtx.close();
        });
    }, { once: true });
}

export { initOsc };
