/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				btn: ' 0 8px 24px 0 rgba(29, 46, 26, 0.12)',
				hero_item: ' 0 5.646px 16.939px 0 rgba(29, 46, 26, 0.05)',
			},
		},
	},
	plugins: [],
};
