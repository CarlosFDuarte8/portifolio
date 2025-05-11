import React from "react";
import styled from "styled-components";
import java from '../img/java.png';
import react from '../logo.svg';

// Componentes estilizados
const AboutSection = styled.section`
  padding: ${props => props.theme.spacing.xxl} 0;
  background-color: ${props => props.theme.colors.light};
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
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
  justify-content: flex-start;
  gap: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SkillCard = styled.div`
  width: 8rem;
  border-radius: ${props => props.theme.borderRadius.small};
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow.small};
  transition: transform ${props => props.theme.transitions.medium}, 
              box-shadow ${props => props.theme.transitions.medium};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.boxShadow.large};
  }
`;

const CardImageContainer = styled.div`
  padding: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const CardImage = styled.img`
  max-width: 80px;
  max-height: 80px;
`;

const CardBody = styled.div`
  padding: ${props => props.theme.spacing.md};
  text-align: center;
`;

const CardTitle = styled.h5`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: 600;
`;

class About extends React.Component {
  render() {
    return (
      <AboutSection id="about">
        <Container>
          <ContentBox>
            <FlexRow>
              <SkillCard>
                <CardImageContainer>
                  <CardImage src={java} alt="Java" />
                </CardImageContainer>
                <CardBody>
                  <CardTitle>Java</CardTitle>
                </CardBody>
              </SkillCard>
              
              <SkillCard>
                <CardImageContainer>
                  <CardImage src={react} alt="React" />
                </CardImageContainer>
                <CardBody>
                  <CardTitle>React</CardTitle>
                </CardBody>
              </SkillCard>
              
              <SkillCard>
                <CardImageContainer>
                  <CardImage src={react} alt="Angular" />
                </CardImageContainer>
                <CardBody>
                  <CardTitle>Angular</CardTitle>
                </CardBody>
              </SkillCard>
            </FlexRow>
          </ContentBox>
        </Container>
      </AboutSection>
    );
  }
}

export default About;