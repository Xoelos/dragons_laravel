<template>
  <span>
    <b-row class="mt-5">
      <b-col cols="12" align="center">
        <h1>
          Welcome to D&#38;D 3.5
          <strong>online</strong>
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-4" cols="12" align="center">
        <h1>
          <router-link to="/register" data-hook="get_started">Get started now!</router-link>
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-4" cols="12" offset-md="4" md="4" align="center">
        <b-alert v-if="logout" show variant="success" data-hook="logout_success">{{ logout }}</b-alert>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: "Landing",
  props: {
    logout: {
      type: String,
      default: null
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-size: 3em;
}
a {
  text-decoration: none;
  color: $primary;
  transition: 0.2s;
  padding: 0.25em;
}

a:hover {
  transition: 0.2s;
  color: $secondary;
}
</style>
