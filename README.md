# CodeGen - Visual Landing Page Builder

![Angular](https://img.shields.io/badge/Angular-19.2.0-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A powerful, user-friendly visual landing page builder built with Angular 19. Create stunning landing pages with a drag-and-drop interface, customizable themes, and export to clean HTML/CSS or React code.

🌐 **Live Demo**: [https://bsse23094.github.io/codeGen/](https://bsse23094.github.io/codeGen/)

## ✨ Features

### 🎨 Visual Builder
- **Drag & Drop Interface** - Easily add, reorder, and remove components
- **Real-time Preview** - See changes instantly as you build
- **15+ Pre-built Components** - Heroes, features, pricing, testimonials, CTAs, and more
- **No Coding Required** - Build professional landing pages without writing code

### 🎭 Theme System
- **4 Beautiful Preset Themes** - Default Dark, Startup, Retro, Minimal
- **Full Customization** - Colors, fonts, spacing, shadows, animations
- **12 Logo Presets** - Business, tech, creative, and premium icons
- **12 Font Combinations** - Curated Google Fonts pairings

### 📝 User-Friendly Forms
- **Visual Array Editors** - No more JSON editing!
- **Smart Input Types** - Text, URL, icon picker, boolean, multi-line lists
- **Collapsible Cards** - Organized, clean interface for complex data
- **Real-time Validation** - Immediate feedback on inputs

### 🔄 State Management
- **50-Level Undo/Redo** - Never lose your work
- **Auto-save** - Changes are preserved as you work
- **Multi-page Support** - Create multiple pages in one project

### 📦 Export Options
- **HTML/CSS Export** - Clean, production-ready code
- **React Export** - Full React component structure
- **ZIP Download** - Get all files bundled together

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 19+

### Installation

```bash
# Clone the repository
git clone https://github.com/bsse23094/codeGen.git
cd codeGen

# Install dependencies
npm install

# Start development server
npm start
```

Open your browser and navigate to `http://localhost:4200/`

## 🛠️ Available Scripts

### Development
```bash
npm start              # Start dev server on localhost:4200
npm run watch          # Build and watch for changes
```

### Building
```bash
npm run build          # Production build
npm run build:prod     # Production build with GitHub Pages base-href
```

### Deployment
```bash
npm run deploy         # Build and deploy to GitHub Pages
```

### Testing
```bash
npm test               # Run unit tests with Karma
```

## 📁 Project Structure

```
codeGen/
├── src/
│   ├── app/
│   │   ├── core/                 # Core services and models
│   │   │   ├── models/          # TypeScript interfaces
│   │   │   └── services/        # Business logic services
│   │   ├── features/            # Feature modules
│   │   │   └── builder/         # Main builder interface
│   │   ├── shared/              # Shared components
│   │   │   ├── array-input/     # Visual array editor
│   │   │   ├── inspector/       # Properties panel
│   │   │   └── theme-editor/    # Theme customization
│   │   └── app.component.ts     # Root component
│   ├── assets/
│   │   └── templates/           # HTML/React templates
│   │       ├── html/            # Handlebars templates
│   │       └── react/           # React JSX templates
│   └── styles.css               # Global styles
├── public/                      # Static assets
└── angular.json                 # Angular configuration
```

## 🎯 Component Library

### Layout Components
- **Hero Basic** - Full-width hero with CTA
- **Hero Centered** - Centered hero section
- **Navigation Bar** - Responsive navbar with glassmorphism
- **Footer Columns** - Multi-column footer with links

### Content Components
- **Features Grid** - Icon-based feature showcase
- **Pricing Simple** - Pricing cards with feature lists
- **FAQ Accordion** - Collapsible Q&A sections
- **Testimonials Grid** - Customer testimonials
- **Stats Simple** - Key metrics display
- **Logo Cloud** - Partner/client logos

### CTA Components
- **CTA Simple** - Single CTA block
- **CTA Split** - Two-column CTA section

### Advanced Components
- **Content Image Left/Right** - Text with image layouts
- **Contact Form** - Multi-field contact form

## 🎨 Theming

### Custom Theme Structure
```typescript
{
  name: 'My Theme',
  colorPrimary: '#6366f1',      // Primary brand color
  colorBackground: '#0f172a',    // Background color
  colorSurface: '#1e293b',       // Card/surface color
  colorText: '#f8fafc',          // Text color
  colorMuted: '#94a3b8',         // Muted text
  fontHeading: 'DM Sans',        // Heading font
  fontBody: 'Instrument Sans',   // Body font
  radius: 12,                    // Border radius (px)
  shadowIntensity: 'medium',     // Shadow strength
  logo: 'preset:star-burst',     // Logo preset
  spacing: 'comfortable',        // Layout spacing
  animationSpeed: 'normal'       // Animation duration
}
```

## 🔧 Technologies Used

- **Angular 19** - Modern web framework with signals
- **TypeScript 5.7** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **JSZip** - File bundling for exports
- **Material Symbols** - Icon library
- **Google Fonts** - Typography

## 📝 Usage Examples

### Creating a Landing Page

1. **Add Components** - Click components from the sidebar to add them
2. **Customize Content** - Click any component to edit in the inspector
3. **Style with Themes** - Choose a preset or customize colors/fonts
4. **Export** - Download as HTML/CSS or React when ready

### Array Input Example

Instead of editing JSON:
```json
{
  "features": ["Feature 1", "Feature 2", "Feature 3"]
}
```

Use the visual editor:
```
Features (One per line)
───────────────────────
Feature 1
Feature 2
Feature 3
```

## 🚢 Deployment

### GitHub Pages

The project is configured for easy GitHub Pages deployment:

```bash
npm run deploy
```

This will:
1. Build the production bundle
2. Create/update the `gh-pages` branch
3. Deploy to `https://[username].github.io/codeGen/`

### Custom Domain

To use a custom domain, add a `CNAME` file to the `public` folder:
```
example.com
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**BSSE23094**
- GitHub: [@bsse23094](https://github.com/bsse23094)

## 🙏 Acknowledgments

- Angular Team for the amazing framework
- Google Fonts for beautiful typography
- Material Symbols for comprehensive icons

## 📞 Support

If you encounter any issues or have questions:
- Open an [issue](https://github.com/bsse23094/codeGen/issues)
- Check the [documentation](https://bsse23094.github.io/codeGen/)

---

Made with ❤️ using Angular 19

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
