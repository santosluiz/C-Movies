import React from 'react';

export const TrailerMovieContent = (props) => {
  return(
    <div>
      <h3>Assista ao trailer:</h3>
      <iframe
        title="Trailer"
        style={{width: '100%', height: '600px'}}
        width="560"
        height="315"
        src={props.trailerUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  )
}