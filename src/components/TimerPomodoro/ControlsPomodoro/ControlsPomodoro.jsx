import "./ControlsPomodoro.css";
import play from "/player-play.svg";
import pause from "/player-pause.svg";
import stop from "/player-stop.svg";
import music from "/icon-Music.svg";
import { useState } from "react";
import OptionsSounds from "../OptionsSounds/OptionsSounds";
import { getSoundSelected } from "../utilsPomodoro";

const ControlsPomodoro = ({ controls }) => {
  const [showOptionsSounds, setShowOptionsSounds] = useState(false);
  const [soundSelected, setSoundSelected] = useState(0);
  const { startTimer, pauseTimer, isPausedTime, finishPomodoro } = controls;

  return (
    <div className="containerControlsPomodoro">
      <div
        className="buttonControlsPomodoro buttonFinishPomodoro"
        onClick={finishPomodoro}
      >
        <img src={stop} alt="Stop" />
      </div>
      <div
        className="buttonControlsPomodoro buttonPlayPause"
        onClick={isPausedTime ? startTimer : pauseTimer}
      >
        <img src={isPausedTime ? play : pause} alt="playPause" />
      </div>
      <div
        className="buttonControlsPomodoro buttonMusic "
        onClick={() => {
          setShowOptionsSounds(!showOptionsSounds);
        }}
      >
        <img src={music} alt="music" />
      </div>

      {showOptionsSounds && (
        <OptionsSounds
          showOptions={setShowOptionsSounds}
          setSoundSelected={setSoundSelected}
          indexSoundSelected = {soundSelected}
        />
      )}
      <audio src={getSoundSelected(soundSelected)} autoPlay loop muted={isPausedTime && !showOptionsSounds} ></audio>
    </div>
  );
};

export default ControlsPomodoro;
