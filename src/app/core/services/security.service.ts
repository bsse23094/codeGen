import { Injectable } from '@angular/core';

/**
 * Security Service
 * Provides sanitization and encryption utilities
 */
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor() {}

  /**
   * Sanitize text for HTML output
   * Replaces dangerous characters with HTML entities
   */
  sanitizeHtml(text: string): string {
    if (!text) return '';
    
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Encrypt data using AES-GCM with Web Crypto API
   */
  async encrypt(data: string, passphrase: string): Promise<{ salt: string; iv: string; cipherText: string }> {
    const encoder = new TextEncoder();
    
    // Generate random salt
    const salt = crypto.getRandomValues(new Uint8Array(16));
    
    // Derive key from passphrase
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Encrypt data
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encoder.encode(data)
    );

    return {
      salt: this.arrayBufferToBase64(salt),
      iv: this.arrayBufferToBase64(iv),
      cipherText: this.arrayBufferToBase64(encrypted)
    };
  }

  /**
   * Decrypt data using AES-GCM with Web Crypto API
   */
  async decrypt(
    cipherText: string,
    passphrase: string,
    salt: string,
    iv: string
  ): Promise<string> {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Import passphrase
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    // Derive key
    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: this.base64ToArrayBuffer(salt),
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    // Decrypt
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: this.base64ToArrayBuffer(iv) },
      key,
      this.base64ToArrayBuffer(cipherText)
    );

    return decoder.decode(decrypted);
  }

  private arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
