<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md justify-center" style="width: 700px">
      <div class="row q-gutter-sm">
        <div
          v-for="(item, index) in publications"
          :key="index"
          class="publication-container"
        >
          <q-card class="q-ma-sm">
            <q-card-section>
              <q-btn round>
                <q-avatar size="45px">
                  <img :src="item.photoProfileURL || defaultAvatar" />
                </q-avatar>
              </q-btn>
              <div class="text-h6">{{ item.fullName }}</div>
              <div class="text-subtitle2" v-if="item.idTypePublication == 1">
                {{ item.description }}
              </div>
              <div class="text-subtitle2" v-if="item.idTypePublication == 2">
                Actualizó su foto de perfil
              </div>
              <div>{{ formatDate(item.date) }}</div>
            </q-card-section>
            <img :src="item.imageURL" />
            <q-card-section v-if="item.likes > 0">
              <div>
                <q-btn round color="primary" icon="thumb_up_off_alt">
                  <q-badge rounded color="orange" floating>{{
                    item.likes
                  }}</q-badge>
                </q-btn>
              </div>
            </q-card-section>
            <q-card-section class="flex justify-center">
              <q-btn
                flat
                color="primary"
                icon="thumb_up_off_alt"
                label="Me gusta"
              />
              <q-btn
                flat
                color="primary"
                icon="chat_bubble_outline"
                label="Comentar"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import moment from "moment";
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

  computed: {
    ...mapState({
      publications: (state) => state.publication.publications,
    }),
  },
  methods: {
    formatDate(dateString) {
      dateString = moment(dateString).utc().format("YYYY-MM-DD");
      return dateString;
      // const date = new Date(dateString);
      // // Then specify how you want your dates to be formatted
      // return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(
      //   date
      // );
    },
  },
});
</script>
<style>
.publication-container {
  width: 600px;
}
</style>
