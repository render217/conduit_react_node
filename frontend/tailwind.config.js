/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                clrTurtleGreen: "#5CB85C",
                clrFernGreen: "#3D8B3D",
                clrFrogGreen: "#95D195",
                ClrPorcelain: "#F3F3F3",
                clrOsloGrey: "#818A91",
                clrDoveGrey: "#687077",
                clrGainsboro: "#DBDBDB",
                clrHarp: "#ECEEEF",
                clrMercury: "#E5E5E5",
                clrWhiteRock: "#E6E6E6",
                clrIndianRed: "#B85C5C",
                clrCrsytalBlue: "#66AFE9",
            },
            fontFamily: {
                titilliumWeb: ["Titillium Web", "sans-serif"],
                sourceSerif4: ["Source Serif 4", "sans-serif"],
                merriweatherSans: ["Merriweather Sans", "sans-serif"],
                sourceSans3: [" Source Sans 3", "sans-serif"],
            },
        },
    },
    plugins: [],
};
