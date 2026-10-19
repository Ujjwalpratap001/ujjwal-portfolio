/**
 * ADD A CERTIFICATE:
 *  1. Copy the file into public/assets/certificates/ (image or PDF).
 *  2. Add an object to the list below.
 *  3. Save. Nothing else needs to change.
 *
 * Only add certificates you have actually earned.
 *
 * Example (remove the // to use it):
 * {
 *   id: 'python-basics',
 *   title: 'Python Basics',
 *   issuer: 'Issuing organization',
 *   date: 'March 2026',
 *   type: 'pdf',                                   // 'pdf' or 'image'
 *   file: 'assets/certificates/python-basics.pdf', // path inside public/
 *   preview: 'assets/certificates/python-basics.png', // optional thumbnail image
 *   verifyUrl: 'https://example.com/verify/123',   // optional
 * },
 */
export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  type: 'pdf' | 'image';
  file: string;
  preview?: string;
  verifyUrl?: string;
}

export const certificates: Certificate[] = [];
