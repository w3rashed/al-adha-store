import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // Entry point
  output: {
    file: 'dist/bundle.js',
    format: 'esm', // You can also use 'cjs' if needed
    sourcemap: true,
  },
  plugins: [
    resolve(), // To resolve imports from node_modules
    commonjs(), // Converts CommonJS to ES6 modules
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-react'], // To handle React and JSX
    }),
    terser(), // Minify the code
  ],
  external: ['react', 'react-dom', '@mui/material', '@mui/icons-material', 'jwt-decode'], // Do not bundle these dependencies
};
