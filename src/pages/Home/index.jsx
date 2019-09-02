import React, { Component } from "react";
import styled from 'styled-components';
import { device } from '../../helper/device';
import Loading from '../../components/Loading';
import { CardMovieHome } from '../../components/CardMovieHome';
import Pagination from 'react-paginating';

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
      pageCount: 3,
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

  handlePageChange = (pageNumber, e) => {
    
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
                <CardMovieHome content={content} />                         
              )
            })
        }

        {movie.length > 0 && find &&

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
            <div>
              <button
                {...getPageItemProps({
                  pageValue: 1,
                  onPageChange: this.handlePageChange
                })}
              >
                first
              </button>
 
              {hasPreviousPage && (
                <button
                  {...getPageItemProps({
                    pageValue: previousPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'<'}
                </button>
              )}
 
              {pages.map(page => {
                let activePage = null;
                if (currentPage === page) {
                  activePage = { backgroundColor: '#fdce09' };
                }
                return (
                  <button
                    {...getPageItemProps({
                      pageValue: page,
                      key: page,
                      style: activePage,
                      onPageChange: this.handlePageChange
                    })}
                  >
                    {page}
                  </button>
                );
              })}
 
              {hasNextPage && (
                <button
                  {...getPageItemProps({
                    pageValue: nextPage,
                    onPageChange: this.handlePageChange
                  })}
                >
                  {'>'}
                </button>
              )}
 
              <button
                {...getPageItemProps({
                  pageValue: totalPages,
                  onPageChange: this.handlePageChange
                })}
              >
                last
              </button>
            </div>
          )}
        </Pagination>
        }

        {find && movie.length === 0 &&
          <p>Não foram encontrados resultados</p>         
        }
        
      </div>
    )
  }
}

export default Home;
