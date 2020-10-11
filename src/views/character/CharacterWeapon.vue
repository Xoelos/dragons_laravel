<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="8" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: localWeapons, route: '/api/character/weapons' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
          />
        </b-col>
        <b-col cols="4" lg="1" class="d-flex">
          <b-button
            class="d-block m-auto px-4"
            :variant="editable ? 'success' : 'outline-primary'"
            @click="addWeapon"
            >Add</b-button
          >
        </b-col>
        <b-col cols="12" lg="9"></b-col>
      </b-row>
      <div class="display mt-4">
        <b-container fluid class="wide-container">
          <b-row class="mb-3">
            <b-col
              cols="3"
              class="h6 font-weight-bold"
              v-b-tooltip.hover
              title="Drag and drop to reorder!"
              >Name</b-col
            >
            <b-col cols="2" class="h6 font-weight-bold">Attack Bonus</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Damage</b-col>
            <b-col cols="2" class="h6 font-weight-bold">Equipped?</b-col>
            <b-col cols="2"></b-col>
          </b-row>
          <draggable v-model="localWeapons" handle=".handle" :disabled="!editable">
            <b-row v-for="(weapon, index) in localWeapons" :key="index" class="my-2">
              <b-col cols="3" class="handle">
                <b-form-input
                  v-model="weapon.name"
                  :readonly="!editable"
                  type="text"
                  required
                />
              </b-col>
              <b-col cols="2">
                <b-form-input
                  v-model="weapon.attack_bonus"
                  :readonly="!editable"
                  type="number"
                  required
                />
              </b-col>
              <b-col cols="2">
                <b-form-input
                  v-model="weapon.damage"
                  :readonly="!editable"
                  type="text"
                  required
                />
              </b-col>
              <b-col cols="2" class="sm-col">
                <b-form-checkbox
                  v-model="weapon.equipped"
                  :value="1"
                  :unchecked-value="0"
                  :disabled="!editable"
                  required
                />
              </b-col>
              <b-col cols="2">
                <b-button
                  variant="primary"
                  @click="$bvModal.show('modal-weapon-' + index)"
                  >Details</b-button
                >
              </b-col>
              <b-modal
                :id="'modal-weapon-' + index"
                size="xl"
                :title="'Weapon: ' + weapon.name"
                hide-footer
              >
                <b-row class="mt-2 text-center">
                  <b-col md="3" lg="2" offset-md="3">
                    <small class="h6">Critical</small>
                    <b-form-input
                      v-model="weapon.critical"
                      :readonly="!editable"
                      type="text"
                      required
                    />
                  </b-col>
                  <b-col md="3" lg="2">
                    <small class="h6">Type</small>
                    <b-form-input
                      v-model="weapon.type"
                      :readonly="!editable"
                      type="text"
                      required
                    />
                  </b-col>
                  <b-col md="3" lg="2">
                    <small class="h6">Range</small>
                    <b-form-input
                      v-model="weapon.range"
                      :readonly="!editable"
                      type="text"
                      required
                    />
                  </b-col>
                </b-row>
                <b-row class="mb-5 mt-4 text-center">
                  <b-col md="1" offset-md="3">
                    <small class="h6">Ammo</small>
                    <b-form-input
                      v-model="weapon.ammo"
                      :readonly="!editable"
                      type="number"
                      required
                    />
                  </b-col>
                  <b-col md="5">
                    <small class="h6">Notes</small>
                    <b-form-textarea
                      v-model="weapon.notes"
                      :readonly="!editable"
                      rows="3"
                    />
                  </b-col>
                </b-row>
                <b-row class="mt-4">
                  <b-col md="10">
                    <EditSave
                      :editable="editable"
                      :form="{ data: localWeapons, route: '/api/character/weapons' }"
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
                      class="m-auto px-4"
                      :variant="editable ? 'danger' : 'outline-primary'"
                      @click="deleteWeapon(weapon.id, 'modal-weapon-' + index)"
                      >Delete</b-button
                    >
                  </b-col>
                </b-row>
              </b-modal>
            </b-row>
          </draggable>
        </b-container>
      </div>
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
    weapons: {
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
    weapons(weapons) {
      this.localWeapons = [...weapons];
    },
  },
  data: () => {
    return {
      localWeapons: [],
    };
  },
  created() {},
  mounted: function() {
    this.localWeapons = [...this.$props.weapons];
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

    addWeapon() {
      if (!this.$props.editable) return;
      axios
        .post(
          `${this.env}/api/character/weapons`,
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
    deleteWeapon(weapon_id, modal_id) {
      if (!this.$props.editable) return;
      if (!confirm('This is permanent, are you sure?')) return;
      axios({
        url: `${this.env}/api/character/weapons`,
        method: 'delete',
        data: {
          withCredentials: true,
          weapon_id: weapon_id,
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
  overflow: auto;
}
.wide-container {
  width: max-content;
  float: left;
}
</style>
