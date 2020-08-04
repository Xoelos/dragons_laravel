<template>
  <!-- Abilities Display Page -->
  <span>
    <EditSave
      :editable="editable"
      :form="{data: abilities, route: '/api/character/abilities'}"
      :character-id="characterId"
      @make-editable="makeEditable"
      @refresh="refresh"
    ></EditSave>
    <div class="display">
      <table align="center">
        <thead>
          <th>Ability</th>
          <th>Ability Modifier</th>
          <th>Ability Score</th>
          <th>Ability Temp Score</th>
        </thead>
        <tbody>
          <tr v-for="(ability, index) in abilities" :key="index">
            <td align="right">{{ ability.name }}</td>
            <td>{{ Math.floor((parseInt(ability.score) + parseInt(ability.temp_score) - 10) / 2) || 0 }}</td>
            <td>
              <b-form-input v-model="ability.score" type="number" :readonly="!editable" required></b-form-input>
            </td>
            <td>
              <b-form-input
                v-model="ability.temp_score"
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
    abilities: {
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