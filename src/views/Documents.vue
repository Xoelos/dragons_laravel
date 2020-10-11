<template>
  <span>
    <b-row class="mb-5">
      <b-col cols="12" align="center">
        <h1 class="text-center mb-4">Dungeons and Dragons 3.5e Documents</h1>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12" md="6">
        <h2 class="text-center">Player Guide:</h2>
        <a :href="`${publicPath}player-handbook-35e.pdf`" download>
          <img src="@/assets/player-handbook.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
      <b-col cols="12" md="6">
        <h2 class="text-center">Player Guide II:</h2>
        <a :href="`${publicPath}player-handbook-ii-35e.pdf`" download>
          <img src="@/assets/player-handbook-ii.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
    </b-row>
    <hr class="my-5" />
    <b-row>
      <b-col cols="12" md="6">
        <h2 class="text-center">DM Guide:</h2>
        <a :href="`${publicPath}dungeon-masters-guide-35e.pdf`" download>
          <img src="@/assets/dungeon-masters-guide.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
      <b-col cols="12" md="6">
        <h2 class="text-center">DM Guide II:</h2>
        <a :href="`${publicPath}dungeon-masters-guide-ii-35e.pdf`" download>
          <img src="@/assets/dungeon-masters-guide-ii.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
    </b-row>
    <hr class="my-5" />
    <b-row>
      <b-col cols="12" md="6">
        <h2 class="text-center">Monster Manual:</h2>
        <a :href="`${publicPath}monster-manual-35e.pdf`" download>
          <img src="@/assets/monster-manual.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
      <b-col cols="12" md="6">
        <h2 class="text-center">Monster Manual II:</h2>
        <a :href="`${publicPath}monster-manual-ii-35e.pdf`" download>
          <img src="@/assets/monster-manual-ii.jpg" class="d-block mx-auto mb-5" />
        </a>
      </b-col>
      <b-col cols="12" md="6">
        <h2 class="text-center">Monster Manual III:</h2>
        <a :href="`${publicPath}monster-manual-iii-35e.pdf`" download>
          <img src="@/assets/monster-manual-iii.jpg" class="d-block mx-auto mb-5" />
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
