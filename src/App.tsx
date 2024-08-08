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
  const [loser, setLuser] = useState(false);
  const [points, setPoints] = useState(0);
  const [direction, setDirection] = useState(DIRECTIONS.UP);
  const [matriz, setMatriz] = useState([]);
  const [apple, setApple] = useState({ X: 0, Y: 0 });
  const [snake, setSnake] = useState([{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }, { X: 5, Y: 8 }]);

  useEffect(() => {
   
      createMatrix(cant_fil, cant_col)
      setPoints(1)
  
  }, [])
  useEffect(() => {
    const intervalId = setTimeout(() => {
      moveSnake()
    }, 300)
    return () => { clearTimeout(intervalId) }
  }, [points])


  //
  function reiniciarJuego() {
    createMatrix(cant_fil, cant_col)
    setPoints(-1)
    setDirection(DIRECTIONS.UP)
    setSnake([{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }, { X: 5, Y: 8 }])
    setLuser(false)
    createMatrix(cant_fil, cant_col)
    moveSnake()
  }

  function printMatrix(cant_fil: number, cant_col: number) {
    let matriz = new Array(cant_fil);

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
    return matriz
  }
  function createMatrix(cant_fil: number, cant_col: number) {

    const matriz = printMatrix(cant_fil, cant_col)

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
    else {
      setApple({ positionY, positionX })
      return { positionY, positionX }
    }
  }

  function moveSnake() {
    if (loser) return

    const matrizAux = [...matriz];
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
      if (X - 1 === X2) {
        setDirection(DIRECTIONS.RIGHT)
        return;
      } else {
        X = X - 1
      }
    }
    if (direction === DIRECTIONS.RIGHT) {
      if (X + 1 === X2) {
        setDirection(DIRECTIONS.LEFT)
        return;
      } else {
        X = X + 1
      }
    }
    if (matrizAux[Y][X] === OBJECTS.WALL || matrizAux[Y][X] === OBJECTS.SNAKE_SECTION) {
      alert("perdiste")
      setLuser(true);
      return
    }
    const ultimo = snakeAux[snakeAux.length - 1];
    snakeAux.unshift({ X, Y })
    snakeAux.pop()
    setSnake(snakeAux)

    for (var i = 0; i < snake.length; i++) {
      if (i == 0) {
        matrizAux[snakeAux[i].Y][snakeAux[i].X] = OBJECTS.HEAD_SNAKE
      }
      else {
        matrizAux[snakeAux[i].Y][snakeAux[i].X] = OBJECTS.SNAKE_SECTION
      }
    }


    if (apple.positionX === X && apple.positionY === Y) {
      matrizAux[ultimo.Y][ultimo.X] = OBJECTS.SNAKE_SECTION;
      snakeAux.push({ Y: ultimo.Y, X: ultimo.X })
      const { positionY, positionX } = printApple(matriz)
      matrizAux[positionY][positionX] = OBJECTS.APPLE
      setPoints(points + 1)
    } else {
      matrizAux[ultimo.Y][ultimo.X] = OBJECTS.GRASS;
    }


    setSnake(snakeAux)
    setPoints(points + 1)
    setMatriz(matrizAux)

  }
  function handleKeyDown(event) {
    console.log(event.key);

    if (event.key === "w") {
      setDirection(DIRECTIONS.UP)
    }
    if (event.key === "a") {
      setDirection(DIRECTIONS.LEFT)
    }
    if (event.key === "s") {
      setDirection(DIRECTIONS.DOWN)
    }
    if (event.key === "d") {
      setDirection(DIRECTIONS.RIGHT)
    }
    setPoints(points + 1)
  }

  return (
    <>
      <button className={"btn"} onClick={() => moveSnake()} >move</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.LEFT) }} >izquierda</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.UP) }} >arriba</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.DOWN) }} >abajo</button>
      <button className={"btn"} onClick={() => { setDirection(DIRECTIONS.RIGHT) }} >derecha</button>

      <p>{points}</p>
      <input type="text" onKeyDown={handleKeyDown} />
      <div className='tablero' onKeyDown={handleKeyDown}>
        {matriz.map((fila) => {
         
          
          return fila.map((value) => (
            <Label value={value} />
          ))
        })}

      </div>
      <button className={"btn"} onClick={reiniciarJuego} >Reiniciar</button>
    </>

  );
}

export default App;
