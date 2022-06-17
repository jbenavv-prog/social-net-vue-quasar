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
            <q-card-section>
              <div>
                <q-btn
                  v-if="item.likes > 0"
                  round
                  color="primary"
                  icon="thumb_up_off_alt"
                  class="q-mb-sm"
                >
                  <q-badge rounded color="orange" floating>{{
                    item.likes
                  }}</q-badge>
                </q-btn>
                <div
                  v-if="
                    validateLike(item.idAccountsWhoLiked, item.idPublication)
                  "
                >
                  Diste Like a esta publicación
                </div>
              </div>
            </q-card-section>
            <q-card-section class="flex justify-center">
              <q-btn
                :id="item.idPublication"
                flat
                color="primary"
                @click="like"
              >
                <q-icon :id="item.idPublication" name="thumb_up_off_alt" />
                &nbsp; Me gusta
              </q-btn>
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
import {
  FETCH_PUBLICATIONS,
  CHECK_AUTH,
  CREATE_REACTION,
} from "../store/actions.type";

export default defineComponent({
  name: "IndexPage",

  setup() {
    return {
      defaultAvatar: "/default-avatar.jpg",
      likes: {},
    };
  },

  beforeMount() {
    this.$store.dispatch(FETCH_PUBLICATIONS);
    this.$store.dispatch(CHECK_AUTH);
  },

  computed: {
    ...mapState({
      publications: (state) => state.publication.publications,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    formatDate(dateString) {
      dateString = moment(dateString).utc().format("YYYY-MM-DD");
    },

    validateLike(idAccountsWhoLiked, idPublication) {
      for (let i in idAccountsWhoLiked) {
        if (idAccountsWhoLiked[i] == this.user.id) {
          Object.assign(this.likes, {
            [idPublication]: { like: 1, idTypeReaction: 1 },
          });
          return true;
        }
      }
      Object.assign(this.likes, {
        [idPublication]: { like: 0, idTypeReaction: 1 },
      });
      return false;
    },

    like(event) {
      console.log(event);
      let idPublication;

      if (event.target.id) {
        idPublication = event.target.id;
      } else {
        idPublication = event.target.parentElement.id;
      }

      let like;

      if (this.likes[idPublication]) {
        like = this.likes[idPublication].like;
        if (this.likes[idPublication].like == 1) {
          like = 0;
        } else {
          like = 1;
        }
      }

      const idTypeReaction = 1;

      Object.assign(this.likes, { [idPublication]: { like, idTypeReaction } });

      const reaction = {
        idPublication,
        like,
        idTypeReaction,
      };

      const request = {
        user: this.user,
        reaction,
      };

      // this.reactionService.create(request).subscribe(response => {
      //   this.ngOnInit();
      // })

      console.log(request);

      this.$store.dispatch(CREATE_REACTION, request).then(() => {
        this.$store.dispatch(FETCH_PUBLICATIONS);
      });
    },
  },
});
</script>
<style>
.publication-container {
  width: 600px;
}
</style>
