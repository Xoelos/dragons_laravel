<template>
  <div>
    <b-row class="pt-5">
      <b-col offset-md="3" offset-lg="4">
        <h3 class="text-center">Register</h3>
        <hr />

        <b-form @submit="onSubmit" @submit.stop.prevent>
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.firstName"
              class="mx-auto mt-5"
              required
              placeholder="First Name"
            />
          </b-form-group>

          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.lastName"
              class="m-auto"
              required
              placeholder="Last Name"
            />
          </b-form-group>

          <b-form-group id="input-group-3" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.email"
              class="m-auto"
              type="email"
              required
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group id="input-group-4" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.password"
              class="m-auto"
              required
              placeholder="Enter Password"
              type="password"
              :state="passwordStrength"
            />
            <b-form-invalid-feedback :state="passwordStrength"
              >Password must 8 characters long and contain at least ONE uppercase, ONE
              lowercase, and ONE number</b-form-invalid-feedback
            >
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.confirmPassword"
              required
              class="m-auto"
              placeholder="Confirm Password"
              :state="passwordValidation"
              type="password"
            />
            <b-form-invalid-feedback :state="passwordValidation"
              >Your password must match!</b-form-invalid-feedback
            >
          </b-form-group>
          <b-button id="registerSubmit" type="submit" class="d-block mx-auto mt-5 w-50"
            >Create Account</b-button
          >
        </b-form>
      </b-col>
      <b-col cols="0" md="3" lg="4"></b-col>
    </b-row>
    <b-row>
      <b-col align="center">
        <b-alert v-if="error !== null" variant="danger">Error! {{ error }}</b-alert>
        <b-spinner v-show="show" variant="success" type="grow" label="Spinning" />
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
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      error: null,
      show: false,
    };
  },
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
    passwordValidation() {
      if (this.form.password == '' || this.form.confirmPassword == '') return null;
      else if (this.form.password == this.form.confirmPassword) return true;
      else return false;
    },
    passwordStrength() {
      if (this.form.confirmPassword == '') return null;
      else if (
        new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$').test(
          this.form.password
        ) ||
        this.form.password == ''
      ) {
        return true;
      } else return false;
    },
  },
  methods: {
    onSubmit() {
      this.show = true;
      axios
        .post(`${this.env}/api/user/register`, {
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.confirmPassword,
        })
        .then(res => {
          this.show = false;
          this.user.access_token = res.data.access_token;

          const access_token = {
            token: res.data.access_token,
            expiry: new Date().getTime() + 1000 * 900,
          };

          localStorage.setItem('access_token', JSON.stringify(access_token));

          this.$router.replace({ name: 'Home' });
        })
        .catch(err => {
          console.log(err.response.data);
          this.error = err.response.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
#registerSubmit {
  background-color: $primary;
}

input {
  max-width: 333px;
}
</style>
