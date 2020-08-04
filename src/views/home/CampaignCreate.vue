<template>
  <span>
    <div>
      <b-row class="d-flex mb-3">
        <b-col class="pr-2" cols="12" md="auto">
          <h3>Campaigns:</h3>
        </b-col>
        <b-col class="d-flex" cols="12" md="auto">
          <b-button v-b-modal.modal-xl-2 class="ml-auto campaignButton">Create new Campaign</b-button>
          <b-button v-b-modal.modal-xl-3 class="ml-2 campaignButton">Join a campaign</b-button>
        </b-col>
      </b-row>
    </div>

    <b-list-group v-if="campaigns.length == 0 && joinedCampaigns.length == 0">
      <b-list-group-item class="mb-3">Create or join a campaign to get started!</b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <div v-for="campaign in campaigns" :key="campaign.id" class="campaignGrid mb-3">
        <b-list-group-item
          button
          @click="startGame(campaign.id, null)"
        >{{ `Owned Campaign: ${campaign.name}` }}</b-list-group-item>
        <b-button
          v-b-modal.deleteCampaignModal
          class="deleteCampaignButton"
          variant="secondary"
          @click="deleteCampaignId = {id: campaign.id, owned: true, characterId: null}"
        >X</b-button>
        <small>{{ `Campaign ID: ${campaign.id} | Campaign Code: ${campaign.code}` }}</small>
      </div>
      <!-- <div
        class="campaignGrid mb-3"
        v-for="joinedCampaign in joinedCampaigns"
        :key="joinedCampaign.id"
      >
        <b-list-group-item
          button
          @click="startGame(joinedCampaign.id, joinedCampaign)"
        >{{ `Joined Campaign: ${joinedCampaign.data.name} | Character: ${joinedCampaign.data.users[user.data.uid].characterName}` }}</b-list-group-item>
        <b-button
          class="deleteCampaignButton"
          variant="secondary"
          @click="deleteCampaignId = {id: joinedCampaign.id, owned: false, characterId: joinedCampaign.data.users[user.data.uid].characterId}"
          v-b-modal.deleteCampaignModal
        >X</b-button>

        <small>{{ `Campaign ID: ${joinedCampaign.id} | Campaign Code: ${joinedCampaign.data.code}` }}</small>
      </div>-->

      <b-modal
        id="deleteCampaignModal"
        ok-title="DELETE"
        ok-variant="secondary"
        cancel-variant="primary"
        class="d-contents"
        title="DELETE CAMPAIGN?"
        @ok="deleteCampaign()"
      >
        <p class="my-4">This change is permanent, it cannot be undone!</p>
      </b-modal>
    </b-list-group>

    <!-- create campaign modal -->
    <b-modal id="modal-xl-2" size="xl" title="Start new adventure" hide-footer>
      <div>
        <b-form @submit="createCampaign">
          <b-form-group id="input-group-1" label="Campaign Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="createForm.name" required />
          </b-form-group>
          <b-form-group id="input-group-1" label="Campaign Code:" label-for="input-2">
            <b-form-input id="input-2" v-model="createForm.code" required />
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>

    <!-- join campaign modal -->
    <b-modal id="modal-xl-3" size="xl" title="Start new adventure" hide-footer>
      <div>
        <b-form @submit="joinCampaign">
          <b-form-group id="input-group-3" label="Campaign ID:" label-for="input-3">
            <b-form-input id="input-3" v-model="joinForm.campaignId" required />
          </b-form-group>
          <b-form-group id="input-group-3" label="Campaign Code:" label-for="input-3">
            <b-form-input id="input-3" v-model="joinForm.code" required />
          </b-form-group>
          <b-form-group id="input-group-3" label="Character to use:" label-for="input-3">
            <b-form-select
              id="input-3"
              v-model="joinForm.character"
              :options="characters"
              required
            />
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>
  </span>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "CampaignCreate",
  data: () => {
    return {
      deleteCampaignId: "",
      createForm: {
        name: "",
        code: "",
      },
      joinForm: {
        campaignId: "",
        code: "",
        character: "",
      },
      campaigns: [],
      joinedCampaigns: [],
      characters: [],
      invalid: false,
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
  async created() {
    let res = await axios.get(`${this.env}/api/campaign`, {
      headers: { Authorization: `Bearer ${this.user.access_token}` },
    });

    console.log(res);
    this.campaigns = [];
    res.data.forEach((campaign) => {
      this.campaigns.push({
        id: campaign.id,
        name: campaign.name,
        code: campaign.code,
      });
    });

    // firebase
    //   .firestore()
    //   .collection("campaigns")
    //   .where(`users.${playerId}.uid`, "==", playerId)
    //   .onSnapshot((res) => {
    //     this.joinedCampaigns = [];
    //     res.forEach((campaign) => {
    //       this.joinedCampaigns.push({
    //         id: campaign.id,
    //         data: campaign.data(),
    //       });
    //     });
    //   });

    // firebase
    //   .firestore()
    //   .collection("campaigns")
    //   .where("uid", "==", playerId)
    //   .onSnapshot((res) => {
    //     this.campaigns = [];
    //     res.forEach((campaign) => {
    //       this.campaigns.push({
    //         id: campaign.id,
    //         data: campaign.data(),
    //       });
    //     });
    //   });
  },
  methods: {
    createCampaign(e) {
      e.preventDefault();
      //   firebase
      //     .firestore()
      //     .collection("campaigns")
      //     .add({
      //       uid: this.user.data.uid,
      //       name: this.createForm.name,
      //       code: this.createForm.code,
      //     })
      //     .then((res) => {
      //       this.$bvModal.hide("modal-xl-2");
      //     })
      //     .catch((err) => {
      //       this.err = err;
      //     });
    },
    joinCampaign(e) {
      e.preventDefault();
      //   let playerId = firebase.auth().currentUser.uid;
      //   var newId = firebase.firestore().collection("campaigns").doc().id;
      //   firebase
      //     .firestore()
      //     .collection("campaigns")
      //     .where(
      //       firebase.firestore.FieldPath.documentId(),
      //       "==",
      //       this.joinForm.campaignId
      //     )
      //     .where("code", "==", this.joinForm.code)
      //     .get()
      //     .then((res) => {
      //       res.forEach((doc) => {
      //         if (res.docs.length == 1 && doc.data().uid !== playerId) {
      //           firebase
      //             .firestore()
      //             .collection("campaigns")
      //             .doc(this.joinForm.campaignId)
      //             .set(
      //               {
      //                 users: {
      //                   [playerId]: {
      //                     uid: playerId,
      //                     characterId: this.joinForm.character.id,
      //                     firstName: this.user.data.firstName,
      //                     characterName: this.joinForm.character.name,
      //                   },
      //                 },
      //               },
      //               { merge: true }
      //             )
      //             .then((res) => {
      //               this.$bvModal.hide("modal-xl-3");
      //             })
      //             .catch((err) => {
      //               this.err = err;
      //             });
      //         } else {
      //           console.log("nothing found for campaign ID!");
      //           this.invalid = true;
      //           this.err = "Bad request";
      //         }
      //       });
      //     });
    },
    startGame(campaignId, characterId) {
      //   if (characterId !== null)
      //     characterId = characterId.data.users[this.user.data.uid].characterId;
      //   this.$router.replace({
      //     name: "Play",
      //     params: { campaignId, characterId },
      //   });
    },
    deleteCampaign() {
      //   if (this.deleteCampaignId.owned) {
      //     firebase
      //       .firestore()
      //       .collection("campaigns")
      //       .doc(this.deleteCampaignId.id)
      //       .delete();
      //   } else {
      //     let playerId = firebase.auth().currentUser.uid;
      //     firebase
      //       .firestore()
      //       .collection("campaigns")
      //       .where(
      //         `users.${playerId}.characterId`,
      //         "==",
      //         this.deleteCampaignId.characterId
      //       )
      //       .get()
      //       .then((response) => {
      //         if (response) {
      //           response.forEach((doc) => {
      //             firebase
      //               .firestore()
      //               .collection("campaigns")
      //               .doc(doc.id)
      //               .update({
      //                 [`users.${playerId}`]: firebase.firestore.FieldValue.delete(),
      //               })
      //               .then((res) => {
      //                 firebase
      //                   .database()
      //                   .ref(`${this.deleteCampaignId.id}/users`)
      //                   .orderByChild("uid")
      //                   .equalTo(playerId)
      //                   .once("value", (res) => {
      //                     let userKey = Object.keys(res.val())[0];
      //                     firebase
      //                       .database()
      //                       .ref(`${this.deleteCampaignId.id}/users/${userKey}`)
      //                       .remove();
      //                   });
      //               });
      //           });
      //         }
      //       });
      //   }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.campaignButton {
  background-color: $background;
  color: $highlight;
  transition: 0.3s;
  h1 {
    transition: -0.1s;
  }
}

.campaignButton:hover,
.campaignButton:active,
.campaignButton:focus {
  background-color: $highlight;
  color: $secondary;
  transition: 0.4s;
  border-color: $secondary;
  h1:hover {
    transition: -0.2s;
  }
}

.clickable {
  div {
    cursor: pointer;
    :hover {
      color: $highlight !important;
      background-color: $primary;
    }
  }
}

.campaignGrid {
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 12fr 1fr;
}

.deleteCampaignButton {
  grid-row: 1/2;
  grid-column: 2/3;
}
</style>
