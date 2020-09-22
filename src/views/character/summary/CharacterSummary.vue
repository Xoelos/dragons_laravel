<template>
  <span>
    <EditSave
      :editable="editable"
      :form="{ data: summary, exp: exp, route: '/api/character/summary' }"
      :character-id="characterId"
      @make-editable="makeEditable"
      @refresh="refresh"
    />
    <div class="display">
      <b-row>
        <b-col cols="12" md="4">
          <small class="form-text text-muted">Character Name</small>
          <b-form-input v-model="summary.name" size="sm" :readonly="!editable" required />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Gender</small>
          <b-form-input
            v-model="summary.gender"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Race</small>
          <b-form-input v-model="summary.race" size="sm" :readonly="!editable" required />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Alignment</small>
          <b-form-input
            v-model="summary.alignment"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Size</small>
          <b-form-input v-model="summary.size" size="sm" :readonly="!editable" required />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Speed</small>
          <b-form-input
            v-model="summary.speed"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Base Attack</small>
          <b-button class="w-100" variant="warning" @click="updateView('baseAttacks')">{{
            summary.base_attacks
          }}</b-button>
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Health Points</small>
          <b-button class="w-100" variant="warning" @click="updateView('hp')">{{
            summary.hp
          }}</b-button></b-col
        >
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Initiative</small>
          <b-button class="w-100" variant="warning" @click="updateView('initiative')">{{
            summary.initiative
          }}</b-button></b-col
        >
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Armor Class</small>
          <b-button class="w-100" variant="warning" @click="updateView('ac')">{{
            summary.ac
          }}</b-button>
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Grapple</small>
          <b-button class="w-100" variant="warning" @click="updateView('grapple')">{{
            summary.grapple
          }}</b-button></b-col
        >
      </b-row>
      <b-row class="mt-5">
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Class</small>
          <b-form-input
            v-model="summary.class"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Experience</small>
          <b-form-input
            v-model="exp.experience"
            type="number"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Level</small>
          <div class="level">
            {{ expCalc({ xp: exp.experience, xp_class: exp.class }) }}
          </div>
        </b-col>
      </b-row>

      <hr class="d-md-none my-5" />

      <b-row class="mt-md-2">
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Multi Class</small>
          <b-form-input
            v-model="exp.multi_class"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">MC Experience</small>
          <b-form-input
            v-model="exp.multi_experience"
            class="level"
            size="sm"
            type="number"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">MC Level</small>
          <div class="level">
            {{ expCalc({ xp: exp.multi_experience, xp_class: exp.multi_class }) }}
          </div>
        </b-col>
      </b-row>

      <hr class="d-md-none my-5" />

      <b-row class="mt-md-2">
        <b-col cols="12" md="2">
          <small class="form-text text-muted">Prestige Class</small>
          <b-form-input
            v-model="exp.prestige_class"
            size="sm"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">PC Experience</small>
          <b-form-input
            v-model="exp.prestige_experience"
            class="level"
            size="sm"
            type="number"
            :readonly="!editable"
            required
          />
        </b-col>
        <b-col cols="12" md="2">
          <small class="form-text text-muted">PC Level</small>
          <div class="level">
            {{ expCalc({ xp: exp.prestige_experience, xp_class: exp.prestige_class }) }}
          </div>
        </b-col>
      </b-row>
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
    summary: {
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
  data: function() {
    return {
      exp: {
        class: this.summary.class,
        experience: this.summary.experience,
        multi_class: this.summary.multi_class,
        multi_experience: this.summary.multi_experience,
        prestige_class: this.summary.prestige_class,
        prestige_experience: this.summary.prestige_experience,
      },
    };
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
    expCalc(xp_class) {
      if (!xp_class.xp_class) return 0;

      let experience = Math.floor(xp_class.xp / 1000);

      if (experience >= 190) return 20;
      else if (experience >= 171) return 19;
      else if (experience >= 153) return 18;
      else if (experience >= 136) return 17;
      else if (experience >= 120) return 16;
      else if (experience >= 105) return 15;
      else if (experience >= 91) return 14;
      else if (experience >= 78) return 13;
      else if (experience >= 66) return 12;
      else if (experience >= 55) return 11;
      else if (experience >= 45) return 10;
      else if (experience >= 36) return 9;
      else if (experience >= 28) return 8;
      else if (experience >= 21) return 7;
      else if (experience >= 15) return 6;
      else if (experience >= 10) return 5;
      else if (experience >= 6) return 4;
      else if (experience >= 3) return 3;
      else if (experience >= 1) return 2;
      else if (experience <= 0) return 1;
      else return 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.display {
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 4em;
}
.level {
  padding: 0.25rem 0.5rem;
}

input {
  text-align: center;
  font-size: 1rem;
}
</style>
