export class Recorder {
  audioType = "audio/webm;codecs=opus";
  mediaRecorder: MediaRecorder | undefined;
  recordedBlobs: Blob[];
  constructor() {
    this.audioType = "audio/webm;codecs=opus";
    this.mediaRecorder = undefined;
    this.recordedBlobs = [];
  }
  _setup() {
    const options = { mimeType: this.audioType };
    const isSupported = MediaRecorder.isTypeSupported(options.mimeType);
    if (!isSupported) {
      const msg = `the codec: ${options.mimeType} ins\`t supported`;
      alert(msg);
      throw new Error(msg);
    }
    return options;
  }
  startRecording(stream: MediaStream) {
    const options = this._setup();
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.onstop = () => {
      console.log("Recorded", this.recordedBlobs);
    };
    this.mediaRecorder.ondataavailable = (event) => {
      if (!event.data || !event.data.size) return;
      this.recordedBlobs.push(event.data);
    };

    this.mediaRecorder.start();
  }
  async stopRecording() {
    if (this.mediaRecorder?.state === "inactive") return;
    this.mediaRecorder?.stop();
  }
  getRecordingURL() {
    if (this.recordedBlobs.length > 1) this.recordedBlobs.shift();
    const blob = new Blob(this.recordedBlobs, { type: this.audioType });
    console.log(this.recordedBlobs);
    return window.URL.createObjectURL(blob);
  }
}
