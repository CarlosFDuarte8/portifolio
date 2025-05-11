import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGooglePlay, faAppStoreIos } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faCode, faLaptopCode, faImage } from "@fortawesome/free-solid-svg-icons";
import logo from '../logo.svg'; // Imagem de fallback para projetos sem imagem
import { useTranslation } from 'react-i18next'; // Importando hook de tradução

// Componentes estilizados
const ProjectsSection = styled.section`
  padding-top: calc(${props => props.theme.spacing.xxl} + 80px); /* Adicionando espaço extra para a navbar fixa */
  padding-bottom: ${props => props.theme.spacing.xxl};
  background-color: ${props => props.theme.colors.dark};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 123, 255, 0.2) 100%);
    z-index: 0;
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
  position: relative;
  padding-bottom: ${props => props.theme.spacing.md};

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background-color: ${props => props.theme.colors.primary};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: ${props => props.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${props => props.theme.boxShadow.medium};
  transition: all ${props => props.theme.transitions.medium};
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${props => props.theme.boxShadow.large};
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ProjectImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity ${props => props.theme.transitions.medium};
  }
  
  ${ProjectCard}:hover &::before {
    opacity: 1;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${props => props.theme.transitions.medium};
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectImageFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 123, 255, 0.1);
  color: ${props => props.theme.colors.primary};
  font-size: 3rem;
`;

const ProjectContent = styled.div`
  padding: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.white};
`;

const ProjectTitle = styled.h3`
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.white};
`;

const ProjectDescription = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: ${props => props.theme.spacing.md};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.xs};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Tag = styled.span`
  background-color: rgba(0, 123, 255, 0.2);
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.fontSizes.small};
  padding: 4px 8px;
  border-radius: ${props => props.theme.borderRadius.small};
  border: 1px solid rgba(0, 123, 255, 0.3);
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.md};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.medium};
  transition: all ${props => props.theme.transitions.fast};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: rgba(0, 123, 255, 0.1);
  border: 1px solid rgba(0, 123, 255, 0.2);
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    transform: translateY(-3px);
  }
`;

const ProjectsIntro = styled.p`
  text-align: center;
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: ${props => props.theme.spacing.xl};
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

// Interface para projetos
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    android?: string;
    ios?: string;
    github?: string;
    live?: string;
  };
}

const Projects: React.FC = () => {
  const { t } = useTranslation(); // Hook de tradução
  
  // Lista de projetos
  const projects: Project[] = [
    {
      id: "noar-health",
      title: t('projects.projectList.noarHealth.title'),
      description: t('projects.projectList.noarHealth.description'),
      image: "https://play-lh.googleusercontent.com/Kx0_1aTIlb4PtVWLCb_t5cCp8ROBn9xwVBQ9VRy261ZLyXKnEL8TjYH4TN1g6M4yFMom=w240-h480-rw",
      tags: ["React Native", "Android", "iOS", "JavaScript", "Firebase"],
      links: {
        android: "https://play.google.com/store/apps/details?id=com.noar.health&hl=pt_BR",
        ios: "https://apps.apple.com/br/app/noar-health/id1673473276?l=en-GB",
      }
    },
    {
      id: "portfolio",
      title: t('projects.projectList.portfolio.title'),
      description: t('projects.projectList.portfolio.description'),
      image: "/logo512.png",
      tags: ["React", "TypeScript", "Styled Components", "Responsive Design"],
      links: {
        github: "https://github.com/CarlosFDuarte8/portifolio",
        live: "#"
      }
    },
    {
      id: "ecommerce",
      title: t('projects.projectList.ecommerce.title'),
      description: t('projects.projectList.ecommerce.description'),
      image: "https://via.placeholder.com/400x200?text=E-commerce+Project",
      tags: ["Node.js", "React", "MongoDB", "Express", "Redux"],
      links: {
        github: "https://github.com",
        live: "#"
      }
    }
  ];

  // Estado para controlar imagens com erro
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  // Função para lidar com erros de carregamento de imagem
  const handleImageError = (projectId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  return (
    <ProjectsSection id="projects">
      <Container>
        <SectionTitle>{t('projects.title')}</SectionTitle>
        <ProjectsIntro>
          {t('projects.intro')}
        </ProjectsIntro>
        
        <ProjectsGrid>
          {projects.map((project) => (
            <ProjectCard key={project.id}>
              <ProjectImageContainer>
                {project.image && !imageErrors[project.id] ? (
                  <ProjectImage 
                    src={project.image} 
                    alt={project.title} 
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <ProjectImageFallback>
                    <FontAwesomeIcon icon={faImage} />
                  </ProjectImageFallback>
                )}
              </ProjectImageContainer>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectTags>
                  {project.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </ProjectTags>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectLinks>
                  {project.links.github && (
                    <ProjectLink href={project.links.github} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGithub} /> {t('projects.github')}
                    </ProjectLink>
                  )}
                  {project.links.live && (
                    <ProjectLink href={project.links.live} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faExternalLinkAlt} /> {t('projects.live')}
                    </ProjectLink>
                  )}
                  {project.links.android && (
                    <ProjectLink href={project.links.android} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faGooglePlay} /> {t('projects.android')}
                    </ProjectLink>
                  )}
                  {project.links.ios && (
                    <ProjectLink href={project.links.ios} target="_blank" rel="noopener noreferrer">
                      <FontAwesomeIcon icon={faAppStoreIos} /> {t('projects.ios')}
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  );
};

export default Projects;