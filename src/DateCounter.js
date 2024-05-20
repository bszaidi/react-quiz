import React, { useState } from "react";
export default function DateCounter() {
  const [step, setStep] = useState(0);
  const [count, setCount] = useState(0);
  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const handleStepChange = (e) => {
    setStep(parseInt(e.target.value));
  };
  const defineCount = function (e) {
    setCount(Number(e.target.value));
  };
  const handleCountChange = (e) => {
    const value = e.target.getAttribute("data-value");
    if (value === "-") setCount(count - 1 * step);
    if (value === "+") setCount(count + 1 * step);
  };
  const reset = function () {
    setCount(0);
    setStep(1);
  };
  return (
    <div className="date-counter">
      <input type="range" min="0" max="10" onChange={handleStepChange} />
      <span>{step}</span>
      <div>
        <button data-value="-" onClick={handleCountChange}>
          -
        </button>
        <input type="text" min="0" max="10" value={count} onChange={defineCount} />
        <button data-value="+" onClick={handleCountChange}>
          +
        </button>
      </div>
      <p>{date.toDateString()}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
