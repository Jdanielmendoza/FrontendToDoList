import { useState, useRef } from "react";

export function useTimerPomodoro() {
  const [secondInitial, setSecondInitial] = useState(59);
  const [secondNow, setSecondNow] = useState(59);

  const [minuteInitial, setMinuteInitial] = useState(25);
  const [minuteNow, setMinuteNow] = useState(0);

  const [minuteBreakTimeInitial, setMinuteBreakTimeInitial] = useState(5);
  const [minuteBreakTimeNow, setMinuteBreakTimeNow] = useState(0);

  const [numberOfSessionInitial, setNumberOfSessionInitial] = useState(2);
  const [numberOfSessionNow, setNumberOfSessionNow] = useState(0);

  const [isTimeFinished, setIsTimeFinished] = useState(false);
  const [isSessionFinished, setIsSessionFinished] = useState(false);
  const [isTimeToBreakTime, setIsTimeToBreakTime] = useState(false);
  const [isPausedTime, setIsPausedTime] = useState(true);

  const timerRef = useRef(null);

  let second;
  let minute;
  let numberOfSession;

  const finishPomodoro = () => {
    stopTimer();
    setIsTimeFinished(true);
    setNumberOfSessionNow(0);
    stopBreakTime();
    console.log("se finalizo la tarea!");
  };

  const startTimer = () => {
    setIsTimeFinished(false);
    setIsPausedTime(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondNow((s) => s + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsPausedTime(true);
    setMinuteNow(0);
    setMinuteBreakTimeNow(0);
    setSecondNow(59);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPausedTime(true);
  };

  const startBreakTime = () => {
    setIsTimeToBreakTime(true);
    setSecondNow(59);
  };
  const stopBreakTime = () => {
    setIsTimeToBreakTime(false);
    setMinuteNow(0);
    setSecondNow(59);
  };

  if (!isTimeToBreakTime) {
    second = secondInitial - secondNow;
    minute = minuteInitial - minuteNow;
    numberOfSession = numberOfSessionInitial - numberOfSessionNow;
  } else {
    second = secondInitial - secondNow;
    minute = minuteBreakTimeInitial - minuteBreakTimeNow;
    numberOfSession = numberOfSessionInitial - numberOfSessionNow;
  }

  if (second < 0) {
    setSecondNow(0);
    if (!isTimeToBreakTime) {
      setMinuteNow(minuteNow + 1);
    } else {
      setMinuteBreakTimeNow(minuteBreakTimeNow + 1);
    }
  }

  if (minute < 0) {
    stopTimer();
    if (!isTimeToBreakTime) {
      setNumberOfSessionNow(numberOfSessionNow + 1);
      if (numberOfSession > 1) {
        startBreakTime();
      } else {
        finishPomodoro() ;
      }
    } else {
      stopBreakTime();
    }
  }

  return {
    startTimer,
    pauseTimer,
    stopTimer,
    second,
    minute,
    minuteInitial,/* sera usado para saber el tiempo maximo que durara la animacion del circulo  */
    setMinuteInitial,
    setMinuteBreakTimeInitial,
    isTimeFinished,
    isSessionFinished,
    numberOfSession,
    isTimeToBreakTime,
    isPausedTime,
    finishPomodoro
  };
}
