<template>
  <span>
    Chat!
  </span>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/database';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
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
  created() {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
