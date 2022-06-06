
import { useState} from "react";

function Content() {
  const [count, setCount] = useState(60);
  let timerid;
  const handleStart = () => {
    timerid = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
  };
  const handleStop = () => {
    clearInterval(timerid);
  };
  return (
    <div className="mt-3">
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
export default Content;
