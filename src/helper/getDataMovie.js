import imgDefaultDesktop from '../assets/img/imgDefaultDesktop.jpg'
import { countries } from './countriesArray.js'

export const handleGetImageCard = (urlImage, pathImage) => {
  let path = ""
  
  if(pathImage){
    path = urlImage + pathImage
  } else {
    path = imgDefaultDesktop
  }
  return path
}

export const handleConvertDate = (date) => {
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

export const handleTranslateArray = (language) => {    
  let langMovie = "--"
  
  countries.map(item => {
    if(item.iso_639_1 === language){
      langMovie = item.portugues_name
      
    }
  })

  return langMovie  
}
