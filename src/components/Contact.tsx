import React, { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export const Contact: React.FC = () => {
  const { title, subtitle, email, github, linkedin, twitter } = portfolioData.contact;
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }
    
    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000); // Reset status message after 5 seconds
    }, 1200);
  };

  return (
    <section id="contact" className="reveal">
      <div className="container">
        <h2>{title}</h2>
        
        <div className="contact-container">
          <div className="contact-info-panel">
            <p className="contact-subtitle">{subtitle}</p>
            
            <div className="contact-details">
              <a href={`mailto:${email}`} className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={20} />
                </div>
                <span>{email}</span>
              </a>
            </div>
            
            <div className="social-links">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                  <GithubIcon size={20} />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                  <LinkedinIcon size={20} />
                </a>
              )}
              {twitter && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="social-link" title="Twitter / X">
                  <TwitterIcon size={20} />
                </a>
              )}
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="form-name" className="form-label">Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="form-email" className="form-label">Email</label>
              <input
                type="email"
                id="form-email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="form-message" className="form-label">Message</label>
              <textarea
                id="form-message"
                name="message"
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Hello! Let's talk about..."
              />
            </div>

            {status === 'success' && (
              <div className="form-status success" id="form-success-msg">
                Thank you! Your message has been sent successfully.
              </div>
            )}
            
            {status === 'error' && (
              <div className="form-status error" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'hsl(0, 84%, 60%)', border: '1px solid rgba(239, 68, 68, 0.2)' }} id="form-error-msg">
                Please fill in all fields before submitting.
              </div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'submitting'}
              style={{ alignSelf: 'flex-start' }}
            >
              {status === 'submitting' ? 'Sending...' : 'Send Message'} <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
