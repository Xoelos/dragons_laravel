<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1>About this site!</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12" offset-md="1" md="2" order="2" order-md="1">
        <img src="@/assets/dwarf.png" />
      </b-col>
      <b-col cols="12" md="6" order="1" order-md="2">
        <p>Created by Samuel K using Vue.js, Bootstrap, and Laravel. This is available for personal use only and allows the user to coordinate Dungeon and Dragons 3.5e with a group of friends. Have fun!</p>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: "About",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  width: 100%;
  max-width: 400px;
  display: block;
  margin: auto;
}
</style>
