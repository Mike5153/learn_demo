/**
 * 专为 iOS 12 (iPad mini 2) 与现代浏览器调试设计的音频调度系统
 * 具备完善的播放进程管理与即时中断能力 (stopAllAudio)
 */
class AudioService {
  private ctx: AudioContext | null = null;
  private isUnlocked = false;
  private currentAudio: HTMLAudioElement | null = null;

  public unlockAudio() {
    if (this.isUnlocked && this.ctx && this.ctx.state === 'running') return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        if (!this.ctx) {
          this.ctx = new AudioContextClass();
        }
        const buffer = this.ctx.createBuffer(1, 1, 22050);
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(this.ctx.destination);
        source.start(0);

        if (this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
        this.isUnlocked = true;
      }
    } catch (e) {
      console.warn('Audio unlock warning:', e);
    }
  }

  /**
   * 停止当前所有正在发声的音频进程（切字、切场景时即时中断）
   */
  public stopAllAudio() {
    // 1. 中断正在播放的 HTML5 Audio 录音文件
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
      } catch (e) {
        // 忽略中止异常
      }
      this.currentAudio = null;
    }

    // 2. 取消正在朗读的 Web Speech 语音合成
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // 忽略异常
      }
    }
  }

  /**
   * 播放潮汕方言录音切片，自带中断前序音频机制
   */
  public playTeochewAudio(audioPath: string, onEnd?: () => void) {
    this.unlockAudio();
    this.stopAllAudio(); // 播放前先切断前序声音

    try {
      const audio = new Audio(audioPath);
      this.currentAudio = audio;

      audio.onended = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onEnd) onEnd();
      };

      audio.play().catch(e => {
        console.warn('Play Teochew audio fallback:', e);
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        if (onEnd) onEnd();
      });
    } catch (e) {
      console.warn('Audio play error:', e);
      this.currentAudio = null;
      if (onEnd) onEnd();
    }
  }

  /**
   * 模拟毛笔在茶盘上的写字运笔声
   */
  public playStrokeSound() {
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(580 + Math.random() * 80, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.28);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {
      console.warn('playStrokeSound error:', e);
    }
  }

  /**
   * 合成紫砂杯碰杯清脆声“叮——”
   */
  public playCupClink() {
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.8);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.8);
    } catch (e) {
      console.warn('playCupClink error:', e);
    }
  }

  /**
   * 合成倒水水滴声
   */
  public playWaterDrip() {
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const baseFreq = 480 + Math.random() * 200;
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.09);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {
      console.warn('playWaterDrip error:', e);
    }
  }

  /**
   * 传统五音和弦庆祝声（宫-商-角-徵-羽）
   */
  public playSuccessChime() {
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0];
      
      notes.forEach((freq, index) => {
        if (!this.ctx) return;
        const noteTime = now + index * 0.1;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.2, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteTime);
        osc.stop(noteTime + 0.6);
      });
    } catch (e) {
      console.warn('playSuccessChime error:', e);
    }
  }

  /**
   * 普通话极简读音
   */
  public speakMandarin(text: string, onEnd?: () => void) {
    this.unlockAudio();
    this.stopAllAudio();

    if ('speechSynthesis' in window) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = 0.85;
        utterance.pitch = 1.0;
        if (onEnd) {
          utterance.onend = () => onEnd();
          utterance.onerror = () => onEnd();
        }
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        console.warn('speechSynthesis error:', e);
        if (onEnd) onEnd();
      }
    } else {
      if (onEnd) setTimeout(onEnd, 1200);
    }
  }
}

export const audioService = new AudioService();
