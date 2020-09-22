<template>
  <span>
    <b-row>
      <b-col cols="12">
        <EditSave
          :editable="editable"
          :form="{ data: initiative, route: '/api/character/summary/initiative' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
    </b-row>
    <div class="display mt-3">
      <div class="row">
        <div class="col-12 col-md-3">
          <small>Initiative Total</small>
          <div>
            {{
              parseInt(initiative.misc_bonus) +
                Math.floor(
                  (parseInt(initiative.score) + parseInt(initiative.temp_score) - 10) / 2
                )
            }}
          </div>
        </div>
        <div class="col-12 col-md-3">
          <small>Dexterity Bonus</small>
          <div>
            {{
              Math.floor(
                (parseInt(initiative.score) + parseInt(initiative.temp_score) - 10) / 2
              )
            }}
          </div>
        </div>
        <div class="col-12 col-md-3">
          <small>Misc Bonus</small>
          <b-form-input
            v-model="initiative.misc_bonus"
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
    initiative: {
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
