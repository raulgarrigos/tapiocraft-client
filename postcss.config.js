// postcss.config.js
module.exports = {
  plugins: [
    require("tailwindcss"),
    // Añade la configuración de PurgeCSS
    require("@fullhuman/postcss-purgecss")({
      content: [
        "./index.html",
        "./src/**/*.vue",
        // Agrega cualquier otra ruta de archivos donde se utilicen tus estilos CSS
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
};
