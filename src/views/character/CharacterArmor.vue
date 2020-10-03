<template>
  <span>
    <div class="container-fluid">
      <b-row>
        <b-col cols="8" md="2">
          <EditSave
            :editable="editable"
            :form="{ data: localArmors, route: '/api/character/armor' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
          />
        </b-col>
        <b-col cols="4" md="1" class="d-flex">
          <b-button
            class="d-block m-auto px-4"
            :variant="editable ? 'success' : 'outline-primary'"
            @click="addArmor"
            >Add</b-button
          >
        </b-col>
        <b-col cols="12" md="9"></b-col>
      </b-row>
    </div>
    <div class="display mt-3">
      <div class="container-fluid wide-container">
        <b-row>
          <b-col cols="4" class="h6">Name</b-col>
          <b-col cols="3" class="h6">AC Bonus</b-col>
          <b-col cols="2" class="h6 sm-col">Equipped?</b-col>
          <b-col cols="3"></b-col>
        </b-row>
        <draggable
          v-model="localWeapons"
          @start="drag = true"
          @end="drag = false"
          :disabled="!editable"
        >
          <b-row v-for="(armor, index) in localArmors" :key="index" class="my-2">
            <b-col cols="4">
              <b-form-input
                v-model="armor.name"
                :readonly="!editable"
                type="text"
                required
              />
            </b-col>
            <b-col cols="3">
              <b-form-input
                v-model="armor.ac_bonus"
                :readonly="!editable"
                type="number"
                required
              />
            </b-col>
            <b-col cols="2">
              <b-form-checkbox
                v-model="armor.equipped"
                :value="1"
                :unchecked-value="0"
                :disabled="!editable"
                required
              />
            </b-col>
            <b-col cols="3">
              <b-button variant="primary" @click="$bvModal.show('modal-armor-' + index)"
                >Details</b-button
              >
            </b-col>
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
                    :form="{ data: localArmors, route: '/api/character/armor' }"
                    :character-id="characterId"
                    @make-editable="makeEditable"
                    @refresh="refresh"
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
          </b-row>
        </draggable>
      </div>
    </div>
  </span>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import breadcrumbs from './breadcrumb.js';
import EditSave from '../../components/EditSave';

export default {
  components: { EditSave, draggable },
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
  watch: {
    armors(armors) {
      this.localArmors = [...armors];
    },
  },
  data: () => {
    return {
      localArmors: [],
    };
  },
  mounted: function() {
    this.localArmors = [...this.$props.armors];
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
      this.localArmors = [...this.$props.armors];
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
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    move(index, move) {
      if (!this.$props.editable) return;
      let armor_array = [...this.localArmors];
      armor_array = arrayMove(armor_array, index, index + move);
      armor_array.forEach((armor, armor_index) => {
        armor.order = armor_index + 2;
      });
      this.$emit('move', { array: armor_array, place: 'armor' });
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
