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
  };
}
