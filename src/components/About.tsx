import React from "react";
import styled from "styled-components";
import java from '../img/java.png';
import react from '../logo.svg';
// Import Font Awesome for technology icons where we don't have images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHtml5, 
  faCss3Alt, 
  faJs, 
  faNode, 
  faAngular, 
  faReact, 
  faGit, 
  faNpm, 
  faJava, 
  faDocker, 
  faAws,
} from '@fortawesome/free-brands-svg-icons';
import { 
  faDatabase,
  faCode,
  faStar as faStarSolid
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

// Componentes estilizados
const AboutSection = styled.section`
  padding-top: calc(${props => props.theme.spacing.xxl} + 80px); /* Adicionando espaço extra para a navbar fixa */
  padding-bottom: ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.light};
  margin-top: -80px; /* Compensar para a visualização correta com a navbar fixa */
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

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardIcon = styled(FontAwesomeIcon)`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
`;

const SkillLevel = styled.div`
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: ${props => props.theme.spacing.sm};
`;

const StarIcon = styled(FontAwesomeIcon)<{ $filled: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$filled ? props.theme.colors.primary : props.theme.colors.gray};
`;

// Interface para os tipos de habilidades
interface Skill {
  name: string;
  icon: any;
  isImage?: boolean;
  level: number; // 1-5 representing skill level
}

class About extends React.Component {
  // Lista de habilidades com níveis
  skills: Skill[] = [
    // Core Languages
    { name: "Java", icon: faJava, isImage: false, level: 2 },
    { name: "JavaScript", icon: faJs, level: 4 },
    { name: "HTML5", icon: faHtml5, level: 5 },
    { name: "CSS3", icon: faCss3Alt, level: 4 },
    
    // Frameworks & Libraries
    { name: "React", icon: faReact, isImage: false, level: 4 },
    { name: "React Native", icon: faReact, isImage: false, level: 4 },
    { name: "Angular", icon: faAngular, level: 3 },
    { name: "Node.js", icon: faNode, level: 4 },
    { name: "Spring Boot", icon: faDatabase, level: 2 },
    { name: "TypeScript", icon: faCode, level: 4 },
    
    // Tools & Platforms
    { name: "Git", icon: faGit, level: 4 },
    { name: "Docker", icon: faDocker, level: 3 },
    { name: "AWS", icon: faAws, level: 1 },
    { name: "NPM", icon: faNpm, level: 4 },
    { name: "MySQL", icon: faDatabase, level: 4 },
    { name: "SQLServe", icon: faDatabase, level: 4 }
  ];

  // Renderiza as estrelas para indicar o nível de habilidade
  renderStars(level: number) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon 
          key={i} 
          icon={i <= level ? faStarSolid : faStarRegular} 
          $filled={i <= level} 
        />
      );
    }
    return stars;
  }

  render() {
    return (
      <AboutSection id="about">
        <Container>
          <ContentBox>
            <SectionTitle>Minhas Habilidades</SectionTitle>
            <SkillsGrid>
              {this.skills.map((skill, index) => (
                <SkillCard key={index}>
                  <CardImageContainer>
                    {skill.isImage ? (
                      <CardImage src={skill.icon} alt={skill.name} />
                    ) : (
                      <CardIcon icon={skill.icon} />
                    )}
                  </CardImageContainer>
                  <CardBody>
                    <CardTitle>{skill.name}</CardTitle>
                    <SkillLevel>
                      {this.renderStars(skill.level)}
                    </SkillLevel>
                  </CardBody>
                </SkillCard>
              ))}
            </SkillsGrid>
          </ContentBox>
        </Container>
      </AboutSection>
    );
  }
}

export default About;