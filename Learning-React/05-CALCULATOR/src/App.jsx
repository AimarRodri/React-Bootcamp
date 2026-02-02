import { useState } from 'react';
import './App.css'; 

function App() {
  const [inputFieldContent, setInputFieldContent] =  useState('');
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    
    if (theme === 'light') {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  const evaluateInputField = () => {
    try {
      setInputFieldContent(eval(inputFieldContent).toString());
    } catch (error) {
      setInputFieldContent('Error');
    }
  }

  const clearInputField = () => {
    setInputFieldContent('');
  }

  const handleButtonClick = (buttonValue) => {
    setInputFieldContent(inputFieldContent + buttonValue);
  }

  const handleDelete = () => {
    setInputFieldContent(inputFieldContent.slice(0, -1));
  }

  return (
    <main>
      <button className="themeToggler" onClick={ toggleTheme }>Toggle theme</button>
      <div className={`calculator-container`}>
        <h1 className="calculator-title">Calculator</h1>
        <div className="calculator-display">
          <input className="input-field" 
          type="text" 
          placeholder="0" 
          value={inputFieldContent}></input>
          <button className="button-delete" onClick={ handleDelete } >⌫</button>
        </div>
        <div className="calculator-pad">
          <button className="calculator-button" id="button-." onClick={() => handleButtonClick('.')}>.</button>
          <button className="calculator-button" id="button-7" onClick={() => handleButtonClick('7')}>7</button>
          <button className="calculator-button" id="button-8" onClick={() => handleButtonClick('8')}>8</button>
          <button className="calculator-button" id="button-9" onClick={() => handleButtonClick('9')}>9</button>
          <button className="calculator-button" id="button-/" onClick={() => handleButtonClick('/')}>÷</button>
          <button className="calculator-button" id="button-4" onClick={() => handleButtonClick('4')}>4</button>
          <button className="calculator-button" id="button-5" onClick={() => handleButtonClick('5')}>5</button>
          <button className="calculator-button" id="button-6" onClick={() => handleButtonClick('6')}>6</button>
          <button className="calculator-button" id="button-*" onClick={() => handleButtonClick('*')}>×</button>
          <button className="calculator-button" id="button-1" onClick={() => handleButtonClick('1')}>1</button>
          <button className="calculator-button" id="button-2" onClick={() => handleButtonClick('2')}>2</button>
          <button className="calculator-button" id="button-3" onClick={() => handleButtonClick('3')}>3</button>
          <button className="calculator-button" id="button--" onClick={() => handleButtonClick('-')}>-</button>
          <button className="calculator-button" id="button-+" onClick={() => handleButtonClick('+')}>+</button>
          <button className="calculator-button" id="button-0" onClick={() => handleButtonClick('0')}>0</button>
          <button className="calculator-button" id="button-C" onClick={ clearInputField }>C</button>
          <button className="calculator-button" id="button-=" onClick={ evaluateInputField }>=</button>
        </div>
      </div>
    </main>
  )
}

export default App
