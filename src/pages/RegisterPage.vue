<template>
  <div class="h-100">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card q-pa-lg">
        <q-card-section>
          <div class="text-h6 text-center">Registrarse</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                v-model="fullName"
                filled
                type="username"
                hint="Nombre"
                :rules="[(val) => !!val || 'Nombre es requerido']"
              />
              <q-input
                v-model="email"
                filled
                type="email"
                hint="Email"
                :rules="[(val) => !!val || 'Email es requerido']"
              />
              <q-input
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                hint="Contraseña"
                :rules="[(val) => !!val || 'Contraseña es requerida']"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <div>
                <q-btn
                  class="full-width q-mt-xl q-mt-lg"
                  label="Registrarse"
                  type="submit"
                  color="primary"
                />
              </div>
              <div class="text-center">
                ¿Ya eres miembro?
                <router-link to="/login">Inicia sesión</router-link>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
const { defineComponent } = require("vue");
import { useQuasar } from "quasar";
import { ref } from "vue";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const $q = useQuasar();
    const fullName = ref(null);
    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,
      isPwd: ref(true),

      onSubmit() {
        if (1 != 1) {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "You need to accept the license and terms first",
          });
        } else {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted",
          });
        }
      },
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
}
</style>
