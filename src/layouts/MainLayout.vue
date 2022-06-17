<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white" style="height: 60px">
        <q-toolbar-title> Social Net VueJS </q-toolbar-title>
        <q-btn flat round icon="home" />
        <q-space />
        <q-btn round>
          <q-avatar size="45px">
            <img :src="ownProfile.photoProfileURL || defaultAvatar" />
          </q-avatar>
          <q-menu>
            <div
              class="row no-wrap q-pa-xl justify-center"
              style="width: 250px"
            >
              <div class="column items-center">
                <q-avatar size="72px">
                  <img :src="ownProfile.photoProfileURL || defaultAvatar" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ ownProfile.fullName }}
                </div>
                <q-btn
                  class="q-mt-lg"
                  color="primary"
                  label="Ver perfil"
                  push
                  size="sm"
                  v-close-popup
                />
                <q-btn
                  class="q-mt-lg"
                  label="Cerrar sesión"
                  push
                  size="sm"
                  v-close-popup
                  v-on:click="logout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

import { mapGetters, mapState } from "vuex";
import { FETCH_OWN_PROFILE, LOGOUT } from "../store/actions.type";

export default defineComponent({
  name: "MainLayout",

  setup() {
    return {
      defaultAvatar: "/default-avatar.jpg",
    };
  },
  mounted() {},

  beforeMount() {
    this.$store.dispatch(FETCH_OWN_PROFILE);
  },

  computed: {
    ...mapState({
      errors: (state) => state.auth.errors,
      ownProfile: (state) => state.profile.ownProfile,
    }),
  },

  methods: {
    logout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ path: "/login" }));
    },
  },
});
</script>
