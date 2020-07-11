<template>
  <b-navbar toggleable="lg" class="mb-5">
    <!-- Nav Logo -->
    <b-navbar-brand>
      <div v-if="this.$store.getters.user.loggedIn">
        <router-link to="/" class>
          <img class="d-none d-md-block" src="@/assets/dnd35.png" />
          <img class="d-block d-md-none" src="@/assets/dndlogo.png" />
        </router-link>
      </div>
      <div v-else>
        <router-link to="/landing" class>
          <img class="d-none d-md-block" src="@/assets/dnd35.png" />
          <img class="d-block d-md-none" src="@/assets/dndlogo.png" />
        </router-link>
      </div>
    </b-navbar-brand>

    <!-- Nav Left Aligned -->
    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav />

      <!-- Nav Right Aligned -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <router-link to="/documents">Documents</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/about">About</router-link>
        </b-nav-item>
        <b-nav-item v-show="!user.loggedIn">
          <router-link to="/register">Sign Up</router-link>
        </b-nav-item>
        <b-nav-item v-show="!user.loggedIn">
          <router-link to="/login" data-hook="login_link">Login</router-link>
        </b-nav-item>
        <b-nav-item v-show="user.loggedIn">
          <a @click.prevent="signOut" data-hook="logout_link">Sign out</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Home",
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.getters.user.loggedIn = false;
          this.$router.replace({
            name: "Landing",
            params: { logout: "You have successfully logged out!" }
          });
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  transition: 0.3s;
  width: 246px;
  height: 80px;
  @media (max-width: 576px) {
    width: 150px;
    height: 75px;
  }
}
img:hover {
  box-shadow: 5px;
  transition: 0.75s;
}

a {
  text-decoration: none !important;
  color: $secondary !important;
  transition: 0.2s;
  a:hover {
    transition: 0.2s;
    color: $highlight !important;
  }
}

nav {
  background-color: $background;
  padding: 0.25em;
}

li {
  font-size: 1.5em;
  margin-right: 1.5em;
}

button {
  background-color: $secondary;
}
</style>
