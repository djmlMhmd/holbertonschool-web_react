import { useRef } from "react";

import logo from "./logo.jpg"
import "./App.css"
import {getFullYear, getFooterCopy} from "./utils";

function App() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const focusInput = (ref) => {
    ref.current.focus()
  }

  return (
    <>
      <div className="App-header">
        <img src={logo} alt="" />
        <h1>School dashboard</h1>
      </div>

      <hr/>
      
      <div className="App-body">
        <p>Login to access the full dashborad</p>

        <label onClick={() => focusInput(emailRef)} htmlFor="email">Email: </label>
        <input type="email" ref={emailRef}/>

        <label onClick={() => focusInput(passwordRef)} htmlFor="password">Password</label>
        <input type="password" ref={passwordRef}/>

        <button>OK</button>
      </div>

      <hr />

      <div className="App-footer">
        <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  );
}

export default App;
