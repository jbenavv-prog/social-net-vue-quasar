<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md justify-center" style="width: 700px">
      <div class="row q-gutter-sm">
        <q-intersection
          v-for="index in 60"
          :key="index"
          transition="scale"
          class="example-item"
        >
          <q-card class="q-ma-sm">
            <q-card-section>
              <q-btn round>
                <q-avatar size="45px">
                  <img :src="defaultAvatar" />
                </q-avatar>
              </q-btn>
              <div class="text-h6">FullName #{{ index }}</div>
              <div class="text-subtitle2">Action or description</div>
            </q-card-section>
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-card-section> Buttons </q-card-section>
          </q-card>
        </q-intersection>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { FETCH_PUBLICATIONS } from "../store/actions.type";

export default defineComponent({
  name: "IndexPage",

  setup() {
    return {
      defaultAvatar: "/default-avatar.jpg",
    };
  },

  beforeMount() {
    this.$store.dispatch(FETCH_PUBLICATIONS);
  },
});
</script>
<style>
.example-item {
  height: 600px;
  width: 600px;
}
</style>
