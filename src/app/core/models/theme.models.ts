/**
 * Theme Configuration
 * Defines the visual appearance of the site
 */
export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  tokens: {
    colorPrimary: string;
    colorPrimarySoft: string;
    colorBackground: string;
    colorSurface: string;
    colorText: string;
    colorMuted: string;
    borderRadius: string;      // "0.75rem"
    shadowSoft: string;        // CSS shadow string
    fontHeading: string;       // "'DM Sans', system-ui"
    fontBody: string;
    // New customization options
    logo?: string;             // Logo URL or preset
    logoSize?: string;         // e.g., "40px"
    spacing?: string;          // Base spacing unit
    animationSpeed?: string;   // Animation duration
  };
}

/**
 * Font Preset Configuration
 */
export interface FontPreset {
  id: string;
  name: string;
  category: 'modern' | 'classic' | 'playful' | 'elegant';
  heading: string;
  body: string;
  googleFontsUrl?: string;
}

/**
 * Logo Preset Configuration
 */
export interface LogoPreset {
  id: string;
  name: string;
  category: 'minimal' | 'tech' | 'creative' | 'business';
  svg: string;
  colors: string[];  // Customizable colors in the SVG
}
