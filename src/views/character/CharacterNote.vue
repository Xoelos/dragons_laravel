<template>
  <!-- Other Display Page -->
  <div class="display">
    Note
    <!-- <b-button variant="primary" @click="createNote">Add Notes</b-button>
      <span v-for="(item, key, index) in form.other" :key="index" class="noGrid">
        <div class="itemOtherDisplay mt-3 ml-2 mr-2">
          <div class="grid-item">
            <b-form-input v-model="form.other[key].title" :readonly="!editable" required></b-form-input>
          </div>
          <div class="grid-item">
            <b-button class="w-100" v-b-toggle="'collapse-note-' + index" variant="primary">Summary</b-button>
          </div>
          <div class="grid-item">
            <b-button class="w-100" :disabled="!editable" :value="key" @click="deleteNote">Delete</b-button>
          </div>
          <div class="grid-item grid-summary">
            <b-collapse :id="'collapse-note-' + index" class="mt-2 w-100">
              <b-form-textarea
                class="w-100 notesArea"
                v-model="form.other[key].summary"
                :readonly="!editable"
                required
                rows="3"
                max-rows="12"
              ></b-form-textarea>
            </b-collapse>
          </div>
        </div>
    </span>-->
  </div>
</template>


<script>
import axios from "axios";
import { mapMutations } from "vuex";
import { mapGetters } from "vuex";
import breadcrumbs from "./breadcrumb.js";

export default {
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
  methods: {
    updateView(breadcrumb) {
      this.$emit("update-view", {
        breadcrumb: breadcrumbs[breadcrumb],
        activeView: breadcrumb,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>