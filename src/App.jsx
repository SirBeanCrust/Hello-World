import React, { useState } from 'react';

function App() {
  const [winners, setWinners] = useState([]);
  const [names, setNames] = useState(["Anna", "Bella", "Charlie", "David", "Emil"]);

  function addName() {
    const name = document.getElementById('input').value;
    if (name) {
      setNames([...names, name]);
      document.getElementById('input').value = '';
    }
  }

  function genRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function spinWheel() {
    if (names.length > 0) {
      const wheel = document.getElementById('animatedElement');
      const randomIndex = genRandomInt(0, names.length);
      const winner = names[randomIndex]

      wheel.classList.add('animated');

      wheel.addEventListener('animationend', function() {
        wheel.classList.remove('animated');
        
      setWinners([...winners, winner]);
      setNames(names.filter(name => name !== winner));
      }, { once: true });
      
    }
   
  }

  function delNames() {
    setNames([]);
  }

  function Switch() {
    const switchState = "winners"
    switch (switchState) {
      case "winners":
        return (
          <div>
            {winners && (
            <ul>
              {winners.map((name, index) => (
                <li key={index}>{name}</li>
              ))}
            </ul>
          )}
          </div>
        );

      case "names":
        return (
          <div>
      {names && (
        <ul>
          {names.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      )}
      </div>
        );
        default:
      return null;
    }
  }

  function updateRotation(degrees) {
    document.documentElement.style.setProperty('--rotation', `${degrees}deg`);
  }

  function updateRotation1(degrees) {
    document.documentElement.style.setProperty('--rotation1', `${degrees}deg`);
  }
  
  // Example usage: Update sectorsize to 90 degrees
  const sectorsize = 360/names.length;
  updateRotation(sectorsize);
  updateRotation1(180 - (sectorsize/2));
  
  function DynamicSectors() {
    
    const sectors = [];
    for (let i = 0; i < names.length; i++) {
      const calculatedRotation = 180 - (sectorsize / 2) + (sectorsize * i);
      sectors.push(
        <div className="container1" key ={i}>
          
          <div className="sector-mask" style={{ transform: `rotate(${calculatedRotation}deg)` }}>
            <div className="sector" style={{ backgroundColor: `hwb(${-1 + sectorsize  * i} 5% 34%)` }} >
            </div>
          </div>

          <div className="container" style={{ transform: `rotate(${i * 360 / names.length }deg)` }}>
            <p className="sector-text">{names[i]}</p>
          </div>
       </div>
      );
      }
  
    return <div className="container">{sectors}</div>;
  }
  /**/
  return (
    
    <div className="App">
      <div>

      <h2>Lucky Wheel</h2>
    
      <div id="animatedElement" className="container">
        <DynamicSectors/>
      </div>

      <div className="sector-mask" >
            <div className="sector">
            </div>
      </div>
     
    </div>
      
      <div>
        <input type="text" id="input" placeholder="Enter a name" />
        <button onClick={addName}>Add Name</button>
      </div>
      <div>
        <button onClick={spinWheel}>Spin the Wheel</button>
      </div>
      <div>
        <button onClick={delNames}>Delete</button>
      </div>
      <div>
        <button onClick={Switch}>Swap</button>
      </div>
    
      <Switch/>
    </div>
  );
}

export default App;


