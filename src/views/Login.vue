<template>
  <div>
    <b-row class="pt-5">
      <b-col offset-md="3" offset-lg="4">
        <h3 class="text-center">Login</h3>
        <hr />
        <b-form @submit="onSubmit" @submit.stop.prevent>
          <b-form-group id="input-group-1" label-for="login_email">
            <b-form-input
              id="login_email"
              v-model="form.email"
              type="email"
              required
              placeholder="Email"
              autocomplete="on"
              class="mx-auto mt-5"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label-for="login_password">
            <b-form-input
              id="login_password"
              v-model="form.password"
              required
              placeholder="Password"
              autocomplete="password"
              type="password"
              class="m-auto"
            />
          </b-form-group>
          <b-button id="loginSubmit" type="submit" class="d-block mx-auto mt-5 w-50"
            >Login</b-button
          >
        </b-form>
      </b-col>
      <b-col cols="0" md="3" lg="4"></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="12" offset-md="4" md="4" align="center">
        <b-alert :show="!!alertMessage" variant="danger">{{ alertMessage }}</b-alert>
        <b-spinner
          v-show="show"
          variant="success"
          class="mt-5 mx-auto"
          type="grow"
          label="Spinning"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  data: () => {
    return {
      form: {
        email: '',
        password: '',
      },
      alertMessage: null,
      show: false,
    };
  },
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  methods: {
    onSubmit() {
      this.show = true;
      axios
        .post(`${this.env}/api/auth/login`, {
          withCredentials: true,
          email: this.form.email,
          password: this.form.password,
        })
        .then(res => {
          this.user.access_token = res.data.access_token;
          this.show = false;

          const access_token = {
            token: res.data.access_token,
            expiry: new Date().getTime() + 1000 * 60 * 120,
          };

          localStorage.setItem('access_token', JSON.stringify(access_token));

          this.alertShow = false;
          this.$router.replace({ name: 'Home' });
        })
        .catch(err => {
          console.log(err.response);
          this.show = false;
          this.alertMessage = err.response.data.error;
          setTimeout(() => {
            this.alertMessage = null;
          }, 1000 * 3);
        });
    },
    ...mapMutations([
      'SET_LOGGED_IN', // map `this.SET_LOGGED_IN()` to `this.$store.commit('SET_LOGGED_IN')`
    ]),
  },
};
</script>
<style lang="scss" scoped>
#loginSubmit {
  background-color: $primary;
}

input {
  max-width: 333px;
}
</style>
