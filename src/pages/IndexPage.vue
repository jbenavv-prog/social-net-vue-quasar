<template>
  <q-page class="flex justify-center">
    <div class="q-pa-md justify-center" style="width: 700px">
      <div class="row q-gutter-sm">
        <div class="think-container">
          <q-card class="my-card">
            <q-card-section>
              <div class="row">
                <div class="col-2">
                  <q-avatar
                    size="72px"
                    @click="$router.push({ path: `/profile/${user.id}` })"
                  >
                    <img :src="ownProfile.photoProfileURL || defaultAvatar" />
                  </q-avatar>
                </div>
                <div class="col-10 items-center flex">
                  <q-btn
                    class="q-ml-xs"
                    outline
                    rounded
                    color="primary"
                    :label="`¿Que estás pensando, ${ownProfile.fullName}?`"
                    @click="basic = true"
                    style="width: 100%"
                    no-caps
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <q-dialog
          v-model="basic"
          transition-show="rotate"
          transition-hide="rotate"
        >
          <q-card style="min-width: 450px">
            <q-card-section class="row items-center q-pb-none">
              <q-space />
              <div class="text-h6">Crear publicación</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-separator class="q-mb-lg" />
            <q-card-section class="row items-center">
              <q-avatar
                size="50px"
                class="q-mr-sm"
                @click="$router.push({ path: `/profile/${user.id}` })"
              >
                <img :src="ownProfile.photoProfileURL || defaultAvatar" />
              </q-avatar>
              <div class="text-subtitle2">{{ ownProfile.fullName }}</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="publicationText"
                autofocus
                @keyup.enter="prompt = false"
                class="q-mt-lg"
              />
            </q-card-section>
            <q-card-section v-if="url" class="flex justify-center">
              <img :src="url" style="width: 300px" />
            </q-card-section>
            <q-card-section>
              <q-file
                id="filePicker"
                color="primary"
                filled
                accept="image/*"
                v-model="fileUploaded"
                :displayValue="false"
              >
                <template v-slot:prepend>
                  <q-icon name="insert_photo" />
                </template>
              </q-file>
            </q-card-section>
            <q-card-actions>
              <q-btn
                label="Publicar"
                color="primary"
                style="width: 100%"
                v-close-popup
                class="q-ma-sm"
                :disable="publicationText && url ? false : true"
                @click="createPublication()"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <div
          v-for="(item, index) in publications"
          :key="index"
          class="publication-container"
        >
          <q-card class="q-ma-sm">
            <q-card-section>
              <q-btn round>
                <q-avatar
                  size="45px"
                  @click="$router.push({ path: `/profile/${item.idAccount}` })"
                >
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
                    <img :src="ownProfile.photoProfileURL || defaultAvatar" />
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
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import { ref } from "vue";
import { useQuasar } from "quasar";
import moment from "moment";
import {
  FETCH_PUBLICATIONS,
  CHECK_AUTH,
  CREATE_REACTION,
  CREATE_COMMENT,
  CREATE_PUBLICATION,
} from "../store/actions.type";
import { store } from "quasar/wrappers";

export default defineComponent({
  name: "IndexPage",

  data() {
    return {
      commentsEnabled: false,
      url: null,
      imgFile: null,
    };
  },

  setup() {
    const $q = useQuasar();
    return {
      defaultAvatar: "/default-avatar.jpg",
      likes: {},
      text: ref([]),
      ph: ref(""),
      dense: ref(false),
      basic: ref(false),
      fixed: ref(false),
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),
      fileUploaded: ref(null),
      publicationText: ref(""),

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

          this.$store.dispatch(CREATE_COMMENT, request).then(() => {
            this.$store.dispatch(FETCH_PUBLICATIONS);
            this.text[idPublication] = "";
          });
        }
      },
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
      ownProfile: (state) => state.profile.ownProfile,
    }),
  },
  watch: {
    fileUploaded: function (file) {
      this.url = URL.createObjectURL(file);
      this.imgFile = file;
    },
  },
  methods: {
    createPublication() {
      const formData = new FormData();
      formData.append("file", this.imgFile);
      formData.append("user", JSON.stringify(this.user));
      formData.append("idTypePublication", 1);
      formData.append("description", this.publicationText);

      this.$store.dispatch(CREATE_PUBLICATION, formData).then(() => {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Publicación creada",
        });
        this.$store.dispatch(FETCH_PUBLICATIONS);
        this.url = null;
        this.publicationText = ref("");
      });
    },

    formatDate(dateString) {
      dateString = moment(dateString).utc().format("YYYY-MM-DD");
      return dateString;
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

.think-container {
  width: 600px;
}

.u-comment {
  cursor: pointer;
}
</style>
