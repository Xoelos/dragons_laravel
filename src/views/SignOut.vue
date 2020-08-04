<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1>You have successfuly signed out!</h1>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: 'SignOut',
  created() {
    setTimeout(() => this.$router.push({ path: '/landing' }), 1 * 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
