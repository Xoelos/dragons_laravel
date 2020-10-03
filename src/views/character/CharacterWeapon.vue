<template>
  <span>
    <b-row>
      <b-col cols="8" md="2">
        <EditSave
          :editable="editable"
          :form="{ data: localWeapons, route: '/api/character/weapons' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
      <b-col cols="4" md="1" class="d-flex">
        <b-button
          class="d-block m-auto px-4"
          :variant="editable ? 'success' : 'outline-primary'"
          @click="addWeapon"
          >Add</b-button
        >
      </b-col>
      <b-col cols="12" md="9"></b-col>
    </b-row>
    <div class="display mt-3">
      <div class="container-fluid wide-container">
        <b-row>
          <b-col cols="3" class="h6">Name</b-col>
          <b-col cols="2" class="h6">Attack Bonus</b-col>
          <b-col cols="2" class="h6">Damage</b-col>
          <b-col cols="2" class="h6 sm-col">Equipped?</b-col>
          <b-col cols="2"></b-col>
        </b-row>
        <draggable
          v-model="localWeapons"
          @start="drag = true"
          @end="drag = false"
          :disabled="!editable"
        >
          <b-row v-for="(weapon, index) in localWeapons" :key="index" class="my-2">
            <b-col cols="3">
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
              <b-button variant="primary" @click="$bvModal.show('modal-weapon-' + index)"
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
                <b-col cols="6" offset="3" md="2" offset-md="0" class="text-center my-2">
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
      </div>
    </div>
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
      updateProps();
    },
    updateProps() {
      this.localWeapons = [...this.$props.weapons];
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
  overflow-x: auto;

  .wide-container {
    width: max-content;
    float: left;
  }

  @media (max-width: 767px) {
    .display >>> .modal-dialog {
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }

  @media (max-width: 576px) {
  }
}
</style>
