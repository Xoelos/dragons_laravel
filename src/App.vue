<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container fluid>
      <router-view></router-view>
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
import Home from "./views/Home.vue";
import NotFound from "./views/NotFound.vue";

// Component import
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  views: { Register, NotFound, About, Login, Home, Documents }
  // watch: {
  //   $route(to, from) {
  //     document.title = to.meta.title || "Your Website";
  //   }
  // }
};
</script>

<style lang="scss">
@import "scss/variables.scss";
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import url("https://fonts.googleapis.com/css?family=Noto+Sans|Open+Sans|Oxygen|Playfair+Display:400,500,600|Ubuntu&display=swap");
body {
  background-color: $light;
  color: $primary;
  height: 100vh;
}

#app {
  height: 100vh;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Oxygen", sans-serif;
}
p {
  font-family: "Ubuntu", sans-serif;
}

// .container-lg {
//   max-width: 1150px;
// }

// font-family: "Open Sans", sans-serif;
// font-family: "Noto Sans", sans-serif;
// font-family: "Ubuntu", sans-serif;
</style>
