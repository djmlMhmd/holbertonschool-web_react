import logo from "./logo.jpg"
import "./App.css"
import {getFullYear, getFooterCopy} from "./utils";

function App() {

  return (
    <>
      <div className="App-header">
        <img src={logo} alt="" />
        <h1>School dashboard</h1>
      </div>

      <hr/>
      
      <div className="App-body">
        <p>Login to access the full dashborad</p>
      </div>

      <hr />

      <div className="App-footer">
        <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  );
}

export default App;
