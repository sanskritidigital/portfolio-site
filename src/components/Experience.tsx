import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Experience: React.FC = () => {
  const experiences = portfolioData.experience;

  // Staggered icons for different education degrees
  const getInstitutionIcon = (index: number) => {
    return index === 0 ? <GraduationCap size={16} /> : <BookOpen size={16} />;
  };

  return (
    <section id="education" className="reveal">
      <div className="container">
        <h2>Education</h2>
        
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className={`timeline-item reveal delay-${index + 1}`}>
              {/* Connected timeline indicator with glowing/pulsing effect */}
              <div className="timeline-dot-wrapper">
                <div className="timeline-dot pulsing-dot"></div>
              </div>
              
              {/* Glassmorphic Card content wrapper */}
              <div className="timeline-card">
                <div className="timeline-card-header">
                  <div className="timeline-card-title-group">
                    <span className="timeline-role">{exp.role}</span>
                    <div className="timeline-institution">
                      <span className="timeline-institution-icon" aria-hidden="true">
                        {getInstitutionIcon(index)}
                      </span>
                      <span className="timeline-company">{exp.company}</span>
                    </div>
                  </div>
                  <span className="timeline-duration-badge">{exp.duration}</span>
                </div>
                
                <ul className="timeline-desc">
                  {exp.description.map((desc, dIdx) => (
                    <li key={dIdx} className="timeline-desc-item">
                      <span className="timeline-bullet-accent" aria-hidden="true"></span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
