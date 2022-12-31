import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useInterval } from "./useInterval";
import Typography from "@mui/material/Typography";
import img from "./egg-solid.svg";
import Controls from "./Controls";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

// import Snake from "./Snake";
// import Food from "./Food";
function App() {
  const SNAKE_START = [
    [8, 7],
    [8, 8],
  ];
  const APPLE_START = [5, 3];
  const [customSpeed, setCustomSpeed] = useState(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [food, setFood] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(null);
  const [snakeEyes, setSnakeEyes] = useState("••");
  const scorecard = document.getElementById("scorecard");
  const highscorecard = document.getElementById("highscorecard");
  const levelForm = document.getElementById("levelForm");

  // Change the direction of the snake based on the key that was pressed
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "ArrowUp") {
        setDir([0, -1]);
      } else if (event.key === "ArrowDown") {
        setDir([0, 1]);
      } else if (event.key === "ArrowLeft") {
        setDir([-1, 0]);
      } else if (event.key === "ArrowRight") {
        setDir([1, 0]);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getRandomCoordinates = () => {
    let min = 2;
    let max = 19;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    return [x, y];
  };
  const CheckEat = () => {
    let newsnake = [...snake];
    let head = [newsnake[0]];
    console.log(head);
    console.log(food);
    if (food[0] === newsnake[0][0] && food[1] === newsnake[0][1]) {
      setFood(getRandomCoordinates());
      setScore(score + 1);
      return true;
    }
    return false;
  };

  const moveSnake = () => {
    let newsnake = [...snake];
    let head = [newsnake[0]];
    head = [newsnake[0][0] + dir[0], newsnake[0][1] + dir[1]];
    newsnake.unshift(head);

    // Grow Snake
    if (CheckEat() === false) newsnake.pop();

    setSnake(newsnake);
  };

  const collision = () => {
    // Self collision
    let newsnake = [...snake];

    for (let i = 1; i < newsnake.length; i++) {
      if (
        newsnake[i][0] === newsnake[0][0] &&
        newsnake[i][1] === newsnake[0][1]
      ) {
        return true;
      }
    }

    // Wall collision
    if (
      newsnake[0][0] >= 21 ||
      newsnake[0][0] <= 0 ||
      newsnake[0][1] >= 21 ||
      newsnake[0][1] <= 0
    ) {
      return true;
    }

    return false;
  };

  // Main Function
  const gameLoop = () => {
    moveSnake();
    CheckEat();
    if (collision() === true) {
      setGameOver("Game-Over");
      if (localStorage.getItem("highScore") < score) {
        localStorage.setItem("highScore", score);
      }
      setSpeed(null);
      scorecard.style.fontSize = "30px";
      highscorecard.style.fontSize = "30px";
      setSnakeEyes("* *");
      levelForm.style.display="flex";

    }
  };

  // Control Buttons
  const play = () => {
    if (gameOver != null) {
      setScore(0);
      setSnake(SNAKE_START);
      setFood(APPLE_START);
      setGameOver(null);
      setSnakeEyes("••");
      scorecard.style.fontSize = "1rem";
      highscorecard.style.fontSize = "1rem";
      levelForm.style.display="none";
    }
    setSpeed(customSpeed);
  };
  const stop = () => {
    setSpeed(null);
  };
  const reset = () => {
    setSpeed(null);
    setSnake(SNAKE_START);
    setSnakeEyes("••");
    setFood(APPLE_START);
    setScore(0);
    setGameOver(null);
    scorecard.style.fontSize = "1rem";
    highscorecard.style.fontSize = "1rem";
    levelForm.style.display="flex";

  };

  // Mobile Controls

  const up = () => {
    setDir([0, -1]);
  };
  const down = () => {
    setDir([0, 1]);
  };
  const left = () => {
    setDir([-1, 0]);
  };
  const right = () => {
    setDir([1, 0]);
  };
  // Run Game
  useInterval(() => gameLoop(), speed);

  // Styling
  const foodstyle = {
    gridColumnStart: food[0],
    gridRowStart: food[1],
  };

  return (
    <div className="App">
      {/* <Typography>Play Snake Game</Typography> */}
      <div style={{ display: "flex" }}>
        <Typography id="scorecard" style={{ padding: "0px 10px" }}>
          Score :{score}
        </Typography>
        <Typography id="highscorecard">
          HighScore :{localStorage.getItem("highScore")}
        </Typography>
      </div>
      <FormControl style={{display:"flex",flexDirection:"row"}}  id="levelForm">
      <FormLabel id="demo-row-radio-buttons-group-label" style={{margin:"auto 10px"}}>Level</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="400" control={<Radio />} label="Easy"  onChange={(e) => setCustomSpeed(e.target.value)}/>
        <FormControlLabel value="200" control={<Radio />} label="Medium" onChange={(e) => setCustomSpeed(e.target.value)} />
        <FormControlLabel value="90" control={<Radio />} label="Hard" onChange={(e) => setCustomSpeed(e.target.value)} />
      </RadioGroup>
    </FormControl>
      <Typography id="gameovercard">{gameOver}</Typography>

      <div id="board">
        {snake.map((e, i) => {
          let style = {
            gridColumnStart: e[0],
            gridRowStart: e[1],
          };
          if (i === 0) {
            return (
              <div className="head" style={style} key={i}>
                {snakeEyes}
              </div>
            );
          } else {
            return <div className="snake" style={style} key={i}></div>;
          }
        })}
        {/* <Snake snake={SNAKE_START} /> */}
        <div className="food" style={foodstyle}>
          <img id="egg" src={img} alt="food" />
        </div>
        {/* <Food food={food} /> */}
      </div>
      <Controls up={up} down={down} left={left} right={right} />
      <div id="controls">
        <Button
          variant="contained"
          color="success"
          className="control-button"
          onClick={play}
        >
          Play
        </Button>
        <Button
          variant="contained"
          color="error"
          className="control-button"
          onClick={stop}
        >
          Stop
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="control-button"
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

export default App;
