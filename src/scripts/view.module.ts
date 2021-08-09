type CommandType = () => void;
type ToggleProps = { visible: boolean };
export class View {
  btnStart: HTMLElement | null;
  btnStop: HTMLElement | null;
  btnDelete: HTMLElement | null;
  audioElement: HTMLAudioElement | null;

  constructor() {
    this.btnStart = document.getElementById("btnStart");
    this.btnStop = document.getElementById("btnStop");
    this.btnDelete = document.getElementById("btnDelete");
    this.audioElement = document.getElementById("audio") as HTMLAudioElement;
  }
  onRecordClick(command: CommandType) {
    return () => {
      command();
      this.toggleAudioElement({ visible: false });
    };
  }
  onStopRecordClick(command: CommandType) {
    return () => {
      command();
    };
  }
  onDeleteRecordClick(command: CommandType) {
    console.log("onDeleteRecord");
    return () => {
      command();
      this.toggleAudioElement({ visible: false });
    };
  }
  configRecordingButton(command: CommandType) {
    this.btnStart?.addEventListener("click", this.onRecordClick(command));
  }
  configStopButton(command: CommandType) {
    this.btnStop?.addEventListener("click", this.onStopRecordClick(command));
  }
  configDeleteButton(command: CommandType) {
    this.btnDelete?.addEventListener(
      "click",
      this.onDeleteRecordClick(command)
    );
  }
  toggleAudioElement({ visible }: ToggleProps) {
    const classList = this.audioElement?.parentElement.classList;
    visible ? classList?.remove("hidden") : classList?.add("hidden");
  }
  playAudio(url: string) {
    const audio = this.audioElement;
    if (audio === null) return;
    audio.src = url;
    audio.muted = false;
    this.toggleAudioElement({ visible: true });
    audio.addEventListener("loadedmetadata", (_) => audio.play());
  }
  stopAudio() {
    const audio = this.audioElement;
    if (audio === null) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = "";
  }
}
