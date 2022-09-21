//canvas de la serpiente
const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

//tama;o de los pixeles
const columns = 40;
const squareSize = canvas.clientWidth / columns;

//score
let score = 0;

//obtener coordenadas random
const getRandomCoord = () => {
  const min = 0;
  const newCoords = {
    x: Math.floor(Math.random() * (columns - min) + min) * squareSize,
    y: Math.floor(Math.random() * (columns - min) + min) * squareSize,
  };

  let isValid = true;

  for (let i = 0; i < snake.tail.length; i++) {
    if (newCoords.x === snake.tail[i].x && newCoords.y === snake.tail[i].y) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    return newCoords;
  }
  return getRandomCoord();
};

const initialTail = [
  {
    y: 0,
    x: squareSize * 2,
  },
  {
    y: 0,
    x: squareSize,
  },
  {
    y: 0,
    x: 0,
  },
];

const snake = {
  direction: 39,
  tail: [...initialTail],
};

let food = getRandomCoord();

const checkColitions = () => {
  //checaremos colisiones con las paredes :D
  if (
    snake.tail[0].y < 0 ||
    snake.tail[0].y >= canvas.clientHeight ||
    snake.tail[0].x < 0 ||
    snake.tail[0].x >= canvas.clientWidth
  ) {
    restart();
  }
  //checaremos colisiones con la comida
  if (snake.tail[0].x === food.x && snake.tail[0].y === food.y) {
    //comeremos
    eat();
  }

  //checaremos colisions con la cola
  for (let i = 1; i < snake.tail.length; i++) {
    const head = snake.tail[0];
    const body = snake.tail[i];
    if (head.x === body.x && head.y === body.y) {
      restart();
      break;
    }
  }
};

//comer

const eat = () => {
  food = getRandomCoord();
  snake.tail.push({ x: -99999, y: -99999 });
  score = score + 1;
  const text = document.getElementById("score");
  text.innerText = `score: ${score}`;
};

const restart = () => {
  snake.tail = [...initialTail];
  snake.direction = 39;
  score = 0;
  const text = document.getElementById("score");
  text.innerText = `score: ${score}`;
};

const clear = () => {
  context.clearRect(0, 0, canvas.clientHeight, canvas.clientWidth);
};

const draw = () => {
  clear();
  //dibujar a la serpiente
  snake.tail.forEach((tail) => {
    context.fillStyle = "rgb(49,104,80)";
    context.fillRect(tail.x, tail.y, squareSize, squareSize);
  });

  //dibujar a la comida
  context.fillStyle = "rgb(49,104,80)";
  context.fillRect(food.x, food.y, squareSize, squareSize);
};

const getNewCoords = (direction, head) => {
  switch (direction) {
    case 39:
      //derecha
      return {
        x: head.x + squareSize,
        y: head.y,
      };
    case 40:
      //abajo
      return {
        x: head.x,
        y: head.y + squareSize,
      };
    case 37:
      //izquierda
      return {
        x: head.x - squareSize,
        y: head.y,
      };
    case 38:
      //arriba
      return {
        x: head.x,
        y: head.y - squareSize,
      };
    default:
      return {
        ...head,
      };
  }
};

const controls = (e) => {
  const { keyCode } = e;
  snake.direction = keyCode;
};

const move = () => {
  const newTail = [...snake.tail];
  const newHead = getNewCoords(snake.direction, newTail[0]);
  snake.tail[0] = newHead;

  //moveremos el resto del cuerpo
  for (let i = 1; i < snake.tail.length; i++) {
    snake.tail[i] = newTail[i - 1];
  }

  checkColitions();
  draw();
};

//init
draw();

setInterval(() => {
  move();
}, 100);

const touchableControls = (keyCode) => {
  snake.direction = keyCode;
};
