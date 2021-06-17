export default class Controller {
	constructor(props) {
		this.view = props.view;
		this.media = props.media;
		this.recorder = props.recorder;
	}
	static initialize(dependencies) {
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
