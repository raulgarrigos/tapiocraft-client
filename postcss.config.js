import tailwindcss from "tailwindcss";
import purgecss from "@fullhuman/postcss-purgecss";

export default {
  plugins: [
    tailwindcss,
    purgecss({
      content: [
        "./index.html",
        "./src/**/*.vue",
        // Agrega cualquier otra ruta de archivos donde se utilicen tus estilos CSS
        "./src/components/**/*.js",
        "./src/pages/**/*.js",
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
