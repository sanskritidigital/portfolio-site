import React, { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const { logoText, links } = portfolioData.navbar;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <a href="#" className="logo" onClick={handleLinkClick}>
          {logoText}
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          {links.map((link, index) => {
            const isExternal = link.href.includes('.pdf') || link.href.startsWith('http');
            return (
              <li key={index}>
                <a 
                  href={link.href} 
                  className="nav-link" 
                  onClick={handleLinkClick}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle dark/light mode"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            className="menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
