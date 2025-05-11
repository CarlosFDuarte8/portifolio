import React, { Component } from "react";
import styled from "styled-components";
import perfil from '../img/perfil.png';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.light};
  box-shadow: ${props => props.theme.boxShadow.small};
`;

const Logo = styled.img`
  height: 40px;
  border-radius: 50%;
`;

const MenuToggle = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: block;
  }
`;

interface NavbarCollapseProps {
  isOpen: boolean;
}

const NavbarCollapse = styled.div<NavbarCollapseProps>`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 80px;
    left: 0;
    background-color: ${props => props.theme.colors.light};
    padding: ${props => props.theme.spacing.md};
    box-shadow: ${props => props.theme.boxShadow.small};
  }
`;

const ToggleBar = styled.span`
  height: 3px;
  width: 100%;
  background-color: #333;
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

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    margin: ${props => props.theme.spacing.sm} 0;
  }
`;

const NavLink = styled.a`
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  font-weight: 500;
  padding: ${props => props.theme.spacing.sm};
  transition: color ${props => props.theme.transitions.fast};

  &:hover {
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    color: ${props => props.theme.colors.primary};
  }
`;

interface NavtopState {
  isOpen: boolean;
}

class Navtop extends Component<{}, NavtopState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    return (
      <NavbarContainer>
        <Logo src={perfil} alt="Logo" />
        <MenuToggle onClick={this.toggleMenu}>
          <ToggleBar />
          <ToggleBar />
          <ToggleBar />
        </MenuToggle>
        <NavbarCollapse isOpen={this.state.isOpen}>
          <NavbarNav>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#about">Sobre</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#contact">Contato</NavLink>
            </NavItem>
          </NavbarNav>
        </NavbarCollapse>
      </NavbarContainer>
    );
  }
}

export default Navtop;