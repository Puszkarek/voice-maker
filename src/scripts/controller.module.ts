import { Media } from "./util/media.module";
import { View } from "./view.module";
import { Recorder } from "./util/recorder.module";

interface IControllerProps {
  view: View;
  media: Media;
  recorder: Recorder;
}

export class Controller {
  view: View;
  media: Media;
  recorder: Recorder;
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
    this.view.configDeleteButton(this.onDeleteRecord.bind(this));
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
  async onDeleteRecord() {
    this.recorder.recordedBlobs = [];
    this.view.stopAudio();
  }
}
