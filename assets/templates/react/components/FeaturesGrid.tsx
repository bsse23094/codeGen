import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  heading?: string;
  subtitle?: string;
  features?: Feature[];
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  heading = 'Powerful Features',
  subtitle = 'Everything you need to succeed',
  features = [
    { icon: 'bolt', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: 'shield', title: 'Secure by Default', description: 'Enterprise-grade security built-in' },
    { icon: 'palette', title: 'Beautiful Design', description: 'Pixel-perfect UI components' },
    { icon: 'code', title: 'Developer First', description: 'Built by developers, for developers' },
    { icon: 'analytics', title: 'Deep Analytics', description: 'Track everything that matters' },
    { icon: 'support_agent', title: '24/7 Support', description: 'We are here when you need us' }
  ]
}) => {
  return (
    <section className="features-grid">
      <div className="container">
        <div className="section-header">
          <h2>{heading}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="features-grid-container">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <span className="material-symbols-outlined feature-icon">{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
