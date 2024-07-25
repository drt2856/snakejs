import React, { useState } from 'react';
import { Label } from './components/Label.tsx';
import "./App.css"

export const OBJECTS = {
    WALL: 0,
    SNAKE_SECTION : 1,
    APPLE: 2
}
export const DIRECTIONS = {
  UP: 0,
  DOWN : 1,
  LEFT: 2,
  RIGHT:3
}


export function App() {
  const snake = [{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }]
  const cant_fil =20
  const cant_col = 10
  const matriz = createMatrix(cant_fil, cant_col);
 


  function createMatrix(cant_fil : number, cant_col: number) {

    var matriz = new Array(cant_fil);

    for (var i = 0; i < cant_fil; i++) {
      matriz[i] = new Array(cant_col);
    }

    for (var fila = 0; fila < cant_fil; fila++) {
      for (var columna = 0; columna < cant_col; columna++) {
        if (fila === 0 || columna === 0 || fila === matriz.length - 1 || columna === cant_col - 1) {
          matriz[fila][columna] = 0
        }
        else
          matriz[fila][columna] = fila + "," + columna
      }
    }


    return matriz;
  }
  printSnake()

  function printSnake() {
    snake.forEach(position => {
      return (matriz[position.X][position.Y] = OBJECTS.SNAKE_SECTION)
    })
  }
  printApple()

  function printApple() {
    const positionX = Math.floor(Math.random()*cant_fil)
    const positionY = Math.floor(Math.random()*cant_col)

    if (matriz[positionX][positionY]=== 1|| matriz[positionX][positionY]===0){
      return printApple()
    }
    else return matriz[positionX][positionY]=OBJECTS.APPLE
  }

  return (
    <div className='tablero'>
      {matriz.map((fila) => {
        return fila.map(value => (
          <Label value={value} />
        ))
      })}

    </div>
  );
}

export default App;
