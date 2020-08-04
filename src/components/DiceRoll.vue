<template>
  <span>
    <b-row class="mt-5">
      <b-col cols="12" align="center">
        <h3>Roll Dice!</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2" offset="4" align="right">
        <img v-if="still" src="@/assets/dice-roll-still.png" class="diceButton" @click="rollDice" />
        <img v-else src="@/assets/dice-roll.gif" class="diceButton" @click="rollDice" />
      </b-col>
      <b-col cols="2">
        <small>Sides on die</small>
        <b-form-input v-model="dieSides"></b-form-input>
      </b-col>
    </b-row>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default {
  props: {
    campaignId: {
      type: String,
      default: "",
    },
    characterId: {
      type: String,
      default: "",
    },
  },
  data: () => {
    return {
      dieSides: 20,
      still: true,
      err: null,
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user",
      env: "env",
    }),
  },
  mounted() {},
  methods: {
    rollDice() {
      if (parseInt(this.dieSides) > 0) {
        this.sendDiceMessage(
          Math.floor(Math.random() * parseInt(this.dieSides)) + 1
        );
      }
      this.still = false;
      setTimeout(() => {
        this.still = true;
      }, 1000 * 1);
    },
    sendDiceMessage(number) {
      console.log(number);

      let message;
      if (number == this.dieSides) {
        message = `${this.user.data.firstName} rolled a nat ${number} on their D${this.dieSides}`;
      } else {
        message = `${this.user.data.firstName} rolled a ${number} on their D${this.dieSides}`;
      }

      firebase
        .database()
        .ref(`${this.$props.campaignId}/chat/global`)
        .push({
          message: message,
        })
        .catch((err) => {
          console.log(err);
        });
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
