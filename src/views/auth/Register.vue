<template>
  <div>
    <h1>Create your account</h1>
    <br />

    <div
      class="container text-center"
      style="
        max-width: 600px;
        background-color: grey;
        padding: 20px;
        border-radius: 8px;
      "
    >
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-control"
          />
        </div>

        <div class="form-group">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model="email" class="form-control" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-control"
          />
        </div>

        <br />

        <button
          type="submit"
          class="btn btn-light"
          style="background-color: #fdb14d"
        >
          Sign up
        </button>

        <p style="color: red">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import service from "../../services/config";
import authContext from "../../context/auth.context";

export default {
  name: "Register",
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleSignup = async () => {
      const newUser = {
        username: username.value,
        email: email.value,
        password: password.value,
      };

      try {
        await service.post("/auth/register", newUser);
        const credentials = {
          username: username.value,
          password: password.value,
        };
        const response = await service.post("/auth/login", credentials);
        localStorage.setItem("authToken", response.data.authToken);
        router.push("/");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = error.response.data.errorMessage;
        } else {
          router.push("/error");
        }
      }
    };

    // Cuando el componente se monta, se llama a authenticateUser para verificar la autenticación
    onMounted(() => {
      authContext.authenticateUser();
    });

    return {
      username,
      email,
      password,
      errorMessage,
      handleSignup,
      authContext,
    };
  },
};
</script>

<style>
.container {
  margin: 0 auto;
}
</style>
