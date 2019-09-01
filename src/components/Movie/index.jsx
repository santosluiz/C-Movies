import React, { Component } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import { device } from '../../helper/device';
import imgDefaultDesktop from '../../assets/img/imgDefaultDesktop.jpg';
import { handleConvertDate, handleGetImageCard } from '../../helper/getDataMovie.js';
// import { NavLink } from 'react-router-dom';

const Main = styled.div`
  width: 100%;    
`
const MovieBox = styled.div`  
  background: #f2f2f2;
`
const Title = styled.div`
  display: flex;  
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 30px 5px 30px;
  background: #e6e6e6;
  box-sizing: border-box;
`
const TitleH1 = styled.h1`
  font-weight: 500;  
  margin: 0;
  color: #196696;
`
const Date = styled.span`
  font-size: 20px;  
  color: #b4b4b4;
`
const MovieData = styled.div`
  width: 100%;
  display: flex;
`
const MovieContent = styled.div`
  padding: 10px 30px;
`
const MovieImage = styled.div`  
`
const HR = styled.hr`
  background: #79edeb
`
const MovieInfo = styled.div`
  display: flex;
  justify-content: space-around;
`
const MovieTrailer = styled.div`
  width: 100%;
  margin: 40px 0;
`
const HasNoTrailer = styled.div`
  text-align: center;
`

class Movie extends Component {

  state = {    
    movie: [],    
    idMovie: "",    
    trailerUrl: "",
    hasTrailer: true,
    urlImage: "https://image.tmdb.org/t/p/w300/",
  }

  componentDidMount(){     
    const currentUrl = window.location.href
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.setState({
      idMovie: id
    }, () => {
      this.loadData(this.state.idMovie)
      this.loadTrailer(this.state.idMovie)    
    })    
  }

  loadData = (id) => {    
    let url = new URL(`https://api.themoviedb.org/3/movie/${id}?`),
    params = {      
      language: "pt-BR",
      api_key: "1b81b68eab6ab1714626504a1e36be3a", 
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url)
    .then(res => res.json())
    .then(data => {          
      console.log(data)
      this.setState({
        movie: data,        
        // loading: false,
        // find: true,
      })
    })
    .catch(err => {
      console.log(err)
      throw err;
    });      
  }

  loadTrailer = (id) => {   
    let url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos?`),
    params = {      
      api_key: "1b81b68eab6ab1714626504a1e36be3a", 
      language: "pt-BR",
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    fetch(url)
    .then(res => res.json())
    .then(data => {          
      console.log(data)
      if(data.results.length > 0){
        let keyTrailer = ""
        data.results.map(item => { 
         keyTrailer = item.key
        })
  
        this.setState({
          trailerUrl: "https://www.youtube.com/embed/" + keyTrailer,
          hasTrailer: true
          // loading: false,
          // find: true,
        })
      } else {
        this.setState({
          hasTrailer: false
        })
      }
    })
    .catch(err => {
      console.log(err)
      throw err;
    });      
  }

  handleNoHasTrailer = (title) => {
    return "https://www.youtube.com/results?search_query=" + title    
  }

  render(){    
    const { movie, urlImage, trailerUrl, hasTrailer } = this.state    
    return(
      <Main>
        {movie.id > 0 &&
        <MovieBox>

          <Title>
            <TitleH1>{movie.title}</TitleH1>
            <Date>{handleConvertDate(movie.release_date)}</Date>
          </Title>        
          
          <MovieData>
          <MovieContent>
            <div>
              <h2>Sinopse</h2>
              <HR />
              <p>{movie.overview}</p>
            </div>

            <div>
              <h2>Informações</h2>
              <HR />
              <MovieInfo>
                <div>
                  <h3>Situação</h3>
                  <p>{movie.status}</p>
                </div>

                <div>
                  <h3>Idioma</h3>
                  <p>{movie.spoken_languages.map(item => { return (item.name)})}</p>
                </div>

                <div>
                  <h3>Duração</h3>
                  <p>{movie.runtime}</p>
                </div>

                <div>
                  <h3>Orçamento</h3>
                  <p>{movie.budget}</p>
                </div>

                <div>
                  <h3>Receita</h3>
                  <p>{movie.revenue}</p>
                </div>       
                                                                                         
              </MovieInfo>              
            </div>
          </MovieContent>

          <MovieImage>
            <img src={handleGetImageCard(urlImage, movie.poster_path)} alt={movie.title} />
          </MovieImage>
          
        </MovieData>
        
        </MovieBox>
        }

        {hasTrailer ? (
          <MovieTrailer>
            <iframe 
              style={{width: '100%', height: '600px'}}
              width="560" 
              height="315" 
              src={trailerUrl}
              frameBorder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>              
            </iframe>
          </MovieTrailer>
        ) : (
          <HasNoTrailer>            
            <p>Este filme não possui trailer, <a href={this.handleNoHasTrailer(movie.title)} target="_blank">clique aqui para pesquisar</a></p>
          </HasNoTrailer>
        )
        }
      </Main>
    )
  }
}

export default Movie
