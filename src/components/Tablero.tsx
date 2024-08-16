import React, { useState, useEffect } from 'react';
import { configs, DIRECTIONS, OBJECTS } from '../App.tsx';
import { Label } from './Label.tsx';

export function Tablero({ setStart }) {

  const [inGame, setInGame] = useState(true);
  const [matriz, setMatriz] = useState([]);
  const [apple, setApple] = useState({ X: 0, Y: 0, whatIs: OBJECTS.FAST_POWER });
  const [power, setPower] = useState({ X: 0, Y: 0 });
  const [snakeB, setSnakeB] = useState({
    sections: [
      { X: 5, Y: 5 },
      { X: 5, Y: 6 },
      { X: 5, Y: 7 }
    ],
    velosity: configs.velosityDefault,
    direction: DIRECTIONS.UP,
    points: 0
  }

  );



  useEffect(() => {
    //crear la matriz
    createMatrix(configs.cant_fil, configs.cant_col)
    //mover el maja por cada vez que la velocidad lo indique
    const intervalId = setInterval(() => {
      moveSnakeB()
    }, snakeB.velosity)

    function handleKeyDown(event) {
      if (event.key === "w") {
        setSnakeB((prevState) => ({ ...prevState, direction: DIRECTIONS.UP }));
      }
      if (event.key === "a") {
        setSnakeB((prevState) => ({ ...prevState, direction: DIRECTIONS.LEFT }));
      }
      if (event.key === "s") {
        setSnakeB((prevState) => ({ ...prevState, direction: DIRECTIONS.DOWN }));
      }
      if (event.key === "d") {
        setSnakeB((prevState) => ({ ...prevState, direction: DIRECTIONS.RIGHT }));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearInterval(intervalId)
    }
  }, [])



  function reiniciarJuego() {
    setInGame(true)
    setSnakeB({
      sections: [
        { X: 5, Y: 5 },
        { X: 5, Y: 6 },
        { X: 5, Y: 7 }
      ],
      velosity: configs.velosityDefault,
      direction: DIRECTIONS.UP,
      points: 0
    })
    createMatrix(configs.cant_fil, configs.cant_col)
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
    ];

    let positionX, positionY, whatIsPosition;
    let validPosition = false;

    while (!validPosition) {
      positionX = Math.floor(Math.random() * configs.cant_col);
      positionY = Math.floor(Math.random() * configs.cant_fil);
      whatIsPosition = Math.floor(Math.random() * powers.length);

      if (
        matriz[positionY][positionX] !== OBJECTS.WALL &&
        matriz[positionY][positionX] !== OBJECTS.HEAD_SNAKEB &&
        matriz[positionY][positionX] !== OBJECTS.SNAKEB_SECTION &&
        matriz[positionY][positionX] !== OBJECTS.APPLE
      ) {
        validPosition = true;
      }
    }

    setPower({ positionY, positionX, whatIs: powers[whatIsPosition] });
    return { positionY, positionX, whatIs: powers[whatIsPosition] };
  }


  function moveSnakeB() {
    if (!inGame) return;

    setSnakeB((prevState) => {
      const matrizAux = [...matriz];
      let snakeBAux = [...prevState.sections];
      let snakeVelosity = prevState.velosity;

      let { X, Y } = snakeBAux[0];
      let { X: X2, Y: Y2 } = snakeBAux[1];

      // Actualizar dirección basada en la dirección actual
      switch (prevState.direction) {
        case DIRECTIONS.DOWN:
          if (Y + 1 === Y2) {
            return { ...prevState, direction: DIRECTIONS.UP };
          } else {
            Y += 1;
          }
          break;
        case DIRECTIONS.UP:
          if (Y - 1 === Y2) {
            return { ...prevState, direction: DIRECTIONS.DOWN };
          } else {
            Y -= 1;
          }
          break;
        case DIRECTIONS.LEFT:
          if (X - 1 === X2) {
            return { ...prevState, direction: DIRECTIONS.RIGHT };
          } else {
            X -= 1;
          }
          break;
        case DIRECTIONS.RIGHT:
          if (X + 1 === X2) {
            return { ...prevState, direction: DIRECTIONS.LEFT };
          } else {
            X += 1;
          }
          break;
        default:
          break;
      }

      // Verificar colisiones
      if (matrizAux[Y][X] === OBJECTS.WALL || matrizAux[Y][X] === OBJECTS.SNAKEB_SECTION) {
        alert("perdiste");
        setInGame(false);
        return prevState;
      }

      // Actualizar la posición de la serpiente
      const tail = snakeBAux[snakeBAux.length - 1];
      snakeBAux.unshift({ X, Y });
      snakeBAux.pop();

      // Actualizar la matriz
      for (let i = 0; i < snakeBAux.length; i++) {
        if (i === 0) {
          matrizAux[snakeBAux[i].Y][snakeBAux[i].X] = OBJECTS.HEAD_SNAKEB;
        } else {
          matrizAux[snakeBAux[i].Y][snakeBAux[i].X] = OBJECTS.SNAKEB_SECTION;
        }
      }

      // Comió manzana
      if (apple.positionX === X && apple.positionY === Y) {
        matrizAux[tail.Y][tail.X] = OBJECTS.SNAKEB_SECTION;
        snakeBAux.push({ Y: tail.Y, X: tail.X });
        const { positionY, positionX } = printApple(matriz);
        matrizAux[positionY][positionX] = OBJECTS.APPLE;
        setPointsB((prevPoints) => prevPoints + 1);
      }

      // Comió poder
      if (power.positionX === X && power.positionY === Y) {
        switch (power.whatIs) {
          case OBJECTS.FAST_POWER:
            alert("Fast");
            if (snakeVelosity > configs.minVelosity) {
              snakeVelosity=snakeVelosity-100;
              setVelosityB((prevVelosity) => prevVelosity - 100);
            }
            break;
          case OBJECTS.FIVE_MINUS_POWER:
            alert("-5");
            for (let index = 0; index < 5; index++) {
              if (snakeBAux.length > 2) {
                const last = snakeBAux.pop();
                matrizAux[last.Y][last.X] = OBJECTS.GRASS;
              }
            }
            break;
          case OBJECTS.ONE_MINUS_POWER:
            alert("-1");
            if (snakeBAux.length > 2) {
              const last = snakeBAux.pop();
              matrizAux[last.Y][last.X] = OBJECTS.GRASS;
            }
            break;
          case OBJECTS.FIVE_MORE_POWER:
            alert("+5");
            for (let index = 0; index < 5; index++) {
              snakeBAux.push(tail);
            }
            break;
          case OBJECTS.SLOW_POWER:
            alert("Slow");
            if (velosityB < configs.maxVelosity) {
              setVelosityB((prevVelosity) => prevVelosity + 100);
            }
            break;
          default:
            break;
        }
        matrizAux[tail.Y][tail.X] = OBJECTS.GRASS;
        const { positionY, positionX } = printPower(matriz);
        matrizAux[positionY][positionX] = power.whatIs;
      } else {
        matrizAux[tail.Y][tail.X] = OBJECTS.GRASS;
      }

      setMatriz(matrizAux);

      return {
        ...prevState,
        sections: snakeBAux
      };
    });
  }



  return (
    <>
      <div>
        
        <div> Puntuación: {snakeB.points}</div>
        <div> Velocidad de la serpiente: {100 - (snakeB.velosity * 100 / configs.maxVelosity)}</div>
        <div> Tamaño de la serpiente: {snakeB.length}</div>
        <div>Te comiste un { }</div>
      </div>

      <div className='tablero' style={{ display: "grid", gridTemplateColumns: "repeat(" + configs.cant_col + ", 30px)", gap: 0 }}>
        {matriz.map((fila) => {
          return fila.map((value) => (
            <Label value={value} />
          ))
        })}

      </div>
      <div>
        <button className={"btn"} onClick={() => setStart(false)} >Back </button>
        <button className={"btn"} onClick={reiniciarJuego} >Reiniciar</button>
      </div>

    </>

  );
}