import React from 'react';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const Projects: React.FC = () => {
  const projects = portfolioData.projects;

  return (
    <section id="projects" className="reveal">
      <div className="container">
        <h2>Featured Projects</h2>
        
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="project-thumbnail">
                <img src={project.thumbnail} alt={`${project.title} thumbnail`} loading="lazy" />
              </div>
              
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="project-links">
                  {project.liveUrl ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  ) : (
                    <a 
                      href="#contact" 
                      className="project-link"
                    >
                      View Details →
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                    >
                      <GithubIcon size={16} /> Repository
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
