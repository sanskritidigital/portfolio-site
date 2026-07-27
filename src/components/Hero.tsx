import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedin, FaFileAlt, FaWhatsapp } from 'react-icons/fa';
import { portfolioData } from '../data/portfolio';
import profileImg from '../assets/profile.png';

export const Hero: React.FC = () => {
  const { name, role, tagline, ctaPrimary, ctaSecondary } = portfolioData.hero;

  // Memoize random particle offsets to avoid shifts on component re-renders
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 2}px`,
      opacity: Math.random() * 0.35 + 0.1,
      delay: `${Math.random() * -10}s`, // Negative delay so particles start midway on load
      duration: `${Math.random() * 12 + 18}s`,
    }));
  }, []);

  // Split title text for the word-by-word sequential fade-in animation
  const titleWords = ["Hi,", "I'm", "Sanskriti", "Singh"];

  return (
    <section id="hero" className="hero-section">
      {/* Dynamic Background Layout */}
      <div className="hero-bg">
        {/* Subtle floating particles */}
        <div className="hero-particles">
          {particles.map((p) => (
            <div
              key={p.id}
              className="hero-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                opacity: p.opacity,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-role animate-hero-load delay-1">{role}</div>
          
          {/* Word-by-word reveal header */}
          <h1 className="hero-name">
            {titleWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span 
                  className="reveal-word" 
                  style={{ animationDelay: `${0.15 + idx * 0.12}s` }}
                >
                  {word === "Sanskriti" || word === "Singh" ? (
                    <span className="text-gradient">{word}</span>
                  ) : (
                    word
                  )}
                </span>
                {idx < titleWords.length - 1 && ' '}
              </React.Fragment>
            ))}
          </h1>

          <p className="hero-tagline animate-hero-load delay-2">
            {tagline}
          </p>

          <div className="hero-ctas animate-hero-load delay-3">
            <a href={ctaPrimary.href} className="btn btn-primary">
              {ctaPrimary.label} <ArrowRight size={18} />
            </a>
            <a 
              href={ctaSecondary.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              {ctaSecondary.label} <FaWhatsapp size={18} />
            </a>
          </div>

          <div className="hero-socials animate-hero-load delay-3">
            {portfolioData.contact.linkedin && (
              <div className="hero-social-item">
                <a 
                  href={portfolioData.contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hero-social-link linkedin" 
                  title="LinkedIn"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>
                <span className="hero-social-label linkedin">linkedin</span>
              </div>
            )}
            {portfolioData.contact.github && (
              <div className="hero-social-item">
                <a 
                  href={portfolioData.contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hero-social-link github" 
                  title="GitHub"
                  aria-label="GitHub Profile"
                >
                  <SiGithub size={20} />
                </a>
                <span className="hero-social-label github">github</span>
              </div>
            )}
            {portfolioData.contact.resume && (
              <div className="hero-social-item">
                <a 
                  href={portfolioData.contact.resume} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link resume" 
                  title="Resume"
                  aria-label="Resume"
                >
                  <FaFileAlt size={20} />
                </a>
                <span className="hero-social-label resume">resume</span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-media-col animate-hero-load delay-3">
          <div className="hero-cutout-container">
            {/* Background display text */}
            <div className="hero-bg-text">
              <span>DIGITAL</span>
              <span>MARKETER</span>
            </div>
            
            {/* Ambient glow behind photo */}
            <div className="hero-photo-glow" aria-hidden="true"></div>
            
            {/* Floating photo cutout */}
            <div className="hero-photo-cutout-wrapper">
              <img 
                src={profileImg} 
                alt={name} 
                className="hero-photo-cutout"
              />
            </div>


          </div>
        </div>
      </div>
    </section>
  );
};
