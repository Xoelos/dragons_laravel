<template>
  <div>
    <b-row class="d-flex mb-3">
      <b-col class="pr-2" cols="12" md="auto">
        <h3>Characters:</h3>
      </b-col>
      <b-col cols="12" md="auto">
        <b-button class="characterButton ml-auto" v-b-modal.modal-xl-1>Create new Character</b-button>
      </b-col>
    </b-row>
    <b-list-group v-if="characters.length == 0">
      <b-list-group-item>Add a character to get started!</b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <div class="characterGrid" v-for="character in characters" :key="character.id">
        <b-list-group-item
          button
          class="mb-4"
          @click="editCharacter(character.id)"
        >{{ character.data.characterName }}</b-list-group-item>
        <b-button
          class="mb-4"
          variant="secondary"
          @click="deleteCharacterId = character.id"
          v-b-modal.deleteCharacterModal
        >X</b-button>
      </div>

      <b-modal
        ok-title="DELETE"
        ok-variant="secondary"
        cancel-variant="primary"
        @ok="deleteCharacter()"
        id="deleteCharacterModal"
        class="d-contents"
        title="DELETE CHARACTER?"
      >
        <p class="my-4">This change is permanent, it cannot be undone!</p>
      </b-modal>
    </b-list-group>

    <!-- Character modal -->
    <b-modal id="modal-xl-1" size="xl" title="Create new hero" hide-footer>
      <div>
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="Character Info:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.characterName"
              type="text"
              required
              placeholder="Enter Character Name"
            />
          </b-form-group>

          <b-row>
            <b-col cols="6">
              <b-form-group id="input-group-2" label="Race:" label-for="input-2">
                <b-form-select id="input-2" v-model="form.race" :options="races" required />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-3" label="Class:" label-for="input-3">
                <b-form-select id="input-3" v-model="form.class" :options="classes" required />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group id="input-group-4" class="mt-3" label="Alignment:" label-for="input-4">
            <b-form-select id="input-4" v-model="form.alignment" :options="alignments" required />
          </b-form-group>

          <b-form-group id="input-group-5" label="Gender:" label-for="input-5">
            <b-form-select id="input-5" v-model="form.gender" :options="genders" required />
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import blankUser from "../views/CharacterEdit.js";

export default {
  name: "CharacterCreate",
  data: () => {
    return {
      deleteCharacterId: "",
      characters: [],
      err: null,
      form: {
        characterName: "",
        race: "",
        class: "",
        alignment: "",
        gender: ""
      },
      alignments: [
        { value: null, text: "Select One" },
        "Lawful Good",
        "Lawful Neutral",
        "Lawful Evil",
        "Neutral Good",
        "True Neutral",
        "Neutral Evil",
        "Chaotic Good",
        "Chaotic Neutral",
        "Chaotic Evil"
      ],
      genders: [{ value: null, text: "Select One" }, "Male", "Female"],
      races: [
        { text: "Select your Race", value: null },
        "Human",
        "Dwarf",
        "Elf",
        "Gnome",
        "Half-Elf",
        "Half-Orc",
        "Halfling"
      ],
      classes: [
        { text: "Select your Class", value: null },
        "Barbarian",
        "Bard",
        "Cleric",
        "Druid",
        "Fighter",
        "Monk",
        "Paladin",
        "Ranger",
        "Rogue",
        "Sorcerer",
        "Wizard"
      ]
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    firebase
      .firestore()
      .collection("characters")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(res => {
        this.characters = [];
        res.forEach(character => {
          this.characters.push({
            id: character.id,
            data: character.data()
          });
        });
      });
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      firebase
        .firestore()
        .collection("characters")
        .add({
          uid: this.user.data.uid,
          characterName: this.form.characterName,
          gender: this.form.gender,
          race: this.form.race,
          class: this.form.class,
          alignment: this.form.alignment,
          baseAttack: "1",
          experience: "0",
          pClass: "",
          pcExperience: "",
          speed: "30",
          ...blankUser
        })
        .then(res => {
          this.$bvModal.hide("modal-xl-1");
          this.form = {
            characterName: "",
            race: "",
            class: "",
            alignment: "",
            gender: ""
          };
        })
        .catch(err => {
          this.err = err;
        });
    },
    editCharacter(characterId) {
      this.$router.push({
        name: "CharacterEdit",
        params: { characterId: characterId }
      });
    },
    deleteCharacter() {
      let playerId = firebase.auth().currentUser.uid;

      firebase
        .firestore()
        .collection("campaigns")
        .where(`users.${playerId}.characterId`, "==", this.deleteCharacterId)
        .get()
        .then(response => {
          if (response) {
            response.forEach(doc => {
              firebase
                .firestore()
                .collection("campaigns")
                .doc(doc.id)
                .update({
                  [`users.${playerId}`]: firebase.firestore.FieldValue.delete()
                })
                .then(res => {
                  this.$bvModal.hide("modal-xl-1");
                  this.form = {
                    characterName: "",
                    race: "",
                    class: "",
                    alignment: "",
                    gender: ""
                  };
                });

              firebase
                .database()
                .ref(`${doc.id}/users`)
                .orderByChild("characterId")
                .equalTo(this.deleteCharacterId)
                .once("value", res => {
                  if (res.val()) {
                    let userKey = Object.keys(res.val())[0];

                    firebase
                      .database()
                      .ref(`${doc.id}/users/${userKey}`)
                      .remove();
                  }
                });
            });
          }
        });

      firebase
        .firestore()
        .collection("characters")
        .doc(this.deleteCharacterId)
        .delete();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.characterButton {
  background-color: $background;
  color: $secondary;
  transition: 0.3s;
  h1 {
    transition: -0.1s;
  }
}

.characterButton:hover,
.characterButton:active,
.characterButton:focus {
  background-color: $secondary;
  color: $highlight;
  border-color: $highlight;
  transition: 0.4s;
  h1:hover,
  h1:active {
    transition: -0.2s;
  }
}

.characterGrid {
  display: grid;
  grid-gap: 5%;
  grid-template-columns: 8fr 1fr;
}
</style>
