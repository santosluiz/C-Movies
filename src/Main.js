import React from "react";
import { Switch, Route } from 'react-router-dom'
import Home from "./components/Home";
import Movie from "./components/Movie";

// // Importantando o component Contact
// import Contact from "./components/contact/contact";
// // Importando os components necessárias da lib react-materialize
// import { Container } from 'react-materialize';
// Importanto o component <Switch /> e <Route /> da nossa Lib de rotas

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/movie' component={Movie}/>
    </Switch>
  </main>  
);

export default Main;