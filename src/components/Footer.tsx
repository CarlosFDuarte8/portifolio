import React from "react";
import styled from "styled-components";
import imageOverlay from "../img/earth.jpg";

const FooterSection = styled.section`
  position: relative;
  background-image: url(${imageOverlay});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  padding: ${(props) => props.theme.spacing.xl} 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
`;

const FooterContainer = styled.footer`
  position: relative;
  z-index: 1;
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const CopyrightBox = styled.div`
  padding: ${(props) => props.theme.spacing.md};
  color: ${(props) => props.theme.colors.white};

  p {
    margin: ${(props) => props.theme.spacing.sm} 0;
    font-size: ${(props) => props.theme.fontSizes.medium};
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <Container>
          <CopyrightBox>
            <p>Desenvolvido por mim... </p>
            <p>
              © {new Date().getFullYear()} – Carlos Duarte. Todos os direitos
              reservados
            </p>
          </CopyrightBox>
        </Container>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;