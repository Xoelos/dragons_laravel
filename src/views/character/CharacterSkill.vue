<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="8" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: localSkills, route: '/api/character/skills' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
          />
        </b-col>
        <b-col cols="4" lg="1" class="d-flex">
          <b-button
            class="d-block m-auto px-4 align-center"
            :variant="editable ? 'success' : 'outline-primary'"
            @click="addSkill"
            >Add</b-button
          >
        </b-col>
        <b-col cols="12" lg="9"></b-col>
      </b-row>
      <b-row>
        <b-col cols="12" md="8" lg="5" class="p-0">
          <div class="display mt-4">
            <b-container fluid class="ml-1 wide-container p-0">
              <b-row class="mb-3">
                <b-col
                  cols="5"
                  class="h6 font-weight-bold"
                  v-b-tooltip.hover
                  title="Drag and drop to reorder!"
                  >Skill</b-col
                >
                <b-col cols="3" class="h6 font-weight-bold text-nowrap p-0 m-0"
                  >Skill Modifier</b-col
                >
                <b-col cols="4"></b-col>
              </b-row>
              <draggable v-model="localSkills" handle=".handle" :disabled="!editable">
                <b-row v-for="(skill, index) in localSkills" :key="index" class="my-2">
                  <b-col cols="5" class="p-0 m-auto handle"
                    ><b-form-input
                      slot="footer"
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
                  <b-col cols="3" class="p-0 m-auto drag">{{
                    parseInt(skill.rank_score) +
                      parseInt(skill.misc_score) +
                      Math.floor((skill.score + skill.temp_score - 10) / 2) || 0
                  }}</b-col>
                  <b-col cols="4" class="p-0">
                    <b-button
                      variant="primary"
                      @click="$bvModal.show('modal-skill-' + index)"
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
                      <b-col
                        cols="6"
                        offset="3"
                        md="2"
                        offset-md="0"
                        class="text-center my-2"
                      >
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
              </draggable>
            </b-container>
          </div>
        </b-col>
        <b-col cols="12" md="4" lg="7"></b-col>
      </b-row>
    </b-container>
  </span>
</template>

<script>
import axios from 'axios';
import arrayMove from 'array-move';
import draggable from 'vuedraggable';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';
import EditSave from '../../components/EditSave';

export default {
  components: { EditSave, draggable },
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
  watch: {
    skills(skills) {
      this.localSkills = [...skills];
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
      localSkills: [],
    };
  },
  mounted: function() {
    this.localSkills = [...this.$props.skills];
  },
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  created() {},
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
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
        });
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
}

.wide-container {
  min-width: max-content;
  float: left;
}

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
</style>
