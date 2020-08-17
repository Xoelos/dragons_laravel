<template>
  <b-navbar toggleable="lg">
    <!-- Nav Logo -->
    <b-navbar-brand>
      <div v-if="user.access_token">
        <router-link to="/">
          <img src="@/assets/dndlogo.png" />
        </router-link>
      </div>
      <div v-else>
        <router-link to="/landing">
          <img src="@/assets/dndlogo.png" />
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
          <router-link to="/about">About</router-link>
        </b-nav-item>
        <b-nav-item v-show="user.access_token">
          <router-link to="/documents">Documents</router-link>
        </b-nav-item>
        <b-nav-item v-show="user.access_token">
          <router-link to="/profile">Profile</router-link>
        </b-nav-item>
        <b-nav-item v-show="!user.access_token">
          <router-link to="/register">Sign Up</router-link>
        </b-nav-item>
        <b-nav-item v-show="!user.access_token">
          <router-link to="/login">Login</router-link>
        </b-nav-item>
        <b-nav-item v-show="user.access_token">
          <a @click.prevent="signOut">Sign out</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: 'user',
      env: 'env',
    }),
  },
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
    signOut() {
      this.loading({ status: true, message: 'See you later!' });
      axios
        .post(
          `${this.env}/api/auth/logout`,
          {
            withCredentials: true,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          localStorage.removeItem('access_token');
          this.user.access_token = null;
          this.user.data = null;
          this.loading({ status: false, message: '' });
          this.$router.push({
            name: 'Landing',
            params: { logout: res.data.message },
          });
        })
        .catch(err => {
          console.log(err.response);
          if (err.response) {
            localStorage.removeItem('access_token');
            this.user.access_token = null;
            this.user.data = null;
            this.loading({ status: false, message: '' });
            this.$router.push({
              name: 'Landing',
              params: { logout: 'You have been successfully logged out!' },
            });
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
nav {
  background-color: $background;
  padding: 0.25em;

  li {
    font-size: 1.5em;
    margin-right: 1.5em;
  }

  button {
    background-color: $secondary;
  }

  a {
    text-decoration: none !important;
    color: $secondary !important;
    transition: 0.2s;
    a:hover {
      transition: 0.2s;
      color: $highlight !important;
    }

    img {
      width: 100px;
      height: 50px;
    }
  }
}
</style>
