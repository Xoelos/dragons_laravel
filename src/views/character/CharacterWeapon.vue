<template>
  <span>
    <b-row>
      <b-col cols="12" md="10">
        <EditSave
          :editable="editable"
          :form="{ data: weapons, route: '/api/character/weapons' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
      <b-col cols="6" offset="3" md="2" offset-md="0" class="my-2">
        <b-button
          class="d-block m-auto px-4"
          :variant="editable ? 'success' : 'outline-primary'"
          @click="addWeapon"
          >Add</b-button
        >
      </b-col>
    </b-row>
    <div class="display mt-3">
      <table>
        <thead>
          <tr>
            <th class="sm-col" />
            <th class="h6">Name</th>
            <th class="h6">Attack Bonus</th>
            <th class="h6">Damage</th>
            <th class="h6 sm-col">Equipped?</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(weapon, index) in weapons" :key="index">
            <td class="sm-col">
              <b-button-group vertical class="d-inline-flex">
                <b-button pill class="px-2 py-0" variant="light" @click="move(index, -1)">
                  <font-awesome-icon icon="caret-up" />
                </b-button>
                <b-button pill class="px-2 py-0" variant="light" @click="move(index, 1)">
                  <font-awesome-icon icon="caret-down" />
                </b-button>
              </b-button-group>
            </td>
            <td>
              <b-form-input
                v-model="weapon.name"
                :readonly="!editable"
                type="text"
                required
              />
            </td>
            <td>
              <b-form-input
                v-model="weapon.attack_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </td>
            <td>
              <b-form-input
                v-model="weapon.damage"
                :readonly="!editable"
                type="text"
                required
              />
            </td>
            <td class="sm-col">
              <b-form-checkbox
                v-model="weapon.equipped"
                :value="1"
                :unchecked-value="0"
                :disabled="!editable"
                required
              />
            </td>
            <td>
              <b-button variant="primary" @click="$bvModal.show('modal-weapon-' + index)"
                >Details</b-button
              >
            </td>
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
                    :form="{ data: weapons, route: '/api/character/weapons' }"
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
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>

<script>
import axios from 'axios';
import arrayMove from 'array-move';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';
import EditSave from '../../components/EditSave';

export default {
  components: { EditSave },
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
          console.log(res);
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    move(index, move) {
      if (!this.$props.editable) return;
      let weapons_array = [...this.weapons];
      weapons_array = arrayMove(weapons_array, index, index + move);
      weapons_array.forEach((weapon, weapon_index) => {
        weapon.order = weapon_index + 2;
      });
      this.$emit('move', { array: weapons_array, place: 'weapons' });
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
          console.log(res);
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
  table {
    margin-right: auto;
    margin-left: 0;
    text-align: center;
    border-spacing: 1em 0.25em;
    border-collapse: separate;
    min-width: 65%;

    @media (max-width: 576px) {
      border-spacing: 2em 0.25em;
    }

    td input:not([type='checkbox']),
    td select,
    td.lead,
    th {
      max-width: 200px;
      min-width: 100px;
      margin: auto;
      white-space: nowrap;
    }
    .sm-col {
      min-width: 30px;
    }
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
