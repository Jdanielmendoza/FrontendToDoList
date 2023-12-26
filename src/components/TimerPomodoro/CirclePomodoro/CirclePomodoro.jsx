import { convertSecondToStrokeDashoffset } from "../utilsPomodoro";
import "./CirclePomodoro.css";
import Point from "./Point";

const CirclePomodoro = ({ timerPomodoro }) => {
  const { minute, second, isTimeFinished, numberOfSession,minuteInitial } = timerPomodoro;
  return (
    <div className="containerCountDownTimer">
      <svg className="svgTimer">
        <circle className="bg" cx="130" cy="130" r="115" />
        <circle
          className="circleDinamyc"
          cx="130"
          cy="130"
          r="115"
          /* style={{ "--animDuration": "59s" }} */
          style={{
            "--durationTimePomodoro": convertSecondToStrokeDashoffset(
              minute * 60 + second,
              minuteInitial*60
            ),
          }}
        />
      </svg>
      <div className="TimerNumber">
        {minute < 10 ? "0" + minute : minute}:
        {second < 10 ? "0" + second : second}

        <div className="containerPointSession">
          {Array.from({ length: numberOfSession }, (ele, index) => (
            <Point key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CirclePomodoro;

{
  /* <line
                className="line"
                x1="130"
                y1="4"
                x2="130"
                y2="24"
                style={{ "--animDuration": "59s" }}
                
              /> */
}
{
  /* <line className="lineStatic" x1="130" y1="4" x2="130" y2="24" /> */
}
