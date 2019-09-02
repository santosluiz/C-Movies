import React, { Component } from 'react';
import Loading from '../../components/Loading';
import { CardMoviePage } from '../../components/CardMoviePage';
import { TrailerMovieContent } from '../../components/TrailerMovieContent';
import { BackButton } from '../../components/BackButton';
import {
  Main,
  BackButtonBox,
  ContainerLoading,
  MovieTrailer,
  HasNoTrailer,
  ErrorBox
 } from '../../assets/css/moviePage';

class Movie extends Component {
  state = {
    movie: [],
    idMovie: "",
    trailerUrl: "",
    loadingMovie: false,
    loadingTrailer: false,
    errorMovie: false,
    errorTrailer: false,
    hasTrailer: false,
    urlImage: "https://image.tmdb.org/t/p/w300/",
  }

  componentDidMount(){
    window.scrollTo(0,0)
    const currentUrl = window.location.href
    const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);

    this.setState({
      idMovie: id
    }, () => {
      this.loadData(this.state.idMovie)
      this.loadTrailer(this.state.idMovie)
    })
  }

  loadData = async (id) => {
    this.setState({
      loadingMovie: true,
    })

    let url = new URL(`https://api.themoviedb.org/3/movie/${id}?`),
    params = {
      language: "pt-BR",
      api_key: "1b81b68eab6ab1714626504a1e36be3a",
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    try {
      const response = await fetch(url);
      const dataMovie = await response.json();

      this.setState({
        movie: dataMovie,
        loadingMovie: false,
        errorMovie: false
      })
    } catch(err) {
      this.setState({
        errorMovie: true
      })
      console.log('fetch failed', err);
    }
  }

  loadTrailer = async (id) => {
    this.setState({
      loadingTrailer: true,
    })

    let url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos?`),
    params = {
      api_key: "1b81b68eab6ab1714626504a1e36be3a",
      language: "pt-BR",
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    try {
      const response = await fetch(url);
      const dataTrailer = await response.json();

      if(dataTrailer.results.length > 0){

        let keyTrailer = ""
        dataTrailer.results.forEach(item => {
         keyTrailer = item.key
        })

      this.setState({
        trailerUrl: "https://www.youtube.com/embed/" + keyTrailer,
        hasTrailer: true,
        errorTrailer: false,
      })
    } else {
      this.setState({
        hasTrailer: false,
        loadingTrailer: false,
      })
    }
   }catch(err) {
      this.setState({
        errorTrailer: true,
      })
      console.log('fetch failed', err);
    }
  }

  handleNoHasTrailer = (title) => {
    return "https://www.youtube.com/results?search_query=" + title
  }

  render(){
    const { movie, trailerUrl, loadingMovie, loadingTrailer, hasTrailer, error } = this.state
    return(
      <Main>

        <BackButtonBox>
          <BackButton />
        </BackButtonBox>

        {loadingMovie &&
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        }

        {error &&
          <ErrorBox>
            Erro ao carregar os dados. Por favor, tente novamente mais tarde.
          </ErrorBox>
        }

        {movie.id > 0 &&
          <CardMoviePage movie={movie} />
        }

        {loadingTrailer && !hasTrailer &&
          <ContainerLoading>
            <Loading />
          </ContainerLoading>
        }

        {hasTrailer ? (
          <MovieTrailer>
            <TrailerMovieContent trailerUrl={trailerUrl} />
          </MovieTrailer>
        ) : (
          <HasNoTrailer>
            <p>Este filme não possui trailer, <a href={this.handleNoHasTrailer(movie.title)} target="_blank" without rel="noopener noreferrer">clique aqui para pesquisar</a></p>
          </HasNoTrailer>
        )
        }
      </Main>
    )
  }
}

export default Movie
