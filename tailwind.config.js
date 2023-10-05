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
                light: "0px 0px 7px 0px rgba(0, 0, 0, 0.14)",
            },
        },
        colors: {
            main: "#0f6cbd",
            "black-o-30": "rgba(0,0,0,30%)",
            ...colors,
        },
        screens: {
            sm: "640px",
            // => @media (min-width: 640px) { ... }

            md: "768px",
            // => @media (min-width: 768px) { ... }

            lg: "1024px",
            // => @media (min-width: 1024px) { ... }

            xl: "1380px",
            // => @media (min-width: 1280px) { ... }

            "2xl": "1536px",
            // => @media (min-width: 1536px) { ... }
        },
    },
    plugins: ["postcss-import"],
};
