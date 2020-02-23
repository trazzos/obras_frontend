<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-slide-y-transition appear>
          <base-material-card
            color="success"
            light
            max-width="100%"
            width="400"
            class="px-5 py-3"
          >
            <v-card-text class="text-center">
              <v-text-field
                v-model="email"
                :rules="[rules.required]"
                color="secondary"
                label="Email..."
                prepend-icon="mdi-email"
              />

              <v-text-field
                v-model="password"
                :rules="[rules.required]"
                type="password"
                class="mb-8"
                color="secondary"
                label="Password..."
                prepend-icon="mdi-lock-outline"
              />

              <pages-btn
                large
                color=""
                depressed
                class="v-btn--text success--text"
                :loading="button_loading"
                @click="validateForm"
              >
                Ingresar
              </pages-btn>
            </v-card-text>
          </base-material-card>
        </v-slide-y-transition>
      </v-form>
    </v-row>
  </v-container>
</template>

<script>
  import userStore from 'userModule/stores/userStore'
  import { mapActions } from 'vuex'
  import { mapFields } from 'vuex-map-fields'

  export default {
    name: 'UserLogin',
    data () {
      return {
        rules: {
          required: value => !!value || 'Required.',
        },
      }
    },
    computed: {
      ...mapFields(userStore.name, [
        'credentials.email',
        'credentials.password',
        'credentials.button_loading',
      ]),
      ...mapFields('globalModule', [
        'snackbar.show',
        'snackbar.text',
      ]),
    },
    beforeCreate () {
      if (!this.$store.state.userStore) {
        this.$store.registerModule(userStore.name, userStore)
      }
    },
    methods: {
      ...mapActions(userStore.name, [
        'userLogin',
      ]),
      validateForm () {
        if (this.$refs.form.validate()) {
          this.userLogin(this.$auth)
        }
      },
    },
  }
</script>
