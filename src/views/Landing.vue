<template>
  <span>
    <b-row class="mt-5">
      <b-col cols="12" align="center">
        <h1>
          Welcome to
          <span class="d-inline-block">
            D&#38;D 3.5
            <strong>online</strong>
          </span>
        </h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-5" cols="12" align="center">
        <h2>
          <router-link to="/register">Get started now!</router-link>
        </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="mt-4" cols="12" offset-md="4" md="4" align="center">
        <b-alert v-if="logout" show variant="success">{{ logout }}</b-alert>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: 'Landing',
  props: {
    logout: {
      type: String,
      default: null,
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  font-size: 4em;
  color: $background;
  @media (max-width: 576px) {
    font-size: 2.5em;
  }
}

h2 {
  font-size: 3em;

  @media (max-width: 576px) {
    font-size: 2em;
  }
}

a {
  text-decoration: none;
  color: $secondary;
  font-weight: 700;
  padding: 1em 0.25em 1em 0.25em;

  &:hover {
    color: darken($secondary, 10);
  }
}
</style>
