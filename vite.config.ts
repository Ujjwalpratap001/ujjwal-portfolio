//new code jo gpt se uthaya hai
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ujjwal-portfolio/',
  plugins: [react()],
});


// old code of claude
/*
  import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes every asset path relative, so the same build works on
// https://<username>.github.io/<repo-name>/ without editing anything.
export default defineConfig({
  base: './',
  plugins: [react()],
});
*/
