import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import JSZip from 'jszip';
import { ProjectConfig, ComponentInstance, ThemeConfig } from '../models';
import { SecurityService } from './security.service';
import { ThemeService } from './theme.service';
import { ComponentRegistryService } from './component-registry.service';
import { firstValueFrom } from 'rxjs';

/**
 * Export Service
 * Handles HTML and React code generation and export
 */
@Injectable({
  providedIn: 'root'
})
export class ExportService {
  private http = inject(HttpClient);
  private security = inject(SecurityService);
  private themeService = inject(ThemeService);
  private componentRegistry = inject(ComponentRegistryService);

  /**
   * Export project as HTML
   */
  async exportAsHTML(project: ProjectConfig): Promise<void> {
    const zip = new JSZip();
    
    // Get theme
    const theme = this.themeService.getTheme(project.themeId);
    if (!theme) throw new Error('Theme not found');

    // Generate CSS
    const css = this.generateCSS(theme);
    zip.file('styles.css', css);

    // Generate HTML for each page
    for (const page of project.pages) {
      const html = await this.generateHTML(page.components, theme, page.name);
      const filename = page.routePath === '/' ? 'index.html' : `${page.routePath.slice(1)}.html`;
      zip.file(filename, html);
    }

    // Add README
    zip.file('README.md', this.generateReadme(project));

    // Download
    const blob = await zip.generateAsync({ type: 'blob' });
    this.downloadBlob(blob, `${project.name.replace(/\s+/g, '-').toLowerCase()}.zip`);
  }

  /**
   * Generate complete HTML document
   */
  private async generateHTML(components: ComponentInstance[], theme: ThemeConfig, pageName: string): Promise<string> {
    let componentsHTML = '';

    for (const component of components) {
      componentsHTML += await this.renderComponent(component);
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.security.sanitizeHtml(pageName)}</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
${componentsHTML}
</body>
</html>`;
  }

  /**
   * Render a single component from template
   */
  private async renderComponent(component: ComponentInstance): Promise<string> {
    try {
      // Load template
      const templatePath = `/assets/templates/html/${component.type}.html`;
      const template = await firstValueFrom(this.http.get(templatePath, { responseType: 'text' }));

      // Render template with props
      return this.renderTemplate(template, component.props);
    } catch (error) {
      console.error(`Failed to load template for ${component.type}:`, error);
      return `<!-- Component ${component.type} failed to render -->`;
    }
  }

  /**
   * Simple template renderer (supports {{var}}, {{#if}}, {{#each}})
   */
  private renderTemplate(template: string, props: Record<string, any>): string {
    let result = template;

    // Handle {{#each}} blocks
    result = result.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, blockContent) => {
      const array = props[arrayName];
      if (!Array.isArray(array)) return '';
      
      return array.map(item => {
        let itemHTML = blockContent;
        // Replace {{this}} for primitives or {{property}} for objects
        if (typeof item === 'string') {
          itemHTML = itemHTML.replace(/\{\{this\}\}/g, this.security.sanitizeHtml(item));
        } else {
          Object.keys(item).forEach(key => {
            const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
            itemHTML = itemHTML.replace(regex, this.security.sanitizeHtml(String(item[key])));
          });
        }
        return itemHTML;
      }).join('\n');
    });

    // Handle {{#if}} blocks
    result = result.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, propName, blockContent) => {
      return props[propName] ? blockContent : '';
    });

    // Handle {{#if}} with else
    result = result.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g, 
      (match, propName, ifContent, elseContent) => {
        return props[propName] ? ifContent : elseContent;
      }
    );

    // Handle simple {{variable}} replacements
    Object.keys(props).forEach(key => {
      const value = props[key];
      if (typeof value === 'string' || typeof value === 'number') {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        result = result.replace(regex, this.security.sanitizeHtml(String(value)));
      }
    });

    return result;
  }

  /**
   * Generate CSS from theme
   */
  private generateCSS(theme: ThemeConfig): string {
    return `/* Generated by Visual Landing Page Builder */
/* Theme: ${theme.name} */

:root {
  --color-primary: ${theme.tokens.colorPrimary};
  --color-primary-soft: ${theme.tokens.colorPrimarySoft};
  --color-bg: ${theme.tokens.colorBackground};
  --color-surface: ${theme.tokens.colorSurface};
  --color-text: ${theme.tokens.colorText};
  --color-muted: ${theme.tokens.colorMuted};
  --radius-lg: ${theme.tokens.borderRadius};
  --shadow-soft: ${theme.tokens.shadowSoft};
  --font-heading: ${theme.tokens.fontHeading};
  --font-body: ${theme.tokens.fontBody};
  
  /* Additional variables */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: var(--spacing-md);
}

h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.875rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1.125rem; }

p { margin-bottom: var(--spacing-md); }

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: opacity var(--transition-fast);
}

a:hover { opacity: 0.8; }

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.section {
  padding: var(--spacing-3xl) 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 2px solid var(--color-muted);
}

.btn-secondary:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-sm {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: 0.875rem;
}

.btn-lg {
  padding: var(--spacing-lg) var(--spacing-2xl);
  font-size: 1.125rem;
}

.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-soft);
  transition: all var(--transition-base);
}

.card:hover {
  transform: translateY(-4px);
}

.subtitle {
  font-size: 1.25rem;
  color: var(--color-muted);
}

.hero {
  padding: 5rem 0;
  text-align: left;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
}

.hero .subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-centered {
  text-align: center;
}

.hero-centered .hero-actions {
  justify-content: center;
}

input, textarea, select {
  width: 100%;
  padding: var(--spacing-md);
  border: 1px solid var(--color-muted);
  border-radius: var(--radius-md);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 1rem;
}

input:focus, textarea:focus, select:focus {
  outline: none;
  border-color: var(--color-primary);
}

label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 500;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .hero h1 { font-size: 2.5rem; }
  .hero .subtitle { font-size: 1.125rem; }
  .hero-actions { flex-direction: column; }
}
`;
  }

  /**
   * Generate README file
   */
  private generateReadme(project: ProjectConfig): string {
    return `# ${project.name}

Generated by **Visual Landing Page Builder**

## About

This landing page was created using a visual drag-and-drop builder with zero code required.

- **Theme**: ${project.themeId}
- **Pages**: ${project.pages.length}
- **Export Date**: ${new Date().toLocaleDateString()}

## How to Use

1. Open \`index.html\` in your browser
2. Customize the content by editing the HTML files
3. Modify colors and styles in \`styles.css\`
4. Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)

## Features

- ✅ Fully responsive design
- ✅ Clean, semantic HTML
- ✅ Modern CSS with custom properties
- ✅ Premium typography (Google Fonts)
- ✅ Material Icons support
- ✅ No build process required

## License

Free to use for any project!

---

**Built with Visual Landing Page Builder** 🚀
`;
  }

  /**
   * Download blob as file
   */
  private downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
