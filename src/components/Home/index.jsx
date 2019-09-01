import React, { Component } from "react";
import styled from 'styled-components';
import Loading from '../Loading';
import { CardMovieHome } from '../CardMovieHome';

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
const ContainerLoading = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
`

class Home extends Component{
  state = {
    valueSearch: "",
    movie: [],
    loading: false,
    find: false,    
  }

  getValueSearch = (event) => {       
    this.setState({
      loading: true,
      valueSearch: event.target.value
    })
    
    let value = event.target.value

    if(value !== ""){
      this.searchData(1)
    } else {      
      this.setState({ 
        movie: [],
        loading: false,
        find: false,
      })
    }
  }

  searchData = (pageNumber) => {        
    setTimeout(() => {
      let url = new URL("https://api.themoviedb.org/3/search/movie?"),
          params = {
            api_key: "1b81b68eab6ab1714626504a1e36be3a", 
            language: "pt-BR",
            query: this.state.valueSearch,
            page: pageNumber,
            include_adult: false
          }
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

      fetch(url)
      .then(res => res.json())
      .then(data => {          
        this.setState({
          movie: data.results,
          loading: false,
          find: true,
        })
      })
      .catch(err => {
        console.log(err)
        throw err;
      });    
    }, 1000);
  }

  render(){
    const { loading, movie, find } = this.state;
    
    return(
      <div>
        <SearchBar onChange={this.getValueSearch} placeholder="Busque um filme por nome ou gênero..." />        
        {loading && (
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        )}
        
        {movie.length > 0 && find &&
          movie.map(content => {          
            return(              
                <CardMovieHome content={content} />                         
              )
            })
        }

        {movie.length > 0 && find &&
          <div>
            <ul>
              <li><div onClick={() => this.searchData(1)}>1</div></li>
              <li><div onClick={() => this.searchData(2)}>2</div></li>
              <li><div onClick={() => this.searchData(3)}>3</div></li>
              <li><div onClick={() => this.searchData(4)}>4</div></li>
            </ul>
          </div>
        }


        {find && movie.length === 0 &&
          <p>Não foram encontrados resultados</p>         
        }
        
      </div>
    )
  }
}

export default Home;
