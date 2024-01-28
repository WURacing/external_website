import type { Config } from "tailwindcss";
// eslint-disable-next-line import/no-extraneous-dependencies
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindforms from "@tailwindcss/forms";
import tailwindaspectratio from "@tailwindcss/aspect-ratio";
import tailwindtypography from "@tailwindcss/typography";

export default {
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
                display: ['"Exo 2"', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                red: {
                    50: "#fef2f2",
                    100: "#fde3e3",
                    200: "#fccccc",
                    300: "#f9a8a8",
                    400: "#f37676",
                    500: "#e94a4a",
                    600: "#d63030",
                    700: "#b32222",
                    800: "#942020",
                    900: "#7b2121",
                    950: "#430c0c",
                },
            },
        },
    },
    plugins: [tailwindforms, tailwindaspectratio, tailwindtypography],
} satisfies Config;
