/**
 * Component Input Types
 */
export type InputType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'image'
  | 'color'
  | 'select'
  | 'boolean'
  | 'number';

/**
 * Component Input Definition
 */
export interface ComponentInput {
  key: string;
  type: InputType;
  label: string;
  helperText?: string;
  options?: { label: string; value: string }[];
}

/**
 * Component Definition
 * Describes what a component is and what props it accepts
 */
export interface ComponentDefinition {
  type: string;          // "hero", "pricing", "faq", etc.
  label: string;         // Display name in sidebar
  icon: string;          // e.g., "Sparkles"
  category: string;      // "Hero", "Content", "Forms"
  defaultProps: Record<string, any>;
  inputs: ComponentInput[];
  allowsChildren?: boolean;   // For nested layouts like columns / sections
  childSlotCount?: number;    // e.g., 2 for two-column layout
}

/**
 * Component Instance
 * A specific instance of a component on a page
 */
export interface ComponentInstance {
  id: string;                // UUID
  type: string;              // maps to ComponentDefinition.type
  props: Record<string, any>;
  children?: ComponentInstance[][]; 
  // Example: children[0] = components in first column
}
