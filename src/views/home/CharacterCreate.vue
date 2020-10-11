<template>
  <span>
    <b-row class="mb-3">
      <b-col cols="12" lg="10">
        <h2>Characters:</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" lg="10">
        <b-list-group v-if="characters.length == 0">
          <b-list-group-item class="h3"
            >Add a character to get started!</b-list-group-item
          >
        </b-list-group>
        <b-list-group v-else>
          <b-row v-for="character in characters" :key="character.id">
            <b-col cols="12" lg="10">
              <b-list-group-item button @click="editCharacter(character.id)" class="h3"
                >{{ character.name }} | {{ character.race }}</b-list-group-item
              >
            </b-col>
          </b-row>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="mt-4">
      <b-col cols="12" lg="4">
        <b-button v-b-modal.createCharacter class="characterButton d-block"
          >Create Character</b-button
        >
      </b-col>
      <b-col cols="12" lg="4" class="mt-4 mt-lg-0">
        <b-button
          v-b-modal.deleteCharacterModal
          class="deleteButton d-block"
          variant="secondary"
          >Delete Character</b-button
        >
      </b-col>
    </b-row>
    <!-- Character modal -->
    <b-modal id="createCharacter" size="xl" title="Create new hero" hide-footer>
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

    <!-- Delete Character Modal -->
    <b-modal
      id="deleteCharacterModal"
      header-text-variant="danger"
      ok-title="DELETE"
      ok-variant="secondary"
      cancel-variant="primary"
      title="Delete character?"
      @ok="deleteCharacter()"
    >
      <b-form-select v-model="deletingCharacter" :options="characterNames" required />
      <small>This change is permanent and cannot be undone!</small>
    </b-modal>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'CharacterCreate',
  data: () => {
    return {
      characters: [],
      characterNames: [],
      deletingCharacter: null,
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
    this.getCharacters();
  },
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
    getCharacters() {
      axios
        .get(`${this.env}/api/character`, {
          headers: { Authorization: `Bearer ${this.user.access_token}` },
        })
        .then(res => {
          this.characters = res.data.data;
          this.characterNames = this.characters.map(character => {
            return { text: character.name + ' | ' + character.race, value: character.id };
          });
          this.loading({ status: false, message: '' });
        })
        .catch(err => {
          console.log(err.response);
          this.loading({ status: false, message: '' });
        });
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
          this.characters.push(res.data.character);
          this.characterNames = this.characters.map(character => {
            return { text: character.name + ' | ' + character.race, value: character.id };
          });
          this.$bvModal.hide('createCharacter');
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
      this.$router
        .push({
          name: 'Character',
          params: { characterId },
        })
        .catch(err => {});
    },
    deleteCharacter() {
      axios({
        url: `${this.env}/api/character`,
        method: 'delete',
        data: {
          withCredentials: true,
          character_id: this.deletingCharacter,
        },
        headers: { Authorization: `Bearer ${this.user.access_token}` },
      })
        .then(res => {
          console.log(res);
          this.getCharacters();
          this.$bvModal.hide('deleteCharacterModal');
        })
        .catch(err => {
          console.log(err.response);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.characterButton {
  background-color: $background;
  color: $highlight;
  transition: 0.3s;
  font-size: larger;
  font-weight: 700;
  h1 {
    transition: -0.1s;
  }
}

.characterButton:hover,
.characterButton:active,
.characterButton:focus {
  background-color: $highlight;
  color: $secondary;
  border-color: $secondary;
  transition: 0.4s;
  h1:hover,
  h1:active {
    transition: -0.2s;
  }
}

.deleteButton {
  background-color: $background;
  color: $secondary;
  transition: 0.3s;
  font-size: larger;
  font-weight: 700;
  h1 {
    transition: -0.1s;
  }
}

.deleteButton:hover,
.deleteButton:active,
.deleteButton:focus {
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
