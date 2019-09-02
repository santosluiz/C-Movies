import React from "react";
import { Switch, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Movie from "./pages/Movie";

const Main = () => (
  <main style={{margin: '60px 0'}}>
    <Switch>      
      <Route exact path='/' component={Home}/>
      <Route path='/movie' component={Movie}/>
    </Switch>
  </main>  
);

export default Main;