import { useState } from 'react';
import './App.css';

const initialRow = Array.from({ length: 10 }).fill({ state: false });

const initialState = Array.from({ length: 10 }).fill(initialRow);

function App() {
  const [isCellPainted, setIsCellPainted] = useState(false);
  const [areaCoordinate1, setAreaCoordinate1] = useState({ x: null, y: null });
  const [areaCoordinate2, setAreaCoordinate2] = useState({ x: null, y: null });
  const [captured, setCapturedArea] = useState({});
  const onMouseDown = (x, y, isPainted) => () => {
    setAreaCoordinate1({ x, y });
    setIsCellPainted(isPainted);
  }

  const getCapturingCells = () => {
    const updatedCaptured = {};

    initialState.forEach((row, indexY) => {
      const isInRangeY = indexY >= areaCoordinate1.y && indexY <= areaCoordinate2.y || indexY <= areaCoordinate1.y && indexY >= areaCoordinate2.y;
      if (!isInRangeY) return;

      row.forEach((row, indexX) => {
        const key = `${indexX}.${indexY}`;
        const isInRangeX = indexX >= areaCoordinate1.x && indexX <= areaCoordinate2.x || indexX <= areaCoordinate1.x && indexX >= areaCoordinate2.x;
        if (isInRangeX) {
          updatedCaptured[key] = !isCellPainted;
        }
      })
    });
    return updatedCaptured;
  }
  const onMouseUp =  () => () => {
    const updatedCaptured = getCapturingCells();
    setCapturedArea({ ...captured, ...updatedCaptured });
  }
  const onMouseMove = (x, y) => ()  => {
    setAreaCoordinate2({ x,  y });
  }

  return (
    <div className="App" style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div>
        {initialState.map(((row, indexY) => {
          return <div key={indexY} style={{ display: 'flex'}}>
            {row.map((cell, indexX) => {
              const currentState = captured[`${indexX}.${indexY}`];
              return <div
                key={`${indexX}.${indexY}`}
                onMouseUp={onMouseUp(indexX, indexY)}
                onMouseDown={onMouseDown(indexX, indexY, currentState)}
                onMouseMove={onMouseMove(indexX, indexY)}
                style={{
                width: '20px',
                height: '20px',
                border: '1px solid black',
                backgroundColor: currentState ? 'red' : 'white',
              }}>
              </div>
            })}
          </div>
        }))}
      </div>

    </div>
  );
}

export default App;
