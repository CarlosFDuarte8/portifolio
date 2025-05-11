import React, { useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import imageOverlay from "../img/earth.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faCheckCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${props => props.theme.boxShadow.large};
    transform: translateY(-5px);
  }
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
  color: ${props => props.theme.colors.primaryDark};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100px;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 1px solid #ced4da;
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.fontSizes.medium};
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: ${props => props.theme.boxShadow.large};
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.boxShadow.medium};
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const LeadText = styled.p`
  font-size: ${props => props.theme.fontSizes.large};
  line-height: 1.8;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: #495057;

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    position: relative;
    font-weight: 500;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: ${props => props.theme.colors.primary};
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }
`;

const SocialLinks = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
`;

const SocialItem = styled.li`
  margin-right: ${props => props.theme.spacing.md};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const SocialLink = styled.a`
  display: inline-block;
  text-decoration: none;
`;

const SocialLabel = styled.span`
  display: block;
  text-align: center;
  margin-top: 5px;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.gray};
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease;
`;

const SocialItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover ${SocialLabel} {
    visibility: visible;
    opacity: 1;
    transform: translateY(3px);
  }
`;

const IconCircle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${props => props.theme.borderRadius.circle};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.xlarge};
  transition: all ${props => props.theme.transitions.medium};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: scale(1.1) translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.small};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  animation: fadeIn 0.5s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: ${props => props.theme.spacing.sm} 0;
  
  svg {
    color: ${props => props.theme.colors.primary};
  }
`;

const Contact = () => {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null as string | null }
  });
  
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleServerResponse = (ok: boolean, msg: string) => {
    if (ok) {
      setFormStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg }
      });
      setInputs({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setFormStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg }
      });
    }
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputs(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(prevStatus => ({ ...prevStatus, submitting: true }));
    
    const formData = new FormData();
    Object.entries(inputs).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    fetch('https://formspree.io/f/mpzovejy', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(response => {
        handleServerResponse(true, 'Obrigado pela sua mensagem! Entrarei em contato em breve.');
      })
      .catch(error => {
        handleServerResponse(false, error.message);
      });
  };

  return (
    <ContactSection id="contact">
      <Container>
        <ContentBox>
          <FlexRow>
            <Column>
              <Title>Entre em contato</Title>
              {formStatus.submitted ? (
                <SuccessMessage>
                  <FontAwesomeIcon icon={faCheckCircle} />
                  Mensagem enviada com sucesso! Obrigado pelo contato.
                </SuccessMessage>
              ) : (
                <Form onSubmit={handleSubmit}>
                  {formStatus.info.error && (
                    <div style={{ color: "red", marginBottom: "15px" }}>
                      {formStatus.info.msg}
                    </div>
                  )}
                  <FormGroup>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Seu nome"
                      required
                      value={inputs.name}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Seu e-mail"
                      required
                      value={inputs.email}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="text"
                      name="subject"
                      id="subject"
                      placeholder="Assunto"
                      required
                      value={inputs.subject}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <TextArea
                      name="message"
                      id="message"
                      placeholder="Sua mensagem"
                      required
                      value={inputs.message}
                      onChange={handleChange}
                    ></TextArea>
                  </FormGroup>
                  <FormGroup>
                    <SubmitButton 
                      type="submit" 
                      disabled={formStatus.submitting}
                    >
                      {formStatus.submitting ? 'Enviando...' : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} />
                          Enviar Mensagem
                        </>
                      )}
                    </SubmitButton>
                  </FormGroup>
                </Form>
              )}
            </Column>
            <Column>
              <Title>Informações de Contato</Title>
              <LeadText>
                Estou disponível para projetos freelance, oportunidades de trabalho ou qualquer consulta que você possa ter.
                Sinta-se à vontade para entrar em contato através dos canais abaixo:
              </LeadText>
              
              <ContactInfo>
                <ContactItem>
                  <FontAwesomeIcon icon={faEnvelope} />
                  <a href="mailto:carlosf.duarte8@gmail.com">carlosf.duarte8@gmail.com</a>
                </ContactItem>
                <ContactItem>
                  <FontAwesomeIcon icon={faWhatsapp} />
                  <a href="https://api.whatsapp.com/send?1=pt_BR&phone=5561998329655" target="_blank" rel="noopener noreferrer">
                    +55 (61) 99832-9655
                  </a>
                </ContactItem>
              </ContactInfo>
              
              <Title>Redes Sociais</Title>
              <SocialLinks>
                <SocialItem>
                  <SocialLink
                    href="https://github.com/CarlosFDuarte8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialItemWrapper>
                      <IconCircle>
                        <FontAwesomeIcon icon={faGithub} />
                      </IconCircle>
                      <SocialLabel>GitHub</SocialLabel>
                    </SocialItemWrapper>
                  </SocialLink>
                </SocialItem>
                <SocialItem>
                  <SocialLink
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialItemWrapper>
                      <IconCircle>
                        <FontAwesomeIcon icon={faLinkedin} />
                      </IconCircle>
                      <SocialLabel>LinkedIn</SocialLabel>
                    </SocialItemWrapper>
                  </SocialLink>
                </SocialItem>
                <SocialItem>
                  <SocialLink
                    href="mailto:carlosf.duarte8@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialItemWrapper>
                      <IconCircle>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconCircle>
                      <SocialLabel>Email</SocialLabel>
                    </SocialItemWrapper>
                  </SocialLink>
                </SocialItem>
                <SocialItem>
                  <SocialLink
                    href="https://api.whatsapp.com/send?1=pt_BR&phone=5561998329655"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialItemWrapper>
                      <IconCircle>
                        <FontAwesomeIcon icon={faWhatsapp} />
                      </IconCircle>
                      <SocialLabel>WhatsApp</SocialLabel>
                    </SocialItemWrapper>
                  </SocialLink>
                </SocialItem>
              </SocialLinks>
            </Column>
          </FlexRow>
        </ContentBox>
      </Container>
    </ContactSection>
  );
};

export default Contact;
