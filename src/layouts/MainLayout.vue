<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white" style="height: 60px">
        <q-toolbar-title> Social Net VueJS </q-toolbar-title>
        <q-avatar size="45px">
          <img :src="defaultAvatar" />
        </q-avatar>
        {{ errors }}
        {{ ownProfile }}
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import state from "src/store/module-example/state";
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";
import {
  FETCH_PROFILE,
  FETCH_OWN_PROFILE,
  CHECK_AUTH,
} from "../store/actions.type";

export default defineComponent({
  name: "MainLayout",

  components: {
    // EssentialLink,
  },

  setup() {
    return {
      defaultAvatar: "/default-avatar.jpg",
    };
  },
  mounted() {
    console.log(this.errors);
  },

  beforeMount() {
    // this.$store.dispatch(CHECK_AUTH);
    this.$store.dispatch(FETCH_OWN_PROFILE);
  },

  computed: {
    ...mapGetters(["currentUser"]),
    ...mapState({
      errors: (state) => state.auth.errors,
      ownProfile: (state) => state.profile.ownProfile,
    }),
  },

  getProfile() {},
});
</script>
