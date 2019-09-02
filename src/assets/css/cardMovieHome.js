import styled from 'styled-components';
import { device } from '../../helper/device';

export const CardMovie = styled.div`
  width: 100%;
  display: flex;
  margin: 60px 0;
  -webkit-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  transition: 0.4s all;
  :hover{
    transform: translateY(-4px);
  }

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    box-shadow: none;
  }
`;
export const MovieImage = styled.div`
  width: 250px;
`;
export const CardContent = styled.div`
  width: calc(100% - 250px);
  position: relative;
  background: #ebebeb;
  @media ${device.tablet} {
    width: 100%;
    -webkit-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
    box-shadow: 0px 5px 30px -17px rgba(0,0,0,0.75);
  }
`;
export const CardTopBar = styled.div`
  width: 100%;
  height: 95px;
  background: #116193;
  position: relative;
`;
export const CardH1 = styled.h1`
  position: absolute;
  bottom: 3px;
  margin: 0 0 0 100px;
  font-size: 35px;
  font-weight: 300;
  color: #00e8e4;
`;
export const CardBoxPopularity = styled.div`
  position: absolute;
  top: 50px;
  left: 14px;
`;
export const CardDate = styled.p`
  margin: 0 0 0 100px;
  padding-top: 4px;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  font-weight: 300;
`;
export const CardDescription = styled.div`
  margin: 35px 20px;
  font-family: 'Lato',sans-serif;
  font-weight: 400;
  @media ${device.tablet}{
    margin: 30px 30px 45px 30px;
    text-align: justify;
  }
}
`;
export const CardReadMore = styled.div`
  font-family: 'Lato',sans-serif;
  position: absolute;
  bottom: 0;
  right: 20px;
  @media ${device.tablet}{
    bottom: -2px;
  }
`;