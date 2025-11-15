import { Injectable } from '@angular/core';
import { ComponentDefinition } from '../models';

/**
 * Component Registry Service
 * Manages all available component definitions
 */
@Injectable({
  providedIn: 'root'
})
export class ComponentRegistryService {
  private definitions: ComponentDefinition[] = [
    // Hero Components
    {
      type: 'hero-basic',
      label: 'Hero Basic',
      icon: 'rocket_launch',
      category: 'Hero',
      defaultProps: {
        title: 'Build Something Amazing',
        subtitle: 'Create beautiful landing pages without writing code',
        primaryButtonText: 'Get Started',
        primaryButtonHref: '#',
        secondaryButtonText: 'Learn More',
        secondaryButtonHref: '#'
      },
      inputs: [
        { key: 'title', type: 'text', label: 'Title' },
        { key: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { key: 'primaryButtonText', type: 'text', label: 'Primary Button Text' },
        { key: 'primaryButtonHref', type: 'text', label: 'Primary Button Link' },
        { key: 'secondaryButtonText', type: 'text', label: 'Secondary Button Text' },
        { key: 'secondaryButtonHref', type: 'text', label: 'Secondary Button Link' }
      ]
    },
    {
      type: 'hero-centered',
      label: 'Hero Centered',
      icon: 'star',
      category: 'Hero',
      defaultProps: {
        title: 'Welcome to Your SaaS',
        subtitle: 'Transform your workflow with our powerful tools',
        buttonText: 'Start Free Trial',
        buttonHref: '#'
      },
      inputs: [
        { key: 'title', type: 'text', label: 'Title' },
        { key: 'subtitle', type: 'textarea', label: 'Subtitle' },
        { key: 'buttonText', type: 'text', label: 'Button Text' },
        { key: 'buttonHref', type: 'text', label: 'Button Link' }
      ]
    },

    // Features Components
    {
      type: 'features-grid',
      label: 'Features Grid',
      icon: 'grid_view',
      category: 'Content',
      defaultProps: {
        heading: 'Why Choose Us',
        subheading: 'Everything you need to succeed',
        items: [
          {
            icon: 'flash_on',
            title: 'Lightning Fast',
            description: 'Optimized for speed and performance'
          },
          {
            icon: 'security',
            title: 'Secure by Default',
            description: 'Enterprise-grade security built-in'
          },
          {
            icon: 'code',
            title: 'Developer Friendly',
            description: 'Clean, exportable code you can customize'
          }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'subheading', type: 'textarea', label: 'Subheading' },
        { key: 'items', type: 'textarea', label: 'Features (JSON)', helperText: 'Array of {icon, title, description}' }
      ]
    },

    // Pricing Components
    {
      type: 'pricing-simple',
      label: 'Pricing Simple',
      icon: 'payments',
      category: 'Pricing',
      defaultProps: {
        heading: 'Simple, Transparent Pricing',
        subheading: 'Choose the plan that fits your needs',
        plans: [
          {
            name: 'Starter',
            price: '$9',
            period: '/month',
            features: ['Up to 5 projects', 'Basic templates', 'Email support'],
            buttonText: 'Start Free',
            buttonHref: '#',
            highlighted: false
          },
          {
            name: 'Pro',
            price: '$29',
            period: '/month',
            features: ['Unlimited projects', 'Premium templates', 'Priority support', 'Custom domains'],
            buttonText: 'Get Started',
            buttonHref: '#',
            highlighted: true
          },
          {
            name: 'Enterprise',
            price: '$99',
            period: '/month',
            features: ['Everything in Pro', 'White-label', 'Dedicated support', 'SLA guarantee'],
            buttonText: 'Contact Sales',
            buttonHref: '#',
            highlighted: false
          }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'subheading', type: 'textarea', label: 'Subheading' },
        { key: 'plans', type: 'textarea', label: 'Plans (JSON)', helperText: 'Array of pricing plans' }
      ]
    },

    // Navigation
    {
      type: 'navbar-simple',
      label: 'Navigation Bar',
      icon: 'menu',
      category: 'Navigation',
      defaultProps: {
        logo: 'MyApp',
        logoHref: '/',
        links: [
          { text: 'Features', href: '#features' },
          { text: 'Pricing', href: '#pricing' },
          { text: 'About', href: '#about' }
        ],
        ctaText: 'Get Started',
        ctaHref: '#'
      },
      inputs: [
        { key: 'logo', type: 'text', label: 'Logo Text' },
        { key: 'logoHref', type: 'text', label: 'Logo Link' },
        { key: 'links', type: 'textarea', label: 'Nav Links (JSON)', helperText: 'Array of {text, href}' },
        { key: 'ctaText', type: 'text', label: 'CTA Button Text' },
        { key: 'ctaHref', type: 'text', label: 'CTA Button Link' }
      ]
    },

    // Footer
    {
      type: 'footer-columns',
      label: 'Footer with Columns',
      icon: 'view_column',
      category: 'Footer',
      defaultProps: {
        brandName: 'MyApp',
        brandTagline: 'Build better, ship faster',
        columns: [
          {
            title: 'Product',
            links: [
              { text: 'Features', href: '#' },
              { text: 'Pricing', href: '#' },
              { text: 'FAQ', href: '#' }
            ]
          },
          {
            title: 'Company',
            links: [
              { text: 'About', href: '#' },
              { text: 'Blog', href: '#' },
              { text: 'Careers', href: '#' }
            ]
          },
          {
            title: 'Legal',
            links: [
              { text: 'Privacy', href: '#' },
              { text: 'Terms', href: '#' }
            ]
          }
        ],
        copyright: '© 2024 MyApp. All rights reserved.'
      },
      inputs: [
        { key: 'brandName', type: 'text', label: 'Brand Name' },
        { key: 'brandTagline', type: 'text', label: 'Brand Tagline' },
        { key: 'columns', type: 'textarea', label: 'Link Columns (JSON)' },
        { key: 'copyright', type: 'text', label: 'Copyright Text' }
      ]
    },

    // Forms
    {
      type: 'contact-form',
      label: 'Contact Form',
      icon: 'mail',
      category: 'Forms',
      defaultProps: {
        heading: 'Get in Touch',
        subheading: 'We\'d love to hear from you',
        submitButtonText: 'Send Message'
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'subheading', type: 'textarea', label: 'Subheading' },
        { key: 'submitButtonText', type: 'text', label: 'Submit Button Text' }
      ]
    },

    // FAQ
    {
      type: 'faq-accordion',
      label: 'FAQ Accordion',
      icon: 'help',
      category: 'Content',
      defaultProps: {
        heading: 'Frequently Asked Questions',
        items: [
          {
            question: 'How does it work?',
            answer: 'Simply drag and drop components, customize them, and export clean code.'
          },
          {
            question: 'Can I export to React?',
            answer: 'Yes! You can export to both HTML/CSS and React.'
          },
          {
            question: 'Is my data secure?',
            answer: 'Absolutely. All data is stored locally in your browser with optional encryption.'
          }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'items', type: 'textarea', label: 'FAQ Items (JSON)', helperText: 'Array of {question, answer}' }
      ]
    }
  ];

  constructor() {}

  /**
   * Get all component definitions
   */
  getAllDefinitions(): ComponentDefinition[] {
    return this.definitions;
  }

  /**
   * Get definition by type
   */
  getDefinition(type: string): ComponentDefinition | null {
    return this.definitions.find(d => d.type === type) || null;
  }

  /**
   * Get definitions by category
   */
  getDefinitionsByCategory(category: string): ComponentDefinition[] {
    return this.definitions.filter(d => d.category === category);
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    const categories = new Set(this.definitions.map(d => d.category));
    return Array.from(categories);
  }
}
