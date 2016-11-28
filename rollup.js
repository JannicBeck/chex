import npm      from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript    from 'rollup-plugin-typescript';
import uglify   from 'rollup-plugin-uglify';
import replace  from 'rollup-plugin-replace';

export default {
  entry: 'index.ts',
  dest: 'index.js',
  format: 'es',
  moduleName: 'chex',
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify( 'production' )
    }),
    npm({
      browser: true
    }),
    commonjs(),
    typescript(),
    uglify()
  ]
};
