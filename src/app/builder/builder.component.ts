import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { BuilderStateService } from '../core/services/builder-state.service';
import { ThemeService } from '../core/services/theme.service';
import { ComponentRegistryService } from '../core/services/component-registry.service';
import { ExportService } from '../core/services/export.service';
import { ComponentDefinition } from '../core/models';
import { InspectorComponent } from '../shared/inspector.component';
import { ThemeEditorComponent } from '../shared/theme-editor.component';

@Component({
  selector: 'app-builder',
  imports: [CommonModule, DragDropModule, InspectorComponent, ThemeEditorComponent],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.scss'
})
export class BuilderComponent implements OnInit {
  // Inject services
  readonly builderState = inject(BuilderStateService);
  readonly themeService = inject(ThemeService);
  readonly componentRegistry = inject(ComponentRegistryService);
  readonly exportService = inject(ExportService);

  // UI state
  searchQuery = signal('');
  selectedCategory = signal<string | null>(null);
  isExporting = signal(false);

  ngOnInit() {
    // Initialize with a sample project
    const project = this.builderState.createNewProject('My Landing Page');
    
    // Apply default theme
    this.themeService.applyTheme(project.themeId);
  }

  // Top bar actions
  async onExportHTML() {
    const project = this.builderState.project();
    if (!project) {
      alert('No project to export');
      return;
    }

    this.isExporting.set(true);
    try {
      await this.exportService.exportAsHTML(project);
      console.log('HTML export successful!');
    } catch (error) {
      console.error('HTML export failed:', error);
      alert('Export failed. Check console for details.');
    } finally {
      this.isExporting.set(false);
    }
  }

  async onExportReact() {
    const project = this.builderState.project();
    if (!project) {
      alert('No project to export');
      return;
    }

    this.isExporting.set(true);
    try {
      await this.exportService.exportAsReact(project);
      console.log('React export successful!');
    } catch (error) {
      console.error('React export failed:', error);
      alert('Export failed. Check console for details.');
    } finally {
      this.isExporting.set(false);
    }
  }

  onPreview() {
    const project = this.builderState.project();
    if (!project) {
      alert('No project to preview');
      return;
    }

    // Generate preview HTML
    this.exportService.generatePreviewHTML(project).then((html: string) => {
      // Open preview in new window
      const previewWindow = window.open('', '_blank', 'width=1200,height=800');
      if (previewWindow) {
        previewWindow.document.write(html);
        previewWindow.document.close();
      }
    }).catch((error: any) => {
      console.error('Preview failed:', error);
      alert('Preview failed. Check console for details.');
    });
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

  // Drag and drop
  onComponentDrop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex !== event.currentIndex) {
      this.builderState.reorderComponents(event.previousIndex, event.currentIndex);
    }
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
