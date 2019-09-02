import React from "react";
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components';
import { device } from './helper/device';
import Home from "./pages/Home";
import Movie from "./pages/Movie";

const Wrapper = styled.main`
  margin: 60px 30px;
  @media ${device.mobileL}{
    margin: 60px 0px;
  }
`
const Main = () => (
  <Wrapper>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/movie' component={Movie}/>
    </Switch>
  </Wrapper>
);

export default Main;