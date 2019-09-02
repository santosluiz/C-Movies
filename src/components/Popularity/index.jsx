import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../../helper/device';
import { handleGetPopularity } from '../../helper/getDataMovie.js';

const CardPopularitySmall = styled.span`
  width: 70px;
  height: 70px;
  background: #116193;
  color: #00e8e4;
  font-size: 25px;
  font-weight: 300;
  border: 5px solid #00e8e4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;  
`
const CardPopularityBig = styled.span`
  width: 120px;
  height: 120px;
  background: #116193;
  color: #00e8e4;
  font-size: 48px;
  font-weight: 300;
  border: 6px solid #00e8e4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;  
  @media ${device.mobileS} {      
    width: 90px;
    height: 90px;
    font-size: 35px;
  }
`

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
