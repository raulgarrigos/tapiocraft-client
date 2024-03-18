<template>
  <div>
    <h1>Login</h1>
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
      <form @submit.prevent="handleLogin">
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
          Log in
        </button>

        <p style="color: red" v-html="errorMessage"></p>
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
  name: "Login",
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const handleLogin = async () => {
      try {
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

    onMounted(() => {
      authContext.authenticateUser();
    });

    return {
      username,
      password,
      errorMessage,
      handleLogin,
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
