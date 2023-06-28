/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./public/**/*.js",
    ],
    theme: {
        extend: {
            boxShadow: {
                block: '0px 0px 7px 0px rgba(0, 0, 0, 0.14)'
            }
        },
    },
    plugins: [],
};
