<template>
  <span>
    <b-row class="mt-5">
      <b-col cols="12" align="center">
        <h3>Roll Dice!</h3>
      </b-col>
    </b-row>
    <b-row align="center">
      <b-col
        cols="auto"
        offset="0"
        offset-md="4"
        align="right"
        class="d-flex align-items-end"
      >
        <img
          v-if="still"
          src="@/assets/dice-roll-still.png"
          class="diceButton"
          @click="rollDice"
        />
        <img v-else src="@/assets/dice-roll.gif" class="diceButton" @click="rollDice" />
      </b-col>
      <b-col cols="auto">
        <small>Sides on die</small>
        <b-form-input v-model="dieSides" />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" align="center" class="mt-4 h5">
        <span v-if="dieRoll !== null">You rolled a {{ dieRoll }}!</span>
      </b-col>
    </b-row>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default {
  props: {
    campaignId: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      dieRoll: null,
      dieSides: 20,
      still: true,
      err: null,
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  created() {},
  mounted() {},
  methods: {
    rollDice() {
      let roll;
      if (parseInt(this.dieSides) > 0) {
        roll = Math.floor(Math.random() * parseInt(this.dieSides)) + 1;
      }
      this.still = false;
      setTimeout(() => {
        this.still = true;
        this.dieRoll = roll;
      }, 1000 * 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  height: 50px;
  width: 50px;
}
</style>
