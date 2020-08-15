<template>
  <span>
    <b-row>
      <b-col cols="12" md="10">
        <EditSave
          :editable="editable"
          :form="{ data: armors, route: '/api/character/armor' }"
          :character-id="characterId"
          @make-editable="makeEditable"
        />
      </b-col>
      <b-col cols="6" offset="3" md="2" offset-md="0" class="my-2">
        <b-button
          class="d-block m-auto px-4"
          :variant="editable ? 'success' : 'outline-primary'"
          @click="addArmor"
          >Add</b-button
        >
      </b-col>
    </b-row>
    <div class="display mt-3">
      <table>
        <thead>
          <tr>
            <th class="sm-col" />
            <th class="h6 sm-col">Equipped?</th>
            <th class="h6">Name</th>
            <th class="h6">Attack Bonus</th>
            <th class="h6">Damage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(armor, index) in armors" :key="index">
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
            <td class="sm-col">
              <b-form-checkbox
                v-model="armor.equipped"
                :value="1"
                :unchecked-value="0"
                :disabled="!editable"
                required
              />
            </td>
            <td>
              <b-form-input
                v-model="armor.name"
                :readonly="!editable"
                type="text"
                required
              />
            </td>
            <td>
              <b-form-input
                v-model="armor.ac_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </td>
            <td>
              <b-button variant="primary" @click="$bvModal.show('modal-armor-' + index)"
                >Details</b-button
              >
            </td>
            <b-modal
              :id="'modal-armor-' + index"
              size="xl"
              :title="'Armor: ' + armor.name"
              hide-footer
            >
              <b-row class="mt-2 text-center">
                <b-col md="3" lg="3" offset-md="2">
                  <small class="h6">Type</small>
                  <b-form-input
                    v-model="armor.type"
                    :readonly="!editable"
                    type="text"
                    required
                  />
                </b-col>
                <b-col md="3" lg="2">
                  <small class="h6">Max Dex</small>
                  <b-form-input
                    v-model="armor.max_dex"
                    :readonly="!editable"
                    type="number"
                    required
                  />
                </b-col>
                <b-col md="3" lg="2">
                  <small class="h6">Check Penalty</small>
                  <b-form-input
                    v-model="armor.check_penalty"
                    :readonly="!editable"
                    type="number"
                    required
                  />
                </b-col>
              </b-row>
              <b-row class="mb-5 mt-4 text-center">
                <b-col md="2" offset-md="2">
                  <small class="h6">Spell Failure</small>
                  <b-form-input
                    v-model="armor.spell_failure"
                    :readonly="!editable"
                    type="text"
                    required
                  />
                </b-col>
                <b-col md="1">
                  <small class="h6">Weight</small>
                  <b-form-input
                    v-model="armor.weight"
                    :readonly="!editable"
                    type="number"
                    required
                  />
                </b-col>
                <b-col md="4">
                  <small class="h6">Notes</small>
                  <b-form-textarea v-model="armor.notes" :readonly="!editable" rows="3" />
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col md="10">
                  <EditSave
                    :editable="editable"
                    :form="{ data: armors, route: '/api/character/armor' }"
                    :character-id="characterId"
                    @make-editable="makeEditable"
                  />
                </b-col>
                <b-col cols="6" offset="3" md="2" offset-md="0" class="text-center my-2">
                  <b-button
                    class="m-auto px-4"
                    :variant="editable ? 'danger' : 'outline-primary'"
                    @click="deleteArmor(armor.id, 'modal-armor-' + index)"
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
    armors: {
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
    addArmor() {
      if (!this.$props.editable) return;
      axios
        .post(
          `${this.env}/api/character/armor`,
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
      let armor_array = [...this.armors];
      armor_array = arrayMove(armor_array, index, index + move);
      armor_array.forEach((armor, armor_index) => {
        armor.order = armor_index + 2;
      });
      this.$emit('move', { array: armor_array, place: 'armors' });
    },
    deleteArmor(armor_id, modal_id) {
      if (!this.$props.editable) return;
      if (!confirm('This is permanent, are you sure?')) return;
      axios({
        url: `${this.env}/api/character/armor`,
        method: 'delete',
        data: {
          withCredentials: true,
          armor_id: armor_id,
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
