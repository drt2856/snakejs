import React, { useState, useEffect } from 'react';
import "./App.css"
import { Tablero } from './components/Tablero.tsx';
import { Welcome } from './components/Welcome.tsx';

export const OBJECTS = {
  WALL: 0,
  GRASS: 1,
  HEAD_SNAKEB: 2,
  SNAKEB_SECTION: 3,
  APPLE: 4,
  FAST_POWER: 5,
  SLOW_POWER: 6,
  FIVE_MORE_POWER: 7,
  FIVE_MINUS_POWER: 8,
  DISFRAGMENT_POWER: 9,
  ONE_MINUS_POWER: 10
}
export const DIRECTIONS = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}
export const configs = {
  velosityDefault: 300,
  minVelosity: 100,
  maxVelosity: 1500,
  sounds: true,
  music: true,
  cant_fil: 20,
  cant_col: 20
}

export function App() {
  const [start, setStart] = useState(false);

  return (
    <>
      {/* <p>{count}</p>
      <div> Puntuación: {pointsB}</div>
      <div> Velocidad de la serpiente: {100 - (velosityB * 100 / configs.maxVelosity)}</div>
      <div> Tamaño de la serpiente: {snakeB.length}</div> */}

      {start ? <Tablero setStart={setStart} /> : <Welcome setStart={setStart} />}

      {/* <button className={"btn"} onClick={reiniciarJuego} >Reiniciar</button> */}
    </>

  );
}

export default App;
