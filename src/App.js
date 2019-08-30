import React, { Component } from 'react';
import './assets/css/App.css';
import Header from './components/Header';
import Main from './Main';

class App extends Component{
  render(){
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );    
  }
}

export default App;
