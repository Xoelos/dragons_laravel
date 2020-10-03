<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="12" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: savingThrows, route: '/api/character/saving-throws' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
        /></b-col>
        <b-col cols="12" lg="10"></b-col>
      </b-row>
      <div class="display mt-4">
        <b-container fluid class="wide-container">
          <b-row class="mb-3">
            <b-col cols="2" class="h6 font-weight-bold">Saving Throw</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Total</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Base Save</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Magic Modifier</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Misc Modifier</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Temp Modifier</b-col>
          </b-row>
          <b-row v-for="(savingThrow, index) in savingThrows" :key="index">
            <b-col cols="2" class="px-md-5">{{ savingThrow.name }}</b-col>
            <b-col cols="2" class="px-3 px-md-5">
              {{
                Math.floor(
                  parseInt(savingThrow.base_score) +
                    parseInt(savingThrow.magic_score) +
                    parseInt(savingThrow.misc_score) +
                    parseInt(savingThrow.temp_score) +
                    Math.floor(
                      (parseInt(savingThrow.ability_score) +
                        parseInt(savingThrow.ability_temp_score) -
                        10) /
                        2
                    )
                ) || 0
              }}
            </b-col>
            <b-col cols="2">
              <b-form-input
                v-model="savingThrow.base_score"
                type="number"
                :readonly="!editable"
                required
              />
            </b-col>
            <b-col cols="2">
              <b-form-input
                v-model="savingThrow.magic_score"
                type="number"
                :readonly="!editable"
                required
              />
            </b-col>
            <b-col cols="2">
              <b-form-input
                v-model="savingThrow.misc_score"
                type="number"
                :readonly="!editable"
                required
              />
            </b-col>
            <b-col cols="2">
              <b-form-input
                v-model="savingThrow.temp_score"
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
    savingThrows: {
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
