<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="12" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: healthPoints, route: '/api/character/summary/hp' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
        /></b-col>
        <b-col cols="12" lg="10"></b-col>
      </b-row>
      <div class="mt-4">
        <b-container fluid>
          <b-row>
            <b-col cols="12" md="1">
              <small>Current HP</small>
              <div>
                {{
                  parseInt(healthPoints.total_hp) -
                    parseInt(healthPoints.damage) -
                    parseInt(healthPoints.non_lethal) +
                    parseInt(healthPoints.temp_hp) || 0
                }}
              </div>
            </b-col>
            <b-col cols="12" md="2">
              <small>Base Health Points</small>
              <b-form-input
                v-model="healthPoints.total_hp"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col class="col-12 col-md-2">
              <small>Temporary HP</small>
              <b-form-input
                v-model="healthPoints.temp_hp"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="12" md="2">
              <small>Damage Taken</small>
              <b-form-input
                v-model="healthPoints.damage"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="12" md="2">
              <small>Non Lethal</small>
              <b-form-input
                v-model="healthPoints.non_lethal"
                :readonly="!editable"
                type="number"
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
import breadcrumbs from './../breadcrumb.js';
import EditSave from '../../../components/EditSave';

export default {
  components: { EditSave },
  props: {
    healthPoints: {
      type: Object,
      default: () => {
        return {};
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
input {
  text-align: center;
  font-size: 1rem;
}
</style>
