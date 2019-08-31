import React, { Component } from "react";
import styled from 'styled-components';
import Loading from '../Loading';
import { device } from '../../helper/device';
import imgDefaultDesktop from '../../assets/img/imgDefaultDesktop.jpg'

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
const ContainerLoading = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
`
const CardMovie = styled.div`
  width: 100%;
  display: flex;
  margin: 60px 0;
  -webkit-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  @media ${device.tablet} {  
    flex-direction: column;
    align-items: center;
  }
`
const MovieImage = styled.div`
  width: 250px;
`
const CardContent = styled.div`
  width: calc(100% - 250px);
  position: relative;
  background: #ebebeb;
  @media ${device.tablet} {  
    width: 100%;
  }
`
const CardTopBar = styled.div`
  width: 100%;  
  height: 95px;
  background: #116193;
  position: relative;
`
const CardH1 = styled.h1`
  position: absolute;
  bottom: 3px;
  margin: 0 0 0 100px;
  font-size: 35px;
  font-weight: 300;
  color: #00e8e4;
`
const CardPopularity = styled.span`
  position: absolute;
  top: 50px;
  left: 11px;
  width: 70px;
  height: 70px;
  background: #116193;
  color: #00e8e4;
  font-size: 25px;
  font-weight: 300;
  border: 5px solid #00e8e4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;  
`
const CardDate = styled.p`
  margin: 0 0 0 100px;
  padding-top: 4px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 300;
`
const CardDescription = styled.div`
  margin: 35px 20px;
  font-family: 'Lato',sans-serif;
  font-weight: 400;
}
`
const CardReadMore = styled.div`
  font-family: 'Lato',sans-serif;
  position: absolute;
  bottom: 0;
  right: 20px;
`

class Home extends Component{

  state = {
    movie: [],
    loading: false,
    find: false,
    urlImage: "https://image.tmdb.org/t/p/w300/",
  }

  getValueSearch = (event) => {   
    
    this.setState({
      loading: true,
    })
    
    let value = event.target.value

    if(value !== ""){
      setTimeout(() => {
        let url = new URL("https://api.themoviedb.org/3/search/movie?"),
            params = {
              api_key: "1b81b68eab6ab1714626504a1e36be3a", 
              language: "pt-BR",
              query: value,
              page: 1,
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

    } else {
      
      this.setState({ 
        movie: [],
        loading: false,
        find: false,
      })
    }
  }

  handleConvertDate = (date) => {
    let today = new Date(date)
    let dd = today.getDate(); 
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();

    if (dd < 10) { 
      dd = '0' + dd; 
    } 
    if (mm < 10) { 
      mm = '0' + mm; 
    } 
    today = dd + '/' + mm + '/' + yyyy; 

    return today;
  }

  handleGetImageCard = (pathImage) => {
    let path = ""
    
    if(pathImage){
      path = this.state.urlImage + pathImage
    } else {
      path = imgDefaultDesktop
    }

    //TO-DO 
    //CRIAR O ELSE COM A IMAGEM DEFAULT

    return path
  }

  handleGetPopularity = (popularity) => {
    let value = ""
    if(popularity > 1){
      value = ~~popularity + "%"
    } else {
      value = popularity.toFixed(1) + "%"
    }
    return value
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
              <CardMovie key={content.id}>
                <MovieImage>
                  <img src={this.handleGetImageCard(content.poster_path)} alt="" style={{width: '100%', height: '100%'}}/>
                </MovieImage>
                <CardContent>
                  
                  <CardTopBar>
                    <CardH1>{content.title}</CardH1>
                    <CardPopularity>{this.handleGetPopularity(content.popularity)}</CardPopularity>
                  </CardTopBar>

                  <CardDate>                
                    {this.handleConvertDate(content.release_date)}
                  </CardDate>

                  <CardDescription>
                    <p>{content.overview}</p>
                  </CardDescription>

                  <CardReadMore>
                    <p>SAIBA MAIS!</p>
                  </CardReadMore>

                </CardContent>
              </CardMovie>
              )
            })
        }

        {find && movie.length === 0 &&
          <p>Não foram encontrados resultados</p>         
        }

        {/* <li><NavLink to="movie">Ir para página do filme</NavLink></li> */}
      </div>
    )
  }
}


export default Home;
