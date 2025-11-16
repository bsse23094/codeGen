import { Component, Input, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuilderStateService } from '../core/services/builder-state.service';
import { ComponentRegistryService } from '../core/services/component-registry.service';
import { ArrayInputComponent, ArrayInputField } from './array-input.component';

@Component({
  selector: 'app-inspector',
  imports: [CommonModule, FormsModule, ArrayInputComponent],
  template: `
    <div class="inspector">
      <h4 style="margin-bottom: var(--spacing-lg);">Properties</h4>

      @if (componentData(); as data) {
        <div style="margin-bottom: var(--spacing-md);">
          <div style="font-size: var(--text-sm); color: var(--color-muted); margin-bottom: var(--spacing-lg);">
            <strong>{{ data.definition.label }}</strong>
          </div>

          @for (input of data.definition.inputs; track input.key) {
            <div style="margin-bottom: var(--spacing-lg);">
              @if (input.type === 'array' && input.arrayConfig) {
                <!-- Array input with visual editor -->
                <app-array-input
                  [label]="input.label"
                  [itemLabel]="input.arrayConfig.itemLabel"
                  [fields]="input.arrayConfig.fields"
                  [value]="parseArrayValue(data.instance.props[input.key])"
                  (valueChange)="updateProp(input.key, $event)"
                />
              } @else {
                <label>{{ input.label }}</label>

                @if (input.type === 'text') {
                  <input
                    type="text"
                    [value]="data.instance.props[input.key] || ''"
                    (input)="updateProp(input.key, $any($event.target).value)"
                    [placeholder]="input.helperText || ''"
                  />
                } @else if (input.type === 'number') {
                  <input
                    type="number"
                    [value]="data.instance.props[input.key] || 0"
                    (input)="updateProp(input.key, +$any($event.target).value)"
                    [placeholder]="input.helperText || ''"
                  />
                } @else if (input.type === 'textarea') {
                  <textarea
                    [value]="data.instance.props[input.key] || ''"
                    (input)="updateProp(input.key, $any($event.target).value)"
                    [placeholder]="input.helperText || ''"
                    rows="4"
                  ></textarea>
                } @else if (input.type === 'richtext') {
                  <textarea
                    [value]="data.instance.props[input.key] || ''"
                    (input)="updateProp(input.key, $any($event.target).value)"
                    [placeholder]="input.helperText || ''"
                    rows="6"
                    style="font-family: monospace; font-size: var(--text-sm);"
                  ></textarea>
                  <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
                    Supports basic HTML formatting
                  </div>
                } @else if (input.type === 'color') {
                  <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                    <input
                      type="color"
                      [value]="data.instance.props[input.key] || '#000000'"
                      (input)="updateProp(input.key, $any($event.target).value)"
                      style="width: 50px; height: 36px; cursor: pointer;"
                    />
                    <input
                      type="text"
                      [value]="data.instance.props[input.key] || '#000000'"
                      (input)="updateProp(input.key, $any($event.target).value)"
                      style="flex: 1; font-family: monospace;"
                      placeholder="#000000"
                    />
                  </div>
                } @else if (input.type === 'image') {
                  <input
                    type="url"
                    [value]="data.instance.props[input.key] || ''"
                    (input)="updateProp(input.key, $any($event.target).value)"
                    [placeholder]="input.helperText || 'Enter image URL'"
                  />
                  @if (data.instance.props[input.key]) {
                    <div style="margin-top: var(--spacing-sm); border-radius: var(--radius-md); overflow: hidden; max-width: 200px;">
                      <img 
                        [src]="data.instance.props[input.key]" 
                        [alt]="input.label"
                        style="width: 100%; height: auto; display: block;"
                        (error)="$any($event.target).style.display='none'"
                      />
                    </div>
                  }
                } @else if (input.type === 'boolean') {
                  <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; padding: var(--spacing-sm) 0;">
                    <input
                      type="checkbox"
                      [checked]="data.instance.props[input.key]"
                      (change)="updateProp(input.key, $any($event.target).checked)"
                      style="width: 18px; height: 18px; cursor: pointer;"
                    />
                    <span style="font-size: var(--text-sm);">{{ input.label }}</span>
                  </label>
                } @else if (input.type === 'select' && input.options) {
                  <select
                    [value]="data.instance.props[input.key] || ''"
                    (change)="updateProp(input.key, $any($event.target).value)"
                  >
                    @for (option of input.options; track option.value) {
                      <option [value]="option.value">{{ option.label }}</option>
                    }
                  </select>
                }

                @if (input.helperText && input.type !== 'text' && input.type !== 'textarea' && input.type !== 'richtext' && input.type !== 'image') {
                  <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
                    {{ input.helperText }}
                  </div>
                }
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .inspector {
      // Component-specific styles if needed
    }
  `]
})
export class InspectorComponent {
  @Input() componentId!: string;

  private builderState = inject(BuilderStateService);
  private componentRegistry = inject(ComponentRegistryService);

  componentData = computed(() => {
    const page = this.builderState.activePage();
    if (!page) return null;

    const instance = this.findComponentById(page.components, this.componentId);
    if (!instance) return null;

    const definition = this.componentRegistry.getDefinition(instance.type);
    if (!definition) return null;

    return { instance, definition };
  });

  private findComponentById(components: any[], id: string): any {
    for (const comp of components) {
      if (comp.id === id) return comp;
      if (comp.children) {
        for (const slot of comp.children) {
          const found = this.findComponentById(slot, id);
          if (found) return found;
        }
      }
    }
    return null;
  }

  updateProp(key: string, value: any) {
    this.builderState.updateComponent(this.componentId, { [key]: value });
  }

  parseArrayValue(value: any): any[] {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }
}
