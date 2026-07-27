import React from 'react';
import { GraduationCap, BookOpen, School, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Experience: React.FC = () => {
  const experiences = portfolioData.experience;
  const certifications = portfolioData.certifications;

  // Staggered icons for different education degrees
  const getInstitutionIcon = (index: number) => {
    if (index === 0) return <GraduationCap size={16} />;
    if (index === 1) return <BookOpen size={16} />;
    return <School size={16} />;
  };

  return (
    <section id="education" className="reveal education-cert-section">
      <div className="container">
        <div className="education-cert-grid">
          
          {/* Left Column: Education */}
          <div className="education-column animate-hero-load delay-1">
            <h2>Education</h2>
            <div className="experience-timeline">
              {experiences.map((exp, index) => (
                <div key={index} className={`timeline-item reveal delay-${index + 1}`}>
                  {/* Connected timeline indicator with glowing/pulsing effect */}
                  <div className="timeline-dot-wrapper">
                    <div className="timeline-dot pulsing-dot"></div>
                  </div>
                  
                  {/* Glassmorphic Card content wrapper */}
                  <div className={`timeline-card ${(!exp.description || exp.description.length === 0) ? 'compact-card' : ''}`}>
                    <div className="timeline-card-header education-card-header">
                      <div className="timeline-header-top-row">
                        <span className="timeline-role">{exp.role}</span>
                        <span className="timeline-duration-badge">{exp.duration}</span>
                      </div>
                      <div className="timeline-institution">
                        <span className="timeline-institution-icon" aria-hidden="true">
                          {exp.logo ? (
                            <img
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              className="company-logo-inline"
                              style={{ height: '16px' }}
                            />
                          ) : (
                            getInstitutionIcon(index)
                          )}
                        </span>
                        <span className="timeline-company">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="company-link"
                            >
                              <span>{exp.company}</span>
                            </a>
                          ) : (
                            exp.company
                          )}
                        </span>
                      </div>
                    </div>
                    {exp.skills && exp.skills.length > 0 && (
                      <div className="flex flex-row education-skills-container">
                        {exp.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="education-skill-tag text-xs">
                            <span className="skill-tag-dot" aria-hidden="true"></span>
                            <span className="full-text">{skill.name}</span>
                            <span className="short-text">{skill.shortName}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="certifications-column animate-hero-load delay-2">
            <h2>Certifications</h2>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div key={index} className="cert-card-wrapper reveal delay-1">
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <div className="timeline-card-title-group">
                        <span className="timeline-role">{cert.role}</span>
                        <div className="timeline-institution">
                          <span className="timeline-institution-icon" aria-hidden="true">
                            {cert.logo ? (
                              <img
                                src={cert.logo}
                                alt={`${cert.company} logo`}
                                className="company-logo-inline"
                                style={{ height: '16px' }}
                              />
                            ) : (
                              <Award size={16} />
                            )}
                          </span>
                          <span className="timeline-company">
                            {cert.companyUrl ? (
                              <a
                                href={cert.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="company-link"
                              >
                                <span>{cert.company}</span>
                              </a>
                            ) : (
                              cert.company
                            )}
                          </span>
                        </div>
                      </div>
                      <span className="timeline-duration-badge">{cert.duration}</span>
                    </div>
                    
                    {cert.description && cert.description.length > 0 && (
                      <ul className="timeline-desc">
                        {cert.description.map((desc, dIdx) => (
                          <li key={dIdx} className="timeline-desc-item">
                            <span className="timeline-bullet-accent" aria-hidden="true"></span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
