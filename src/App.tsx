import {useLayoutEffect, useState} from 'react'
import logo from './logo.svg'
import './App.css'
import Toast from "./Toast";
import {useToast} from "./ToastProvider";

function App() {
  const [count, setCount] = useState(0)

  const {setMessage, showToast} = useToast();

  useLayoutEffect(() => {
    setMessage('welch\'s zero is good')
    // 모든 게 기본
    showToast('hello world!');

    // 옵션 설정하기(기존 설정도 있는데 override)
    showToast("hello toast!", {
      name: "test-toast",
      duration: '1000ms'
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
      <Toast
        name="test-toast"
      >
        <div></div>
      </Toast>
    </div>
  )
}

export default App
