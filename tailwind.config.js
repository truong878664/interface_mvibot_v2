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
                light: "rgba(245, 56, 56, 0.2) 0 -25px 18px -14px inset, rgba(245, 56, 56, 0.15) 0 1px 2px, rgba(245, 56, 56, 0.15) 0 2px 4px, rgba(245, 56, 56, 0.15) 0 4px 8px, rgba(245, 56, 56, 0.15) 0 8px 16px, rgba(245, 56, 56, 0.15) 0 16px 32px",
            },
            colors: {
                main: "#0f6cbd",
            },
        },
    },
    plugins: ["postcss-import"],
};
