import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every asset path relative, so the same build works on
// https://<username>.github.io/<repo-name>/ without editing anything.
export default defineConfig({
  base: './',
  plugins: [react()],
});
