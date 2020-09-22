<template>
  <span>
    <b-row>
      <b-col cols="12" md="10">
        <EditSave
          :editable="editable"
          :form="{ data: skills, route: '/api/character/skills' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
      <b-col cols="6" offset="3" md="2" offset-md="0" class="my-2">
        <b-button
          class="d-block m-auto px-5"
          :variant="editable ? 'success' : 'outline-primary'"
          @click="addSkill"
          >Add</b-button
        >
      </b-col>
    </b-row>
    <div class="display mt-3">
      <b-row>
        <b-col cols="12" md="10" lg="8">
          <b-row class="mb-3">
            <b-col cols="1" class="lead"></b-col>
            <b-col cols="6" class="lead">Skill</b-col>
            <b-col cols="3" class="lead">Skill Modifier</b-col>
            <b-col cols="2" class="lead"></b-col>
          </b-row>
          <b-row v-for="(skill, index) in skills" :key="index" class="mt-1">
            <b-col cols="1"
              ><b-button-group vertical class="d-inline-flex">
                <b-button
                  pill
                  class="px-2 py-0"
                  variant="light"
                  @click="move(index, -1)"
                  :disabled="!editable"
                >
                  <font-awesome-icon icon="caret-up" />
                </b-button>
                <b-button
                  pill
                  class="px-2 py-0"
                  variant="light"
                  @click="move(index, 1)"
                  :disabled="!editable"
                >
                  <font-awesome-icon icon="caret-down" />
                </b-button> </b-button-group
            ></b-col>
            <b-col cols="6"
              ><b-form-input
                v-model="skill.name"
                :readonly="!editable"
                class="text-center skill-name"
                :class="
                  !skill.class_skill
                    ? !skill.untrained_skill
                      ? 'non-skill'
                      : null
                    : null
                "
                required
            /></b-col>
            <b-col cols="3">{{
              parseInt(skill.rank_score) +
                parseInt(skill.misc_score) +
                Math.floor((skill.score + skill.temp_score - 10) / 2) || 0
            }}</b-col>
            <b-col cols="2">
              <b-button variant="primary" @click="$bvModal.show('modal-skill-' + index)"
                >Details</b-button
              ></b-col
            >

            <b-modal
              :id="'modal-skill-' + index"
              size="xl"
              :title="'Skill: ' + skill.name"
              hide-footer
            >
              <b-row>
                <b-col cols="6" class="text-center"> Untrained Skill</b-col>
                <b-col cols="6" class="text-center"> Class Skill</b-col>
              </b-row>
              <b-row>
                <b-col cols="6" class="text-center">
                  <b-form-checkbox
                    v-model="skill.untrained_skill"
                    :value="1"
                    :unchecked-value="0"
                    :disabled="!editable"
                    required
                  />
                </b-col>
                <b-col cols="6" class="text-center">
                  <b-form-checkbox
                    v-model="skill.class_skill"
                    :value="1"
                    :unchecked-value="0"
                    :disabled="!editable"
                    required
                  /> </b-col
              ></b-row>
              <b-row class="mt-5 text-center">
                <b-col cols="3" class="p-0">Ability</b-col>
                <b-col cols="3" class="p-0">Ranks</b-col>
                <b-col cols="3" class="p-0">Misc</b-col>
              </b-row>
              <b-row class="mt-2 mb-5 text-center">
                <b-col cols="3" class="p-0 m-auto">
                  <b-form-select
                    v-model="skill.ability_id"
                    :options="abilityList"
                    :disabled="!editable"
                    required
                  />
                </b-col>
                <b-col cols="3" class="p-0 m-auto">
                  <b-form-input
                    v-model="skill.rank_score"
                    :readonly="!editable"
                    type="number"
                    required
                  />
                </b-col>
                <b-col cols="3" class="p-0 m-auto">
                  <b-form-input
                    v-model="skill.misc_score"
                    :readonly="!editable"
                    type="number"
                    required
                  />
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col cols="12" md="10">
                  <EditSave
                    :editable="editable"
                    :form="{ data: skills, route: '/api/character/skills' }"
                    :character-id="characterId"
                    @make-editable="makeEditable"
                    @refresh="refresh"
                  />
                </b-col>
                <b-col cols="6" offset="3" md="2" offset-md="0" class="text-center my-2">
                  <b-button
                    class="m-auto px-5"
                    :variant="editable ? 'danger' : 'outline-primary'"
                    @click="deleteSkill(skill.id, 'modal-skill-' + index)"
                    >DELETE</b-button
                  >
                </b-col>
              </b-row>
            </b-modal>
          </b-row>
        </b-col>
      </b-row>
    </div>
  </span>
</template>

<script>
import axios from 'axios';
import arrayMove from 'array-move';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';
import EditSave from '../../components/EditSave';

export default {
  components: { EditSave },
  props: {
    skills: {
      type: Array,
      default: () => {
        return [];
      },
    },
    characterId: {
      type: Number,
      default: 0,
    },
    editable: {
      type: Boolean,
    },
  },
  data: () => {
    return {
      abilityList: [
        { value: 1, text: 'STR' },
        { value: 2, text: 'DEX' },
        { value: 3, text: 'CON' },
        { value: 4, text: 'INT' },
        { value: 5, text: 'WIS' },
        { value: 6, text: 'CHA' },
      ],
    };
  },
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  methods: {
    updateView(breadcrumb) {
      this.$emit('update-view', {
        breadcrumb: breadcrumbs[breadcrumb],
        activeView: breadcrumb,
      });
    },
    makeEditable() {
      this.$emit('make-editable');
    },
    refresh() {
      this.$emit('refresh');
    },
    addSkill() {
      if (!this.$props.editable) return;
      axios
        .post(
          `${this.env}/api/character/skills`,
          {
            withCredentials: true,
            character_id: this.$props.characterId,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          console.log(res);
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    move(index, move) {
      if (!this.$props.editable) return;
      let skill_array = [...this.skills];
      skill_array = arrayMove(skill_array, index, index + move);
      skill_array.forEach((skill, skill_index) => {
        skill.order = skill_index + 2;
      });
      this.$emit('move', { array: skill_array, place: 'skills' });
    },
    deleteSkill(skill_id, modal_id) {
      if (!this.$props.editable) return;
      if (!confirm('This is permanent, are you sure?')) return;
      axios({
        url: `${this.env}/api/character/skills`,
        method: 'delete',
        data: {
          withCredentials: true,
          skill_id: skill_id,
          character_id: this.$props.characterId,
        },
        headers: { Authorization: `Bearer ${this.user.access_token}` },
      })
        .then(res => {
          console.log(res);
          this.$bvModal.hide(modal_id);
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.display {
  width: 100%;
  overflow: auto;

  input.skill-name {
    background-color: $white;
    border: 0;
    &:read-only {
      background-color: $light !important;
    }
  }

  .non-skill {
    text-decoration: line-through;
  }
}
</style>
