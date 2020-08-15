<template>
  <div>
    <h1>Edit {{ form.name }}</h1>
    <b-form id="character-form">
      <b-row id="character-form-control">
        <b-col cols="12" class="d-flex align-items-center">
          <b-breadcrumb id="character-bread">
            <b-breadcrumb-item
              :active="!activeView ? true : false"
              class="lead"
              @click="
                activeView ? updateView({ breadcrumb: [], activeView: null }) : null
              "
              >Character</b-breadcrumb-item
            >
            <b-breadcrumb-item
              v-for="(view, index) in breadcrumb"
              :key="index"
              :active="view.active"
              class="lead"
              >{{ view.text }}</b-breadcrumb-item
            >
          </b-breadcrumb>
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col cols="12" class="my-3">
           <b-breadcrumb :items="items"></b-breadcrumb>
           <b-list-group horizontal="md">
            <b-list-group-item
              display="summary"
              :class="{ 'list-group-active': activeView == 'summary' }"
              @click="activateScreen"
            >Summary</b-list-group-item>
            <b-list-group-item
              display="abilities"
              :class="{ 'list-group-active': activeView == 'abilities' }"
              @click="activateScreen"
            >Abilities</b-list-group-item>
            <b-list-group-item
              display="skills"
              :class="{ 'list-group-active': activeView == 'skills' }"
              @click="activateScreen"
            >Skills</b-list-group-item>
            <b-list-group-item
              display="savingThrows"
              :class="{ 'list-group-active': activeView == 'savingThrows' }"
              @click="activateScreen"
            >Saving Throws</b-list-group-item>
            <b-list-group-item
              display="weapons"
              :class="{ 'list-group-active': activeView == 'weapons' }"
              @click="activateScreen"
            >Weapons</b-list-group-item>
            <b-list-group-item
              display="armour"
              :class="{ 'list-group-active': activeView == 'armour' }"
              @click="activateScreen"
            >Armor</b-list-group-item>
            <b-list-group-item
              display="notes"
              :class="{ 'list-group-active': activeView == 'notes' }"
              @click="activateScreen"
            >Notes</b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>-->
      <b-row class="flex-grow-1">
        <b-col cols="12">
          <div class="dataSection">
            <b-row>
              <b-col cols="12" align="center">
                <CharacterSummary
                  v-if="activeView == 'summary'"
                  :summary="{
                    name: form.name,
                    race: form.race,
                    class: form.class,
                    alignment: form.alignment,
                    base_attack: form.base_attack,
                    experience: form.experience,
                    prestige_class: form.prestige_class,
                    prestige_experience: form.prestige_experience,
                    multi_class: form.multi_class,
                    multi_experience: form.multi_experience,
                    gender: form.gender,
                    speed: form.speed,
                    size: form.size,
                  }"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                />
                <CharacterAbility
                  v-else-if="activeView == 'abilities'"
                  :abilities="form.abilities"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                />
                <CharacterSkill
                  v-else-if="activeView == 'skills'"
                  :skills="form.skills"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                  @move="move"
                />
                <CharacterSavingThrow
                  v-else-if="activeView == 'savingThrows'"
                  :saving-throws="form.saving_throws"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                />
                <CharacterWeapon
                  v-else-if="activeView == 'weapons'"
                  :weapons="form.weapons"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                  @move="move"
                />
                <CharacterArmor
                  v-else-if="activeView == 'armor'"
                  :armors="form.armor"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                  @move="move"
                />
                <CharacterNote
                  v-else-if="activeView == 'notes'"
                  :note-section="form.note_section"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                  @move="move"
                />
                <CharacterEdit
                  v-else
                  :form="form"
                  :editable="editable"
                  :breadcrumb="breadcrumb"
                  :character-id="characterId"
                  @update-view="updateView"
                  @refresh="refresh"
                  @make-editable="makeEditable"
                />
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';

import CharacterSummary from './CharacterSummary';
import CharacterAbility from './CharacterAbility';
import CharacterSkill from './CharacterSkill';
import CharacterSavingThrow from './CharacterSavingThrow';
import CharacterWeapon from './CharacterWeapon';
import CharacterArmor from './CharacterArmor';
import CharacterNote from './CharacterNote';
import CharacterEdit from './CharacterEdit';

export default {
  components: {
    CharacterSummary,
    CharacterAbility,
    CharacterSkill,
    CharacterSavingThrow,
    CharacterWeapon,
    CharacterArmor,
    CharacterNote,
    CharacterEdit,
  },
  props: {
    characterId: {
      type: Number,
      default: 0,
    },
  },
  data: () => {
    return {
      editable: false,
      activeView: null,
      form: {},
      breadcrumb: [],
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
    this.loading({ status: true, message: 'Loading your Character!' });
    if (this.characterId) {
      axios
        .get(`${this.env}/api/character/${this.characterId}`, {
          headers: { Authorization: `Bearer ${this.user.access_token}` },
        })
        .then(res => {
          console.log(JSON.parse(JSON.stringify(res.data.data)));
          this.form = res.data.data;
          this.loading({ status: false, message: '' });
        })
        .catch(err => {
          this.loading({ status: false, message: '' });
          console.log(err.response);
        });
    } else {
      this.$router.replace({
        name: 'Home',
      });
    }
  },
  methods: {
    loading(change) {
      this.$emit('loading', change);
    },
    refresh() {
      if (this.characterId) {
        axios
          .get(`${this.env}/api/character/${this.characterId}`, {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          })
          .then(res => {
            console.log(JSON.parse(JSON.stringify(res.data.data)));
            this.form = res.data.data;
          })
          .catch(err => {
            console.log(err.response);
          });
      } else {
        this.$router.replace({
          name: 'Home',
        });
      }
    },
    updateView(view) {
      this.breadcrumb = view.breadcrumb;
      this.activeView = view.activeView;
    },
    move(move) {
      if (move.secondPlace) {
        this.form[move.place][move.secondPlace] = move.array;
      } else {
        this.form[move.place] = move.array;
      }
    },
    makeEditable() {
      this.editable = !this.editable;
    },
    activateScreen(e) {
      this.activeView = e.target.attributes.display.value;
    },
  },
};
</script>
<style lang="scss" scoped>
#character-form {
  height: 100%;
  display: flex;
  flex-flow: column;
  height: 100%;

  #character-bread {
    background-color: inherit;
    margin: 0;
  }

  input {
    text-align: center;
    color: $black;
    background-color: $white;
  }

  .list-group {
    cursor: pointer;
    :hover {
      color: $secondary;
      background-color: $primary;
    }
  }

  .list-group-active {
    color: $highlight !important;
    background-color: $primary;
  }

  .dataSection {
    height: 100%;

    * {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
