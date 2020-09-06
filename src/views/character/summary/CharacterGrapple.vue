<template>
  <span>
    <b-row>
      <b-col cols="12">
        <EditSave
          :editable="editable"
          :form="{ data: grapple, route: '/api/character/summary/grapple' }"
          :character-id="characterId"
          @make-editable="makeEditable"
        />
      </b-col>
    </b-row>
    <div class="display mt-3">
      <div class="row">
        <div class="col-12 col-md-3">
          <small>Total Grapple</small>
          <div>
            {{
              parseInt(baseAttackBonus) +
                parseInt(grapple.size_bonus) +
                parseInt(grapple.misc_bonus) +
                Math.floor(
                  (parseInt(grapple.score) + parseInt(grapple.temp_score) - 10) / 2
                )
            }}
          </div>
        </div>
        <div class="col-12 col-md-3">
          <small>Base Attack Bonus</small>
          <div>{{ baseAttackBonus }}</div>
        </div>
        <div class="col-12 col-md-3">
          <small>Size Bonus</small>
          <div>
            <b-form-input
              v-model="grapple.size_bonus"
              :readonly="!editable"
              type="number"
              required
            />
          </div>
        </div>
        <div class="col-12 col-md-3">
          <small>Misc Bonus</small>
          <b-form-input
            v-model="grapple.misc_bonus"
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
    grapple: {
      type: Object,
      default: () => {
        return {};
      },
    },
    baseAttackBonus: {
      default: 0,
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
