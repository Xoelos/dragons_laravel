<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="12" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: baseAttacks, route: '/api/character/summary/base-attack' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
        /></b-col>
        <b-col cols="12" lg="10"></b-col>
      </b-row>
      <div class="mt-4">
        <b-container fluid>
          <b-row>
            <b-col cols="12" md="3">
              <small>Base Attack Bonus</small>
              <b-form-input
                v-model="baseAttacks.base_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="12" md="3">
              <small>Second Attack Bonus</small>
              <b-form-input
                v-model="baseAttacks.second_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="12" md="3">
              <small>Third Attack Bonus</small>
              <b-form-input
                v-model="baseAttacks.third_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="12" md="3">
              <small>Fourth Attack Bonus</small>
              <b-form-input
                v-model="baseAttacks.fourth_bonus"
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
    baseAttacks: {
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
