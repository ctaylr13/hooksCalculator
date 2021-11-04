import { useState } from 'react';

const App = () => {
  const [calc, setCalc] = useState(''); // state to keep track of the value 
  const [result, setResult] = useState(''); // state to keep track of the results 

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = (value) => {
    // if the last value is a operator & the calculation has nothing 
    // or if the value is a operator and the last value is a operator 
    // going to return and not do anything
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    // if the last value is not an operator
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i += 1) {
      digits.push(
        <button
          onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      )
    }
    return digits;
  };

  const calculate = () => {
    setCalc(eval(calc).toString());
  }

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  }

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>{result}</span> : ''}
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={() => updateCalc('.')}>.</button>


          <button onClick={calculate}>=</button>
        </div>

      </div>
    </div>
  );
}

export default App;
