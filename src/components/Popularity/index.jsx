import React, { Component } from 'react';
import styled from 'styled-components';
import { device } from '../../helper/device';
import { handleGetPopularity } from '../../helper/getDataMovie.js';

const CardPopularitySmall = styled.span`
  width: 60px;
  height: 60px;
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
  box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -moz-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -webkit-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -o-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
`
const CardPopularityBig = styled.span`
  width: 90px;
  height: 90px;
  background: #116193;
  color: #00e8e4;
  font-size: 35px;
  font-weight: 300;
  border: 6px solid #00e8e4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;  
  box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -moz-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -webkit-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  -o-box-shadow: 0px 0px 0px 5px rgb(17, 97, 147);
  @media ${device.mobileS} {      
    width: 78px;
    height: 78px;
    font-size: 29px;
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
