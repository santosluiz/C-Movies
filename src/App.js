import React, { Component } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import styled from 'styled-components';
import Main from './Main';

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
`
const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding-bottom: 2.5rem;
`
class App extends Component{
  render(){
    return (
      <Wrapper>
        <Header />
        <Container>
          <Main />
        </Container>
        <Footer />
      </Wrapper>
    );
  }
}

export default App;
