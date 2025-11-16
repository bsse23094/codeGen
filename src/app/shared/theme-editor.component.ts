import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';
import { BuilderStateService } from '../core/services/builder-state.service';
import { FONT_PRESETS, LOGO_PRESETS, SPACING_PRESETS, ANIMATION_SPEED_PRESETS } from '../core/constants/customization-presets';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-theme-editor',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="theme-editor">
      <!-- Theme Preset Selector -->
      <div style="margin-bottom: var(--spacing-lg);">
        <label>Theme Preset</label>
        <select
          [value]="builderState.project()?.themeId || 'default'"
          (change)="onThemeChange($any($event.target).value)"
        >
          @for (theme of themes; track theme.id) {
            <option [value]="theme.id">{{ theme.name }}</option>
          }
        </select>
        @if (currentTheme(); as theme) {
          <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
            {{ theme.description }}
          </div>
        }
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <!-- Logo Section -->
      <div style="margin-bottom: var(--spacing-md);">
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md); font-weight: 600;">Logo</h5>
        
        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Logo Type</label>
          <select
            [value]="selectedLogoType()"
            (change)="onLogoTypeChange($any($event.target).value)"
          >
            <option value="preset">Preset Logo</option>
            <option value="custom">Custom URL</option>
            <option value="text">Text Only</option>
          </select>
        </div>

        @if (selectedLogoType() === 'preset') {
          <div style="margin-bottom: var(--spacing-md);">
            <label style="font-size: var(--text-sm);">Select Logo</label>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--spacing-sm); margin-top: var(--spacing-sm);">
              @for (logo of logoPresets; track logo.id) {
                <button
                  type="button"
                  [class.active]="selectedLogoId() === logo.id"
                  (click)="selectLogoPreset(logo.id)"
                  style="padding: var(--spacing-sm); border: 2px solid transparent; border-radius: var(--radius-md); background: var(--color-surface); cursor: pointer; transition: all 0.2s; aspect-ratio: 1;"
                  [style.border-color]="selectedLogoId() === logo.id ? 'var(--color-primary)' : 'transparent'"
                  [attr.title]="logo.name"
                >
                  <div [innerHTML]="sanitizeSvg(logo.svg)" style="width: 100%; height: 100%; color: var(--color-primary);"></div>
                </button>
              }
            </div>
          </div>
        } @else if (selectedLogoType() === 'custom') {
          <div style="margin-bottom: var(--spacing-md);">
            <label style="font-size: var(--text-sm);">Logo URL</label>
            <input
              type="url"
              [value]="currentTheme()?.tokens?.logo || ''"
              (input)="updateToken('logo', $any($event.target).value)"
              placeholder="https://example.com/logo.png"
            />
          </div>
        }

        @if (selectedLogoType() !== 'text') {
          <div style="margin-bottom: var(--spacing-md);">
            <label style="font-size: var(--text-sm);">Logo Size</label>
            <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
              <input
                type="range"
                min="20"
                max="80"
                step="4"
                [value]="parseLogoSize()"
                (input)="updateLogoSize($any($event.target).value)"
                style="flex: 1;"
              />
              <span style="min-width: 45px; text-align: right; font-size: var(--text-sm); color: var(--color-muted);">
                {{ parseLogoSize() }}px
              </span>
            </div>
          </div>
        }
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <!-- Typography Section -->
      <div style="margin-bottom: var(--spacing-md);">
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md); font-weight: 600;">Typography</h5>
        
        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Font Preset</label>
          <select
            [value]="selectedFontPresetId()"
            (change)="onFontPresetChange($any($event.target).value)"
          >
            <option value="">Custom Fonts</option>
            <optgroup label="Modern">
              @for (font of fontPresets; track font.id) {
                @if (font.category === 'modern') {
                  <option [value]="font.id">{{ font.name }}</option>
                }
              }
            </optgroup>
            <optgroup label="Elegant">
              @for (font of fontPresets; track font.id) {
                @if (font.category === 'elegant') {
                  <option [value]="font.id">{{ font.name }}</option>
                }
              }
            </optgroup>
            <optgroup label="Classic">
              @for (font of fontPresets; track font.id) {
                @if (font.category === 'classic') {
                  <option [value]="font.id">{{ font.name }}</option>
                }
              }
            </optgroup>
            <optgroup label="Playful">
              @for (font of fontPresets; track font.id) {
                @if (font.category === 'playful') {
                  <option [value]="font.id">{{ font.name }}</option>
                }
              }
            </optgroup>
          </select>
          @if (selectedFontPresetId()) {
            <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
              Uses Google Fonts
            </div>
          }
        </div>

        @if (!selectedFontPresetId()) {
          <div style="margin-bottom: var(--spacing-md);">
            <label style="font-size: var(--text-sm);">Heading Font</label>
            <input
              type="text"
              [value]="currentTheme()?.tokens?.fontHeading || ''"
              (input)="updateToken('fontHeading', $any($event.target).value)"
              placeholder="'Inter', sans-serif"
            />
          </div>

          <div style="margin-bottom: var(--spacing-md);">
            <label style="font-size: var(--text-sm);">Body Font</label>
            <input
              type="text"
              [value]="currentTheme()?.tokens?.fontBody || ''"
              (input)="updateToken('fontBody', $any($event.target).value)"
              placeholder="'Inter', sans-serif"
            />
          </div>
        }
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <div style="margin-bottom: var(--spacing-md);">
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md); font-weight: 600;">Colors</h5>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Primary Color</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="color"
              [value]="currentTheme()?.tokens?.colorPrimary || '#6366f1'"
              (input)="updateToken('colorPrimary', $any($event.target).value)"
              style="width: 50px; height: 36px; cursor: pointer;"
            />
            <input
              type="text"
              [value]="currentTheme()?.tokens?.colorPrimary || '#6366f1'"
              (input)="updateToken('colorPrimary', $any($event.target).value)"
              style="flex: 1; font-family: monospace;"
              placeholder="#6366f1"
            />
          </div>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Background Color</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="color"
              [value]="currentTheme()?.tokens?.colorBackground || '#050816'"
              (input)="updateToken('colorBackground', $any($event.target).value)"
              style="width: 50px; height: 36px; cursor: pointer;"
            />
            <input
              type="text"
              [value]="currentTheme()?.tokens?.colorBackground || '#050816'"
              (input)="updateToken('colorBackground', $any($event.target).value)"
              style="flex: 1; font-family: monospace;"
              placeholder="#050816"
            />
          </div>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Surface Color</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="color"
              [value]="currentTheme()?.tokens?.colorSurface || '#0b1020'"
              (input)="updateToken('colorSurface', $any($event.target).value)"
              style="width: 50px; height: 36px; cursor: pointer;"
            />
            <input
              type="text"
              [value]="currentTheme()?.tokens?.colorSurface || '#0b1020'"
              (input)="updateToken('colorSurface', $any($event.target).value)"
              style="flex: 1; font-family: monospace;"
              placeholder="#0b1020"
            />
          </div>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Text Color</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="color"
              [value]="currentTheme()?.tokens?.colorText || '#f9fafb'"
              (input)="updateToken('colorText', $any($event.target).value)"
              style="width: 50px; height: 36px; cursor: pointer;"
            />
            <input
              type="text"
              [value]="currentTheme()?.tokens?.colorText || '#f9fafb'"
              (input)="updateToken('colorText', $any($event.target).value)"
              style="flex: 1; font-family: monospace;"
              placeholder="#f9fafb"
            />
          </div>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Muted Color</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="color"
              [value]="currentTheme()?.tokens?.colorMuted || '#9ca3af'"
              (input)="updateToken('colorMuted', $any($event.target).value)"
              style="width: 50px; height: 36px; cursor: pointer;"
            />
            <input
              type="text"
              [value]="currentTheme()?.tokens?.colorMuted || '#9ca3af'"
              (input)="updateToken('colorMuted', $any($event.target).value)"
              style="flex: 1; font-family: monospace;"
              placeholder="#9ca3af"
            />
          </div>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <div>
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md); font-weight: 600;">Appearance</h5>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Border Radius</label>
          <select
            [value]="currentTheme()?.tokens?.borderRadius || '1rem'"
            (change)="updateToken('borderRadius', $any($event.target).value)"
          >
            <option value="0">None (0px)</option>
            <option value="0.25rem">Small (4px)</option>
            <option value="0.5rem">Medium (8px)</option>
            <option value="0.75rem">Large (12px)</option>
            <option value="1rem">Extra Large (16px)</option>
            <option value="1.5rem">2XL (24px)</option>
          </select>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Border Radius (Custom)</label>
          <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
            <input
              type="range"
              min="0"
              max="32"
              step="1"
              [value]="parseRadius(currentTheme()?.tokens?.borderRadius || '1rem')"
              (input)="updateRadiusFromSlider($any($event.target).value)"
              style="flex: 1;"
            />
            <span style="min-width: 45px; text-align: right; font-size: var(--text-sm); color: var(--color-muted);">
              {{ parseRadius(currentTheme()?.tokens?.borderRadius || '1rem') }}px
            </span>
          </div>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Shadow Intensity</label>
          <select
            [value]="getShadowPreset()"
            (change)="updateShadow($any($event.target).value)"
          >
            <option value="none">None</option>
            <option value="soft">Soft</option>
            <option value="medium">Medium</option>
            <option value="strong">Strong</option>
          </select>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Base Spacing</label>
          <select
            [value]="currentTheme()?.tokens?.spacing || '1rem'"
            (change)="updateToken('spacing', $any($event.target).value)"
          >
            @for (spacing of spacingPresets; track spacing.value) {
              <option [value]="spacing.value">{{ spacing.label }}</option>
            }
          </select>
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label style="font-size: var(--text-sm);">Animation Speed</label>
          <select
            [value]="currentTheme()?.tokens?.animationSpeed || '0.3s'"
            (change)="updateToken('animationSpeed', $any($event.target).value)"
          >
            @for (speed of animationSpeedPresets; track speed.value) {
              <option [value]="speed.value">{{ speed.label }}</option>
            }
          </select>
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <div style="margin-bottom: var(--spacing-md);">
        <button 
          class="btn btn-sm btn-secondary" 
          (click)="resetToPreset()"
          style="width: 100%;"
        >
          <span class="material-symbols-outlined" style="font-size: 18px;">refresh</span>
          Reset to Preset
        </button>
      </div>
    </div>
  `,
  styles: [`
    .theme-editor {
      // Component-specific styles
    }
  `]
})
export class ThemeEditorComponent {
  themeService = inject(ThemeService);
  builderState = inject(BuilderStateService);
  private sanitizer = inject(DomSanitizer);

  themes = this.themeService.getThemes();
  currentTheme = this.themeService.currentTheme;

  // Import presets
  fontPresets = FONT_PRESETS;
  logoPresets = LOGO_PRESETS;
  spacingPresets = SPACING_PRESETS;
  animationSpeedPresets = ANIMATION_SPEED_PRESETS;

  // Local state
  selectedLogoType = signal<'preset' | 'custom' | 'text'>('preset');
  selectedLogoId = signal<string>('circle-dot');
  selectedFontPresetId = signal<string>('lexend-modern');

  onThemeChange(themeId: string) {
    this.themeService.applyTheme(themeId);
    this.builderState.updateTheme(themeId);
  }

  updateToken(key: string, value: string) {
    this.themeService.updateToken(key as any, value);
  }

  // Logo methods
  onLogoTypeChange(type: 'preset' | 'custom' | 'text') {
    this.selectedLogoType.set(type);
    if (type === 'preset') {
      this.selectLogoPreset(this.selectedLogoId());
    } else if (type === 'text') {
      this.updateToken('logo', '');
    }
  }

  selectLogoPreset(logoId: string) {
    this.selectedLogoId.set(logoId);
    const logo = this.logoPresets.find(l => l.id === logoId);
    if (logo) {
      // Store the SVG in the logo token
      this.updateToken('logo', `preset:${logoId}`);
    }
  }

  parseLogoSize(): number {
    const size = this.currentTheme()?.tokens?.logoSize || '40px';
    return parseInt(size, 10);
  }

  updateLogoSize(value: string) {
    this.updateToken('logoSize', `${value}px`);
  }

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  // Font methods
  onFontPresetChange(fontId: string) {
    this.selectedFontPresetId.set(fontId);
    if (fontId) {
      const font = this.fontPresets.find(f => f.id === fontId);
      if (font) {
        this.updateToken('fontHeading', font.heading);
        this.updateToken('fontBody', font.body);
        // Load Google Fonts
        if (font.googleFontsUrl) {
          this.loadGoogleFont(font.googleFontsUrl);
        }
      }
    }
  }

  private loadGoogleFont(url: string) {
    // Remove existing font links
    const existingLinks = document.querySelectorAll('link[data-font-preset]');
    existingLinks.forEach(link => link.remove());

    // Add new font link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-font-preset', 'true');
    document.head.appendChild(link);
  }

  parseRadius(radiusValue: string): number {
    // Convert rem/px to number
    const match = radiusValue.match(/[\d.]+/);
    if (!match) return 0;
    const num = parseFloat(match[0]);
    if (radiusValue.includes('rem')) {
      return Math.round(num * 16); // Convert rem to px
    }
    return Math.round(num);
  }

  updateRadiusFromSlider(value: string) {
    const pixels = parseInt(value, 10);
    const rem = pixels / 16;
    this.updateToken('borderRadius', `${rem}rem`);
  }

  getShadowPreset(): string {
    const shadow = this.currentTheme()?.tokens?.shadowSoft || '';
    if (shadow.includes('0 0 0') || !shadow) return 'none';
    if (shadow.includes('0 8px 30px') || shadow.includes('0 1px 3px')) return 'soft';
    if (shadow.includes('0 10px 40px') || shadow.includes('0 4px 6px')) return 'medium';
    if (shadow.includes('0 20px 50px') || shadow.includes('0 18px 45px')) return 'strong';
    return 'soft';
  }

  updateShadow(preset: string) {
    const shadows: Record<string, string> = {
      none: '0 0 0 rgba(0, 0, 0, 0)',
      soft: '0 8px 30px rgba(0, 0, 0, 0.12)',
      medium: '0 10px 40px rgba(0, 0, 0, 0.2)',
      strong: '0 20px 50px rgba(0, 0, 0, 0.3)'
    };
    this.updateToken('shadowSoft', shadows[preset] || shadows['soft']);
  }

  resetToPreset() {
    const themeId = this.builderState.project()?.themeId || 'default';
    this.themeService.applyTheme(themeId);
  }
}
