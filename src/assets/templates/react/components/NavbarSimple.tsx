import React, { useState } from 'react';

interface NavLink {
  label: string;
  href: string;
}

interface NavbarSimpleProps {
  logo?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaLink?: string;
}

export const NavbarSimple: React.FC<NavbarSimpleProps> = ({
  logo = 'MyBrand',
  links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ],
  ctaText = 'Get Started',
  ctaLink = '#'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar-simple">
      <div className="container">
        <div className="navbar-content">
          <a href="/" className="navbar-logo">{logo}</a>
          
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>

          <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-links">
              {links.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
            <a href={ctaLink} className="btn btn-primary navbar-cta">{ctaText}</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
