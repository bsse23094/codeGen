import { Injectable, signal, computed } from '@angular/core';
import { ProjectConfig, PageConfig, ComponentInstance } from '../models';

/**
 * Builder State Service
 * Manages the current project state, undo/redo, and all builder operations
 */
@Injectable({
  providedIn: 'root'
})
export class BuilderStateService {
  // Maximum history stack depth
  private readonly MAX_HISTORY = 50;

  // Current project
  private projectSignal = signal<ProjectConfig | null>(null);
  
  // Current active page
  private activePageIdSignal = signal<string | null>(null);
  
  // Selected component ID
  private selectedComponentIdSignal = signal<string | null>(null);
  
  // History stacks for undo/redo
  private history: ProjectConfig[] = [];
  private historyIndex = -1;

  // Public computed signals
  project = this.projectSignal.asReadonly();
  activePageId = this.activePageIdSignal.asReadonly();
  selectedComponentId = this.selectedComponentIdSignal.asReadonly();
  
  activePage = computed(() => {
    const project = this.projectSignal();
    const pageId = this.activePageIdSignal();
    if (!project || !pageId) return null;
    return project.pages.find(p => p.id === pageId) || null;
  });

  canUndo = computed(() => this.historyIndex > 0);
  canRedo = computed(() => this.historyIndex < this.history.length - 1);

  constructor() {}

  /**
   * Load or create a new project
   */
  loadProject(project: ProjectConfig) {
    this.projectSignal.set(project);
    this.activePageIdSignal.set(project.pages[0]?.id || null);
    this.selectedComponentIdSignal.set(null);
    this.resetHistory();
    this.saveToHistory();
  }

  /**
   * Create a new blank project
   */
  createNewProject(name: string): ProjectConfig {
    const project: ProjectConfig = {
      id: this.generateId(),
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      themeId: 'default',
      pages: [{
        id: this.generateId(),
        name: 'Home',
        routePath: '/',
        components: []
      }],
      settings: {
        exportFramework: 'html'
      }
    };
    this.loadProject(project);
    return project;
  }

  /**
   * Add a component to the active page
   */
  addComponent(component: ComponentInstance, index?: number) {
    const project = this.projectSignal();
    const page = this.activePage();
    if (!project || !page) return;

    const updatedPage = { ...page };
    if (index !== undefined) {
      updatedPage.components = [
        ...page.components.slice(0, index),
        component,
        ...page.components.slice(index)
      ];
    } else {
      updatedPage.components = [...page.components, component];
    }

    this.updatePage(updatedPage);
    this.selectedComponentIdSignal.set(component.id);
  }

  /**
   * Update a component's properties
   */
  updateComponent(componentId: string, props: Record<string, any>) {
    const project = this.projectSignal();
    const page = this.activePage();
    if (!project || !page) return;

    const updatedComponents = this.updateComponentInTree(page.components, componentId, props);
    this.updatePage({ ...page, components: updatedComponents });
  }

  /**
   * Remove a component
   */
  removeComponent(componentId: string) {
    const project = this.projectSignal();
    const page = this.activePage();
    if (!project || !page) return;

    const updatedComponents = this.removeComponentFromTree(page.components, componentId);
    this.updatePage({ ...page, components: updatedComponents });
    
    if (this.selectedComponentIdSignal() === componentId) {
      this.selectedComponentIdSignal.set(null);
    }
  }

  /**
   * Reorder components
   */
  reorderComponents(previousIndex: number, currentIndex: number) {
    const project = this.projectSignal();
    const page = this.activePage();
    if (!project || !page) return;

    const components = [...page.components];
    const [removed] = components.splice(previousIndex, 1);
    components.splice(currentIndex, 0, removed);

    this.updatePage({ ...page, components });
  }

  /**
   * Select a component
   */
  selectComponent(componentId: string | null) {
    this.selectedComponentIdSignal.set(componentId);
  }

  /**
   * Update project theme
   */
  updateTheme(themeId: string) {
    const project = this.projectSignal();
    if (!project) return;

    this.updateProject({ ...project, themeId });
  }

  /**
   * Update project name
   */
  updateProjectName(name: string) {
    const project = this.projectSignal();
    if (!project) return;

    this.updateProject({ ...project, name });
  }

  /**
   * Undo last action
   */
  undo() {
    if (!this.canUndo()) return;
    
    this.historyIndex--;
    const previousState = this.history[this.historyIndex];
    this.projectSignal.set(JSON.parse(JSON.stringify(previousState)));
  }

  /**
   * Redo last undone action
   */
  redo() {
    if (!this.canRedo()) return;
    
    this.historyIndex++;
    const nextState = this.history[this.historyIndex];
    this.projectSignal.set(JSON.parse(JSON.stringify(nextState)));
  }

  // Private helper methods

  private updatePage(page: PageConfig) {
    const project = this.projectSignal();
    if (!project) return;

    const updatedPages = project.pages.map(p => p.id === page.id ? page : p);
    this.updateProject({ ...project, pages: updatedPages });
  }

  private updateProject(project: ProjectConfig) {
    project.updatedAt = new Date().toISOString();
    this.projectSignal.set(project);
    this.saveToHistory();
  }

  private updateComponentInTree(
    components: ComponentInstance[],
    componentId: string,
    props: Record<string, any>
  ): ComponentInstance[] {
    return components.map(comp => {
      if (comp.id === componentId) {
        return { ...comp, props: { ...comp.props, ...props } };
      }
      if (comp.children) {
        return {
          ...comp,
          children: comp.children.map(slot =>
            this.updateComponentInTree(slot, componentId, props)
          )
        };
      }
      return comp;
    });
  }

  private removeComponentFromTree(
    components: ComponentInstance[],
    componentId: string
  ): ComponentInstance[] {
    return components
      .filter(comp => comp.id !== componentId)
      .map(comp => {
        if (comp.children) {
          return {
            ...comp,
            children: comp.children.map(slot =>
              this.removeComponentFromTree(slot, componentId)
            )
          };
        }
        return comp;
      });
  }

  private saveToHistory() {
    const project = this.projectSignal();
    if (!project) return;

    // Remove any future history if we're not at the end
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }

    // Add new state
    this.history.push(JSON.parse(JSON.stringify(project)));
    this.historyIndex++;

    // Trim history if it exceeds max
    if (this.history.length > this.MAX_HISTORY) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  private resetHistory() {
    this.history = [];
    this.historyIndex = -1;
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
