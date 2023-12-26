import "./TimerPomodoro.css";
import Header from "../Header/Header";
import arrowBack from "/arrowBack.svg";
import { redirect, useNavigate } from "react-router-dom";
import { useTimerPomodoro } from "./useTimerPomodoro";
import CirclePomodoro from "./CirclePomodoro/CirclePomodoro";
import ControlsPomodoro from "./ControlsPomodoro/ControlsPomodoro"; 

const TimerPomodoro = () => {
  const pomodoro = useTimerPomodoro();
  const navigate = useNavigate();
  return (
    <div className="containerContainerTimerPomodoro">
      <Header />
      <div className="containerTimerPomodoro">
        <nav className="nav_exit_back">
          <img
            src={arrowBack}
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3 className="newNote">Pomodoro</h3>
        </nav>
        <div className="TimerPomodoro">
          <CirclePomodoro timerPomodoro={pomodoro} />
          <ControlsPomodoro controls={pomodoro} />
        </div>
        
      </div>
    </div>
  );
};

export default TimerPomodoro;

/* import "./TimerPomodoro.css";
import Header from "../Header/Header";
import arrowBack from "/arrowBack.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const TimerPomodoro = () => {
  const [minute, setMinute] = useState(1);
  const [play, setPlay] = useState(false);
  const [time, setTime] = useState(60);
  const [second, setSecond] = useState(0);
  const timer = useRef();
  const navigate = useNavigate();
  console.log("rerender");
  if (play) {
    if (second < 0) {
      setSecond(59);
      if (minute > 0) {
        setMinute((pre) => pre - 1);
      }
    }
  }
  useEffect(() => {
    timer.current = setInterval(() => {
      if (play) {
        setSecond((pre) => pre - 1);
      }
    }, 1000);
  }, [play]);

  return (
    <div className="containerContainerTimerPomodoro">
    <Header />
    <div className="containerTimerPomodoro">
        <nav className="nav_exit_back">
        <img
            src={arrowBack}
            alt="back"
            onClick={() => {
              navigate(-1);
            }}
          />
          <h3 className="newNote">Pomodoro</h3>
          </nav>
        <div className="TimerPomodoro">
          <div className="containerCountDownTimer">
          <svg className="svgTimer">
              <circle className="bg" cx="130" cy="130" r="115" />
              <circle
                className="circleDinamyc"
                cx="130"
                cy="130"
                r="115"
                style={{ "--animDuration": play? `${time}s`: "0s" }}
                />
              <line
                className="line"
                x1="130"
                y1="4"
                x2="130"
                y2="24"
                style={{ "--animDuration":  play? `${time}s`: "0s"  }}
              />
              <line className="lineStatic" x1="130" y1="4" x2="130" y2="24" />
            </svg>
            <div className="TimerNumber">
              <p>{minute < 10 ? "0" + minute : minute}</p>
              <p>{second < 10 ? "0" + second : second}</p>
              </div>
              </div>
          <input type="button" value="Play" onClick={()=>setPlay(!play)}/>
        </div>
      </div>
    </div>
    );
};

export default TimerPomodoro;
*/
/*  const navigate = useNavigate();
const [minute, setMinute] = useState(1);
const [second, setSecond] = useState(59);

console.log("render");
const timeSecondDecrement = (ss) => setSecond(ss - 1);
useEffect(() => {
  const idTimer = setInterval(() => {
    setSecond(second - 1)
  }, 1000);
  
  return ()=>{
    console.log("cleaning");
    return clearInterval(idTimer)};
}, [second]);  */
