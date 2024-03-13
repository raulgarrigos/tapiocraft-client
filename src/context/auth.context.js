import { ref, onMounted } from "vue";
import service from "../services/config";

// Crea un objeto que actúe como contexto de autenticación
const authContext = {
  isLoggedIn: ref(false),
  isLoading: ref(true),
  loggedUser: ref(null),
  authenticateUser: async () => {
    try {
      const response = await service.get("auth/verify");
      authContext.isLoggedIn.value = true;
      authContext.isLoading.value = false;
      authContext.loggedUser.value = response.data.payload;
    } catch (error) {
      authContext.isLoggedIn.value = false;
      authContext.isLoading.value = false;
      authContext.loggedUser.value = null;
    }
  },
};

export default authContext;
