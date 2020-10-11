<template>
  <span>
    <b-row class="mb-3">
      <b-col cols="12" lg="10">
        <h2>Campaigns:</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-list-group v-if="campaigns.length == 0">
          <b-list-group-item class="h3"
            >Create or
            <span class="d-inline-block">join a campaign!</span></b-list-group-item
          >
        </b-list-group>
        <b-list-group v-else>
          <div v-for="campaign in campaigns" :key="campaign.id" class="campaignGrid mb-3">
            <b-list-group-item button @click="startGame(campaign.id)" class="h3">{{
              campaign.name
            }}</b-list-group-item>
            <small>{{ `Campaign Code: ${campaign.code}` }}</small
            ><small v-if="campaign.owner === 1">&nbsp;| Owner</small>
          </div>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="mt-4 mb-5">
      <b-col cols="12" lg="4">
        <b-button v-b-modal.createCampaign class="campaign d-block"
          >Create Campaign</b-button
        >
      </b-col>
      <b-col cols="12" lg="4" class="mt-4 mt-lg-0">
        <b-button v-b-modal.joinCampaign class="campaign d-block">Join campaign</b-button>
      </b-col>
      <b-col cols="12" lg="4" class="mt-4 mt-lg-0">
        <b-button v-b-modal.deleteCampaignModal class="delete d-block" variant="secondary"
          >Delete Campaign</b-button
        >
      </b-col>
    </b-row>

    <!-- Create Campaign Model -->
    <b-modal id="createCampaign" size="md" title="Start new adventure" hide-footer>
      <div>
        <b-form @submit="createCampaign" @submit.stop.prevent>
          <b-form-group id="input-group-1" label="Campaign Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.name" required />
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>

    <!-- Join Campaign Model -->
    <b-modal id="joinCampaign" size="md" title="Join an adventure" hide-footer>
      <div>
        <b-form @submit="joinCampaign" @submit.stop.prevent>
          <b-form-group id="input-group-3" label="Campaign Code:" label-for="input-3">
            <b-form-input id="input-3" v-model="join.code" required />
          </b-form-group>
          <label>Select Characters:</label>
          <b-form-select
            v-model="join.characterIds"
            :options="characters"
            :select-size="4"
            multiple
            class="mb-3"
          ></b-form-select>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>

    <!-- Delete Campaign Model -->
    <b-modal
      id="deleteCampaignModal"
      header-text-variant="danger"
      ok-title="DELETE"
      ok-variant="secondary"
      cancel-variant="primary"
      title="Delete Campaign?"
      @ok="deleteCampaign()"
    >
      <b-form-select v-model="deletingCampaign" :options="campaignNames" required />
      <small>This change is permanent, it cannot be undone!</small>
    </b-modal>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'CampaignCreate',
  data: () => {
    return {
      campaigns: [],
      campaignNames: [],
      characters: [],
      deletingCampaign: null,
      err: null,
      form: {
        name: '',
      },
      join: {
        characterIds: [],
        code: '',
      },
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  created() {
    this.getCampaigns();
    this.getCharacters();
  },
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
    getCampaigns() {
      axios
        .get(`${this.env}/api/campaign`, {
          headers: { Authorization: `Bearer ${this.user.access_token}` },
        })
        .then(res => {
          this.campaigns = res.data.data;
          this.campaignNames = this.campaigns.map(campaign => {
            return {
              text: campaign.owner === 1 ? `${campaign.name} (Owned)` : campaign.name,
              value: campaign.id,
            };
          });
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    getCharacters() {
      axios
        .get(`${this.env}/api/character`, {
          headers: { Authorization: `Bearer ${this.user.access_token}` },
        })
        .then(res => {
          this.characters = res.data.data.map(character => {
            return { text: character.name + ' | ' + character.race, value: character.id };
          });

          this.loading({ status: false, message: '' });
        })
        .catch(err => {
          console.log(err.response);
          this.loading({ status: false, message: '' });
        });
    },
    createCampaign() {
      axios
        .post(
          `${this.env}/api/campaign`,
          {
            withCredentials: true,
            name: this.form.name,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          this.form.name = '';
          this.campaigns.push(res.data);
          this.loading({ status: false, message: '' });
          this.$bvModal.hide('createCampaign');
        })
        .catch(err => {
          console.log(err.response);
          this.loading({ status: false, message: '' });
          this.$bvModal.hide('createCampaign');
        });
    },
    joinCampaign() {
      axios
        .post(
          `${this.env}/api/campaign/join`,
          {
            withCredentials: true,
            code: this.join.code,
            character_ids: this.join.characterIds,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          this.join.code = '';
          this.campaigns.push(res.data);
          this.loading({ status: false, message: '' });
          this.$bvModal.hide('joinCampaign');
        })
        .catch(err => {
          console.log(err.response);
          this.loading({ status: false, message: '' });
          this.$bvModal.hide('joinCampaign');
        });
    },
    deleteCampaign() {
      axios({
        url: `${this.env}/api/campaign`,
        method: 'delete',
        data: {
          withCredentials: true,
          campaign_id: this.deletingCampaign,
        },
        headers: { Authorization: `Bearer ${this.user.access_token}` },
      })
        .then(res => {
          console.log(res);
          this.getCampaigns();
          this.$bvModal.hide('deleteCampaignModal');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    startGame(campaignId) {
      this.$router
        .push({
          name: 'Play',
          params: { campaignId },
        })
        .catch(err => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.campaign {
  background-color: $background;
  color: $highlight;
  transition: 0.3s;
  font-size: larger;
  font-weight: 700;
  h1 {
    transition: -0.1s;
  }
}

.campaign:hover,
.campaign:active,
.campaign:focus {
  background-color: $highlight;
  color: $secondary;
  border-color: $secondary;
  transition: 0.4s;
  h1:hover,
  h1:active {
    transition: -0.2s;
  }
}

.delete {
  background-color: $background;
  color: $secondary;
  transition: 0.3s;
  font-size: larger;
  font-weight: 700;
  h1 {
    transition: -0.1s;
  }
}

.delete:hover,
.delete:active,
.delete:focus {
  background-color: $secondary;
  color: $highlight;
  border-color: $highlight;
  transition: 0.4s;
  h1:hover,
  h1:active {
    transition: -0.2s;
  }
}
</style>
