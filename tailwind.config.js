const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                background: {
                    lighter: '#34343c',
                    DEFAULT: '#1d1d26'
                },
                foreground: {
                    DEFAULT: 'rgba(255,255,255,0.9)',
                    darker: 'rgba(255,255,255,0.6)',
                    darkest: 'rgba(255,255,255,0.4)'
                },
                tint: {
                    violet: '#B24592',
                    pink: '#F15F79'
                }
            },
            fontFamily: {
                inter: ['Inter', ...defaultTheme.fontFamily.sans]
            }
        }
    }
};
