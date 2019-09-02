import React, { Component } from "react";
import Loading from '../../components/Loading';
import { CardMovieHome } from '../../components/CardMovieHome';
import Pagination from 'react-paginating';
import {
  SearchBox,
  SearchBar,
  ContainerLoading,
  ErrorBox,
  PaginationBox,
  PaginationDot,
  PaginationItem
} from '../../assets/css/home';

class Home extends Component{
  constructor(props){
    super(props)
    this.timer = null;

    this.state = {
      valueSearch: "",
      allMoviesList: [],
      movie: [],
      loading: false,
      error: false,
      find: false,
      limit: 5,
      pageCount: 5,
      total: 0,
      apiPageRequest: 0,
      currentPage: 1
    }
 }

  componentDidUpdate(){
    clearTimeout(this.timer);
  }

  handleInputEnter = (event) => {
    if(event.key === 'Enter'){
      this.getValueSearch(this.state.valueSearch)
    }
  }

  getValueSearch = (event) => {

    let valueSearchInput = this.state.valueSearch

    if(event.target){
      valueSearchInput = event.target.value
    }

    this.setState({
      loading: true,
      valueSearch: valueSearchInput
    }, () => {

      if(this.state.valueSearch !== ""){
        this.timer = setTimeout(() => {

          const pageNumber = 1
          const begin = 0
          const end = this.state.limit

          this.searchData(pageNumber, begin, end)
        }, 1000)
      } else {
        this.setState({
          movie: [],
          loading: false,
          find: false,
        })
      }
    })
  }

  searchData = async (pageNumber, begin, end) => {
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
      let allMoviesListAux = dataMovie.results
      let currentPageAux = pageNumber

      if(pageNumber > 1){
        currentPageAux = this.state.currentPage + 1
        allMoviesListAux = [...this.state.allMoviesList, ...dataMovie.results]
      }

      let movieElements = allMoviesListAux.slice(begin, end).map(item => {
        return item
      })

      this.setState({
        allMoviesList: allMoviesListAux,
        movie: movieElements,
        total: dataMovie.total_results,
        currentPage: currentPageAux,
        apiPageRequest: this.state.apiPageRequest + 1,
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

  handleScroll = () => {
      var doc = document.documentElement;
      var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      if (top > 0) {
        window.scrollTo(0, top - 60)
        setTimeout(this.handleScroll, 1)
      }
  }

  handlePageChange = (pageNumber, e) => {
    this.handleScroll()

    const begin = this.state.limit * (pageNumber - 1)
    const end = (this.state.limit * (pageNumber - 1)) + this.state.limit

    if(this.state.allMoviesList.length === begin){
      this.searchData(this.state.apiPageRequest + 1, begin, end)
    } else {
      let movieElements = this.state.allMoviesList.slice(begin, end).map(item => {
        return item
      })

      this.setState({
        currentPage: pageNumber,
        movie: movieElements
      });
    }
  };

  render(){
    const {
      loading,
      movie,
      find,
      error,
      currentPage,
      limit,
      pageCount,
      total } = this.state;

    return(
      <div>
        <SearchBox>
          <SearchBar
            onChange={this.getValueSearch}
            onKeyDown={this.handleInputEnter}
            placeholder="Busque um filme por nome ou gênero..."
          />
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
                <CardMovieHome key={content.id} content={content} />
              )
            })
        }

        {movie.length > 0 && find &&
        <PaginationBox>
          <Pagination
            total={total}
            limit={limit}
            pageCount={pageCount}
            currentPage={currentPage}
          >
            {({
              pages,
              currentPage,
              hasNextPage,
              hasPreviousPage,
              previousPage,
              nextPage,
              totalPages,
              getPageItemProps
            }) => (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {hasPreviousPage && (
                  <PaginationDot
                    {...getPageItemProps({
                      pageValue: previousPage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {'<'}
                  </PaginationDot>
                )}

                {pages.map(page => {
                  let activePage = null;
                  if (currentPage === page) {
                    activePage = {
                      backgroundColor: '#116193',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      lineHeight: '1px',
                      fontSize: '26px',
                      color: '#00e8e4',
                      boxSshadow: '0px 0px 0px 5px #116193',
                      border: '3px solid #00e8e4',
                    };
                  }
                  return (
                    <PaginationItem
                      {...getPageItemProps({
                        pageValue: page,
                        key: page,
                        style: activePage,
                        onPageChange: this.handlePageChange
                      })}
                    >
                      {page}
                    </PaginationItem>
                  );
                })}

                {hasNextPage && (
                  <PaginationDot
                    {...getPageItemProps({
                      pageValue: nextPage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {'>'}
                  </PaginationDot>
                )}
              </div>
            )}
          </Pagination>
          </PaginationBox>
        }

        {find && movie.length === 0 &&
          <p>Não foram encontrados resultados</p>
        }

      </div>
    )
  }
}

export default Home;
