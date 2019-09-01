import imgDefaultDesktop from '../assets/img/imgDefaultDesktop.jpg'

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