<template>
  <span>
    <b-row class="mt-3">
      <b-col cols="12" md="12" align="center">
        <h1 v-if="user.data !== null">Welcome {{ user.data.firstName }}!</h1>
        <h1 v-else>Welcome!</h1>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="12" md="5">
        <CharacterCreate @loading="loading" />
      </b-col>
      <b-col cols="12" md="7">
        <CampaignCreate @loading="loading" />
      </b-col>
    </b-row>
  </span>
</template>

<script>
import CharacterCreate from './CharacterCreate';
import CampaignCreate from './CampaignCreate';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    CharacterCreate,
    CampaignCreate,
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
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#characterButton {
  background-color: $background;
  color: $secondary;
  transition: 0.3s;
  h1 {
    transition: -0.1s;
  }
}

#characterButton:hover {
  background-color: $secondary;
  color: $highlight;
  border-color: $highlight;
  border-width: 2px;
  padding: -2px;
  transition: 0.4s;
  h1:hover {
    transition: -0.2s;
  }
}
#campaignButton {
  background-color: $background;
  color: $highlight;
  transition: 0.3s;
  h1 {
    transition: -0.1s;
  }
}

#campaignButton:hover {
  background-color: $highlight;
  color: $secondary;
  transition: 0.4s;
  border-color: $secondary;
  border-width: 2px;
  padding: -2px;
  h1:hover {
    transition: -0.2s;
  }
}
</style>
