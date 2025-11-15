import { Component, Input, inject, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuilderStateService } from '../core/services/builder-state.service';
import { ComponentRegistryService } from '../core/services/component-registry.service';

@Component({
  selector: 'app-inspector',
  imports: [CommonModule, FormsModule],
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
              <label>{{ input.label }}</label>

              @if (input.type === 'text') {
                <input
                  type="text"
                  [value]="data.instance.props[input.key] || ''"
                  (input)="updateProp(input.key, $any($event.target).value)"
                  [placeholder]="input.helperText || ''"
                />
              } @else if (input.type === 'textarea') {
                <textarea
                  [value]="data.instance.props[input.key] || ''"
                  (input)="updateProp(input.key, $any($event.target).value)"
                  [placeholder]="input.helperText || ''"
                ></textarea>
              } @else if (input.type === 'color') {
                <input
                  type="color"
                  [value]="data.instance.props[input.key] || '#000000'"
                  (input)="updateProp(input.key, $any($event.target).value)"
                />
              } @else if (input.type === 'boolean') {
                <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer;">
                  <input
                    type="checkbox"
                    [checked]="data.instance.props[input.key]"
                    (change)="updateProp(input.key, $any($event.target).checked)"
                  />
                  <span>{{ input.label }}</span>
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

              @if (input.helperText && input.type !== 'text' && input.type !== 'textarea') {
                <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
                  {{ input.helperText }}
                </div>
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
}
