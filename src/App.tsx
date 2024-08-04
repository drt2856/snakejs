import React, { useState, useEffect } from 'react';
import { Label } from './components/Label.tsx';
import "./App.css"

export const OBJECTS = {
  WALL: 0,
  GRASS: 1,
  HEAD_SNAKE: 2,
  SNAKE_SECTION: 3,
  APPLE: 4,
}
export const DIRECTIONS = {
  UP: 0,
  DOWN: 1,
  LEFT: 2,
  RIGHT: 3
}


export function App() {

  const cant_fil = 20
  const cant_col = 10
  const [direction, setDirection] = useState(DIRECTIONS.UP);
  const [matriz, setMatriz] = useState([]);
  const [apple, setApple] = useState({ X: 0, Y: 0 });
  const [snake, setSnake] = useState([{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }, { X: 5, Y: 8 }]);

  useEffect(() => {
    createMatrix(cant_fil, cant_col)


  }, [])

  function createMatrix(cant_fil: number, cant_col: number) {

    var matriz = new Array(cant_fil);

    for (let i = 0; i < cant_fil; i++) {
      matriz[i] = new Array(cant_col);
    }

    for (let fila = 0; fila < cant_fil; fila++) {
      for (let columna = 0; columna < cant_col; columna++) {
        if (fila === 0 || columna === 0 || fila === matriz.length - 1 || columna === cant_col - 1) {
          matriz[fila][columna] = 0
        }
        else
          matriz[fila][columna] = columna + "," + fila
      }
    }
    //dibujar la serpiente 
    for (let i = 0; i < snake.length; i++) {
      if (i == 0) {
        matriz[snake[i].Y][snake[i].X] = OBJECTS.HEAD_SNAKE
      }
      else {
        matriz[snake[i].Y][snake[i].X] = OBJECTS.SNAKE_SECTION
      }
    }
    //dibujar fruta
    const { positionY, positionX } = printApple(matriz)
    matriz[positionY][positionX] = OBJECTS.APPLE

    setMatriz(matriz);
  }


  function printSnake() {
    snake.forEach(position => {
      return (matriz[position.Y][position.X] = OBJECTS.SNAKE_SECTION)
    })
  }


  function printApple(matriz) {

    const positionX = Math.floor(Math.random() * cant_col)
    const positionY = Math.floor(Math.random() * cant_fil)
    console.log({ positionY, positionX }, cant_fil, cant_col);


    if (matriz[positionY][positionX] === OBJECTS.WALL) {
      console.log({ positionY, positionX }, matriz[positionY][positionX], "Wall");

      return printApple(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.HEAD_SNAKE) {
      console.log({ positionY, positionX }, matriz[positionY][positionX], "Head");
      return printApple(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.SNAKE_SECTION) {
      console.log({ positionY, positionX }, matriz[positionY][positionX], "Body");
      return printApple(matriz)
    }
    else return { positionY, positionX }
  }

  function moveSnake() {
    let snakeAux = [...snake]
    let { X, Y } = snakeAux[0];


    let { X: X2, Y: Y2 } = snakeAux[1];

    if (direction === DIRECTIONS.DOWN) {

      if (Y + 1 === Y2) {
        setDirection(DIRECTIONS.UP)
        return;
      } else {
        Y = Y + 1
      }

    }
    if (direction === DIRECTIONS.UP) {
      if (Y - 1 === Y2) {
        setDirection(DIRECTIONS.DOWN)
        return;
      } else {
        Y = Y - 1
      }

    }
    if (direction === DIRECTIONS.LEFT) {
      X = X - 1
    }
    if (direction === DIRECTIONS.RIGHT) {
      X = X + 1
    }

    const ultimo = snakeAux[snakeAux.length - 1];
    snakeAux.unshift({ X, Y })
    snakeAux.pop()
    setSnake(snakeAux)

    for (var i = 0; i < snake.length; i++) {
      if (i == 0) {
        matriz[snakeAux[i].Y][snakeAux[i].X] = OBJECTS.HEAD_SNAKE
      }
      else {
        matriz[snakeAux[i].Y][snakeAux[i].X] = OBJECTS.SNAKE_SECTION
      }
    }

    const matrizAux = [...matriz];
    matrizAux[ultimo.Y][ultimo.X] = OBJECTS.GRASS;
    setMatriz(matrizAux)
    console.log({ X, Y });

  }

  return (
    <>
      <button className={"btn"} onClick={() => moveSnake()} >move</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.LEFT) }} >izquierda</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.UP) }} >arriba</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.DOWN) }} >abajo</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.RIGHT) }} >derecha</button>


      <div className='tablero'>
        {matriz.map((fila) => {
          return fila.map(value => (
            <Label value={value} />
          ))
        })}

      </div>
    </>

  );
}

export default App;
