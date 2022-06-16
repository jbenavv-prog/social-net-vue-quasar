<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white" style="height: 60px">
        <q-toolbar-title> Social Net VueJS </q-toolbar-title>
        <q-avatar size="45px">
          <img :src="defaultAvatar" />
        </q-avatar>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { FETCH_PROFILE } from "../store/actions.type";

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
    console.log(this.currentUser.id);
    // this.$store.dispatch(FETCH_PROFILE, this.currentUser);
  },

  computed: {
    ...mapGetters(["currentUser"]),
  },

  getProfile() {},
});
</script>
