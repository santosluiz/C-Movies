import React, { Component } from "react";
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Popularity } from '../Popularity';
import { device } from '../../helper/device';
import { handleConvertDate, handleGetImageCard, handleTranslateStatusMovie, handleTranslateLanguage, handleConvertRuntime } from '../../helper/getDataMovie.js';

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
            <p>{this.props.movie.overview}</p>
          </div>

          <div>
            <MovieH2>Informações</MovieH2>
            <HR />
            <MovieInfo>
              <div>
                <MovieH3>Situação</MovieH3>
                <p>{handleTranslateStatusMovie(this.props.movie.status)}</p>
              </div>

              <div>
                <MovieH3>Idioma</MovieH3>
                <p>{handleTranslateLanguage(this.props.movie.original_language)}</p>
              </div>

              <div>
                <MovieH3>Duração</MovieH3>
                <p>{handleConvertRuntime(this.props.movie.runtime)}</p>
              </div>

              <div>
                <MovieH3>Orçamento</MovieH3>
                <p>${this.handleConvertCurrency(this.props.movie.budget)}</p>
              </div>

              <div>
                <MovieH3>Receita</MovieH3>
                <p>${this.handleConvertCurrency(this.props.movie.revenue)}</p>
              </div>                                                                   
            </MovieInfo>              
          </div>

          <MovieCategorie>
            {this.props.movie.genres.map(item => {
              return (
                <MovieCategorieItem key={item.id}>{item.name}</MovieCategorieItem>
              )
            })}
          </MovieCategorie>

          <PopularityBox>
            <Popularity size="big" content={this.props.movie.popularity}></Popularity>                                  
          </PopularityBox>
        </MovieContent>

        <MovieImage>
          <img 
            src={handleGetImageCard(urlImage, this.props.movie.poster_path)} 
            alt={this.props.movie.title} 
            style={{width: "100%", height: "100%"}}
          />
        </MovieImage>          
      </MovieData>        
    </MovieBox>
    )
  }
}
