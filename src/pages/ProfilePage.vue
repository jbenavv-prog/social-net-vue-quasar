<template>
  Profile Page works
  {{ $route.params.id }}

  <div class="q-pt-sm">
    <q-parallax :height="200" :speed="0.5">
      <template v-slot:media>
        <img src="https://cdn.quasar.dev/img/parallax1.jpg" />
      </template>
      <q-avatar size="150px" class="">
        <img :src="defaultAvatar" />
      </q-avatar>
      <h1 class="text-white">Docks Docks</h1>
    </q-parallax>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfilePage",

  setup() {
    return {
      defaultAvatar: "/default-avatar.jpg",
    };
  },
});
</script>
