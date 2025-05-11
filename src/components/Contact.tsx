import React from "react";
import styled from "styled-components";
import imageOverlay from "../img/earth.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

// Componentes estilizados
const ContactSection = styled.section`
  position: relative;
  padding-top: calc(${props => props.theme.spacing.xxl} + 80px); /* Adicionando espaço extra para a navbar fixa */
  padding-bottom: ${props => props.theme.spacing.xxl};
  background-image: url(${imageOverlay});
  background-size: cover;
  background-attachment: fixed;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ContentBox = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.boxShadow.medium};
  padding: ${props => props.theme.spacing.xl};
`;

const FlexRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const Column = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md} 0;
  }
`;

const Title = styled.h5`
  font-size: ${props => props.theme.fontSizes.xlarge};
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
  padding-bottom: ${props => props.theme.spacing.sm};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: 600;
  cursor: pointer;
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

const LeadText = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.xl};

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SocialItem = styled.li`
  margin-right: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const IconCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: ${props => props.theme.borderRadius.circle};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xlarge};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: scale(1.1);
  }
`;

class Contact extends React.Component {
  render() {
    return (
      <ContactSection id="contact">
        <Container>
          <ContentBox>
            <FlexRow>
              <Column>
                <Title>Preencha o formulário</Title>
                <Form action="https://formspree.io/f/mpzovejy" method="POST">
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Seu nome"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Seu e-mail"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Assunto"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextArea
                      name="message"
                      placeholder="Mensagem"
                      required
                    ></TextArea>
                  </FormGroup>
                  <FormGroup>
                    <SubmitButton type="submit">
                      Enviar Mensagem
                    </SubmitButton>
                  </FormGroup>
                </Form>
              </Column>
              <Column>
                <Title>Entrar em contato</Title>
                <LeadText>
                  Deixe seu recado, ou mande um e-mail:{" "}
                  <a href="mailto:carlosf.duarte8@gmail.com">
                    carlosf.duarte8@gmail.com
                  </a>
                  .
                  <br />
                  Basta preencher o formulário ou enviar-me um e-mail.
                </LeadText>
                <SocialLinks>
                  <SocialItem>
                    <SocialLink
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconCircle>
                        <FontAwesomeIcon icon={faGithub} />
                      </IconCircle>
                    </SocialLink>
                  </SocialItem>
                  <SocialItem>
                    <SocialLink
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconCircle>
                        <FontAwesomeIcon icon={faLinkedin} />
                      </IconCircle>
                    </SocialLink>
                  </SocialItem>
                  <SocialItem>
                    <SocialLink
                      href="mailto:carlosf.duarte8@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconCircle>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconCircle>
                    </SocialLink>
                  </SocialItem>
                </SocialLinks>
              </Column>
            </FlexRow>
          </ContentBox>
        </Container>
      </ContactSection>
    );
  }
}

export default Contact;
