import { createViteConfig } from 'vite-config-factory';

const entries = {
	'js/init': './source/js/init.js',
	'css/main': './source/sass/main.scss',
};

export default createViteConfig(entries, {
	outDir: 'assets/dist',
	manifestFile: 'manifest.json',
});