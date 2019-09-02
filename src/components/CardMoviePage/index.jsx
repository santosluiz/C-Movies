import React, { Component } from "react";
import { Popularity } from '../Popularity';
import {
  handleSynopsis,
  handleConvertDate,
  handleGetImageCard,
  handleTranslateStatusMovie,
  handleTranslateLanguage,
  handleConvertRuntime }
  from '../../helper/getDataMovie.js';
import {
  MovieBox,
  Title,
  TitleH1,
  Date,
  MovieData,
  MovieContent,
  MovieImageBox,
  MovieImage,
  MovieH2,
  MovieH3,
  MovieInfoContent,
  HR,
  SynopsisText,
  MovieInfo,
  MovieInfoItem,
  MovieCategorie,
  MovieCategorieItem,
  PopularityBox }
  from '../../assets/css/cardMoviePage';

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
