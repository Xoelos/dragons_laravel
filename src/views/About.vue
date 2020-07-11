<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1>About this site!</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="4" offset-md="1" md="2">
        <img src="@/assets/dwarf.png" />
      </b-col>
      <b-col cols="8" md="6">
        <p>Created by Samuel Krohn using Vue.js, Bootstrap, and Firebase. This is available for personal use only and allows the user to coordinate Dungeon and Dragons 3.5e with a group of friends. Have fun!</p>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: "About"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
