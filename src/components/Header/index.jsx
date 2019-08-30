import React from "react";
import styled from 'styled-components';
//import { NavLink } from 'react-router-dom'

const HeaderBar = styled.div`
  width: 100%;
  background: #116193;
`
const Title = styled.h2`
  font-family: 'Abel', sans-serif;
  color: #00e5e2;
  margin: 0;
  text-align: center;
  font-size: 40px;
  padding: 20px 0;
  font-weight: 500;
`

const Header = () => (
  <HeaderBar>
    <Title>C-MOVIES</Title>
  </HeaderBar>
);

export default Header;