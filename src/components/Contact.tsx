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

const WhatsappIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
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
  const { title, subtitle, email, phone, whatsapp, github, linkedin } = portfolioData.contact;

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

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

    // Format submitted records for WhatsApp forwarding on 9569725051 (+91 India)
    const whatsappNumber = whatsapp || '919569725051';
    const whatsappText = `*New Contact Form Submission* 🚀\n\n*Name:* ${formData.name.trim()}\n*Email:* ${formData.email.trim()}\n*Message:*\n${formData.message.trim()}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    // Open WhatsApp immediately so browser popup blockers don't block async calls
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    setLastWhatsappUrl(whatsappUrl);

    // If EmailJS is configured, send email notification in the background
    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

    if (serviceId && serviceId !== 'YOUR_SERVICE_ID' && templateId && publicKey) {
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
      } catch (err: unknown) {
        console.warn('[EmailJS] Background email send failed:', err);
      }
    }

    setStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setTimeout(() => setStatus('idle'), 8000);
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
              <a
                href={`https://wa.me/${whatsapp || '919569725051'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-icon-box" style={{ color: '#25D366' }}>
                  <WhatsappIcon size={20} />
                </div>
                <span>{phone || '+91 95697 25051'} (WhatsApp)</span>
              </a>
            </div>

            <div className="social-links">
              <a
                href={`https://wa.me/${whatsapp || '919569725051'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                title="WhatsApp"
                style={{ color: '#25D366' }}
              >
                <WhatsappIcon size={20} />
              </a>
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
              <div className="form-status success" id="form-success-msg" role="alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={18} />
                  <span>Redirected to WhatsApp! Send your message there to connect instantly.</span>
                </div>
                {lastWhatsappUrl && (
                  <a
                    href={lastWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.88rem', textDecoration: 'underline', color: 'inherit', marginLeft: '1.6rem', fontWeight: 600 }}
                  >
                    Didn't open automatically? Click here to open WhatsApp.
                  </a>
                )}
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
