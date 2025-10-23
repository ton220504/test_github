import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
    <div className="App">
      <div className='text-red-400 font-bold '>Hello world</div>
      <button
        className='curso'
        onClick={() => {
          let age = prompt('How old are you?', 100);
          alert(`You are ${age} years old!`);
          //alert("6"/"2");
        }}
      >Click me!</button>
    </div>
  )
}

export default App
