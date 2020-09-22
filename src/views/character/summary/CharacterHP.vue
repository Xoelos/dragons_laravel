<template>
  <span>
    <b-row>
      <b-col cols="12">
        <EditSave
          :editable="editable"
          :form="{ data: healthPoints, route: '/api/character/summary/hp' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
    </b-row>
    <div class="display mt-3">
      <div class="row">
        <div class="col-12 col-md-2">
          <small>Health Points</small>
          <b-form-input
            v-model="healthPoints.total_hp"
            :readonly="!editable"
            type="number"
            required
          />
        </div>
        <div class="col-12 col-md-2">
          <small>Current HP</small>
          <div>
            {{
              parseInt(healthPoints.total_hp) -
                parseInt(healthPoints.damage) -
                parseInt(healthPoints.non_lethal) +
                parseInt(healthPoints.temp_hp) || 0
            }}
          </div>
        </div>
        <div class="col-12 col-md-2">
          <small>Damage Taken</small>
          <b-form-input
            v-model="healthPoints.damage"
            :readonly="!editable"
            type="number"
            required
          />
        </div>
        <div class="col-12 col-md-2">
          <small>Non Lethal</small>
          <b-form-input
            v-model="healthPoints.non_lethal"
            :readonly="!editable"
            type="number"
            required
          />
        </div>
        <div class="col-12 col-md-2">
          <small>Temporary HP</small>
          <b-form-input
            v-model="healthPoints.temp_hp"
            :readonly="!editable"
            type="number"
            required
          />
        </div>
      </div>
    </div>
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
