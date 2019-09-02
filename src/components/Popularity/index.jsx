import React, { Component } from 'react';
import { handleGetPopularity } from '../../helper/getDataMovie.js';
import { CardPopularitySmall, CardPopularityBig } from '../../assets/css/popularity';

export class Popularity extends Component{
  render(){
    return(
      <div>
        {this.props.size === "small" &&
          <CardPopularitySmall>{handleGetPopularity(this.props.content)}</CardPopularitySmall>
        }

        {this.props.size === "big" &&
          <CardPopularityBig>{handleGetPopularity(this.props.content)}</CardPopularityBig>
        }
      </div>
    )
  }
}
