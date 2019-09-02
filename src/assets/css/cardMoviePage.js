import styled from 'styled-components';
import { device } from '../../helper/device';

export const MovieBox = styled.div`
  background: #f2f2f2;
  @media ${device.tablet} {
    background: #fff;
  }
`
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 30px 5px 30px;
  background: #e6e6e6;
  box-sizing: border-box;
  @media ${device.tablet}{
    flex-direction: column;
    text-align: center;
  }
`
export const TitleH1 = styled.h1`
  font-weight: 600;
  margin: 0;
  color: #196696;
`
export const Date = styled.span`
  font-size: 20px;
  color: #b4b4b4;
`
export const MovieData = styled.div`
  width: 100%;
  display: flex;
  @media ${device.tablet} {
    flex-direction: column-reverse;
  }
`
export const MovieContent = styled.div`
  padding: 10px 30px;
  box-sizing: border-box;
  width: calc(100% - 400px);
  @media ${device.tablet} {
    width: 100%;
    background: #f2f2f2;
    position: relative;
  }
`
export const MovieImageBox = styled.div`
  width: 400px;
  position: relative;
  @media ${device.tablet} {
    margin: 15px auto;
    width: 300px;
  }
`
export const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  @media ${device.tablet} {
    -webkit-box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
    box-shadow: 4px 9px 26px -13px rgba(0,0,0,0.75);
  }
`
export const MovieH2 = styled.h2`
  color: #4885aa;
  font-weight: 500;
  font-size: 29px;
  margin: 10px 0 0 0;
`
export const MovieH3 = styled.h3`
  color: #4885aa;
  @media ${device.tablet} {
    font-size: 22px;
    margin: 0 0 5px 0;
  }
`
export const MovieInfoContent = styled.p`
  @media ${device.tablet} {
    font-size: 18px;
    margin: 0;
  }
`
export const HR = styled.hr`
  width: 100%;
  height: 2px;
  border: none;
  background: #79edeb;
`
export const SynopsisText = styled.p`
  @media ${device.tablet} {
    font-size: 20px;
  }
`
export const MovieInfo = styled.div`
  display: flex;
  justify-content: space-around;
  @media ${device.tablet} {
    flex-direction: column;
  }
`
export const MovieInfoItem = styled.div`
  margin: 16px 0;
  text-align: center;
`
export const MovieCategorie = styled.div`
  width: 100%;
  display: flex;
  margin: 22px 0;
  @media ${device.tablet} {
    flex-wrap: wrap;
  }
`
export const MovieCategorieItem = styled.span`
  background: #fff;
  padding: 3px 10px;
  border-radius: 45px;
  border: 1px solid #5d92b5;
  margin-right: 5px;
  color: #5d92b5;
  font-weight: 500;
  text-align: center;
  @media ${device.tablet} {
    font-size: 20px;
    margin: 0px 8px 8px 0px;
  }
`
export const PopularityBox = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 15px;
  left: -150px;
  @media ${device.tablet} {
    position: absolute;
    left: 0;
    right: -22px;
    bottom: -33px;
  }
  @media ${device.mobileS} {
    right: -2px;
  }
`