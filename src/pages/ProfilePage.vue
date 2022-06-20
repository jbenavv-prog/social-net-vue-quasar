<template>
  <q-page>
    <div class="q-pt-sm">
      <q-parallax :height="200" :speed="0.5">
        <template v-slot:media>
          <img src="https://cdn.quasar.dev/img/parallax1.jpg" />
        </template>
        <q-avatar size="150px" class="">
          <img :src="profile.photoProfileURL || defaultAvatar" />
        </q-avatar>
        <h1 class="text-white">{{ profile.fullName }}</h1>
      </q-parallax>
    </div>
    <div class="q-pa-md">
      <div class="row items-start q-gutter-md justify-center">
        <q-responsive :ratio="1 / 5" class="col-3">
          <q-card class="column">
            <q-card-section>
              <div class="text-h6">Detalles</div>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle1">Teléfono</div>
              <div class="text-subtitle2">
                {{ profile.phone }} example phone
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle1">Ubicación</div>
              <div class="text-subtitle2">
                {{ profile.location }} example ubicación
              </div>
            </q-card-section>
            <q-card-section>
              <div class="text-subtitle1">Colegio</div>
              <div class="text-subtitle2">
                {{ profile.college }} example Colegio
              </div>
            </q-card-section>
          </q-card>
        </q-responsive>
        <q-responsive :ratio="1 / 3.5" class="col-5">
          <q-card
            class="column q-mb-lg"
            v-for="(item, index) in profilePublications"
            :key="index"
          >
            <q-card-section>
              <div class="row items-center">
                <q-avatar size="45px">
                  <img :src="item.photoProfileURL || defaultAvatar" />
                </q-avatar>
                <div class="text-subtitle2 q-ml-sm">{{ item.fullName }}</div>
                <q-space />
                <div>{{ formatDate(item.date) }}</div>
              </div>
              <div class="row q-mt-lg">
                <div class="text-subtitle2" v-if="item.idTypePublication == 1">
                  {{ item.description }}
                </div>
                <div class="text-subtitle2" v-if="item.idTypePublication == 2">
                  Actualizó su foto de perfil
                </div>
              </div>
            </q-card-section>
            <q-img class="col" :src="item.imageURL" />
            <q-card-section>
              <div class="row">
                <div class="col">
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
                <q-space />
                <div class="col-3 q-mt-sm" v-if="item.comments">
                  {{ item.comments.length }}
                  <u class="u-comment" @click="commentsEnabled = true"
                    >comentario(s)</u
                  >
                </div>
              </div>
            </q-card-section>
            <q-card-section class="flex justify-center">
              <q-btn
                :id="item.idPublication"
                :flat="
                  !validateLike(item.idAccountsWhoLiked, item.idPublication)
                "
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
                @click="commentsEnabled = true"
              />
            </q-card-section>
            <q-card-section v-if="commentsEnabled">
              <q-input
                standout="bg-deep-purple text-white"
                bottom-slots
                v-model="text[item.idPublication]"
                label="Escribe un comentario..."
                counter
                maxlength="100"
                :dense="dense"
                class="q-mb-sm"
                @keyup.enter="
                  comment(item.idPublication, text[item.idPublication])
                "
              >
                <template v-slot:before>
                  <q-avatar
                    size="50px"
                    @click="$router.push({ path: `/profile/${user.id}` })"
                  >
                    <img :src="profile.photoProfileURL || defaultAvatar" />
                  </q-avatar>
                </template>

                <template v-slot:append>
                  <q-icon
                    v-if="text[item.idPublication] !== ''"
                    name="close"
                    @click="text[item.idPublication] = ''"
                    class="cursor-pointer"
                  />
                </template>

                <template v-slot:after>
                  <q-btn
                    :id="item.idPublication"
                    :value="text[item.idPublication]"
                    round
                    dense
                    flat
                    icon="send"
                    @click="
                      comment(item.idPublication, text[item.idPublication])
                    "
                  />
                </template>
              </q-input>
              <q-list
                v-for="(comment, index) in item.comments"
                :key="index"
                bordered
                class="rounded-borders"
                style="max-width: 100%"
              >
                <q-item-label header>Comentarios</q-item-label>

                <q-item clickable v-ripple>
                  <q-item-section avatar>
                    <q-avatar
                      @click="
                        $router.push({ path: `/profile/${comment.idAccount}` })
                      "
                    >
                      <img :src="comment.photoProfileURL || defaultAvatar" />
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption lines="2">
                      <span class="text-weight-bold">{{
                        comment.fullName
                      }}</span>
                    </q-item-label>
                    <q-item-label lines="1">{{
                      comment.description
                    }}</q-item-label>
                  </q-item-section>

                  <q-item-section side top> {{ comment.date }}</q-item-section>
                </q-item>
                <q-separator inset="item" />
              </q-list>
            </q-card-section>
          </q-card>
        </q-responsive>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import moment from "moment";
import { ref } from "vue";
import { useQuasar } from "quasar";
import {
  CHECK_AUTH,
  FETCH_PROFILE,
  FETCH_PROFILE_PUBLICATIONS,
  CREATE_PUBLICATION,
  CREATE_COMMENT,
  CREATE_REACTION,
} from "src/store/actions.type";

export default defineComponent({
  name: "ProfilePage",

  data() {
    return {
      commentsEnabled: false,
    };
  },

  setup() {
    const $q = useQuasar();
    return {
      defaultAvatar: "/default-avatar.jpg",
      likes: {},
      text: ref([]),
      dense: ref(false),

      comment(idPublication, description) {
        if (description) {
          const comment = {
            idPublication,
            description,
          };

          const request = {
            user: this.user,
            comment,
          };

          const user = {
            id: this.$route.params.id,
          };

          this.$store.dispatch(CREATE_COMMENT, request).then(() => {
            this.$store.dispatch(FETCH_PROFILE_PUBLICATIONS, user);
            this.text[idPublication] = "";
          });
        }
      },
    };
  },

  beforeMount() {
    const user = {
      id: this.$route.params.id,
    };
    this.$store.dispatch(CHECK_AUTH);
    this.$store.dispatch(FETCH_PROFILE, user);
    this.$store.dispatch(FETCH_PROFILE_PUBLICATIONS, user);
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      profile: (state) => state.profile.profile,
      profilePublications: (state) => state.publication.profilePublications,
    }),
  },

  methods: {
    formatDate(dateString) {
      dateString = moment(dateString).utc().format("YYYY-MM-DD");
      return dateString;
    },
    // createPublication() {
    //   const formData = new FormData();
    //   formData.append("file", this.imgFile);
    //   formData.append("user", JSON.stringify(this.user));
    //   formData.append("idTypePublication", 1);
    //   formData.append("description", this.publicationText);

    //   this.$store.dispatch(CREATE_PUBLICATION, formData).then(() => {
    //     this.$q.notify({
    //       color: "green-4",
    //       textColor: "white",
    //       icon: "cloud_done",
    //       message: "Publicación creada",
    //     });
    //     this.$store.dispatch(FETCH_PROFILE_PUBLICATIONS);
    //     this.url = null;
    //     this.publicationText = ref("");
    //   });
    // },

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

      const user = {
        id: this.$route.params.id,
      };

      this.$store.dispatch(CREATE_REACTION, request).then(() => {
        this.$store.dispatch(FETCH_PROFILE_PUBLICATIONS, user);
      });
    },
  },

  watch: {
    fileUploaded: function (file) {
      this.url = URL.createObjectURL(file);
      this.imgFile = file;
    },
  },
});
</script>
