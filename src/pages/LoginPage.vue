<template>
  <div class="h-100">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6 text-center">Iniciar Sesión</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
});
</script>

<style>
.h-100 {
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.4)
    ),
    url("~assets/images/login/bg-01.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.my-card {
  width: 100%;
  max-width: 600px;
}
</style>
