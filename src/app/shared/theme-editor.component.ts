import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../core/services/theme.service';
import { BuilderStateService } from '../core/services/builder-state.service';

@Component({
  selector: 'app-theme-editor',
  imports: [CommonModule, FormsModule],
  template: `
    <div class="theme-editor">
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

  themes = this.themeService.getThemes();
  currentTheme = this.themeService.currentTheme;

  onThemeChange(themeId: string) {
    this.themeService.applyTheme(themeId);
    this.builderState.updateTheme(themeId);
  }

  updateToken(key: string, value: string) {
    this.themeService.updateToken(key as any, value);
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
