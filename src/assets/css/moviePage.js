import styled from 'styled-components';
import { device } from '../../helper/device';

export const Main = styled.div`
  width: 100%;
`;
export const BackButtonBox = styled.div`
  margin-bottom: 20px;
`;
export const ContainerLoading = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
`;
export const MovieTrailer = styled.div`
  width: 100%;
  margin: 40px 0;
  box-sizing: border-box;
  @media ${device.tablet} {
    padding: 0 30px;
  }
`;
export const HasNoTrailer = styled.div`
  text-align: center;
`;
export const ErrorBox = styled.div`
  margin: 50px 0;
  font-size: 20px;
  text-align: center;
`;