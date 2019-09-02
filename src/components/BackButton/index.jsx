import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const BackButton = () => {
  return(
    <NavLink className="backButton" to="/">{"< "}Voltar</NavLink>    
  )
}