<template>
  <div class="display">
    <b-row class="d-block d-md-none mt-5">
      <b-col cols="12" md="6" lg="4">
        <b-list-group>
          <b-list-group-item class="list-nav h3" @click="updateView('summary')"
            >Summary</b-list-group-item
          >
          <b-list-group-item class="list-nav h3" @click="updateView('abilities')">
            Abilities
            <font-awesome-icon icon="fist-raised" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('skills')">
            Skills
            <font-awesome-icon icon="swimmer" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('savingThrows')">
            Saving Throws
            <font-awesome-icon icon="skull-crossbones" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('weapons')">
            Weapons
            <font-awesome-icon icon="gavel" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('armor')">
            Armor
            <font-awesome-icon icon="shield-alt" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('spells')">
            Spells
            <font-awesome-icon icon="hat-wizard" />
          </b-list-group-item>
          <b-list-group-item class="list-nav h3" @click="updateView('notes')">
            Notes
            <font-awesome-icon icon="sticky-note" />
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
    <b-row class="d-none d-md-block mt-5" align="left" cols="12" md="6" lg="4">
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('summary')">Summary</h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('abilities')">
          Abilities
          <font-awesome-icon icon="fist-raised" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('skills')">
          Skills
          <font-awesome-icon icon="swimmer" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('savingThrows')">
          Saving Throws
          <font-awesome-icon icon="skull-crossbones" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('weapons')">
          Weapons
          <font-awesome-icon icon="gavel" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('armor')">
          Armor
          <font-awesome-icon icon="shield-alt" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('spells')">
          Spells
          <font-awesome-icon icon="hat-wizard" />
        </h2>
      </b-col>
      <b-col cols="12" class="mt-4">
        <h2 class="d-inline header-nav" @click="updateView('notes')">
          Notes
          <font-awesome-icon icon="sticky-note" />
        </h2>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';

export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {};
      },
    },
    editable: {
      type: Boolean,
      default: false,
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
  },
};
</script>
<style lang="scss" scoped>
.display {
  .list-nav {
    cursor: pointer;
    &:hover {
      background-color: $primary;
      color: $highlight;
    }
  }
  .header-nav {
    cursor: pointer;
    padding: 0.25em;
    font-weight: 600;

    &:hover {
      color: $highlight-darker;
      border-bottom: solid;
    }
  }
}
</style>
