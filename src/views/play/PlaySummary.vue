<template>
  <span>
    <!-- <b-tabs pills content-class="mt-3">
      <b-tab title="Chat" @click="view('chat')" active>
        <Chat :campaignId="campaignId"></Chat>
      </b-tab>
      <b-tab title="Roll Dice" @click="view('roll')">
        <DiceRoll :campaignId="campaignId"></DiceRoll>
      </b-tab>
    </b-tabs> -->
  </span>
</template>

<script>
// import Character from '../character/Character.vue';
// import DiceRoll from '../../components/DiceRoll.vue';
// import Chat from './Chat.vue';
import firebase from 'firebase/app';
import 'firebase/database';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
//   components: {
//      DiceRoll: DiceRoll,
//      Chat: Chat,
//   },
  props: {
    campaignId: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {};
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  created() {
    this.$router.replace('/play/chat');
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    view(location) {
      if (window.location.pathname !== `/play/${location}`)
        this.$router.replace('/play/' + location);
    },
  },
};
</script>

<style lang="scss" scoped></style>
