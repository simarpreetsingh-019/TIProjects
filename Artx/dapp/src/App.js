import React from "../node_modules/react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router } from "../node_modules/react-router-dom";
import Routes from "./Routes";

class App extends React.Component {

  render() {
    return (
      <Router>
      <div>
        <main>
          <Routes />
        </main>
      </div>
      </Router>
    );
  }
}
export default App;