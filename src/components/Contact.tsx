import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
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


// Simple email regex validator
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { title, subtitle, email, github, linkedin } = portfolioData.contact;

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setErrorMessage('');

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

    // ── Debug: log loaded keys (remove after confirming) ──
    console.log('[EmailJS] Service ID :', serviceId);
    console.log('[EmailJS] Template ID:', templateId);
    console.log('[EmailJS] Public Key :', publicKey);

    if (!serviceId || serviceId === 'YOUR_SERVICE_ID') {
      const msg = '⚠️ EmailJS keys are not configured yet. Open .env.local and replace the placeholder values.';
      console.error(msg);
      setStatus('error');
      setErrorMessage(msg);
      return;
    }

    try {
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name:  formData.name.trim(),
          from_email: formData.email.trim(),
          message:    formData.message.trim(),
          to_email:   'sanskriti.workmail@gmail.com',
        },
        publicKey
      );

      console.log('[EmailJS] Success:', result.status, result.text);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err: unknown) {
      // EmailJS wraps errors as { status, text }
      const ejsErr = err as { status?: number; text?: string };
      const detail = ejsErr?.text
        ? `EmailJS error ${ejsErr.status}: ${ejsErr.text}`
        : (err instanceof Error ? err.message : String(err));

      console.error('[EmailJS] Send failed:', err);
      setStatus('error');
      setErrorMessage(detail || 'Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <section id="contact" className="reveal">
      <div className="container">
        <h2>{title}</h2>

        <div className="contact-container">
          {/* Info Panel */}
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
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="contact-form" noValidate>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="form-name" className="form-label">Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                className={`form-input${errors.name ? ' input-error' : ''}`}
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="name"
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="form-email" className="form-label">Email</label>
              <input
                type="email"
                id="form-email"
                name="email"
                className={`form-input${errors.email ? ' input-error' : ''}`}
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="form-message" className="form-label">Message</label>
              <textarea
                id="form-message"
                name="message"
                className={`form-textarea${errors.message ? ' input-error' : ''}`}
                value={formData.message}
                onChange={handleChange}
                placeholder="Hello! Let's talk about..."
              />
              {errors.message && <span className="field-error">{errors.message}</span>}
            </div>

            {/* Success Banner */}
            {status === 'success' && (
              <div className="form-status success" id="form-success-msg" role="alert">
                <CheckCircle size={18} />
                Message sent! I'll get back to you soon.
              </div>
            )}

            {/* Error Banner */}
            {status === 'error' && (
              <div className="form-status form-status-error" id="form-error-msg" role="alert">
                <AlertCircle size={18} />
                {errorMessage || 'Please fill in all fields correctly before submitting.'}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === 'submitting'}
              style={{ alignSelf: 'flex-start' }}
            >
              {status === 'submitting' ? (
                <>
                  <span className="sending-spinner" aria-hidden="true"></span>
                  Sending…
                </>
              ) : (
                <>Send Message <Send size={16} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
