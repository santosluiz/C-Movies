import React, { Component } from "react";
import { handleSynopsis, handleConvertDate, handleGetImageCard } from '../../helper/getDataMovie.js';
import { NavLink } from 'react-router-dom';
import { Popularity } from '../Popularity';
import {
  CardMovie,
  MovieImage,
  CardContent,
  CardTopBar,
  CardH1,
  CardBoxPopularity,
  CardDate,
  CardDescription,
  CardReadMore }
  from '../../assets/css/cardMovieHome';


export class CardMovieHome extends Component{
  state = {
    urlImage: "https://image.tmdb.org/t/p/w300/",
  }
  render(){
    const { urlImage } = this.state

    return(
      <NavLink className="cardLink" to={`movie/${this.props.content.id}`}>

      <CardMovie key={this.props.content.id}>
        <MovieImage>
          <img src={handleGetImageCard(urlImage, this.props.content.poster_path)} alt="" style={{width: '100%', height: '100%'}}/>
        </MovieImage>

        <CardContent>
          <CardTopBar>
            <CardH1>{this.props.content.title}</CardH1>

            <CardBoxPopularity>
              <Popularity size="small" content={this.props.content.popularity}></Popularity>
            </CardBoxPopularity>
          </CardTopBar>

          <CardDate>
            {handleConvertDate(this.props.content.release_date)}
          </CardDate>

          <CardDescription>
            <p>{handleSynopsis(this.props.content.overview)}</p>
          </CardDescription>

          <CardReadMore>
            <p>SAIBA MAIS!</p>
          </CardReadMore>
        </CardContent>
      </CardMovie>

      </NavLink>
    )
  }
}
