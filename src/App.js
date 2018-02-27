import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ReactGameRendererer from './renderer/ReactGameRenderer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Untitled Clicker Game</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        <div className='Game-renderer-container'>
          <ReactGameRendererer />
        </div>
      </div>
    );
  }
}

export default App;
