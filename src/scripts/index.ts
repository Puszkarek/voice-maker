import "../lib/main.css";
import "../lib/index";
import { Controller } from "./controller.module";
import { Media } from "./util/media.module";
import { Recorder } from "./util/recorder.module";
import { View } from "./view.module";

const view = new View();
const media = new Media();
const recorder = new Recorder();
Controller.initialize({ view: view, media: media, recorder: recorder });
