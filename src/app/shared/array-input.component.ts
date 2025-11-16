import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ArrayInputField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'url' | 'icon' | 'list' | 'boolean';
  placeholder?: string;
}

@Component({
  selector: 'app-array-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="array-input">
      <div class="array-input-header">
        <label>{{ label }}</label>
        <button 
          type="button" 
          class="btn btn-sm btn-primary" 
          (click)="addItem()"
          style="padding: 0.25rem 0.75rem; font-size: var(--text-xs);"
        >
          <span class="material-symbols-outlined" style="font-size: 16px;">add</span>
          Add {{ itemLabel }}
        </button>
      </div>

      @if (items().length === 0) {
        <div style="padding: var(--spacing-lg); text-align: center; color: var(--color-muted); font-size: var(--text-sm); border: 2px dashed var(--color-border); border-radius: var(--radius-md); background: var(--color-surface);">
          No items yet. Click "Add {{ itemLabel }}" to create one.
        </div>
      }

      <div class="array-input-items">
        @for (item of items(); track $index) {
          <div class="array-input-item" [class.collapsed]="collapsedItems()[$index]">
            <div class="array-input-item-header">
              <button
                type="button"
                class="collapse-toggle"
                (click)="toggleCollapse($index)"
              >
                <span class="material-symbols-outlined">
                  {{ collapsedItems()[$index] ? 'expand_more' : 'expand_less' }}
                </span>
              </button>
              <span class="item-title">{{ getItemTitle(item, $index) }}</span>
              <div class="item-actions">
                @if ($index > 0) {
                  <button
                    type="button"
                    class="btn-icon"
                    (click)="moveItem($index, -1)"
                    title="Move up"
                  >
                    <span class="material-symbols-outlined">arrow_upward</span>
                  </button>
                }
                @if ($index < items().length - 1) {
                  <button
                    type="button"
                    class="btn-icon"
                    (click)="moveItem($index, 1)"
                    title="Move down"
                  >
                    <span class="material-symbols-outlined">arrow_downward</span>
                  </button>
                }
                <button
                  type="button"
                  class="btn-icon btn-danger"
                  (click)="removeItem($index)"
                  title="Delete"
                >
                  <span class="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            @if (!collapsedItems()[$index]) {
              <div class="array-input-item-fields">
                @for (field of fields; track field.key) {
                  <div class="field-group">
                    <label style="font-size: var(--text-sm);">{{ field.label }}</label>
                    @if (field.type === 'textarea') {
                      <textarea
                        [value]="item[field.key] || ''"
                        (input)="updateField($index, field.key, $any($event.target).value)"
                        [placeholder]="field.placeholder || ''"
                        rows="3"
                      ></textarea>
                    } @else if (field.type === 'icon') {
                      <div style="display: flex; gap: var(--spacing-sm); align-items: center;">
                        <input
                          type="text"
                          [value]="item[field.key] || ''"
                          (input)="updateField($index, field.key, $any($event.target).value)"
                          [placeholder]="field.placeholder || 'Icon name'"
                          style="flex: 1;"
                        />
                        @if (item[field.key]) {
                          <span class="material-symbols-outlined" style="color: var(--color-primary);">
                            {{ item[field.key] }}
                          </span>
                        }
                      </div>
                      <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
                        Material Symbols icon name
                      </div>
                    } @else if (field.type === 'list') {
                      <textarea
                        [value]="getListValue(item[field.key])"
                        (input)="updateListField($index, field.key, $any($event.target).value)"
                        [placeholder]="field.placeholder || 'One item per line'"
                        rows="4"
                        style="font-family: var(--font-body);"
                      ></textarea>
                      <div style="font-size: var(--text-xs); color: var(--color-muted); margin-top: var(--spacing-xs);">
                        Enter one item per line
                      </div>
                    } @else if (field.type === 'boolean') {
                      <label style="display: flex; align-items: center; gap: var(--spacing-sm); cursor: pointer; padding: var(--spacing-sm) 0;">
                        <input
                          type="checkbox"
                          [checked]="item[field.key]"
                          (change)="updateField($index, field.key, $any($event.target).checked)"
                          style="width: 18px; height: 18px; cursor: pointer;"
                        />
                        <span style="font-size: var(--text-sm);">{{ field.label }}</span>
                      </label>
                    } @else {
                      <input
                        [type]="field.type === 'url' ? 'url' : 'text'"
                        [value]="item[field.key] || ''"
                        (input)="updateField($index, field.key, $any($event.target).value)"
                        [placeholder]="field.placeholder || ''"
                      />
                    }
                  </div>
                }
              </div>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .array-input {
      margin-bottom: var(--spacing-lg);
    }

    .array-input-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-md);
    }

    .array-input-items {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .array-input-item {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      overflow: hidden;
      transition: all 0.2s;
    }

    .array-input-item:hover {
      border-color: var(--color-primary);
    }

    .array-input-item-header {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      padding: var(--spacing-sm) var(--spacing-md);
      background: rgba(var(--color-primary-rgb, 99, 102, 241), 0.05);
      cursor: pointer;
      user-select: none;
    }

    .collapse-toggle {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
      color: var(--color-text);
      display: flex;
      align-items: center;
      transition: transform 0.2s;
    }

    .collapsed .collapse-toggle {
      transform: rotate(0deg);
    }

    .item-title {
      flex: 1;
      font-weight: 500;
      font-size: var(--text-sm);
      color: var(--color-text);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .item-actions {
      display: flex;
      gap: var(--spacing-xs);
    }

    .btn-icon {
      background: transparent;
      border: none;
      padding: 0.25rem;
      cursor: pointer;
      color: var(--color-muted);
      display: flex;
      align-items: center;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }

    .btn-icon:hover {
      background: rgba(var(--color-primary-rgb, 99, 102, 241), 0.1);
      color: var(--color-primary);
    }

    .btn-icon.btn-danger:hover {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .btn-icon .material-symbols-outlined {
      font-size: 18px;
    }

    .array-input-item-fields {
      padding: var(--spacing-md);
      display: flex;
      flex-direction: column;
      gap: var(--spacing-md);
    }

    .array-input-item.collapsed .array-input-item-fields {
      display: none;
    }

    .field-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-xs);
    }
  `]
})
export class ArrayInputComponent {
  @Input() label: string = 'Items';
  @Input() itemLabel: string = 'Item';
  @Input() fields: ArrayInputField[] = [];
  @Input() value: any[] = [];
  @Output() valueChange = new EventEmitter<any[]>();

  items = signal<any[]>([]);
  collapsedItems = signal<boolean[]>([]);

  ngOnInit() {
    this.items.set(this.value || []);
    this.collapsedItems.set(new Array(this.items().length).fill(false));
  }

  ngOnChanges() {
    if (this.value) {
      this.items.set(this.value);
      // Maintain collapsed state, add false for new items
      const currentCollapsed = this.collapsedItems();
      const newCollapsed = [...currentCollapsed];
      while (newCollapsed.length < this.value.length) {
        newCollapsed.push(false);
      }
      this.collapsedItems.set(newCollapsed);
    }
  }

  addItem() {
    const newItem: any = {};
    this.fields.forEach(field => {
      newItem[field.key] = '';
    });
    const updated = [...this.items(), newItem];
    this.items.set(updated);
    this.collapsedItems.set([...this.collapsedItems(), false]);
    this.valueChange.emit(updated);
  }

  removeItem(index: number) {
    const updated = this.items().filter((_, i) => i !== index);
    const collapsed = this.collapsedItems().filter((_, i) => i !== index);
    this.items.set(updated);
    this.collapsedItems.set(collapsed);
    this.valueChange.emit(updated);
  }

  moveItem(index: number, direction: number) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.items().length) return;

    const updated = [...this.items()];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    
    const collapsed = [...this.collapsedItems()];
    [collapsed[index], collapsed[newIndex]] = [collapsed[newIndex], collapsed[index]];
    
    this.items.set(updated);
    this.collapsedItems.set(collapsed);
    this.valueChange.emit(updated);
  }

  updateField(index: number, key: string, value: any) {
    const updated = [...this.items()];
    updated[index] = { ...updated[index], [key]: value };
    this.items.set(updated);
    this.valueChange.emit(updated);
  }

  updateListField(index: number, key: string, value: string) {
    // Convert newline-separated text to array
    const array = value.split('\n').filter(line => line.trim() !== '');
    this.updateField(index, key, array);
  }

  getListValue(value: any): string {
    // Convert array to newline-separated text
    if (Array.isArray(value)) {
      return value.join('\n');
    }
    return '';
  }

  toggleCollapse(index: number) {
    const collapsed = [...this.collapsedItems()];
    collapsed[index] = !collapsed[index];
    this.collapsedItems.set(collapsed);
  }

  getItemTitle(item: any, index: number): string {
    // Try to find a meaningful title from the item
    const titleField = this.fields.find(f => 
      f.key === 'title' || f.key === 'name' || f.key === 'question' || f.key === 'heading'
    );
    
    if (titleField && item[titleField.key]) {
      return item[titleField.key].substring(0, 50) + (item[titleField.key].length > 50 ? '...' : '');
    }
    
    return `${this.itemLabel} ${index + 1}`;
  }
}
