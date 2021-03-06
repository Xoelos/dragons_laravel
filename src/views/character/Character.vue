<template>
  <div>
    <h1>Edit {{ form.name }}</h1>
    <b-form id="character-form" class="mb-4">
      <b-container fluid>
        <b-row id="character-form-control">
          <b-col cols="12">
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
                @click="
                  activeView !== breadcrumb.route
                    ? updateView({
                        breadcrumb: breadcrumbs[view.route],
                        activeView: view.route,
                      })
                    : null
                "
                class="lead"
                >{{ view.text }}</b-breadcrumb-item
              >
            </b-breadcrumb>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" align="center" class="p-0">
            <div class="dataSection">
              <CharacterSummary
                v-if="activeView == 'summary'"
                :summary="{
                  name: form.name,
                  race: form.race,
                  class: form.class,
                  alignment: form.alignment,
                  base_attacks: form.base_attacks[0].fourth_bonus
                    ? `${form.base_attacks[0].base_bonus}/${form.base_attacks[0].second_bonus}/${form.base_attacks[0].third_bonus}/${form.base_attacks[0].fourth_bonus}`
                    : form.base_attacks[0].third_bonus
                    ? `${form.base_attacks[0].base_bonus}/${form.base_attacks[0].second_bonus}/${form.base_attacks[0].third_bonus}`
                    : form.base_attacks[0].second_bonus
                    ? `${form.base_attacks[0].base_bonus}/${form.base_attacks[0].second_bonus}`
                    : `${form.base_attacks[0].base_bonus}`,
                  experience: form.experience,
                  prestige_class: form.prestige_class,
                  prestige_experience: form.prestige_experience,
                  multi_class: form.multi_class,
                  multi_experience: form.multi_experience,
                  gender: form.gender,
                  speed: form.speed,
                  size: form.size,
                  hp:
                    parseInt(form.health_points[0].total_hp) +
                    parseInt(form.health_points[0].temp_hp) -
                    parseInt(form.health_points[0].damage) -
                    parseInt(form.health_points[0].non_lethal),
                  ac:
                    10 +
                    parseInt(form.armor_class[0].armor_bonus) +
                    parseInt(form.armor_class[0].natural_bonus) +
                    parseInt(form.armor_class[0].size_bonus) +
                    parseInt(form.armor_class[0].misc_bonus) +
                    Math.floor(
                      (parseInt(form.armor_class[0].score) +
                        parseInt(form.armor_class[0].temp_score) -
                        10) /
                        2
                    ),
                  grapple:
                    parseInt(form.base_attacks[0].base_bonus) +
                    parseInt(form.grapple[0].size_bonus) +
                    parseInt(form.grapple[0].misc_bonus) +
                    Math.floor(
                      (parseInt(form.grapple[0].score) +
                        parseInt(form.grapple[0].temp_score) -
                        10) /
                        2
                    ),
                  initiative:
                    parseInt(form.initiative[0].misc_bonus) +
                    Math.floor(
                      (parseInt(form.initiative[0].score) +
                        parseInt(form.initiative[0].temp_score) -
                        10) /
                        2
                    ),
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
              <CharacterHP
                v-else-if="activeView == 'hp'"
                :healthPoints="form.health_points[0]"
                :editable="editable"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
                @refresh="refresh"
                @make-editable="makeEditable"
              />
              <CharacterAC
                v-else-if="activeView == 'ac'"
                :armorClass="form.armor_class[0]"
                :editable="editable"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
                @refresh="refresh"
                @make-editable="makeEditable"
              />
              <CharacterBaseAttack
                v-else-if="activeView == 'baseAttacks'"
                :baseAttacks="form.base_attacks[0]"
                :editable="editable"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
                @refresh="refresh"
                @make-editable="makeEditable"
              />
              <CharacterGrapple
                v-else-if="activeView == 'grapple'"
                :grapple="form.grapple[0]"
                :baseAttackBonus="form.base_attacks[0].base_bonus"
                :editable="editable"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
                @refresh="refresh"
                @make-editable="makeEditable"
              />
              <CharacterInitiative
                v-else-if="activeView == 'initiative'"
                :initiative="form.initiative[0]"
                :editable="editable"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
                @refresh="refresh"
                @make-editable="makeEditable"
              />
              <Spells
                v-else-if="activeView == 'spells'"
                :breadcrumb="breadcrumb"
                :character-id="characterId"
                @update-view="updateView"
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
            </div>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';

import CharacterSummary from './summary/CharacterSummary';
import CharacterAbility from './CharacterAbility';
import CharacterSkill from './CharacterSkill';
import CharacterSavingThrow from './CharacterSavingThrow';
import CharacterWeapon from './CharacterWeapon';
import CharacterArmor from './CharacterArmor';
import CharacterNote from './CharacterNote';
import CharacterEdit from './CharacterEdit';
import CharacterHP from './summary/CharacterHP';
import CharacterAC from './summary/CharacterAC';
import Spells from '../spells/Spells';
import CharacterGrapple from './summary/CharacterGrapple';
import CharacterBaseAttack from './summary/CharacterBaseAttack';
import CharacterInitiative from './summary/CharacterInitiative';

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
    CharacterHP,
    CharacterAC,
    CharacterGrapple,
    CharacterBaseAttack,
    CharacterInitiative,
    Spells,
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
      breadcrumbs: { ...breadcrumbs },
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
  display: flex;
  flex-flow: column;

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
    * {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
