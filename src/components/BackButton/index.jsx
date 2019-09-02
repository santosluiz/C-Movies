import React from 'react';
import { NavLink } from 'react-router-dom';

export const BackButton = () => {
  return(
    <NavLink className="backButton" to="/">{"< "}Voltar</NavLink>
  )
}