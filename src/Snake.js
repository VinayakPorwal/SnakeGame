import React from "react";

function Snake(props) {

  return (
    <>
      {props.snake.map((e, i) => {
        let style = {
          gridColumnStart: e[0],
          gridRowStart: e[1],
        };
        if (i === 0) {
          return <div className="snake" style={style} key={i}>**</div>;
        } else {
          return <div className="head" style={style} key={i}></div>;
        }
      })}
    </>
  );
}

export default Snake;
