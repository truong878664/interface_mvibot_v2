/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
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
                block: "0px 0px 7px 0px rgba(0, 0, 0, 0.14)",
            },
        },
        colors: {
            main: "#0f6cbd",
            "black-o-30": "rgba(0,0,0,30%)",
            ...colors,
        },
    },
    plugins: [],
};
