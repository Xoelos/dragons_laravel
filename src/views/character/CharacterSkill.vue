<template>
  <span>
    <!-- Skills Display Page -->
    <b-row>
      <b-col cols="12" md="10">
        <EditSave
          :editable="editable"
          :form="{ data: skills, route: '/api/character/skills' }"
          :character-id="characterId"
          @make-editable="makeEditable"
        ></EditSave>
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
      <table>
        <thead>
          <tr>
            <th class="sm-col"></th>
            <th class="h6 sm-col">
              <cite title="Skill can be performed by average adventurer">
                Untrained
                <div>Skill</div>
              </cite>
            </th>
            <th class="h6 sm-col">
              <cite title="Skill is useable with your class">
                Class
                <div>Skill</div>
              </cite>
            </th>
            <th class="h6">Skill</th>
            <th class="h6">Skill Modifier</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(skill, index) in skills" :key="index">
            <td class="sm-col">
              <b-button-group vertical class="d-inline-flex">
                <b-button pill class="px-2 py-0" variant="light" @click="move(index, -1)">
                  <font-awesome-icon icon="caret-up"></font-awesome-icon>
                </b-button>
                <b-button pill class="px-2 py-0" variant="light" @click="move(index, 1)">
                  <font-awesome-icon icon="caret-down"></font-awesome-icon>
                </b-button>
              </b-button-group>
            </td>
            <td class="sm-col">
              <b-form-checkbox
                v-model="skill.untrained_skill"
                :value="1"
                :unchecked-value="0"
                :disabled="!editable"
                required
              ></b-form-checkbox>
            </td>
            <td class="sm-col">
              <b-form-checkbox
                v-model="skill.class_skill"
                :value="1"
                :unchecked-value="0"
                :disabled="!editable"
                required
              ></b-form-checkbox>
            </td>
            <td>
              <b-form-input
                v-model="skill.name"
                :readonly="!editable"
                :class="
                  !skill.class_skill
                    ? !skill.untrained_skill
                      ? 'non-skill'
                      : null
                    : null
                "
                required
              ></b-form-input>
            </td>

            <td class="lead">
              {{
                parseInt(skill.rank_score) +
                  parseInt(skill.misc_score) +
                  Math.floor((skill.score + skill.temp_score - 10) / 2) || 0
              }}
            </td>
            <td>
              <b-button variant="primary" @click="$bvModal.show('modal-skill-' + index)"
                >Details</b-button
              >
            </td>
            <b-modal
              :id="'modal-skill-' + index"
              size="xl"
              :title="'Skill: ' + skill.name"
              hide-footer
            >
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
                  ></b-form-select>
                </b-col>
                <b-col cols="3" class="p-0 m-auto">
                  <b-form-input
                    v-model="skill.rank_score"
                    :readonly="!editable"
                    type="number"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="3" class="p-0 m-auto">
                  <b-form-input
                    v-model="skill.misc_score"
                    :readonly="!editable"
                    type="number"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col cols="12" md="10">
                  <EditSave
                    :editable="editable"
                    :form="{ data: skills, route: '/api/character/skills' }"
                    :character-id="characterId"
                    @make-editable="makeEditable"
                  ></EditSave>
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
          </tr>
        </tbody>
      </table>
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
  table {
    margin-right: auto;
    margin-left: 0;
    text-align: center;
    border-spacing: 1em 0.25em;
    border-collapse: separate;
    min-width: 65%;

    @media (max-width: 576px) {
      border-spacing: 2em 0.25em;
    }

    td input:not([type='checkbox']),
    td select,
    td.lead,
    th {
      max-width: 200px;
      min-width: 100px;
      margin: auto;
      white-space: nowrap;
    }
    .sm-col {
      min-width: 30px;
    }
  }

  .non-skill {
    text-decoration: line-through;
  }
}
</style>
