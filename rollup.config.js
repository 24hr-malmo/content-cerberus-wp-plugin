import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';

const fs = require('fs');

const pluginFileContent = fs.readFileSync('./index.php', 'utf8');
const versionRe = /Version: ([\w\.]+)(\r|\n)/im;
const versionMatch = versionRe.exec(pluginFileContent);

if (!versionMatch) {
    console.error('Version number not found in index.php. Please check webpack.config.js and index.php!');
    process.exit(1);
}

const VERSION = versionMatch[1];

console.log('');
console.log('CREATING VERSION', VERSION);
console.log('');


export default {
    input: './js-src/boot.js',
    output: {
        file: `./js-dist/draft-live-sync-boot-${VERSION || '0.0.0'}.js`,
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        json(),
        resolve({
            browser: true,
        }),
        commonjs({
            include: './node_modules/**',
        }),
        babel({ babelHelpers: 'bundled' }),
        globals(),
        (process.env.NODE_ENV === 'production' && terser()),
        (process.env.ANALYZE === 'true' && analyze({ summaryOnly: true })),
    ],
    watch: {
        exclude: './node_modules/**',
    },
};
