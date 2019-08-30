import React, { Component } from 'react';
import Header from './components/Header';
import styled from 'styled-components';
import Main from './Main';

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`

class App extends Component{
  render(){
    return (
      <div>
        <Header />
        <Container>
          <Main />
        </Container>
      </div>
    );    
  }
}

export default App;
