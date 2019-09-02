import React, { Component } from "react";
import styled from 'styled-components';
import { device } from '../../helper/device';
import Loading from '../../components/Loading';
import { CardMovieHome } from '../../components/CardMovieHome';

const SearchBox = styled.div`
  @media ${device.tablet}{
    padding: 0 30px;
  }
`
const SearchBar = styled.input.attrs({  
  type: "text",
})`
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  width: calc(100% - 17px);   
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

const ErrorBox = styled.div`
  margin: 50px 0;
  font-size: 20px;  
  text-align: center;
` 

class Home extends Component{
  state = {
    valueSearch: "",
    movie: [],
    loading: false,
    error: false,
    find: false,    
  }

  getValueSearch = (event) => {       
    this.setState({
      loading: true,
      valueSearch: event.target.value
    }, () => {

      if(this.state.valueSearch !== ""){        
        setTimeout(() => {
          this.searchData(1)
        }, 1500)

      } else {      
        this.setState({ 
          movie: [],
          loading: false,
          find: false,
        })
      }
    })
  }

  searchData = async (pageNumber) => {            
    let url = new URL("https://api.themoviedb.org/3/search/movie?"),
        params = {
          api_key: "1b81b68eab6ab1714626504a1e36be3a", 
          language: "pt-BR",
          query: this.state.valueSearch,
          page: pageNumber,
          include_adult: false
        }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    try {
      const response = await fetch(url);
      const dataMovie = await response.json();      
      
      this.setState({
        movie: dataMovie.results,
        loading: false,
        error: false,
        find: true,
      })
    } catch(err) {
      this.setState({
        error: true
      })
      console.log('fetch failed', err);
    }
  }

  render(){
    const { loading, movie, find, error } = this.state;
    
    return(
      <div>
        <SearchBox>
          <SearchBar onChange={this.getValueSearch} placeholder="Busque um filme por nome ou gênero..." />        
        </SearchBox>

        {loading && (
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        )}
        
        {error &&
          <ErrorBox>
            Erro ao fazer a pesquisa. Por favor, tente novamente mais tarde.
          </ErrorBox>
        }

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
