import React from 'react';
import { Download, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

export const Resume: React.FC = () => {
  const resumeUrl = portfolioData.contact.resume || '';

  return (
    <section id="resume" className="reveal resume-section">
      <div className="container">
        <h2>Resume</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          View my resume directly or download a copy.
        </p>

        <div className="resume-actions-container">
          <a 
            href={resumeUrl} 
            download="Sanskriti_Singh_Resume.pdf"
            className="btn btn-primary resume-btn"
          >
            <Download size={18} />
            <span>Download PDF</span>
          </a>
          <a 
            href={resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary resume-btn"
          >
            <ExternalLink size={18} />
            <span>Open in New Tab</span>
          </a>
        </div>

        <div className="resume-preview-wrapper">
          <div className="resume-preview-container">
            <iframe 
              src={`${encodeURI(resumeUrl)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
              title="Sanskriti Singh Resume"
              className="resume-iframe"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
