import React from 'react'

function Food(props) {
    let e= props.food
    const style = {
        gridColumnStart: e[0],
        gridRowStart: e[1],
      };
  return (
     <div className="food" style={style}></div>
  )
}

export default Food