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
        link1Text: 'Features',
        link1Href: '#features',
        link2Text: 'Pricing',
        link2Href: '#pricing',
        link3Text: 'About',
        link3Href: '#about',
        ctaText: 'Get Started',
        ctaHref: '#'
      },
      inputs: [
        { key: 'logo', type: 'text', label: 'Logo Text' },
        { key: 'logoHref', type: 'text', label: 'Logo Link' },
        { key: 'link1Text', type: 'text', label: 'Link 1 Text' },
        { key: 'link1Href', type: 'text', label: 'Link 1 URL' },
        { key: 'link2Text', type: 'text', label: 'Link 2 Text' },
        { key: 'link2Href', type: 'text', label: 'Link 2 URL' },
        { key: 'link3Text', type: 'text', label: 'Link 3 Text' },
        { key: 'link3Href', type: 'text', label: 'Link 3 URL' },
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
    },

    // CTA Components
    {
      type: 'cta-simple',
      label: 'CTA Banner',
      icon: 'campaign',
      category: 'CTA',
      defaultProps: {
        heading: 'Ready to get started?',
        subheading: 'Join thousands of satisfied customers today',
        buttonText: 'Start Free Trial',
        buttonHref: '#'
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'subheading', type: 'textarea', label: 'Subheading' },
        { key: 'buttonText', type: 'text', label: 'Button Text' },
        { key: 'buttonHref', type: 'text', label: 'Button Link' }
      ]
    },

    {
      type: 'cta-split',
      label: 'CTA Split',
      icon: 'call_to_action',
      category: 'CTA',
      defaultProps: {
        heading: 'Take your business to the next level',
        description: 'Get started with our platform today and see the difference',
        primaryButtonText: 'Get Started',
        primaryButtonHref: '#',
        secondaryButtonText: 'Learn More',
        secondaryButtonHref: '#'
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'description', type: 'textarea', label: 'Description' },
        { key: 'primaryButtonText', type: 'text', label: 'Primary Button Text' },
        { key: 'primaryButtonHref', type: 'text', label: 'Primary Button Link' },
        { key: 'secondaryButtonText', type: 'text', label: 'Secondary Button Text' },
        { key: 'secondaryButtonHref', type: 'text', label: 'Secondary Button Link' }
      ]
    },

    // Testimonials
    {
      type: 'testimonials-grid',
      label: 'Testimonials Grid',
      icon: 'format_quote',
      category: 'Social Proof',
      defaultProps: {
        heading: 'What Our Customers Say',
        subheading: 'Don\'t just take our word for it',
        testimonials: [
          {
            quote: 'This product has completely transformed how we work. Highly recommended!',
            author: 'Sarah Johnson',
            role: 'CEO, TechCorp',
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          {
            quote: 'The best investment we\'ve made this year. ROI was immediate.',
            author: 'Michael Chen',
            role: 'Founder, StartupXYZ',
            avatar: 'https://i.pravatar.cc/150?img=2'
          },
          {
            quote: 'Outstanding support and amazing features. Love it!',
            author: 'Emily Davis',
            role: 'Product Manager, BigCo',
            avatar: 'https://i.pravatar.cc/150?img=3'
          }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'subheading', type: 'textarea', label: 'Subheading' },
        { key: 'testimonials', type: 'textarea', label: 'Testimonials (JSON)', helperText: 'Array of {quote, author, role, avatar}' }
      ]
    },

    // Stats
    {
      type: 'stats-simple',
      label: 'Stats Counter',
      icon: 'query_stats',
      category: 'Social Proof',
      defaultProps: {
        heading: 'Trusted by thousands',
        stats: [
          { value: '10K+', label: 'Active Users' },
          { value: '50K+', label: 'Projects Created' },
          { value: '99.9%', label: 'Uptime' },
          { value: '24/7', label: 'Support' }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'stats', type: 'textarea', label: 'Stats (JSON)', helperText: 'Array of {value, label}' }
      ]
    },

    // Logo Cloud
    {
      type: 'logo-cloud',
      label: 'Logo Cloud',
      icon: 'business',
      category: 'Social Proof',
      defaultProps: {
        heading: 'Trusted by leading companies',
        logos: [
          { name: 'Company 1', url: 'https://via.placeholder.com/120x40?text=Logo+1' },
          { name: 'Company 2', url: 'https://via.placeholder.com/120x40?text=Logo+2' },
          { name: 'Company 3', url: 'https://via.placeholder.com/120x40?text=Logo+3' },
          { name: 'Company 4', url: 'https://via.placeholder.com/120x40?text=Logo+4' },
          { name: 'Company 5', url: 'https://via.placeholder.com/120x40?text=Logo+5' },
          { name: 'Company 6', url: 'https://via.placeholder.com/120x40?text=Logo+6' }
        ]
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'logos', type: 'textarea', label: 'Logos (JSON)', helperText: 'Array of {name, url}' }
      ]
    },

    // Content
    {
      type: 'content-image-left',
      label: 'Content Image Left',
      icon: 'article',
      category: 'Content',
      defaultProps: {
        heading: 'Build faster with our platform',
        description: 'Our intuitive drag-and-drop interface makes it easy to create beautiful landing pages without any coding knowledge.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        buttonText: 'Learn More',
        buttonHref: '#'
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'description', type: 'textarea', label: 'Description' },
        { key: 'imageUrl', type: 'image', label: 'Image URL' },
        { key: 'buttonText', type: 'text', label: 'Button Text' },
        { key: 'buttonHref', type: 'text', label: 'Button Link' }
      ]
    },

    {
      type: 'content-image-right',
      label: 'Content Image Right',
      icon: 'article',
      category: 'Content',
      defaultProps: {
        heading: 'Powerful features for everyone',
        description: 'Everything you need to create, manage, and optimize your landing pages in one place.',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        buttonText: 'Get Started',
        buttonHref: '#'
      },
      inputs: [
        { key: 'heading', type: 'text', label: 'Heading' },
        { key: 'description', type: 'textarea', label: 'Description' },
        { key: 'imageUrl', type: 'image', label: 'Image URL' },
        { key: 'buttonText', type: 'text', label: 'Button Text' },
        { key: 'buttonHref', type: 'text', label: 'Button Link' }
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
