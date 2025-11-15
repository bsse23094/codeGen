import React from 'react';

interface HeroCenteredProps {
  heading?: string;
  subtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  ctaPrimaryLink?: string;
  ctaSecondaryLink?: string;
}

export const HeroCentered: React.FC<HeroCenteredProps> = ({
  heading = 'Welcome to the Future',
  subtitle = 'Build, ship, and scale with confidence',
  ctaPrimary = 'Start Free Trial',
  ctaSecondary = 'Watch Demo',
  ctaPrimaryLink = '#',
  ctaSecondaryLink = '#'
}) => {
  return (
    <section className="hero-centered">
      <div className="container">
        <div className="hero-content-centered">
          <h1>{heading}</h1>
          <p className="hero-subtitle">{subtitle}</p>
          <div className="hero-cta-group">
            <a href={ctaPrimaryLink} className="btn btn-primary">{ctaPrimary}</a>
            <a href={ctaSecondaryLink} className="btn btn-secondary">{ctaSecondary}</a>
          </div>
        </div>
      </div>
    </section>
  );
};
