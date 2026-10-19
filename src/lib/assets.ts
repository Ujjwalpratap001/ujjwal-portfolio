/** Turns 'assets/resume.pdf' into a path that works on GitHub Pages. Full URLs pass through. */
export function asset(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
