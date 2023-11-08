/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");
const zIndex = () => {
    const arrayConfigZIndex = {};
    for (let z = 1; z <= 100; z++) {
        arrayConfigZIndex[z] = z;
    }
    return arrayConfigZIndex;
};

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
                block: "0px 0px 7px 0px rgba(0, 0, 0, 0.14)",
            },
            colors: {
                main: "#0f6cbd",
                "black-o-30": "rgba(0,0,0,30%)",
                ...colors,
            },
            zIndex: zIndex(),
            animation: {
                message: "message 0.15s ease-in-out 1",
            },
            keyframes: {
                message: {
                    "0%": { transform: "translate3d(0,-100%,0)" },
                    "100%": { transform: "translate3d(0, 0, 0)" },
                },
            },
            gridTemplateAreas: {
                wide: ["header header", "navbar  content"],
                slim: ["header", "content", "navbar"],
            },
            gridTemplateColumns: {
                wide: "60px 1fr",
                slim: "1fr",
            },
            gridTemplateRows: { wide: "36px 1fr", slim: "50px 1fr 60px" },
        },
    },
    plugins: [
        "postcss-import",
        require("@tailwindcss/forms"),
        require("@savvywombat/tailwindcss-grid-areas"),
        plugin(function ({ addUtilities }) {
            addUtilities({
                ".scrollbar-hide": {
                    /* IE and Edge */
                    "-ms-overflow-style": "none",

                    /* Firefox */
                    "scrollbar-width": "none",

                    /* Safari and Chrome */
                    "&::-webkit-scrollbar": {
                        display: "none",
                    },
                },
            });
        }),
    ],
};
