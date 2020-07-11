<template>
  <div>
    <b-row>
      <b-col cols="12" offset-md="3" md="6">
        <h3>Login</h3>
        <hr />
        <b-form @submit="onSubmit" @submit.stop.prevent>
          <b-form-group id="input-group-1" label-for="login_email">
            <b-form-input
              data-hook="login_email"
              id="login_email"
              v-model="form.email"
              type="email"
              required
              placeholder="Email"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label-for="login_password">
            <b-form-input
              data-hook="login_password"
              id="login_password"
              v-model="form.password"
              required
              placeholder="Password"
              type="password"
            />
          </b-form-group>
          <b-button id="loginSubmit" data-hook="login_submit" type="submit">Submit</b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col cols="12" offset-md="2" md="8">
        <b-alert :show="alertMessage" variant="danger">Invalid login! {{ alertMessage }}</b-alert>
      </b-col>
    </b-row>
  </div>
</template>


<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      form: {
        email: "",
        password: ""
      },
      alertMessage: null
    };
  },
  methods: {
    onSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.alertShow = false;
          this.$router.replace({ name: "Home" });
        })
        .catch(err => {
          this.alertMessage = err.message;
        });
    },
    ...mapMutations([
      "SET_LOGGED_IN" // map `this.SET_LOGGED_IN()` to `this.$store.commit('SET_LOGGED_IN')`
    ])
  }
};
</script>
<style lang="scss" scoped>
#loginSubmit {
  background-color: $primary;
}
</style>