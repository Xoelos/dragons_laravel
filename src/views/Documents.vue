<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1 class="text-center">Dungeons and Dragons 3.5e Documents</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12" md="6" lg="4">
        <h2 class="text-center">Player Guide:</h2>
        <a :href="`${publicPath}player-handbook-35e.pdf`" download>
          <img src="@/assets/player-handbook.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
      <b-col cols="12" md="6" lg="4">
        <h2 class="text-center">Monster Manual:</h2>
        <a :href="`${publicPath}monster-manual-35e.pdf`" download>
          <img src="@/assets/monster-manual.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>

      <b-col cols="12" md="6" lg="4">
        <h2 class="text-center">Dungeon Master's Guide:</h2>
        <a :href="`${publicPath}dungeon-masters-guide-35e.pdf`" download>
          <img src="@/assets/dungeon-masters-guide.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
    </b-row>
  </span>
</template>

<script>
export default {
  name: 'Documents',
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  height: 300px;
  width: 232px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
