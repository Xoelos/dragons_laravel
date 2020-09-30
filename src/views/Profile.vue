<template>
  <div>
    <b-row class="pt-5">
      <b-col offset-md="3" offset-lg="4">
        <h3 class="text-center">Update Profile</h3>
        <hr />

        <b-form @submit="updateProfile" @submit.stop.prevent>
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
          <b-button
            id="updateProfileSubmit"
            type="submit"
            class="d-block mx-auto mt-5 w-50"
            variant="primary"
            >Update Profile</b-button
          >
        </b-form>
      </b-col>
      <b-col cols="0" md="3" lg="4"></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col align="center" cols="8" offset="2" md="2" offset-md="5">
        <b-alert :show="errorProfile !== null" variant="danger"
          >Error! {{ errorProfile }}</b-alert
        >
        <b-alert :show="successProfile" variant="success">Saved!</b-alert>
        <b-spinner v-show="showProfile" variant="success" type="grow" label="Spinning" />
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col offset-md="3" offset-lg="4">
        <b-form @submit="updatePassword" @submit.stop.prevent>
          <h3 class="text-center mt-5">Change Password</h3>
          <hr />
          <b-form-group id="input-group-4" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.password"
              class="m-auto"
              required
              placeholder="Enter New Password"
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
          <b-button
            id="updatePasswordSubmit"
            type="submit"
            class="d-block mx-auto mt-5 w-50"
            variant="danger"
            >Update Password</b-button
          >
        </b-form>
      </b-col>
      <b-col cols="0" md="3" lg="4"></b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col align="center" cols="8" offset="2" md="2" offset-md="5">
        <b-alert :show="errorPassword !== null" variant="danger"
          >Error! {{ errorPassword }}</b-alert
        >
        <b-alert :show="successPassword" variant="success">Saved!</b-alert>
        <b-spinner v-show="showPassword" variant="success" type="grow" label="Spinning" />
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
      showPassword: false,
      errorPassword: null,
      successPassword: false,
      successProfile: false,
      errorProfile: null,
      showProfile: false,
    };
  },
  created() {
    this.form.firstName = this.user.data.firstName;
    this.form.lastName = this.user.data.lastName;
    this.form.email = this.user.data.email;
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
    updateProfile() {
      this.showProfile = true;
      if (this.form.firstName)
        axios
          .put(
            `${this.env}/api/user/profile`,
            {
              withCredentials: true,
              first_name: this.form.firstName,
              last_name: this.form.lastName,
              email: this.form.email,
            },
            {
              headers: { Authorization: `Bearer ${this.user.access_token}` },
            }
          )
          .then(res => {
            this.showProfile = false;
            this.user.data.firstName = this.form.firstName;
            this.user.data.lastName = this.form.lastName;
            this.user.data.email = this.form.email;
            this.successPassword = false;
            this.successProfile = true;
          })
          .catch(err => {
            console.log(err.response.data);
            this.showProfile = false;
            this.errorProfile = err.response.data;
            this.successPassword = false;
            this.successProfile = false;
          });
    },
    updatePassword() {
      this.showPassword = true;

      axios
        .put(
          `${this.env}/api/user/password`,
          {
            withCredentials: true,
            password: this.form.password,
            password_confirmation: this.form.confirmPassword,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          this.form.password = '';
          this.form.confirmPassword = '';
          this.showPassword = false;
          this.successPassword = true;
          this.successProfile = false;
        })
        .catch(err => {
          console.log(err.response.data);
          this.form.password = '';
          this.form.confirmPassword = '';
          this.showPassword = false;
          this.errorPassword = err.response.data;
          this.successPassword = false;
          this.successProfile = false;
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
