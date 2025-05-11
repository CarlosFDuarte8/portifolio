import React, { Component } from "react";
import styled, { keyframes, css } from "styled-components";
import perfil from '../img/perfil.png';

interface NavbarContainerProps {
  scrolled: boolean;
}

const NavbarContainer = styled.nav<NavbarContainerProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.scrolled ? props.theme.spacing.sm : props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.scrolled ? props.theme.colors.white : props.theme.colors.light};
  box-shadow: ${props => props.scrolled ? props.theme.boxShadow.medium : props.theme.boxShadow.small};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  transition: all ${props => props.theme.transitions.fast};
`;

const Logo = styled.img`
  height: 40px;
  border-radius: 0%;
`;

interface MenuToggleProps {
  isOpen: boolean;
}

const MenuToggle = styled.div<MenuToggleProps>`
  display: none;
  position: relative;
  width: 30px;
  height: 21px;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

interface ToggleBarProps {
  isOpen: boolean;
  position: 'top' | 'middle' | 'bottom';
}

const ToggleBar = styled.span<ToggleBarProps>`
  height: 3px;
  width: 100%;
  background-color: ${props => props.theme.colors.dark};
  border-radius: 2px;
  position: absolute;
  left: 0;
  transition: all 0.3s ease;

  ${props => {
    if (props.position === 'top') {
      return props.isOpen
        ? `transform: rotate(45deg);
           top: 9px;`
        : `top: 0;`;
    }
    if (props.position === 'middle') {
      return props.isOpen
        ? `opacity: 0;
           transform: translateX(-20px);`
        : `top: 9px;
           opacity: 1;`;
    }
    if (props.position === 'bottom') {
      return props.isOpen
        ? `transform: rotate(-45deg);
           top: 9px;`
        : `top: 18px;`;
    }
  }}
`;

interface NavbarCollapseProps {
  isOpen: boolean;
}

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const NavbarCollapse = styled.div<NavbarCollapseProps>`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.light};
    padding: ${props => props.theme.spacing.md};
    box-shadow: ${props => props.theme.boxShadow.medium};
    border-radius: 0 0 10px 10px;
    animation: ${props => props.isOpen ? css`${slideDown} 0.3s ease-in-out forwards` : 'none'};
    z-index: 1000;
  }
`;

const NavbarNav = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    width: 100%;
  }
`;

const NavItem = styled.li`
  margin: 0 ${props => props.theme.spacing.md};
  position: relative;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

interface NavLinkProps {
  active: boolean;
}

const lineAnimation = keyframes`
  0% { width: 0; left: 50%; }
  100% { width: 100%; left: 0; }
`;

const NavLink = styled.a<NavLinkProps>`
  color: ${props => props.active ? props.theme.colors.primary : props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm};
  transition: color ${props => props.theme.transitions.fast};
  position: relative;
  display: inline-block;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${props => props.active ? '0' : '50%'};
    width: ${props => props.active ? '100%' : '0'};
    height: 2px;
    background-color: ${props => props.theme.colors.primary};
    transition: all ${props => props.theme.transitions.fast};
    ${props => props.active && css`animation: ${lineAnimation} 0.3s ease-in-out;`}
  }

  &:hover::after {
    width: 100%;
    left: 0;
  }
`;

interface NavtopState {
  isOpen: boolean;
  scrolled: boolean;
  activeSection: string;
}

class Navtop extends Component<{}, NavtopState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false,
      scrolled: false,
      activeSection: 'home'
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    
    // Configuramos o observer com um pequeno atraso para garantir que 
    // os elementos já estejam renderizados
    setTimeout(this.setupIntersectionObserver, 500);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  setupIntersectionObserver = () => {
    try {
      // Configurando o observador de interseção para monitorar quais seções estão visíveis
      const options = {
        root: null, // viewport
        rootMargin: '-50% 0px', // Ativar quando a seção estiver a 50% visível
        threshold: 0 // Disparar quando qualquer parte estiver visível
      };

      const observer = new IntersectionObserver(this.handleIntersection, options);
      
      // Observando todas as seções
      const sections = Array.from(document.querySelectorAll('section[id], div[id="home"]'));
      
      if (sections.length > 0) {
        sections.forEach(section => {
          observer.observe(section);
        });
      }
    } catch (error) {
      console.error("Erro ao configurar IntersectionObserver:", error);
    }
  };

  handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (id) {
          this.setState({ activeSection: id });
        }
      }
    });
  };

  handleScroll = () => {
    if (window.scrollY > 50) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  handleLinkClick = () => {
    // Fecha o menu quando um link é clicado (especialmente útil em mobile)
    this.setState({ isOpen: false });
  };

  render() {
    const { scrolled, isOpen, activeSection } = this.state;
    
    return (
      <NavbarContainer scrolled={scrolled}>
        <Logo src={perfil} alt="Logo" />
        <MenuToggle onClick={this.toggleMenu} isOpen={isOpen}>
          <ToggleBar position="top" isOpen={isOpen} />
          <ToggleBar position="middle" isOpen={isOpen} />
          <ToggleBar position="bottom" isOpen={isOpen} />
        </MenuToggle>
        <NavbarCollapse isOpen={isOpen}>
          <NavbarNav>
            <NavItem>
              <NavLink href="#home" active={activeSection === 'home'} onClick={this.handleLinkClick}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#about" active={activeSection === 'about'} onClick={this.handleLinkClick}>Sobre</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contact" active={activeSection === 'contact'} onClick={this.handleLinkClick}>Contato</NavLink>
            </NavItem>
          </NavbarNav>
        </NavbarCollapse>
      </NavbarContainer>
    );
  }
}

export default Navtop;