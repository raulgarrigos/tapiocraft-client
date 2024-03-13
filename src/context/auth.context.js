import { createContext, ref, onMounted } from "vue";
import service from "../services/config";

const AuthContext = createContext();

function useAuth() {
  const isLoggedIn = ref(false);
  const isLoading = ref(true);
  const loggedUser = ref(null);

  const authenticateUser = async () => {
    try {
      const response = await service.get("auth/verify");
      isLoggedIn.value = true;
      isLoading.value = false;
      loggedUser.value = response.data.payload;
    } catch (error) {
      isLoggedIn.value = false;
      isLoading.value = false;
      loggedUser.value = null;
    }
  };

  onMounted(() => {
    authenticateUser();
  });

  return { authenticateUser, isLoggedIn, loggedUser };
}

export { AuthContext, useAuth };
