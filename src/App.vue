<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { onMounted } from "vue";
import authContext from "./context/auth.context.js";

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
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
}
</style>
