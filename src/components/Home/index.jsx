import React, { Component } from "react";
import styled from 'styled-components';
import Loading from '../Loading';
// import { NavLink } from 'react-router-dom';

const SearchBar = styled.input.attrs({  
  type: "text",
})`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  width: 100%;
  height: 45px;
  border: none;
  border-radius: 20px;
  color: #89adc4;
  background: #ebebeb;
  padding-left: 13px;
  font-size: 17px;
  :focus{
    border-radius: 0px;
    outline: 1px solid #89adc4;
  }
  ::placeholder {
    color: #89adc4;
  }
`

class Home extends Component{

  state = {
    movie: [],
    loading: false,
  }

  getValueSearch = (event) => {   
    
    this.setState({
      loading: true,
    })

    let url = new URL("https://api.themoviedb.org/3/search/movie?"),
        params = {
          api_key: "1b81b68eab6ab1714626504a1e36be3a", 
          language: "pt-BR",
          query: event.target.value,
          page: 5,
          include_adult: false
        }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)      
      this.setState({
        movie: data,
        loading: false,
      })
    })
    .catch(err => {
      console.log(err)
      throw err;
    });    
  }

  render(){
    const { loading } = this.state;
    console.log(this.state.movie)
    return(
      <div>
        <SearchBar onChange={this.getValueSearch} placeholder="Busque um filme por nome ou gênero..." />
        <p>EU SOU A HOME!!</p>
        <div>
          {loading && (
            <Loading />
          )}
        </div>
        {/* <li><NavLink to="movie">Ir para página do filme</NavLink></li> */}
      </div>
    )
  }
}


export default Home;
