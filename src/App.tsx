import React from 'react';
import './styles/App.scss';
import {Routing} from "./routing";
import {Header} from "./components/Header/Header";

function App() {
  return (
    <div className="App">
        <Header />
        <Routing />
      </div>
  );
}

export default App;
