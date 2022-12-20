import React, { useState  } from "react";

function Test() {
    const [key, setKey] = useState(null);

    function handleKeyDown(event) {
      // Update the state with the key that was pressed
      setKey(event.key);
    }
  
    document.addEventListener('keydown', handleKeyDown);
  
    return (
      <div onKeyDown={handleKeyDown}>
        {key ? `Key pressed: ${key}` : 'No key pressed'}
      </div>
    );
}

export default Test