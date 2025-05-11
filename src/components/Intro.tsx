import React from "react";
import styled, { keyframes } from "styled-components";
import Typed from "react-typed";

// Animações para as estrelas
// Removing the unused animation
const animateTwinkle = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 0.2; }
  100% { opacity: 0.8; }
`;

// Componentes estilizados
const IntroContainer = styled.div`
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, rgb(135, 139, 100) 0%, rgb(23, 54, 209) 100%);
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* Adicionando espaço para a navbar fixa */
`;

// Fixed box-shadow with proper TypeScript typing
const Stars = styled.div`
  width: 2px;
  height: 2px;
  background: ${props => props.theme.colors.white};
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.circle};
  box-shadow: 
    ${[...Array(100)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2;
      return `${x}vw ${y}vh ${size}px ${size}px #ffffff`;
    }).join(',')};
  animation: ${animateTwinkle} ${props => Math.random() * 3 + 3}s infinite;
`;

// Fixed box-shadow with proper TypeScript typing
const Stars2 = styled.div`
  width: 3px;
  height: 3px;
  background: ${props => props.theme.colors.white};
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.circle};
  box-shadow: 
    ${[...Array(50)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2;
      return `${x}vw ${y}vh ${size}px ${size}px #ffffff`;
    }).join(',')};
  animation: ${animateTwinkle} ${props => Math.random() * 4 + 4}s infinite;
`;

// Fixed box-shadow with proper TypeScript typing
const Stars3 = styled.div`
  width: 4px;
  height: 4px;
  background: ${props => props.theme.colors.white};
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.circle};
  box-shadow: 
    ${[...Array(25)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 3;
      return `${x}vw ${y}vh ${size}px ${size}px #ffffff`;
    }).join(',')};
  animation: ${animateTwinkle} ${props => Math.random() * 5 + 5}s infinite;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 1;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
`;

const IntroTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.hero};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.lg};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xxlarge};
  }
`;

const IntroSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.xlarge};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  .text-slider {
    font-weight: 600;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.large};
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltip = styled.span`
  visibility: hidden;
  width: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: ${props => props.theme.colors.white};
  text-align: center;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: ${props => props.theme.fontSizes.small};
  white-space: nowrap;
  
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  }
`;

const Button = styled.a`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.medium};
  text-decoration: none;
  font-weight: 600;
  transition: all ${props => props.theme.transitions.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.boxShadow.large};
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.boxShadow.medium};
  }
`;

class Intro extends React.Component {
  render() {
    return (
      <IntroContainer id="home">
        <Stars />
        <Stars2 />
        <Stars3 />
        <ContentContainer>
          <IntroTitle>Carlos Ferreira Duarte</IntroTitle>
          <IntroSubtitle>
            <strong className="text-slider">
              <Typed
                strings={[
                  "Front End Developer",
                  "Back End Developer"
                ]}
                typeSpeed={80}
                backDelay={1100}
                backSpeed={30}
                loop
              />
            </strong>
          </IntroSubtitle>
          <ButtonWrapper>
            <Button href="#about">Sobre</Button>
            <Tooltip className="tooltip">Saiba mais sobre mim</Tooltip>
          </ButtonWrapper>
        </ContentContainer>
      </IntroContainer>
    );
  }
}

export default Intro;
