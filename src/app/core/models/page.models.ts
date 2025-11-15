import { ComponentInstance } from './component.models';

/**
 * Page Configuration
 * Represents a single page in the project
 */
export interface PageConfig {
  id: string;
  name: string;             // "Home", "Pricing"
  routePath: string;        // "/" or "/pricing"
  components: ComponentInstance[]; // Top-level sections ordered
}
