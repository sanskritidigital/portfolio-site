import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Download, ExternalLink } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({ isOpen, onClose, pdfUrl, title }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle click on backdrop to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className="pdf-modal-backdrop" onClick={handleBackdropClick}>
      <div className="pdf-modal-container">
        <div className="pdf-modal-header">
          <h3 className="pdf-modal-title">{title}</h3>
          <div className="pdf-modal-actions">
            <a 
              href={pdfUrl} 
              download 
              className="pdf-modal-btn" 
              title="Download PDF"
            >
              <Download size={18} />
              <span>Download</span>
            </a>
            <a 
              href={pdfUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="pdf-modal-btn" 
              title="Open in new tab"
            >
              <ExternalLink size={18} />
              <span>Open in New Tab</span>
            </a>
            <button 
              onClick={onClose} 
              className="pdf-modal-close-btn" 
              title="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="pdf-modal-body">
          <iframe 
            src={`${encodeURI(pdfUrl)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} 
            title={title}
            className="pdf-modal-iframe"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
