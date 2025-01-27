import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

export default [
    // UMD build for browsers
    {
        input: 'src/index.js',
        output: {
            name: 'TypeWriterPlus',
            file: pkg.browser,
            format: 'umd',
            exports: 'default'
        },
        plugins: [
            resolve(),
            commonjs(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            }),
            terser()
        ]
    },
    // ESM build
    {
        input: 'src/index.js',
        output: {
            file: pkg.module,
            format: 'es'
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    },
    // CommonJS build
    {
        input: 'src/index.js',
        output: {
            file: pkg.main,
            format: 'cjs',
            exports: 'default'
        },
        plugins: [
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**'
            })
        ]
    }
];