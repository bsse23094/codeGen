import React from 'react';

interface PricingTier {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingSimpleProps {
  heading?: string;
  subtitle?: string;
  tiers?: PricingTier[];
}

export const PricingSimple: React.FC<PricingSimpleProps> = ({
  heading = 'Simple, Transparent Pricing',
  subtitle = 'Choose the plan that fits your needs',
  tiers = [
    {
      name: 'Starter',
      price: '$29',
      features: ['Up to 10 users', '5GB storage', 'Email support', 'Basic analytics']
    },
    {
      name: 'Professional',
      price: '$79',
      features: ['Up to 50 users', '50GB storage', 'Priority support', 'Advanced analytics', 'Custom integrations'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited users', 'Unlimited storage', '24/7 phone support', 'Custom analytics', 'Dedicated account manager']
    }
  ]
}) => {
  return (
    <section className="pricing-simple">
      <div className="container">
        <div className="section-header">
          <h2>{heading}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <div className="pricing-grid">
          {tiers.map((tier, index) => (
            <div key={index} className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}>
              {tier.highlighted && <div className="pricing-badge">Most Popular</div>}
              <h3>{tier.name}</h3>
              <div className="pricing-price">{tier.price}<span>/month</span></div>
              <ul className="pricing-features">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex}>
                    <span className="material-symbols-outlined">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary">Get Started</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
