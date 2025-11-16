import { Injectable, signal } from '@angular/core';
import { ThemeConfig } from '../models';

/**
 * Theme Service
 * Manages theme configurations and applies them to the DOM
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSignal = signal<ThemeConfig | null>(null);
  currentTheme = this.currentThemeSignal.asReadonly();

  // Predefined themes
  private themes: ThemeConfig[] = [
    {
      id: 'default',
      name: 'Default Dark',
      description: 'Modern dark theme with purple accents',
      tokens: {
        colorPrimary: '#6366f1',
        colorPrimarySoft: '#eef2ff',
        colorBackground: '#050816',
        colorSurface: '#0b1020',
        colorText: '#f9fafb',
        colorMuted: '#9ca3af',
        borderRadius: '1rem',
        shadowSoft: '0 18px 45px rgba(15, 23, 42, 0.4)',
        fontHeading: "'Lexend Deca', sans-serif",
        fontBody: "'Lexend', sans-serif",
        logo: 'preset:circle-dot',
        logoSize: '40px',
        spacing: '1rem',
        animationSpeed: '0.3s'
      }
    },
    {
      id: 'startup',
      name: 'Startup',
      description: 'Clean and professional for SaaS products',
      tokens: {
        colorPrimary: '#6366f1',
        colorPrimarySoft: '#eef2ff',
        colorBackground: '#020617',
        colorSurface: '#0f172a',
        colorText: '#f9fafb',
        colorMuted: '#94a3b8',
        borderRadius: '0.75rem',
        shadowSoft: '0 20px 50px rgba(0, 0, 0, 0.5)',
        fontHeading: "'Inter', sans-serif",
        fontBody: "'Inter', sans-serif",
        logo: 'preset:hexagon-tech',
        logoSize: '36px',
        spacing: '1rem',
        animationSpeed: '0.3s'
      }
    },
    {
      id: 'retro',
      name: 'Retro',
      description: 'Warm vintage-inspired theme',
      tokens: {
        colorPrimary: '#ff6b6b',
        colorPrimarySoft: '#ffe3be',
        colorBackground: '#fff7e6',
        colorSurface: '#ffffff',
        colorText: '#1e293b',
        colorMuted: '#64748b',
        borderRadius: '0.5rem',
        shadowSoft: '0 8px 30px rgba(0, 0, 0, 0.12)',
        fontHeading: "'Space Grotesk', sans-serif",
        fontBody: "'Work Sans', sans-serif",
        logo: 'preset:star-burst',
        logoSize: '44px',
        spacing: '1.5rem',
        animationSpeed: '0.5s'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean monochrome design',
      tokens: {
        colorPrimary: '#000000',
        colorPrimarySoft: '#f5f5f5',
        colorBackground: '#ffffff',
        colorSurface: '#fafafa',
        colorText: '#0a0a0a',
        colorMuted: '#737373',
        borderRadius: '0.25rem',
        shadowSoft: '0 1px 3px rgba(0, 0, 0, 0.1)',
        fontHeading: "'Inter', sans-serif",
        fontBody: "'Inter', sans-serif",
        logo: 'preset:triangle-modern',
        logoSize: '38px',
        spacing: '0.5rem',
        animationSpeed: '0.2s'
      }
    }
  ];

  constructor() {}

  /**
   * Get all available themes
   */
  getThemes(): ThemeConfig[] {
    return this.themes;
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): ThemeConfig | null {
    return this.themes.find(t => t.id === themeId) || null;
  }

  /**
   * Apply theme to the document
   */
  applyTheme(themeId: string) {
    const theme = this.getTheme(themeId);
    if (!theme) return;

    this.currentThemeSignal.set(theme);

    // Apply CSS custom properties to :root
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.tokens.colorPrimary);
    root.style.setProperty('--color-primary-soft', theme.tokens.colorPrimarySoft);
    root.style.setProperty('--color-bg', theme.tokens.colorBackground);
    root.style.setProperty('--color-surface', theme.tokens.colorSurface);
    root.style.setProperty('--color-text', theme.tokens.colorText);
    root.style.setProperty('--color-muted', theme.tokens.colorMuted);
    root.style.setProperty('--radius-lg', theme.tokens.borderRadius);
    root.style.setProperty('--shadow-soft', theme.tokens.shadowSoft);
    root.style.setProperty('--font-heading', theme.tokens.fontHeading);
    root.style.setProperty('--font-body', theme.tokens.fontBody);
    
    // Apply new customization tokens
    if (theme.tokens.logo) {
      root.style.setProperty('--logo', theme.tokens.logo);
    }
    if (theme.tokens.logoSize) {
      root.style.setProperty('--logo-size', theme.tokens.logoSize);
    }
    if (theme.tokens.spacing) {
      root.style.setProperty('--spacing-base', theme.tokens.spacing);
    }
    if (theme.tokens.animationSpeed) {
      root.style.setProperty('--animation-speed', theme.tokens.animationSpeed);
    }

    // Apply theme class to body
    document.body.className = document.body.className
      .split(' ')
      .filter(c => !c.startsWith('theme-'))
      .join(' ');
    document.body.classList.add(`theme-${themeId}`);
  }

  /**
   * Update a specific token value
   */
  updateToken(key: keyof ThemeConfig['tokens'], value: string) {
    const theme = this.currentThemeSignal();
    if (!theme) return;

    const updatedTheme = {
      ...theme,
      tokens: { ...theme.tokens, [key]: value }
    };

    this.currentThemeSignal.set(updatedTheme);
    
    // Apply the updated value
    const cssVarName = this.tokenToCssVar(key);
    document.documentElement.style.setProperty(cssVarName, value);
  }

  private tokenToCssVar(key: keyof ThemeConfig['tokens']): string {
    const map: Record<string, string> = {
      colorPrimary: '--color-primary',
      colorPrimarySoft: '--color-primary-soft',
      colorBackground: '--color-bg',
      colorSurface: '--color-surface',
      colorText: '--color-text',
      colorMuted: '--color-muted',
      borderRadius: '--radius-lg',
      shadowSoft: '--shadow-soft',
      fontHeading: '--font-heading',
      fontBody: '--font-body',
      logo: '--logo',
      logoSize: '--logo-size',
      spacing: '--spacing-base',
      animationSpeed: '--animation-speed'
    };
    return map[key] || '';
  }
}
