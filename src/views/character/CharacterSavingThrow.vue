<template>
  <!-- Saving Throws Display Page -->
  <span>
    <EditSave
      :editable="editable"
      :form="{data: savingThrows, route: '/api/character/saving-throws'}"
      :character-id="characterId"
      @make-editable="makeEditable"
      @refresh="refresh"
    ></EditSave>
    <div class="display">
      <table align="center">
        <thead>
          <th>Saving Throw</th>
          <th>Total</th>
          <th>Base Save</th>
          <th>Magic Modifier</th>
          <th>Misc Modifier</th>
          <th>Temp Modifier</th>
        </thead>
        <tbody>
          <tr v-for="(savingThrow, index) in savingThrows" :key="index">
            <td class="px-md-5">{{ savingThrow.name }}</td>
            <td class="px-3 px-md-5">
              {{ Math.floor((
              parseInt(savingThrow.base_score) +
              parseInt(savingThrow.magic_score) +
              parseInt(savingThrow.misc_score) +
              parseInt(savingThrow.temp_score) +
              Math.floor((parseInt(savingThrow.ability_score) + parseInt(savingThrow.ability_temp_score) - 10) / 2))) || 0 }}
            </td>
            <td>
              <b-form-input
                v-model="savingThrow.base_score"
                type="number"
                :readonly="!editable"
                required
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                v-model="savingThrow.magic_score"
                type="number"
                :readonly="!editable"
                required
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                v-model="savingThrow.misc_score"
                type="number"
                :readonly="!editable"
                required
              ></b-form-input>
            </td>
            <td>
              <b-form-input
                v-model="savingThrow.temp_score"
                type="number"
                min="0"
                :readonly="!editable"
                required
              ></b-form-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </span>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import breadcrumbs from "./breadcrumb.js";
import EditSave from "../../components/EditSave";

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
      user: "user",
      env: "env",
    }),
  },
  created() {},
  methods: {
    updateView(breadcrumb) {
      this.$emit("update-view", {
        breadcrumb: breadcrumbs[breadcrumb],
        activeView: breadcrumb,
      });
    },
    makeEditable() {
      this.$emit("make-editable");
    },
    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>
<style lang="scss" scoped>
.display {
  width: 100%;
  overflow: auto;
  table {
    text-align: center;
    margin-right: auto;
    margin-left: 0;
    border-spacing: 1em;
    border-collapse: separate;

    @media (max-width: 576px) {
      border-spacing: 2em 0.25em;
    }

    input,
    select,
    td,
    th {
      white-space: nowrap;
      max-width: 200px;
      margin: auto;
    }
  }
}
</style>