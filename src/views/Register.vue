<template>
  <div>
    <b-row>
      <b-col cols="12" offset-md="3" md="6">
        <h3>Register</h3>
        <hr />

        <b-form @submit="onSubmit" @submit.stop.prevent>
          <b-form-group id="input-group-1" label-for="input-1">
            <b-form-input id="input-1" v-model="form.firstName" required placeholder="First Name" />
          </b-form-group>

          <b-form-group id="input-group-2" label-for="input-2">
            <b-form-input id="input-2" v-model="form.lastName" required placeholder="Last Name" />
          </b-form-group>

          <b-form-group id="input-group-3" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group id="input-group-4" label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="form.password"
              required
              placeholder="Enter Password"
              type="password"
              :state="passwordStrength"
            />
            <b-form-invalid-feedback
              :state="passwordStrength"
            >Password must 8 characters long and contain at least ONE uppercase, ONE lowercase, and ONE number</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-5" label-for="input-5">
            <b-form-input
              id="input-5"
              v-model="form.confirmPassword"
              required
              placeholder="Confirm Password"
              :state="passwordValidation"
              type="password"
            />
            <b-form-invalid-feedback :state="passwordValidation">Your password must match!</b-form-invalid-feedback>
          </b-form-group>
          <b-button id="registerSubmit" type="submit">Submit</b-button>
        </b-form>
      </b-col>
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
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data: () => {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      error: null,
      show: false
    };
  },
  computed: {
    passwordValidation() {
      return this.form.password == this.form.confirmPassword;
    },
    passwordStrength() {
      return (
        new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$").test(
          this.form.password
        ) || this.form.password == ""
      );
    }
  },
  methods: {
    onSubmit() {
      this.show = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          data.user
            .updateProfile({
              displayName: `${this.form.firstName} ${this.form.lastName}`
            })
            .then(() => {
              firebase
                .firestore()
                .collection("users")
                .doc(data.user.uid)
                .set({
                  uid: data.user.uid,
                  email: data.user.email,
                  firstName: this.form.firstName,
                  lastName: this.form.lastName,
                  created: firebase.firestore.Timestamp.fromDate(new Date())
                })
                .then(() => {
                  this.show = false;
                  this.$router.replace({ name: "Home" });
                });
            })
            .catch(err => {
              this.error = err.message;
            });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
#registerSubmit {
  background-color: $primary;
}
</style>