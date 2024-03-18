<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from "vue";
import authContext from "./context/auth.context.js";
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  setup() {
    // Cuando el componente se monta, se llama a authenticateUser para verificar la autenticación
    onMounted(() => {
      authContext.authenticateUser();
    });

    return {
      authContext, // Hace que el contexto de autenticación esté disponible en el template
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
