/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {
            screens: {
                mobile: '500px',
                tablet: '900px',
                laptop: '1440px',
            },
            fontSize: {},
            fontFamily: {
                Inter: ['Inter', 'serif'],
            },
            colors: {
                green: {
                    DEFAULT: '#5FD2A2',
                    100: '#3BDCB1',
                    200: '#11A3B7',
                    400: '#11A3B7',
                },
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
