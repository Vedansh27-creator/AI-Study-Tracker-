/**
 * Soothing Web Audio synthesizer for timer completion and mindful cues.
 * Completely client-side and requires no external audio assets.
 */

class SoundController {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playChime(volumeLevel: 'low' | 'medium' | 'high' = 'medium') {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const gainMultiplier = volumeLevel === 'low' ? 0.08 : volumeLevel === 'medium' ? 0.18 : 0.3;
      const now = ctx.currentTime;

      // Create a harmonic duo (frequencies of a soothing meditation chime: 528Hz & 792Hz)
      const frequencies = [528, 792, 1056];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        const volume = (gainMultiplier / (idx + 1)) * 0.8;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8 + idx * 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.4);
      });
    } catch {
      // Audio playback failed or blocked by autoplay policy
    }
  }

  playSoftClick() {
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.04);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Ignore
    }
  }
}

export const soundService = new SoundController();
