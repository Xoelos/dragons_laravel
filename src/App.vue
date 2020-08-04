<template>
  <div id="app">
    <Navbar @loading="loading"></Navbar>
    <b-container fluid class="main-view">
      <router-view @loading="loading" class="h-100"></router-view>
      <div id="loading" :class="!loaded ? 'd-none' : null">
        <div class="loading_icon text-center">
          <h1>{{message}}</h1>
          <b-spinner variant="dark" type="grow" style="width: 3rem; height: 3rem;"></b-spinner>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
// app.js
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Install BootstrapVue
Vue.use(BootstrapVue);

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

// Bootstrap import
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Views import
import Register from "./views/Register.vue";
import About from "./views/About.vue";
import Documents from "./views/Documents.vue";
import Login from "./views/Login.vue";
import Home from "./views/home/Home.vue";
import NotFound from "./views/NotFound.vue";

// Component import
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar,
  },
  views: { Register, NotFound, About, Login, Home, Documents },
  data: () => {
    return {
      loaded: false,
      message: "Loading your adventure!",
    };
  },
  created() {},
  methods: {
    loading(change) {
      this.loaded = change.status;
      this.message = change.message;
    },
  },
};
</script>

<style lang="scss">
@import "scss/variables.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";

html,
body,
#app {
  height: 100%;
}

body {
  background-color: $light;
  color: $primary;
  font-family: $paragraph;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: $header;
  }

  input,
  select,
  textarea {
    &:disabled,
    &:read-only {
      background-color: darken($white, 5) !important;
    }
  }

  #loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5000;
    color: $background;
    background-color: $light;

    .loading_icon {
      position: relative;
      top: 35%;
      transform: translateY(-50%);

      h1 {
        font-weight: 900;
      }
    }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 36px;
    }
  }

  @media (max-width: 576px) {
    h1 {
      font-size: 32px;
    }
    h2 {
      font-size: 28px;
    }
    h3 {
      font-size: 24px;
    }
    h4 {
      font-size: 20px;
    }
    h5 {
      font-size: 16px;
    }
    h6 {
      font-size: 12px;
    }
  }

  .main-view {
    height: calc(100% - #{$nav-height});
    padding-top: 30px;
    padding-bottom: 15px;
    position: relative;
  }
}
</style>
