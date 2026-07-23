import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Target, Compass, Languages, Award, TrendingUp, Sparkles, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const { bio, skills } = portfolioData.about;

  // Custom icon selector for each skill category card
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Marketing":
        return <TrendingUp size={22} />;
      case "AI & Creative Tools":
        return <Sparkles size={22} />;
      default:
        return <Heart size={22} />;
    }
  };

  return (
    <section id="about" className="about-section">
      {/* Ambient background glow behind the section for depth */}
      <div className="about-bg-glow" aria-hidden="true"></div>

      <div className="container">
        <h2>About Me</h2>
        
        {/* Main Grid: Bio on left, Highlights on right */}
        <div className="about-layout-grid">
          {/* Bio card */}
          <div className="about-card bio-card reveal delay-1">
            <h3>My Philosophy</h3>
            <p className="bio-paragraph">{bio}</p>
          </div>

          {/* Highlights card */}
          <div className="about-card highlights-card reveal delay-2">
            <h3>Quick Facts</h3>
            <div className="highlight-items">
              <div className="highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <Target size={18} />
                </div>
                <div className="highlight-details">
                  <span className="highlight-label">Focus</span>
                  <span className="highlight-value">Branding & Social Media Strategy</span>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <Compass size={18} />
                </div>
                <div className="highlight-details">
                  <span className="highlight-label">Goal</span>
                  <span className="highlight-value">Growing as a digital marketing professional through practical experience</span>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <Languages size={18} />
                </div>
                <div className="highlight-details">
                  <span className="highlight-label">Languages</span>
                  <span className="highlight-value">English (Fluent), Hindi (Native)</span>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon" aria-hidden="true">
                  <Award size={18} />
                </div>
                <div className="highlight-details">
                  <span className="highlight-label">Strengths</span>
                  <span className="highlight-value">Creative thinking, adaptability, quick learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Subheading */}
        <h3 className="section-subtitle reveal delay-1" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          Core Capabilities
        </h3>

        {/* Skills Cards Grid */}
        <div className="about-skills-grid">
          {skills.map((skillCat, idx) => (
            <div key={idx} className={`about-card skill-category-card reveal delay-${idx + 1}`}>
              <div className="skill-card-header">
                <div className="skill-category-icon-wrapper" aria-hidden="true">
                  {getCategoryIcon(skillCat.category)}
                </div>
                <h4>{skillCat.category}</h4>
              </div>
              <div className="skills-list">
                {skillCat.items.map((skill, sIdx) => (
                  <span key={sIdx} className="skill-tag">
                    <span className="skill-tag-dot" aria-hidden="true"></span>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
