import styled from 'styled-components';
import { device } from '../../helper/device';

export const SearchBox = styled.div`
  @media ${device.tablet}{
    padding: 0 30px;
  }
`
export const SearchBar = styled.input.attrs({
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
export const ContainerLoading = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 150px;
`
export const ErrorBox = styled.div`
  margin: 50px 0;
  font-size: 20px;
  text-align: center;
`
export const PaginationBox = styled.div`
  width: 100%;
  text-align: center;
`

export const PaginationDot = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: #116193;
  font-size: 28px;
  padding: 0 12px
`

export const PaginationItem = styled.button`
  font-family: 'Lato', sans-serif;
  cursor: pointer;
  background: none;
  border: none;
  color: #116193;
  font-size: 18px;
  padding: 0 12px;
  :focus{
    outline: none;
  }
`