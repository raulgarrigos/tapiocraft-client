import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Importa Bootstrap y BootstrapVue
import "bootstrap/dist/css/bootstrap.min.css";

const app = createApp(App);

// Usa el enrutador
app.use(router);

// Monta la aplicación
app.mount("#app");
