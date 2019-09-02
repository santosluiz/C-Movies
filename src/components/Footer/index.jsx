import React from "react";
import styled from 'styled-components';
import '../../assets/css/navLink.css';

const FooterBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2rem;
  font-size: 13px;
  background: #ebebebe0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Footer = () => (
  <FooterBox>
    <p>Made with <span style={{color:'#e25555'}}>❤ </span> by Luiz Santos</p>
  </FooterBox>
);

export default Footer;