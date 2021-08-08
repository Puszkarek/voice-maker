interface IControllerProps {
  view: any;
  media: any;
  recorder: any;
}

export class Controller {
  view: any;
  media: any;
  recorder: any;
  constructor({ view, media, recorder }: IControllerProps) {
    this.view = view;
    this.media = media;
    this.recorder = recorder;
  }
  static initialize(dependencies: IControllerProps) {
    const instance = new Controller(dependencies);
    return instance._init();
  }
  _init() {
    this.view.configRecordingButton(this.onStartRecord.bind(this));
    this.view.configStopButton(this.onStopRecord.bind(this));
  }
  async onStartRecord() {
    const audioStream = await this.media.getAudio();
    this.recorder.startRecording(audioStream);
  }
  async onStopRecord() {
    await this.recorder.stopRecording();
    setTimeout(() => {
      const audioURL = this.recorder.getRecordingURL();
      this.view.playAudio(audioURL);
    }, 100);
  }
}
