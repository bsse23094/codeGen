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
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md);">Colors</h5>

        <div style="margin-bottom: var(--spacing-md);">
          <label>Primary Color</label>
          <input
            type="color"
            [value]="currentTheme()?.tokens?.colorPrimary || '#6366f1'"
            (input)="updateToken('colorPrimary', $any($event.target).value)"
          />
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label>Background Color</label>
          <input
            type="color"
            [value]="currentTheme()?.tokens?.colorBackground || '#050816'"
            (input)="updateToken('colorBackground', $any($event.target).value)"
          />
        </div>

        <div style="margin-bottom: var(--spacing-md);">
          <label>Text Color</label>
          <input
            type="color"
            [value]="currentTheme()?.tokens?.colorText || '#f9fafb'"
            (input)="updateToken('colorText', $any($event.target).value)"
          />
        </div>
      </div>

      <hr style="border: none; border-top: 1px solid rgba(255, 255, 255, 0.1); margin: var(--spacing-lg) 0;" />

      <div>
        <h5 style="font-size: var(--text-sm); margin-bottom: var(--spacing-md);">Typography</h5>

        <div style="margin-bottom: var(--spacing-md);">
          <label>Border Radius</label>
          <select
            [value]="currentTheme()?.tokens?.borderRadius || '1rem'"
            (change)="updateToken('borderRadius', $any($event.target).value)"
          >
            <option value="0">None</option>
            <option value="0.25rem">Small</option>
            <option value="0.5rem">Medium</option>
            <option value="0.75rem">Large</option>
            <option value="1rem">Extra Large</option>
          </select>
        </div>
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
}
