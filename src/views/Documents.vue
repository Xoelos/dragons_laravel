<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1>Dungeons and Dragons 3.5e Documents</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="8" md="6">
        <h2>Player Guide:</h2>
        <a :href="`${publicPath}player-handbook-35e.pdf`" download>
          <img src="@/assets/player-handbook.jpg" />
        </a>
        <h2>Monster Manual:</h2>
        <a :href="`${publicPath}monster-manual-35e.pdf`" download>
          <img src="@/assets/monster-manual.jpg" />
        </a>
        <h2>Dungeon Master's Guide:</h2>
        <a :href="`${publicPath}dungeon-masters-guide-35e.pdf`" download>
          <img src="@/assets/dungeon-masters-guide.jpg" />
        </a>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: "Documents",
  data() {
    return {
      publicPath: process.env.BASE_URL
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  height: 300px;
  width: 232px;
  margin-bottom: 3rem;
}
</style>
