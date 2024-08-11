import React, { useState, useEffect } from 'react';
import { configs, DIRECTIONS, OBJECTS } from '../App.tsx';
import { Label } from './Label.tsx';

export function Tablero({setStart}) {



  const [loser, setLuser] = useState(false);
  const [pointsB, setPointsB] = useState(0);
  const [count, setCount] = useState(0);
  const [direction, setDirection] = useState(DIRECTIONS.UP);
  const [velosityB, setVelosityB] = useState(configs.velosityDefault);
  const [matriz, setMatriz] = useState([]);
  const [apple, setApple] = useState({ X: 0, Y: 0, whatIs: OBJECTS.FAST_POWER });
  const [power, setPower] = useState({ X: 0, Y: 0 });
  const [snakeB, setSnakeB] = useState([{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }]);



  useEffect(() => {
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
      setCount(count + 1)
    }
    createMatrix(configs.cant_fil, configs.cant_col)
    setCount(1)

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [])

  useEffect(() => {
    const intervalId = setTimeout(() => {
      moveSnakeB()
    }, velosityB)
    return () => { clearTimeout(intervalId) }
  }, [count])


  ////
  function reiniciarJuego() {
    setSnakeB([{ X: 5, Y: 5 }, { X: 5, Y: 6 }, { X: 5, Y: 7 }])
    setVelosityB(configs.velosityDefault)
    createMatrix(configs.cant_fil, configs.cant_col)
    setCount(-1)
    setDirection(DIRECTIONS.UP)
    setLuser(false)
    moveSnakeB()
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
    for (let i = 0; i < snakeB.length; i++) {
      if (i == 0) {
        matriz[snakeB[i].Y][snakeB[i].X] = OBJECTS.HEAD_SNAKEB
      }
      else {
        matriz[snakeB[i].Y][snakeB[i].X] = OBJECTS.SNAKEB_SECTION
      }
    }//dibujar poder
    const { positionY: pY, positionX: pX, whatIs } = printPower(matriz)
    matriz[pY][pX] = whatIs
    //dibujar fruta
    const { positionY, positionX } = printApple(matriz)
    matriz[positionY][positionX] = OBJECTS.APPLE

    setMatriz(matriz);
  }



  function printApple(matriz) {
    const positionX = Math.floor(Math.random() * configs.cant_col)
    const positionY = Math.floor(Math.random() * configs.cant_fil)

    if (matriz[positionY][positionX] === OBJECTS.WALL) {
      return printApple(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.HEAD_SNAKEB) {
      return printApple(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.SNAKEB_SECTION) {
      return printApple(matriz)
    }
    else {
      setApple({ positionY, positionX })
      return { positionY, positionX }
    }
  }
  function printPower(matriz) {
    const powers = [
      OBJECTS.FAST_POWER,
      OBJECTS.SLOW_POWER,
      OBJECTS.FIVE_MORE_POWER,
      OBJECTS.FIVE_MINUS_POWER,
      OBJECTS.DISFRAGMENT_POWER
    ]

    const positionX = Math.floor(Math.random() * configs.cant_col)
    const positionY = Math.floor(Math.random() * configs.cant_fil)
    const whatIsPosition = Math.floor(Math.random() * powers.length)

    console.log(matriz, matriz[positionY][positionX]);

    if (matriz[positionY][positionX] === OBJECTS.WALL) {
      return printPower(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.HEAD_SNAKEB) {
      return printPower(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.SNAKEB_SECTION) {
      return printPower(matriz)
    }
    if (matriz[positionY][positionX] === OBJECTS.APPLE) {
      return printPower(matriz)
    }
    else {
      setPower({ positionY, positionX, whatIs: powers[whatIsPosition] })
      return { positionY, positionX, whatIs: powers[whatIsPosition] }
    }
  }

  function moveSnakeB() {
    if (loser) return

    const matrizAux = [...matriz];
    let snakeBAux = [...snakeB]
    let { X, Y } = snakeBAux[0];


    let { X: X2, Y: Y2 } = snakeBAux[1];

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
    if (matrizAux[Y][X] === OBJECTS.WALL || matrizAux[Y][X] === OBJECTS.SNAKEB_SECTION) {
      alert("perdiste")
      setLuser(true);
      return
    }
    const ultimo = snakeBAux[snakeBAux.length - 1];
    snakeBAux.unshift({ X, Y })
    snakeBAux.pop()
    setSnakeB(snakeBAux)

    for (var i = 0; i < snakeB.length; i++) {
      if (i == 0) {
        matrizAux[snakeBAux[i].Y][snakeBAux[i].X] = OBJECTS.HEAD_SNAKEB
      }
      else {
        matrizAux[snakeBAux[i].Y][snakeBAux[i].X] = OBJECTS.SNAKEB_SECTION
      }
    }


    //comio manzana
    if (apple.positionX === X && apple.positionY === Y) {
      matrizAux[ultimo.Y][ultimo.X] = OBJECTS.SNAKEB_SECTION;
      snakeBAux.push({ Y: ultimo.Y, X: ultimo.X })
      const { positionY, positionX } = printApple(matriz)
      matrizAux[positionY][positionX] = OBJECTS.APPLE
      setPointsB(pointsB + 1)
    }//comio poder
    if (power.positionX === X && power.positionY === Y) {
      let willBeFragment = false;

      if (power.whatIs === OBJECTS.DISFRAGMENT_POWER) {
        matrizAux[ultimo.Y][ultimo.X] = OBJECTS.SNAKEB_SECTION;
        willBeFragment = true;
      }
      if (power.whatIs === OBJECTS.FAST_POWER) {
        if (velosityB > configs.minVelosity) {
          setVelosityB(velosityB - 100)
        }
      }
      if (power.whatIs === OBJECTS.FIVE_MINUS_POWER) {
        for (let index = 0; index < 5; index++) {
          if (snakeBAux.length > 2) {
            const last = snakeBAux.pop()
            matrizAux[last.Y][last.X] = OBJECTS.GRASS;
          }

        }

      }
      if (power.whatIs === OBJECTS.ONE_MINUS_POWER) {
        if (snakeBAux.length > 2) {
          const last = snakeBAux.pop()
          matrizAux[last.Y][last.X] = OBJECTS.GRASS;
        }

      }
      if (power.whatIs === OBJECTS.FIVE_MORE_POWER) {
        for (let index = 0; index < 5; index++) {
          snakeBAux.push(ultimo)

        }

      }
      if (power.whatIs === OBJECTS.SLOW_POWER) {
        if (velosityB < configs.maxVelosity) {
          setVelosityB(velosityB + 100)
        }

      }
      if (!willBeFragment) {
        matrizAux[ultimo.Y][ultimo.X] = OBJECTS.GRASS;
      }

      const { positionY, positionX } = printPower(matriz)
      matrizAux[positionY][positionX] = power.whatIs
    }
    else {
      if (count > 10) {
        const { positionY, positionX } = printPower(matriz)
        matrizAux[positionY][positionX] = power.whatIs
      }
      matrizAux[ultimo.Y][ultimo.X] = OBJECTS.GRASS;
    }
    setSnakeB(snakeBAux)
    setCount(count + 1)
    setMatriz(matrizAux)

  }


  return (
    <>
      <p>{count}</p>
      <div> Puntuación: {pointsB}</div>
      <div> Velocidad de la serpiente: {100 - (velosityB * 100 / configs.maxVelosity)}</div>
      <div> Tamaño de la serpiente: {snakeB.length}</div>
      <div className='tablero' style={{display: "grid",gridTemplateColumns: "repeat("+configs.cant_col+", 2fr)"}}>
        {matriz.map((fila) => {
          return fila.map((value) => (
            <Label value={value} />
          ))
        })}

      </div>
      <div>
        <button className={"btn"} onClick={()=>setStart(false)} >Back </button>
        <button className={"btn"} onClick={reiniciarJuego} >Reiniciar</button>
      </div>

    </>

  );
}