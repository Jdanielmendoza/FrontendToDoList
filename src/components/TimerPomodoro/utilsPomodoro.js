import bird from "../../sounds/birds-singing_nature-sound.mp3";
import clock from "../../sounds/ticking-clock.mp3";
import chill from "../../sounds/chillHipHop.mp3";

export function convertSecondToStrokeDashoffset(secondNow, secondMax) {
  // Asegurémonos de que secondNow esté en el rango [0, secondMax]
  secondNow = Math.min(Math.max(secondNow, 0), secondMax);
  // Realizamos la conversión utilizando una regla de tres simple
  let valor = 720 - (secondNow / secondMax) * 720;
  return valor;
}

export function getSoundSelected(index) {
  const sounds = {
    0: "",
    1: clock,
    2: bird,
    3: chill,
  };

  return sounds[index];
}

export const getSounds = ["ninguna","reloj","pajaros","chill Hip Hop"]