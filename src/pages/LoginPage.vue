<template>
  <div class="h-100">
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card q-pa-lg">
        <q-card-section>
          <div class="text-h6 text-center">Iniciar Sesión</div>
          <!-- <div class="text-subtitle2">by John Doe</div> -->
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <q-form @submit="onSubmit(email, password)" class="q-gutter-md">
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
                  class="full-width q-mt-xl q-mb-lg"
                  label="Iniciar sesión"
                  type="submit"
                  color="primary"
                />
              </div>
              <div class="text-center">
                ¿No eres miembro?
                <router-link to="/register">Registrate Ahora</router-link>
              </div>
            </q-form>
          </div>
          <div class="text-red-5" v-if="errors?.length > 0">
            {{ errors }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useQuasar } from "quasar";
import { mapState } from "vuex";
import { ref } from "vue";
import { LOGIN } from "../store/actions.type";
import { CLEAN_ERROR } from "src/store/mutations.type";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);

    return {
      email,
      password,
      isPwd: ref(true),

      onSubmit(email, password) {
        this.$store.dispatch(LOGIN, { email, password }).then(() => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Sesión Iniciada",
          });
          this.$router.push({ path: "/" });
        });
      },
    };
  },
  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
    }),
  },
  beforeMount() {
    this.$store.commit(CLEAN_ERROR);
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
