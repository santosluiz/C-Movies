import React, { Component } from "react";
import styled from 'styled-components';
import { Popularity } from '../Popularity';
import { device } from '../../helper/device';
import { handleSynopsis, handleConvertDate, handleGetImageCard, handleTranslateStatusMovie, handleTranslateLanguage, handleConvertRuntime } from '../../helper/getDataMovie.js';

const MovieBox = styled.div`  
  background: #f2f2f2;
  @media ${device.tablet} {  
    background: #fff;
  }
`
const Title = styled.div`
  display: flex;  
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 30px 5px 30px;
  background: #e6e6e6;
  box-sizing: border-box;
  @media ${device.tablet}{
    flex-direction: column;
    text-align: center;
  }
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
  @media ${device.tablet} {  
    flex-direction: column-reverse;
  }
`
const MovieContent = styled.div`
  padding: 10px 30px;
  box-sizing: border-box;
  width: calc(100% - 400px);
  @media ${device.tablet} {  
    width: 100%;
    background: #f2f2f2;    
    position: relative;
  }
`
const MovieImageBox = styled.div`  
  width: 400px;
  position: relative;
  @media ${device.tablet} {      
    margin: 15px auto;
    width: 300px;
  }
`
const MovieImage = styled.img`  
  width: 100%;
  height: 100%;
  @media ${device.tablet} {      
    -webkit-box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
    box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
  }
`
const MovieH2 = styled.h2`
  color: #4885aa;
  font-weight: 500;
  font-size: 29px;
  margin: 10px 0 0 0;
`
const MovieH3 = styled.h3`
  color: #4885aa;
  @media ${device.tablet} {   
    font-size: 22px;
    margin: 0 0 5px 0;
  }
`
const MovieInfoContent = styled.p`  
  @media ${device.tablet} {   
    font-size: 18px;
    margin: 0;
  }
`
const HR = styled.hr`
  width: 100%;
  height: 2px;
  border: none;
  background: #79edeb;
`
const SynopsisText = styled.p`
  @media ${device.tablet} {       
    font-size: 20px;
  }
`
const MovieInfo = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${device.tablet} {  
    flex-direction: column;
  }
`
const MovieInfoItem = styled.div`  
  margin: 16px 0;
  text-align: center;
` 
const MovieCategorie = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0;
  @media ${device.tablet} {  
    flex-wrap: wrap;
  }
`
const MovieCategorieItem = styled.span`
  background: #fff;
  padding: 3px 10px;
  border-radius: 45px;
  border: 1px solid #5d92b5;
  margin-right: 5px;
  color: #5d92b5;  
  font-weight: 500;
  text-align: center;
  @media ${device.tablet} {  
    font-size: 20px;
    margin: 0px 8px 8px 0px;
  }
`
const PopularityBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 15px;
  left: -150px;
  @media ${device.tablet} {      
    position: absolute;
    left: 0;
    right: -22px;
    bottom: -33px;
  }
  @media ${device.mobileS} {      
    right: -2px;
  }  
`

export class CardMoviePage extends Component{
  state = {
    urlImage: "https://image.tmdb.org/t/p/w300/",
  }

  handleConvertCurrency = (amount) => {
    return (amount).toLocaleString('pt-BR') + ",00"
  }

  render(){
    const { urlImage } = this.state

    return(
      <MovieBox>
      <Title>
        <TitleH1>{this.props.movie.title}</TitleH1>
        <Date>{handleConvertDate(this.props.movie.release_date)}</Date>
      </Title>        
      
      <MovieData>
        <MovieContent>
          <div>
            <MovieH2>Sinopse</MovieH2>
            <HR />
            <SynopsisText>{handleSynopsis(this.props.movie.overview)}</SynopsisText>
          </div>

          <div>
            <MovieH2>Informações</MovieH2>
            <HR />
            <MovieInfo>
              <MovieInfoItem>
                <MovieH3>Situação</MovieH3>
                <MovieInfoContent>{handleTranslateStatusMovie(this.props.movie.status)}</MovieInfoContent>
              </MovieInfoItem>

              <MovieInfoItem>
                <MovieH3>Idioma</MovieH3>
                <MovieInfoContent>{handleTranslateLanguage(this.props.movie.original_language)}</MovieInfoContent>
              </MovieInfoItem>

              <MovieInfoItem>
                <MovieH3>Duração</MovieH3>
                <MovieInfoContent>{handleConvertRuntime(this.props.movie.runtime)}</MovieInfoContent>
              </MovieInfoItem>

              <MovieInfoItem>
                <MovieH3>Orçamento</MovieH3>
                <MovieInfoContent>${this.handleConvertCurrency(this.props.movie.budget)}</MovieInfoContent>
              </MovieInfoItem>

              <MovieInfoItem>
                <MovieH3>Receita</MovieH3>
                <MovieInfoContent>${this.handleConvertCurrency(this.props.movie.revenue)}</MovieInfoContent>
              </MovieInfoItem>                                                                   
            </MovieInfo>              
          </div>

          <MovieCategorie>
            {this.props.movie.genres.map(item => {
              return (
                <MovieCategorieItem key={item.id}>{item.name}</MovieCategorieItem>
              )
            })}
          </MovieCategorie>
        </MovieContent>

        <MovieImageBox>
          <MovieImage          
            src={handleGetImageCard(urlImage, this.props.movie.poster_path)} 
            alt={this.props.movie.title}             
          />        
          <PopularityBox>
            <Popularity size="big" content={this.props.movie.popularity}></Popularity>                                  
          </PopularityBox>
        </MovieImageBox>        
        
      </MovieData>        
    </MovieBox>
    )
  }
}
