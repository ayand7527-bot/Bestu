// Audio synthesizer using Web Audio API for zero-dependency reliable sound

class AudioManager {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private isAmbientPlaying: boolean = false;
  private currentAmbientType: string | null = null;

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  // Play a soft sweet sparkle chime (e.g. for hugs, surprise open, confetti)
  playChime() {
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.7);
      });
    } catch {
      // Audio not permitted or failed
    }
  }

  // Play soft cute bubble pop
  playPop() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // silent
    }
  }

  // Cozy gentle rain ambient sound synthesizer
  startRainSound(): boolean {
    try {
      this.stopAmbient();
      const ctx = this.getContext();

      // Create pink/brownish noise buffer
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        output[i] = (b0 + b1 + b2) * 0.15;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(850, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
      this.ambientSource = whiteNoise;
      this.isAmbientPlaying = true;
      this.currentAmbientType = 'rain';
      return true;
    } catch {
      return false;
    }
  }

  // Cozy gentle campfire crackle / calming warm tone
  startFireplaceSound(): boolean {
    try {
      this.stopAmbient();
      const ctx = this.getContext();

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // occasional crackle
        const crackle = Math.random() > 0.995 ? (Math.random() * 2 - 1) * 0.8 : 0;
        output[i] = white * 0.05 + crackle;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(500, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      this.ambientSource = noise;
      this.isAmbientPlaying = true;
      this.currentAmbientType = 'fire';
      return true;
    } catch {
      return false;
    }
  }

  stopAmbient() {
    try {
      if (this.ambientSource) {
        (this.ambientSource as any).stop?.();
        this.ambientSource.disconnect();
        this.ambientSource = null;
      }
      this.isAmbientPlaying = false;
      this.currentAmbientType = null;
    } catch {
      // silent
    }
  }

  getAmbientState() {
    return {
      isPlaying: this.isAmbientPlaying,
      type: this.currentAmbientType,
    };
  }
}

export const audioManager = new AudioManager();
