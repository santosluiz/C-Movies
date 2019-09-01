import React, { Component } from 'react';
import styled from 'styled-components';
import Loading from '../Loading';
import { device } from '../../helper/device';
import { Popularity } from '../Popularity';
import { handleConvertDate, handleGetImageCard, handleTranslateStatusMovie, handleTranslateLanguage, handleConvertRuntime } from '../../helper/getDataMovie.js';
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
  font-weight: 600;  
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
  width: calc(100% - 400px);
`
const MovieImage = styled.div`  
  width: 400px;
`

const MovieH2 = styled.h2`
  color: #4885aa;
  font-weight: 500;
  font-size: 29px;
  margin: 10px 0 0 0;
`
const MovieH3 = styled.h3`
  color: #4885aa;
`

const HR = styled.hr`
  width: 100%;
  height: 2px;
  border: none;
  background: #79edeb;
`
const MovieInfo = styled.div`
  display: flex;
  justify-content: space-around;
`
const MovieCategorie = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0;
`
const MovieCategorieItem = styled.span`
  background: #fff;
  padding: 3px 10px;
  border-radius: 45px;
  border: 1px solid #5d92b5;
  margin-right: 5px;
  color: #5d92b5;  
  font-weight: 500;
`
const PopularityBox = styled.div`
  display: flex;
  justify-content: flex-end;
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

  handleConvertCurrency = (amount) => {
    return (amount).toLocaleString('pt-BR') + ",00"
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
              <MovieH2>Sinopse</MovieH2>
              <HR />
              <p>{movie.overview}</p>
            </div>

            <div>
              <MovieH2>Informações</MovieH2>
              <HR />
              <MovieInfo>
                <div>
                  <MovieH3>Situação</MovieH3>
                  <p>{handleTranslateStatusMovie(movie.status)}</p>
                </div>

                <div>
                  <MovieH3>Idioma</MovieH3>
                  <p>{handleTranslateLanguage(movie.original_language)}</p>
                </div>

                <div>
                  <MovieH3>Duração</MovieH3>
                  <p>{handleConvertRuntime(movie.runtime)}</p>
                </div>

                <div>
                  <MovieH3>Orçamento</MovieH3>
                  <p>${this.handleConvertCurrency(movie.budget)}</p>
                </div>

                <div>
                  <MovieH3>Receita</MovieH3>
                  <p>${this.handleConvertCurrency(movie.revenue)}</p>
                </div>       
                                                                                         
              </MovieInfo>              
            </div>

            <MovieCategorie>
              {movie.genres.map(item => {
                return (
                  <MovieCategorieItem key={item.id}>{item.name}</MovieCategorieItem>
                )
              })}
            </MovieCategorie>

              <PopularityBox>
                <Popularity size="big" content={movie.popularity}></Popularity>                                  
              </PopularityBox>

          </MovieContent>

          <MovieImage>
            <img 
              src={handleGetImageCard(urlImage, movie.poster_path)} 
              alt={movie.title} 
              style={{width: "100%", height: "100%"}}
            />
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
              allowFullScreen>              
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
