import React from 'react';

interface HeroBasicProps {
  heading?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

export const HeroBasic: React.FC<HeroBasicProps> = ({
  heading = 'Build Something Amazing',
  subtitle = 'The fastest way to ship your next product',
  ctaText = 'Get Started',
  ctaLink = '#',
  imageUrl = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
}) => {
  return (
    <section className="hero-basic">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1>{heading}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <a href={ctaLink} className="btn btn-primary">{ctaText}</a>
          </div>
          <div className="hero-image">
            <img src={imageUrl} alt={heading} />
          </div>
        </div>
      </div>
    </section>
  );
};
