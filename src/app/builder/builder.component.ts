import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderStateService } from '../core/services/builder-state.service';
import { ThemeService } from '../core/services/theme.service';
import { ComponentRegistryService } from '../core/services/component-registry.service';
import { ComponentDefinition } from '../core/models';
import { InspectorComponent } from '../shared/inspector.component';
import { ThemeEditorComponent } from '../shared/theme-editor.component';

@Component({
  selector: 'app-builder',
  imports: [CommonModule, InspectorComponent, ThemeEditorComponent],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss'
})
export class BuilderComponent implements OnInit {
  // Inject services
  readonly builderState = inject(BuilderStateService);
  readonly themeService = inject(ThemeService);
  readonly componentRegistry = inject(ComponentRegistryService);

  // UI state
  searchQuery = signal('');
  selectedCategory = signal<string | null>(null);

  ngOnInit() {
    // Initialize with a sample project
    const project = this.builderState.createNewProject('My Landing Page');
    
    // Apply default theme
    this.themeService.applyTheme(project.themeId);
  }

  // Top bar actions
  onExport() {
    console.log('Export clicked');
  }

  onPreview() {
    console.log('Preview clicked');
  }

  onSettings() {
    console.log('Settings clicked');
  }

  // Component library actions
  onComponentDragStart(componentType: string) {
    console.log('Drag started:', componentType);
  }

  onAddComponent(componentType: string) {
    const definition = this.componentRegistry.getDefinition(componentType);
    if (!definition) return;

    const newComponent = {
      id: crypto.randomUUID(),
      type: componentType,
      props: { ...definition.defaultProps }
    };

    this.builderState.addComponent(newComponent);
  }

  // Canvas actions
  onComponentClick(componentId: string) {
    this.builderState.selectComponent(componentId);
  }

  onDeleteComponent(componentId: string) {
    this.builderState.removeComponent(componentId);
  }

  // Search and filter
  get filteredComponents(): ComponentDefinition[] {
    let components = this.componentRegistry.getAllDefinitions();

    const category = this.selectedCategory();
    if (category) {
      components = components.filter((c) => c.category === category);
    }

    const query = this.searchQuery().toLowerCase();
    if (query) {
      components = components.filter((c) =>
        c.label.toLowerCase().includes(query) ||
        c.category.toLowerCase().includes(query)
      );
    }

    return components;
  }

  get categories(): string[] {
    return this.componentRegistry.getCategories();
  }
}
