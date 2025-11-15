import { Injectable } from '@angular/core';
import { ProjectConfig, EncryptedProject } from '../models';
import { SecurityService } from './security.service';

/**
 * Storage Service
 * Handles local storage and encryption for projects
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'lp_builder_projects';
  private readonly ENCRYPTED_FLAG = '_encrypted';

  constructor(private securityService: SecurityService) {}

  /**
   * Save project to localStorage
   */
  saveProject(project: ProjectConfig, encrypt = false, passphrase?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const key = `${this.STORAGE_KEY}_${project.id}`;
        const data = JSON.stringify(project);

        if (encrypt && passphrase) {
          const encrypted = await this.securityService.encrypt(data, passphrase);
          const encryptedProject: EncryptedProject = {
            version: 1,
            salt: encrypted.salt,
            iv: encrypted.iv,
            cipherText: encrypted.cipherText
          };
          localStorage.setItem(key, JSON.stringify(encryptedProject));
          localStorage.setItem(key + this.ENCRYPTED_FLAG, 'true');
        } else {
          localStorage.setItem(key, data);
          localStorage.removeItem(key + this.ENCRYPTED_FLAG);
        }

        // Update project list
        this.updateProjectList(project.id, project.name, encrypt);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Load project from localStorage
   */
  async loadProject(projectId: string, passphrase?: string): Promise<ProjectConfig> {
    const key = `${this.STORAGE_KEY}_${projectId}`;
    const isEncrypted = localStorage.getItem(key + this.ENCRYPTED_FLAG) === 'true';
    const data = localStorage.getItem(key);

    if (!data) {
      throw new Error('Project not found');
    }

    if (isEncrypted) {
      if (!passphrase) {
        throw new Error('Passphrase required for encrypted project');
      }

      const encryptedProject: EncryptedProject = JSON.parse(data);
      const decrypted = await this.securityService.decrypt(
        encryptedProject.cipherText,
        passphrase,
        encryptedProject.salt,
        encryptedProject.iv
      );
      return JSON.parse(decrypted);
    } else {
      return JSON.parse(data);
    }
  }

  /**
   * Get list of all saved projects
   */
  getProjectList(): Array<{ id: string; name: string; encrypted: boolean }> {
    const listData = localStorage.getItem(this.STORAGE_KEY + '_list');
    if (!listData) return [];
    return JSON.parse(listData);
  }

  /**
   * Delete a project
   */
  deleteProject(projectId: string): void {
    const key = `${this.STORAGE_KEY}_${projectId}`;
    localStorage.removeItem(key);
    localStorage.removeItem(key + this.ENCRYPTED_FLAG);

    // Update project list
    const list = this.getProjectList().filter(p => p.id !== projectId);
    localStorage.setItem(this.STORAGE_KEY + '_list', JSON.stringify(list));
  }

  /**
   * Check if project is encrypted
   */
  isProjectEncrypted(projectId: string): boolean {
    const key = `${this.STORAGE_KEY}_${projectId}`;
    return localStorage.getItem(key + this.ENCRYPTED_FLAG) === 'true';
  }

  private updateProjectList(projectId: string, projectName: string, encrypted: boolean): void {
    let list = this.getProjectList();
    const existingIndex = list.findIndex(p => p.id === projectId);

    const projectInfo = { id: projectId, name: projectName, encrypted };

    if (existingIndex >= 0) {
      list[existingIndex] = projectInfo;
    } else {
      list.push(projectInfo);
    }

    localStorage.setItem(this.STORAGE_KEY + '_list', JSON.stringify(list));
  }
}
