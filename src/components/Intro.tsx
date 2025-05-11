import React, { useEffect, useState } from "react";
import styled, { keyframes, css, createGlobalStyle } from "styled-components"; // Adicionando createGlobalStyle
import Typed from "react-typed";
import { useTranslation } from 'react-i18next'; // Importando hook de tradução

// Animações para os elementos
const animateTwinkle = keyframes`
  0% { opacity: 0.8; }
  50% { opacity: 0.2; }
  100% { opacity: 0.8; }
`;

const animateTwinkleFast = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

const moveBackground = keyframes`
  from { transform: translate(0, 0); }
  to { transform: translate(-10%, -10%); }
`;

const rotateGalaxy = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const shootingStar = keyframes`
  0% {
    transform: translateX(0) translateY(0) rotate(315deg);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translateX(500px) translateY(500px) rotate(315deg);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.3; }
  100% { opacity: 0.1; }
`;

const floatObject = keyframes`
  0% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(2deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(10px) rotate(-2deg); }
  100% { transform: translateY(0) rotate(0deg); }
`;

const pulseScale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// Cometa atravessando a tela diagonalmente - direção personalizada
const cometMove = (startX: string, startY: string, endX: string, endY: string) => keyframes`
  0% {
    top: ${startY};
    left: ${startX};
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    top: ${endY};
    left: ${endX};
    opacity: 0;
  }
`;

const orbitAroundCenter = keyframes`
  0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
`;

// Keyframe para explosão de supernova
const supernovaExplosion = keyframes`
  0% {
    transform: scale(1);
    opacity: 0;
    box-shadow: 0 0 0px 0px rgba(255, 255, 255, 0);
    filter: blur(0px);
  }
  1% {
    opacity: 1;
  }
  10% {
    transform: scale(50);
    opacity: 0.8;
    box-shadow: 0 0 30px 15px rgba(255, 206, 135, 0.6);
    filter: blur(2px);
  }
  20% {
    transform: scale(100);
    opacity: 0.4;
  }
  40% {
    transform: scale(150);
    opacity: 0.2;
    box-shadow: 0 0 40px 20px rgba(255, 170, 59, 0.3);
    filter: blur(4px);
  }
  100% {
    transform: scale(200);
    opacity: 0;
    box-shadow: 0 0 50px 25px rgba(255, 170, 59, 0);
    filter: blur(6px);
  }
`;

// Interfaces para os componentes estilizados personalizados
interface NebulaProps {
  top?: string;
  left?: string;
  scale?: number;
  duration?: string;
  color?: string;
}

interface GalaxyProps {
  top?: string;
  right?: string;
  left?: string;
  scale?: number;
  rotationDuration?: string;
  rotationDirection?: string;
}

interface ShootingStarProps {
  top?: string;
  left?: string;
  duration?: string;
  delay?: string;
  direction?: string;
}

interface PlanetProps {
  size?: string;
  orbitDuration?: string;
  delay?: string;
  color?: string;
  distance?: string;
}

interface CometProps {
  duration?: string;
  delay?: string;
  startX?: string;
  startY?: string;
  endX?: string;
  endY?: string;
  color?: string;
  size?: string;
  tailLength?: string;
}

interface SupernovaProps {
  top?: string;
  left?: string;
  delay?: string;
}

interface ButtonProps {
  primary?: boolean;
}

// Componentes estilizados
const IntroContainer = styled.div`
  overflow: hidden;
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px; /* Espaço para a navbar fixa */
  
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(125deg, rgba(6, 11, 40, 0.4) 10%, rgba(16, 15, 72, 0.2) 100%);
    z-index: 0;
  }
`;

// Componente de fundo para as estrelas que se movem lentamente
const MovingStarBackground = styled.div`
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background-image: 
    radial-gradient(2px 2px at 20px 30px, #cccccc, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 40px 70px, #f7f7f7, rgba(0,0,0,0)),
    radial-gradient(3px 3px at 300px 150px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 400px 200px, #e6e6e6, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 500px 300px, #f7f7f7, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 50px 180px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 150px 400px, #dddddd, rgba(0,0,0,0)),
    radial-gradient(1px 1px at 250px 500px, #ffffff, rgba(0,0,0,0)),
    radial-gradient(3px 3px at 550px 100px, #f7f7f7, rgba(0,0,0,0)),
    radial-gradient(2px 2px at 650px 350px, #dddddd, rgba(0,0,0,0));
  background-repeat: repeat;
  background-size: 750px 750px;
  animation: ${moveBackground} 120s linear infinite;
  opacity: 0.6;
  z-index: 1;
`;

// Estrelas de diferentes tamanhos com animação de brilho
const Stars = styled.div`
  width: 2px;
  height: 2px;
  background: ${props => props.theme.colors.white};
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.circle};
  box-shadow: 
    ${[...Array(200)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2;
      return `${x}vw ${y}vh ${size}px ${size}px #ffffff`;
    }).join(',')};
  animation: ${animateTwinkle} ${props => Math.random() * 5 + 3}s infinite;
  z-index: 1;
`;

// Estrelas mais brilhantes e maiores
const BrightStars = styled.div`
  width: 3px;
  height: 3px;
  background: ${props => props.theme.colors.white};
  position: absolute;
  border-radius: ${props => props.theme.borderRadius.circle};
  box-shadow: 
    ${[...Array(70)].map(() => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      return `${x}vw ${y}vh ${size}px ${size}px rgba(255, 255, 255, 0.8)`;
    }).join(',')};
  animation: ${animateTwinkleFast} ${props => Math.random() * 3 + 2}s infinite;
  z-index: 1;
`;

// Fundo distante com efeito de poeira espacial
const DistantStarDust = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(63, 81, 181, 0.1) 0%, rgba(0, 0, 0, 0) 50%),
    radial-gradient(circle at 80% 40%, rgba(156, 39, 176, 0.08) 0%, rgba(0, 0, 0, 0) 60%),
    radial-gradient(circle at 40% 80%, rgba(233, 30, 99, 0.08) 0%, rgba(0, 0, 0, 0) 40%);
  opacity: 0.5;
  z-index: 1;
  filter: blur(30px);
`;

// Criando nebulosas coloridas
const Nebula = styled.div<NebulaProps>`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 40%, 
    ${props => props.color || 'rgba(255, 0, 128, 0.2)'},
    ${props => props.color ? `${props.color.replace('0.2', '0.1')}` : 'rgba(96, 0, 255, 0.1)'} 30%,
    rgba(0, 0, 0, 0) 70%
  );
  filter: blur(15px);
  top: ${props => props.top || '30%'};
  left: ${props => props.left || '20%'};
  opacity: 0.6;
  animation: ${pulseGlow} ${props => props.duration || '15s'} infinite ease-in-out;
  transform: scale(${props => props.scale || 1});
  z-index: 1;
`;

// Componente de galáxia
const Galaxy = styled.div<GalaxyProps>`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(ellipse at center, 
    rgba(255, 255, 255, 0.15) 0%, 
    rgba(67, 137, 255, 0.1) 30%, 
    rgba(35, 7, 77, 0.05) 60%, 
    rgba(0, 0, 0, 0) 70%
  );
  border-radius: 50%;
  top: ${props => props.top || '60%'};
  right: ${props => props.right || 'auto'};
  left: ${props => props.left || 'auto'};
  transform: scale(${props => props.scale || 1});
  filter: blur(5px);
  opacity: 0.7;
  animation: ${rotateGalaxy} ${props => props.rotationDuration || '200s'} linear infinite;
  animation-direction: ${props => props.rotationDirection || 'normal'};
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    width: 140%;
    height: 50%;
    background: radial-gradient(ellipse at center, 
      rgba(255, 255, 255, 0.05) 0%, 
      rgba(67, 137, 255, 0.05) 30%, 
      rgba(0, 0, 0, 0) 60%
    );
    border-radius: 50%;
    top: 25%;
    left: -20%;
    transform: rotate(30deg);
  }
`;

// Estrela cadente
const ShootingStar = styled.div<ShootingStarProps>`
  position: absolute;
  width: 150px;
  height: 1px;
  transform-origin: left;
  background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.4), #ffffff);
  top: ${props => props.top || '20%'};
  left: ${props => props.left || '30%'};
  transform: ${props => props.direction ? `rotate(${props.direction})` : 'rotate(315deg)'};
  animation: ${shootingStar} ${props => props.duration || '8s'} ${props => props.delay || '0s'} infinite linear;
  z-index: 1;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 15px;
    height: 1px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), #ffffff);
    border-radius: 50%;
    filter: blur(1px);
  }
`;

// Cometa com cauda - versão melhorada com trajetória personalizada
const CometElement = styled.div<CometProps>`
  position: absolute;
  width: ${props => props.tailLength || '300px'};
  height: ${props => props.size || '2px'};
  background: linear-gradient(to right, 
    rgba(0, 0, 0, 0), 
    ${props => props.color ? `${props.color.replace('1', '0.5')}` : 'rgba(60, 170, 255, 0.5)'}, 
    ${props => props.color || 'rgba(120, 200, 255, 1)'}
  );
  border-radius: 50%;
  filter: blur(1px);
  z-index: 1;
  animation: ${props => css`${cometMove(
    props.startX || '-5%', 
    props.startY || '10%', 
    props.endX || '105%', 
    props.endY || '60%'
  )} ${props.duration || '15s'} ${props.delay || '0s'} infinite ease-out`};
  
  &:after {
    content: '';
    position: absolute;
    top: -1px;
    right: 0;
    width: ${props => `calc(${props.size || '2px'} * 4)`};
    height: ${props => `calc(${props.size || '2px'} * 2)`};
    background: ${props => props.color || 'rgba(255, 255, 255, 0.8)'};
    border-radius: 50%;
    box-shadow: 0 0 10px 4px ${props => props.color ? `${props.color.replace('1', '0.6')}` : 'rgba(120, 220, 255, 0.6)'};
  }
`;

// Supernova ocasional - agora com a animação aplicada diretamente no styled-component
const Supernova = styled.div<SupernovaProps & { isActive?: boolean }>`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  top: ${props => props.top || '40%'};
  left: ${props => props.left || '60%'};
  opacity: 0;
  filter: blur(0px);
  z-index: 2;
  box-shadow: 0 0 0px 0px rgba(255, 255, 255, 0);
  animation: ${props => props.isActive ? css`${supernovaExplosion} 5s forwards` : 'none'};
`;

// Sistema solar decorativo
const SolarSystem = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 70%;
  left: 5%;
  z-index: 1;
`;

const Sun = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ffcf40 0%, #ff8e0f 70%);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(255, 207, 64, 0.7);
  
  &:after {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255, 207, 64, 0.3) 0%, rgba(255, 142, 15, 0) 70%);
    filter: blur(5px);
    animation: ${pulseGlow} 5s infinite;
  }
`;

const Planet = styled.div<PlanetProps>`
  position: absolute;
  width: ${props => props.size || '8px'};
  height: ${props => props.size || '8px'};
  border-radius: 50%;
  background: ${props => props.color || '#3498db'};
  left: 50%;
  top: 50%;
  transform-origin: center;
  animation: ${orbitAroundCenter} ${props => props.orbitDuration || '15s'} linear infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:before {
    content: '';
    position: absolute;
    width: ${props => `calc(${props.distance || '60px'} * 2)`};
    height: ${props => `calc(${props.distance || '60px'} * 2)`};
    border: 1px dashed rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

// Anel de asteroides
const AsteroidBelt = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 3px solid rgba(255, 255, 255, 0.03);
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border: 1px dotted rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
  
  &:before {
    transform: rotate(30deg) scale(0.95);
  }
  
  &:after {
    transform: rotate(-30deg) scale(1.05);
  }
`;

// Elementos flutuantes
const FloatingObject = styled.div<{ top?: string; left?: string; duration?: string; size?: string; color?: string; }>`
  position: absolute;
  width: ${props => props.size || '10px'};
  height: ${props => props.size || '10px'};
  background: ${props => props.color || 'rgba(255, 255, 255, 0.5)'};
  border-radius: 50%;
  top: ${props => props.top || '30%'};
  left: ${props => props.left || '40%'};
  filter: blur(3px);
  animation: ${floatObject} ${props => props.duration || '6s'} ease-in-out infinite;
  z-index: 1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 2;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`;

const TextContent = styled.div`
  animation: ${fadeIn} 1s ease-out forwards;
  backdrop-filter: blur(3px);
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
`;

const IntroTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  font-weight: 700;
  margin-bottom: ${props => props.theme.spacing.md};
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
  background: linear-gradient(to right, #ffffff, #a1c4fd);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.hero};
  }
`;

const IntroSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: ${props => props.theme.spacing.xl};
  
  .text-slider {
    font-weight: 600;
    position: relative;
    display: inline-block;
    color: #61dafb;
    text-shadow: 0 0 10px rgba(97, 218, 251, 0.5);
  }
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.fontSizes.xlarge};
  }
`;

const IntroDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 600px;
  opacity: 0.9;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
  
  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    justify-content: flex-start;
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

const Button = styled.a<ButtonProps>`
  display: inline-block;
  background-color: transparent;
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.large};
  text-decoration: none;
  font-weight: 600;
  transition: all ${props => props.theme.transitions.medium};
  position: relative;
  overflow: hidden;
  z-index: 1;
  border: 2px solid ${props => props.primary ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.3)'};
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: ${props => props.primary ? props.theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
    transition: all 0.3s;
    z-index: -1;
  }
  
  &:hover {
    color: ${props => props.theme.colors.white};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.boxShadow.large};
    
    &:before {
      width: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.boxShadow.medium};
  }
`;

const PrimaryButton = styled(Button)`
  background-color: ${props => props.theme.colors.primary};
  
  &:hover {
    background-color: transparent;
  }
`;

const Intro = () => {
  const { t } = useTranslation(); // Hook de tradução
  
  // Estado para controlar animações e efeitos especiais
  const [shootingStar1Visible, setShootingStar1Visible] = useState(true);
  const [shootingStar2Visible, setShootingStar2Visible] = useState(false);
  const [supernovaActive, setSupernovaActive] = useState(false);
  const [supernovaPosition, setSupernovaPosition] = useState({ top: '30%', left: '40%' });

  // Alternar a visibilidade das estrelas cadentes para dar um efeito mais realista
  useEffect(() => {
    const shootingStarInterval = setInterval(() => {
      setShootingStar1Visible(prev => !prev);
      setShootingStar2Visible(prev => !prev);
    }, 12000);
    
    // Criar uma supernova ocasional
    const supernovaInterval = setInterval(() => {
      // Posição aleatória para a supernova
      const top = `${Math.random() * 70 + 10}%`;
      const left = `${Math.random() * 70 + 10}%`;
      setSupernovaPosition({ top, left });
      
      // Ativar a supernova
      setSupernovaActive(true);
      
      // Desativar após a animação
      setTimeout(() => {
        setSupernovaActive(false);
      }, 5000);
    }, 30000);
    
    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(supernovaInterval);
    };
  }, []);

  return (
    <IntroContainer id="home">
      <MovingStarBackground />
      <DistantStarDust />
      <Stars />
      <BrightStars />
      
      {/* Nebulosas coloridas em diferentes posições */}
      <Nebula top="15%" left="10%" scale={2} duration="17s" color="rgba(255, 0, 128, 0.2)" />
      <Nebula top="65%" left="75%" scale={1.5} duration="25s" color="rgba(0, 100, 255, 0.2)" />
      <Nebula top="40%" left="60%" scale={1} duration="20s" color="rgba(180, 0, 255, 0.2)" />
      <Nebula top="25%" left="35%" scale={1.3} duration="22s" color="rgba(0, 200, 100, 0.2)" />
      
      {/* Galáxias espirais */}
      <Galaxy top="70%" right="15%" rotationDuration="180s" />
      <Galaxy top="20%" right="65%" scale={0.8} rotationDuration="220s" rotationDirection="reverse" />
      <Galaxy top="45%" left="15%" scale={0.6} rotationDuration="150s" />
      
      {/* Cometas atravessando a tela em diferentes trajetórias */}
      <CometElement 
        startX="-5%" 
        startY="10%" 
        endX="105%" 
        endY="60%" 
        duration="20s" 
        color="rgba(120, 200, 255, 1)" 
        size="2px"
        tailLength="300px"
      />
      <CometElement 
        startX="105%" 
        startY="25%" 
        endX="-5%" 
        endY="85%" 
        duration="25s" 
        delay="12s" 
        color="rgba(255, 160, 220, 1)" 
        size="3px"
        tailLength="280px"
      />
      <CometElement 
        startX="30%" 
        startY="-5%" 
        endX="70%" 
        endY="105%" 
        duration="15s" 
        delay="8s" 
        color="rgba(100, 255, 180, 1)" 
        size="1.5px"
        tailLength="250px"
      />
      
      {/* Estrelas cadentes condicionais */}
      {shootingStar1Visible && (
        <>
          <ShootingStar top="15%" left="10%" duration="6s" delay="3s" direction="315deg" />
          <ShootingStar top="70%" left="70%" duration="7s" delay="10s" direction="335deg" />
        </>
      )}
      
      {shootingStar2Visible && (
        <>
          <ShootingStar top="50%" left="40%" duration="8s" delay="6s" direction="295deg" />
          <ShootingStar top="30%" left="60%" duration="5s" delay="2s" direction="325deg" />
        </>
      )}
      
      {/* Supernova ocasional - corrigida */}
      {supernovaActive && (
        <Supernova 
          top={supernovaPosition.top} 
          left={supernovaPosition.left} 
          isActive={true}
        />
      )}
      
      {/* Sistema solar decorativo */}
      <SolarSystem>
        <Sun />
        <Planet size="6px" orbitDuration="10s" color="#3498db" distance="40px" />
        <Planet size="8px" orbitDuration="15s" color="#e74c3c" distance="60px" delay="2s" />
        <Planet size="5px" orbitDuration="20s" color="#2ecc71" distance="80px" delay="5s" />
        <Planet size="10px" orbitDuration="25s" color="#f39c12" distance="100px" delay="8s" />
        <AsteroidBelt />
      </SolarSystem>
      
      {/* Elementos flutuantes */}
      <FloatingObject top="20%" left="20%" duration="7s" size="6px" color="rgba(255, 255, 255, 0.7)" />
      <FloatingObject top="50%" left="80%" duration="9s" size="8px" color="rgba(200, 200, 255, 0.7)" />
      <FloatingObject top="70%" left="40%" duration="11s" size="5px" color="rgba(255, 200, 200, 0.7)" />
      
      <ContentContainer>
        <TextContent>
          <IntroTitle>Carlos Ferreira Duarte</IntroTitle>
          <IntroSubtitle>
            <strong className="text-slider">
              <Typed
                strings={[
                  t('intro.title'),
                  "Desenvolvedor Front End",
                  "Desenvolvedor Back End",
                  "Desenvolvedor Full Stack"
                ]}
                typeSpeed={80}
                backDelay={1100}
                backSpeed={30}
                loop
              />
            </strong>
          </IntroSubtitle>
          <IntroDescription>
            {t('intro.description')}
          </IntroDescription>
          <ButtonsContainer>
            <ButtonWrapper>
              <PrimaryButton href="#about" primary>{t('nav.about')}</PrimaryButton>
              <Tooltip className="tooltip">Conheça minha trajetória</Tooltip>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button href="#contact">{t('nav.contact')}</Button>
              <Tooltip className="tooltip">Vamos conversar!</Tooltip>
            </ButtonWrapper>
          </ButtonsContainer>
        </TextContent>
      </ContentContainer>
    </IntroContainer>
  );
};

export default Intro;
