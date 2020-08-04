<template>
  <div class="moreSpace">
    <b-tabs pills content-class="mt-3">
      <b-tab title="Chat" active>
        <b-row>
          <b-col cols="12" md="8" class="body">
            <b-row>
              <b-col cols="12">
                <span class="bodyGrid">
                  <span>
                    <h3>Current players:</h3>
                    <ul class="playerGrid p-0">
                      <span
                        v-for="(player, index) in campaignUsers"
                        :key="index"
                        @click="editCharacter(player.characterId, player.uid, false)"
                      >
                        <li class="mb-3 p-1" :class="{ activateId: activeId == player.uid }">
                          <p v-if="player.characterName" class="m-0" align="center">
                            {{ `${player.user} | ${player.characterName}` }}
                          </p>
                          <p v-else class="m-0" align="center">{{ `${player.user}` }}</p>
                        </li>
                      </span>
                    </ul>
                  </span>
                  <span>
                    <h3>Offline players:</h3>
                    <ul class="playerGrid p-0">
                      <span
                        v-for="(player, index) in campaignUsersOffline"
                        :key="index"
                        @click="editCharacter(player.characterId, player.uid, true)"
                      >
                        <li
                          class="mb-3 p-1"
                          :class="{
                            activateId:
                              activeId == player.uid &&
                              privateMessaging &&
                              characterId == null,
                          }"
                        >
                          <p v-if="player.characterName" class="m-0" align="center">
                            {{ `${player.user} | ${player.characterName}` }}
                          </p>
                          <p v-else class="m-0" align="center">{{ `${player.user}` }}</p>
                        </li>
                      </span>
                    </ul>
                  </span>
                </span>
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="12">
                <DiceRoll
                  :character-id="playerCharacterId"
                  :campaign-id="campaignId"
                ></DiceRoll>
              </b-col>
            </b-row>
          </b-col>
          <b-col cols="12" md="4">
            <b-button :disabled="activeId == null" class="mb-4 w-100" @click="clearPlayerId()"
              >Global</b-button
            >
            <div class="feedBox">
              <div class="chatBox">
                <p
                  v-for="(message, index) in campaign.messages"
                  :key="index"
                  :v-if="campaign.messages.length > 0"
                >
                  {{ message.message }}
                </p>
              </div>
              <div class="messageBox">
                <b-form @keyup.enter="sendMessage" @submit.stop.prevent>
                  <textarea id="messageArea" v-model="message" rows="2"></textarea>
                  <b-button variant="primary" @click="sendMessage">Send</b-button>
                </b-form>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab v-if="characterId !== null" title="Character Edit">
        <Character v-if="characterId !== null" :character-id="characterId"></Character>
      </b-tab>
      <b-tab v-else :disabled="playerCharacterId == null" title="DM Character Edit">
        <Character
          v-if="characterId == null && playerCharacterId !== null"
          :key="playerCharacterId"
          :character-id="playerCharacterId"
        ></Character>
      </b-tab>
      <!-- <b-tab title="Roll Dice">
        <DiceRoll
          :character-id="playerCharacterId"
          :campaignId="campaignId"
        ></DiceRoll>
      </b-tab>-->
    </b-tabs>
  </div>
</template>

<script>
import Character from './character/Character.vue';
import DiceRoll from '../components/DiceRoll.vue';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import { mapGetters } from 'vuex';

export default {
  components: {
    Character: Character,
    DiceRoll: DiceRoll,
  },
  props: {
    campaignId: {
      type: String,
      default: '',
    },
    characterId: {
      type: String,
      default: '',
    },
  },
  data: () => {
    return {
      campaign: { messages: [] },
      campaignUsers: [],
      campaignUsersOffline: [],
      playerCharacterId: null,
      activeId: null,
      privateMessaging: false,
      message: '',
      error: null,
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
    if (this.$props.campaignId == '') {
      this.$router.replace({
        name: 'Home',
      });
    } else {
      // Campaign Listener
      firebase
        .firestore()
        .collection('campaigns')
        .doc(this.$props.campaignId)
        .onSnapshot(res => {
          let dbData = res.data();
          dbData.messages = [];
          this.campaign = dbData;
        });

      // 1) Status Listener Added

      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .on('child_added', res => {
          if (res.val().status == 'online' && res.val().user !== this.user.data.firstName) {
            this.campaignUsers.push(res.val());
          } else if (
            res.val().status == 'offline' &&
            res.val().user !== this.user.data.firstName
          ) {
            this.campaignUsersOffline.push(res.val());
          }
        });

      // 2) Status Listener Changed

      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .on('child_changed', res => {
          if (res.val().status == 'online' && res.val().user !== this.user.data.firstName) {
            this.campaignUsers.push(res.val());
            this.campaignUsersOffline = this.campaignUsersOffline.filter(user => {
              return user.uid !== res.val().uid;
            });
          } else if (
            res.val().status == 'offline' &&
            res.val().user !== this.user.data.firstName
          ) {
            this.campaignUsersOffline.push(res.val());
            this.campaignUsers = this.campaignUsers.filter(user => {
              return user.uid !== res.val().uid;
            });
          }
        });
    }
  },
  async mounted() {
    let campaignId = this.$props.campaignId;
    let userData = this.user.data;

    if (campaignId !== '') {
      let dbCampaignUserId;
      let dbCampaignUser;

      // Query for if user exists in campaign
      dbCampaignUser = await firebase
        .database()
        .ref(`${campaignId}/users`)
        .orderByChild('uid')
        .equalTo(firebase.auth().currentUser.uid)
        .once('value');

      dbCampaignUser = dbCampaignUser.val();

      if (dbCampaignUser == null) {
        if (this.$props.characterId) {
          let characterData = await firebase
            .firestore()
            .collection('characters')
            .doc(this.$props.characterId)
            .get();

          characterData = characterData.data();

          // Set online in campaign
          dbCampaignUserId = await firebase
            .database()
            .ref(`${campaignId}/users`)
            .push({
              user: `${userData.firstName}`,
              status: 'online',
              uid: userData.uid,
              characterId: this.$props.characterId,
              characterName: characterData.characterName,
              characterRace: characterData.race,
              characterClass: characterData.class,
              time: firebase.database.ServerValue.TIMESTAMP,
            });
        } else {
          // Set online in campaign
          dbCampaignUserId = await firebase
            .database()
            .ref(`${campaignId}/users`)
            .push({
              user: `${userData.firstName}`,
              status: 'online',
              uid: userData.uid,
              time: firebase.database.ServerValue.TIMESTAMP,
            });
        }

        dbCampaignUserId = dbCampaignUserId.key;

        dbCampaignUser = await firebase
          .database()
          .ref(`${campaignId}/users`)
          .orderByChild('uid')
          .equalTo(firebase.auth().currentUser.uid)
          .once('value');

        dbCampaignUser = dbCampaignUser.val();
      } else {
        dbCampaignUserId = Object.keys(dbCampaignUser)[0];

        // Set online in campaign
        await firebase
          .database()
          .ref(`${campaignId}/users/${dbCampaignUserId}`)
          .update({
            status: 'online',
            time: firebase.database.ServerValue.TIMESTAMP,
          });
      }

      // 3) set disconnect listener
      firebase
        .database()
        .ref(`${campaignId}/users/${dbCampaignUserId}`)
        .onDisconnect()
        .update({
          status: 'offline',
          time: firebase.database.ServerValue.TIMESTAMP,
        });

      // Push hello
      await firebase
        .database()
        .ref(`${campaignId}/chat/global`)
        .push({
          message: `${userData.firstName} has joined the game!`,
        });

      // 4) Message Listener Global
      firebase
        .database()
        .ref(`${campaignId}/chat/global`)
        .limitToLast(1)
        .on('child_added', res => {
          this.campaign.messages.unshift(res.val());
        });

      // 5) Status Listener Messages Changed
      firebase
        .database()
        .ref(`${campaignId}/users`)
        .on('child_changed', res => {
          if (this.$props.characterId !== null) {
          }
          if (res.val().status == 'offline') {
            this.campaign.messages.unshift({
              message: `${res.val().user} is now ${res.val().status}`,
            });
          }
        });
    }
  },
  beforeDestroy() {
    if (this.$props.campaignId !== '') {
      this.campaignUsers = [];
      this.campaignUsersOffline = [];

      // 1) Status Listener Added

      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .off('child_added');

      // 2) Status Listener Added

      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .off('child_changed');

      // 4) Message Listener Global
      firebase
        .database()
        .ref(`${this.$props.campaignId}/chat/global`)
        .limitToFirst(1)
        .off('child_added');

      // 5) Status Listener Messages Changed
      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .off('child_changed');

      // Query for user value
      firebase
        .database()
        .ref(`${this.$props.campaignId}/users`)
        .orderByChild('uid')
        .equalTo(firebase.auth().currentUser.uid)
        .once('value')
        .then(res => {
          let statusId = Object.keys(res.val())[0];

          // 3) set disconnect listener
          firebase
            .database()
            .ref(`${this.$props.campaignId}/users/${statusId}`)
            .onDisconnect()
            .cancel();

          // Push Offline
          firebase
            .database()
            .ref(`${this.$props.campaignId}/users/${statusId}`)
            .update({
              status: 'offline',
              time: firebase.database.ServerValue.TIMESTAMP,
            })
            .then(() => {});
        });
    }
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      if (this.message.length !== 0) {
        let message = this.message;
        this.message = '';

        firebase
          .database()
          .ref(`${this.$props.campaignId}/chat/global`)
          .push({
            message: `${this.user.data.firstName}: ${message}`,
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    sendPrivateMessage(e) {
      e.preventDefault();

      if (this.message.length !== 0) {
        let message = this.message;
        this.message = '';

        firebase
          .database()
          .ref(`${this.$props.campaignId}/chat/private`)
          .push({
            [`${this.user.data.uid}`]: {
              message: `${this.user.data.firstName}: ${message}`,
            },
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    changeView(page) {
      this.$router.push({
        name: 'Character',
        params: { characterId: this.$props.characterId },
      });
    },
    editCharacter(charId, id, privateMess) {
      this.privateMessaging = privateMess;
      this.playerCharacterId = charId;
      this.activeId = id;
    },
    clearPlayerId() {
      this.playerCharacterId = null;
      this.activeId = null;
      this.privateMessaging = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.miniNav,
.playerGrid,
.bodyGrid {
  display: grid;
}

.playerGrid {
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2%;

  @media (max-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
}

.bodyGrid {
  grid-template-rows: 1fr 1fr;
  height: 100%;
}

.messageBox {
  width: 100%;
  #messageArea {
    width: 100%;
  }
}

.chatBox {
  overflow-y: scroll;
  height: 45vh;
  background-color: $white;
  margin-bottom: 1em;
  padding: 8px;
  border-radius: 5px;
}

li.nav-item {
  border-style: none;
  background-color: pink;
}

.moreSpace {
  margin-top: -2vh;
}

.activateId {
  background-color: $highlight;
}

ul {
  list-style-type: none;
}
</style>
