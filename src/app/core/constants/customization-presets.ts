import { FontPreset, LogoPreset } from '../models/theme.models';

/**
 * Font Presets
 * Curated font combinations from Google Fonts
 */
export const FONT_PRESETS: FontPreset[] = [
  {
    id: 'lexend-modern',
    name: 'Lexend (Modern)',
    category: 'modern',
    heading: "'Lexend Deca', sans-serif",
    body: "'Lexend', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=Lexend:wght@300;400;500&display=swap'
  },
  {
    id: 'inter-clean',
    name: 'Inter (Clean)',
    category: 'modern',
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'plus-jakarta',
    name: 'Plus Jakarta Sans',
    category: 'modern',
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'manrope-rounded',
    name: 'Manrope (Rounded)',
    category: 'modern',
    heading: "'Manrope', sans-serif",
    body: "'Manrope', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk (Tech)',
    category: 'modern',
    heading: "'Space Grotesk', sans-serif",
    body: "'Work Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@300;400;500&display=swap'
  },
  {
    id: 'playfair-elegant',
    name: 'Playfair Display (Elegant)',
    category: 'elegant',
    heading: "'Playfair Display', serif",
    body: "'Lora', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Lora:wght@400;500;600&display=swap'
  },
  {
    id: 'cormorant-luxury',
    name: 'Cormorant (Luxury)',
    category: 'elegant',
    heading: "'Cormorant Garamond', serif",
    body: "'Spectral', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Spectral:wght@300;400;500&display=swap'
  },
  {
    id: 'crimson-classic',
    name: 'Crimson Pro (Classic)',
    category: 'classic',
    heading: "'Crimson Pro', serif",
    body: "'Source Serif Pro', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700;800&family=Source+Serif+Pro:wght@300;400;600&display=swap'
  },
  {
    id: 'merriweather-traditional',
    name: 'Merriweather (Traditional)',
    category: 'classic',
    heading: "'Merriweather', serif",
    body: "'Merriweather', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap'
  },
  {
    id: 'poppins-friendly',
    name: 'Poppins (Friendly)',
    category: 'playful',
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap'
  },
  {
    id: 'quicksand-fun',
    name: 'Quicksand (Fun)',
    category: 'playful',
    heading: "'Quicksand', sans-serif",
    body: "'Nunito', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Nunito:wght@300;400;600&display=swap'
  },
  {
    id: 'dm-sans-balanced',
    name: 'DM Sans (Balanced)',
    category: 'modern',
    heading: "'DM Sans', sans-serif",
    body: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
  }
];

/**
 * Logo Presets
 * SVG logos that can be customized with theme colors
 */
export const LOGO_PRESETS: LogoPreset[] = [
  {
    id: 'circle-dot',
    name: 'Circle Dot',
    category: 'minimal',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="currentColor" stroke-width="2"/>
      <circle cx="20" cy="20" r="6" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'triangle-modern',
    name: 'Triangle Modern',
    category: 'minimal',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5L35 35H5L20 5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'hexagon-tech',
    name: 'Hexagon',
    category: 'tech',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3L33.66 11.5V28.5L20 37L6.34 28.5V11.5L20 3Z" stroke="currentColor" stroke-width="2"/>
      <circle cx="20" cy="20" r="4" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'cube-3d',
    name: 'Cube 3D',
    category: 'tech',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5L35 13V27L20 35L5 27V13L20 5Z" stroke="currentColor" stroke-width="2"/>
      <path d="M20 5V35M5 13L20 21L35 13M20 21V35" stroke="currentColor" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'rocket-launch',
    name: 'Rocket',
    category: 'creative',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 5C20 5 30 8 30 20C30 25 28 30 25 33L15 33C12 30 10 25 10 20C10 8 20 5 20 5Z" stroke="currentColor" stroke-width="2"/>
      <circle cx="20" cy="18" r="3" fill="currentColor"/>
      <path d="M15 33L13 38M25 33L27 38" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'lightning-bolt',
    name: 'Lightning',
    category: 'creative',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 3L8 22H20L18 37L32 18H20L22 3Z" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'star-burst',
    name: 'Star Burst',
    category: 'creative',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2L22 18L38 20L22 22L20 38L18 22L2 20L18 18L20 2Z" fill="currentColor"/>
      <circle cx="20" cy="20" r="5" fill="white"/>
    </svg>`
  },
  {
    id: 'wave-modern',
    name: 'Wave',
    category: 'minimal',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 20C5 20 10 10 15 10C20 10 20 30 25 30C30 30 35 20 35 20" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'infinity-loop',
    name: 'Infinity',
    category: 'minimal',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 20C12 14.5 14.5 12 18 12C21.5 12 24 14.5 26 20C28 25.5 30.5 28 34 28C37.5 28 40 25.5 40 20C40 14.5 37.5 12 34 12C30.5 12 28 14.5 26 20C24 25.5 21.5 28 18 28C14.5 28 12 25.5 12 20Z" fill="currentColor"/>
    </svg>`
  },
  {
    id: 'diamond-gem',
    name: 'Diamond',
    category: 'business',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 13L20 35L32 13L27 5H13L8 13Z" stroke="currentColor" stroke-width="2"/>
      <path d="M8 13H32M13 5L20 13M27 5L20 13M20 13V35" stroke="currentColor" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: 'shield-protection',
    name: 'Shield',
    category: 'business',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 3L33 8V18C33 27 28 33 20 37C12 33 7 27 7 18V8L20 3Z" stroke="currentColor" stroke-width="2"/>
      <path d="M15 20L18 23L25 16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: 'crown-premium',
    name: 'Crown',
    category: 'business',
    colors: ['primary'],
    svg: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 28L8 12L15 18L20 8L25 18L32 12L35 28H5Z" stroke="currentColor" stroke-width="2" fill="currentColor" fill-opacity="0.2"/>
      <circle cx="8" cy="12" r="2" fill="currentColor"/>
      <circle cx="20" cy="8" r="2" fill="currentColor"/>
      <circle cx="32" cy="12" r="2" fill="currentColor"/>
    </svg>`
  }
];

/**
 * Spacing Presets
 */
export const SPACING_PRESETS = [
  { label: 'Compact', value: '0.25rem' },
  { label: 'Cozy', value: '0.5rem' },
  { label: 'Normal', value: '1rem' },
  { label: 'Relaxed', value: '1.5rem' },
  { label: 'Spacious', value: '2rem' }
];

/**
 * Animation Speed Presets
 */
export const ANIMATION_SPEED_PRESETS = [
  { label: 'Fast', value: '0.2s' },
  { label: 'Normal', value: '0.3s' },
  { label: 'Slow', value: '0.5s' },
  { label: 'Very Slow', value: '0.8s' }
];
