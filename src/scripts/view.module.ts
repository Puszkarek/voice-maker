type CommandType = () => void;
type ToggleProps = { visible: boolean };
export class View {
  btnStart: HTMLElement | null;
  btnStop: HTMLElement | null;
  audioElement: HTMLAudioElement | null;

  constructor() {
    this.btnStart = document.getElementById("btnStart");
    this.btnStop = document.getElementById("btnStop");
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
  configRecordingButton(command: CommandType) {
    this.btnStart?.addEventListener("click", this.onRecordClick(command));
  }
  configStopButton(command: CommandType) {
    this.btnStop?.addEventListener("click", this.onStopRecordClick(command));
  }
  toggleAudioElement({ visible }: ToggleProps) {
    const classList = this.audioElement?.classList;
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
}
