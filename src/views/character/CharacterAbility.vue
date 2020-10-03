<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="12" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: abilities, route: '/api/character/abilities' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
        /></b-col>
        <b-col cols="12" lg="10"></b-col>
      </b-row>
      <div class="display mt-4">
        <b-container fluid class="wide-container">
          <b-row class="mb-3">
            <b-col cols="3" class="h6 font-weight-bold">Ability</b-col>
            <b-col cols="3" class="h6 font-weight-bold">Modifier</b-col>
            <b-col cols="3" class="h6 font-weight-bold">Score</b-col>
            <b-col cols="3" class="h6 font-weight-bold">Temp Score</b-col>
          </b-row>
          <b-row v-for="(ability, index) in abilities" :key="index">
            <b-col cols="3">{{ ability.name }}</b-col>
            <b-col cols="3">
              {{
                Math.floor(
                  (parseInt(ability.score) + parseInt(ability.temp_score) - 10) / 2
                ) || 0
              }}
            </b-col>
            <b-col cols="3">
              <b-form-input
                v-model="ability.score"
                type="number"
                :readonly="!editable"
                required
              />
            </b-col>
            <b-col cols="3">
              <b-form-input
                v-model="ability.temp_score"
                type="number"
                min="0"
                :readonly="!editable"
                required
              />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-container>
  </span>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';
import EditSave from '../../components/EditSave';

export default {
  components: { EditSave },
  props: {
    abilities: {
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
    return {};
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
  },
};
</script>
<style lang="scss" scoped>
.display {
  width: 100%;
  overflow: auto;
}
.wide-container {
  width: max-content;
  float: left;
}
</style>
