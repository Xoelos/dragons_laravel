<template>
  <div>
    <b-row class="d-flex mb-3">
      <b-col class="pr-2" cols="12" md="auto">
        <h3>Characters:</h3>
      </b-col>
      <b-col cols="12" md="auto">
        <b-button v-b-modal.modal-xl-1 class="characterButton ml-auto"
          >Create new Character</b-button
        >
      </b-col>
    </b-row>
    <b-list-group v-if="characters.length == 0">
      <b-list-group-item>Add a character to get started!</b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <div v-for="character in characters" :key="character.id" class="characterGrid">
        <b-list-group-item button class="mb-4" @click="editCharacter(character.id)">{{
          character.name
        }}</b-list-group-item>
        <b-button
          v-b-modal.deleteCharacterModal
          class="mb-4"
          variant="secondary"
          @click="deleteCharacterId = character.id"
          >X</b-button
        >
      </div>

      <b-modal
        id="deleteCharacterModal"
        ok-title="DELETE"
        ok-variant="secondary"
        cancel-variant="primary"
        title="DELETE CHARACTER?"
        class="d-contents"
        @ok="deleteCharacter()"
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
              v-model="form.name"
              type="text"
              required
              placeholder="Enter Character Name"
            />
          </b-form-group>

          <b-row>
            <b-col cols="6">
              <b-form-group id="input-group-2" label="Race:" label-for="input-2">
                <b-form-select
                  id="input-2"
                  v-model="form.race"
                  :options="races"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group id="input-group-3" label="Class:" label-for="input-3">
                <b-form-select
                  id="input-3"
                  v-model="form.class"
                  :options="classes"
                  required
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            id="input-group-4"
            class="mt-3"
            label="Alignment:"
            label-for="input-4"
          >
            <b-form-select
              id="input-4"
              v-model="form.alignment"
              :options="alignments"
              required
            />
          </b-form-group>

          <b-form-group id="input-group-5" label="Gender:" label-for="input-5">
            <b-form-select
              id="input-5"
              v-model="form.gender"
              :options="genders"
              required
            />
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-alert v-if="err !== null" variant="danger">Error! {{ err }}</b-alert>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'CharacterCreate',
  data: () => {
    return {
      deleteCharacterId: '',
      characters: [],
      err: null,
      form: {
        name: '',
        race: '',
        class: '',
        alignment: '',
        gender: '',
      },
      alignments: [
        { value: null, text: 'Select One' },
        'Lawful Good',
        'Lawful Neutral',
        'Lawful Evil',
        'Neutral Good',
        'True Neutral',
        'Neutral Evil',
        'Chaotic Good',
        'Chaotic Neutral',
        'Chaotic Evil',
      ],
      genders: [{ value: null, text: 'Select One' }, 'Male', 'Female'],
      races: [
        { text: 'Select your Race', value: null },
        'Human',
        'Dwarf',
        'Elf',
        'Gnome',
        'Half-Elf',
        'Half-Orc',
        'Halfling',
      ],
      classes: [
        { text: 'Select your Class', value: null },
        'Barbarian',
        'Bard',
        'Cleric',
        'Druid',
        'Fighter',
        'Monk',
        'Paladin',
        'Ranger',
        'Rogue',
        'Sorcerer',
        'Wizard',
      ],
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
    this.loading({ status: true, message: 'Loading your Adventure!' });
    axios
      .get(`${this.env}/api/character`, {
        headers: { Authorization: `Bearer ${this.user.access_token}` },
      })
      .then(res => {
        console.log(res.data.data);
        this.characters = [];
        res.data.data.forEach(character => {
          this.characters.push({
            id: character.id,
            name: character.name,
          });
        });
        this.loading({ status: false, message: '' });
      })
      .catch(err => {
        console.log(err.response);
        this.loading({ status: false, message: '' });
      });
  },
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
    onSubmit(evt) {
      evt.preventDefault();
      axios
        .post(
          `${this.env}/api/character`,
          {
            user_id: this.user.data.id,
            name: this.form.name,
            race: this.form.race,
            class: this.form.class,
            alignment: this.form.alignment,
            gender: this.form.gender,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          console.log(JSON.parse(JSON.stringify(res)));
          this.characters.push(res.data.character);
          this.$bvModal.hide('modal-xl-1');
          this.form = {
            name: '',
            race: '',
            class: '',
            alignment: '',
            gender: '',
          };
        })
        .catch(err => {
          console.log(JSON.parse(JSON.stringify(err.response)));
          this.err = err.response;
        });
    },
    editCharacter(characterId) {
      this.$router.push({
        name: 'Character',
        params: { characterId },
      });
    },
    deleteCharacter() {},
  },
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
