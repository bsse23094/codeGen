import { PageConfig } from './page.models';

/**
 * Project Configuration
 * Root configuration containing all project data
 */
export interface ProjectConfig {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  themeId: string;
  pages: PageConfig[];
  settings: {
    exportFramework: 'html' | 'react';
    customDomain?: string;
  };
}

/**
 * Encrypted Project Storage
 */
export interface EncryptedProject {
  version: 1;
  salt: string;     // base64
  iv: string;       // base64
  cipherText: string; // base64
}
