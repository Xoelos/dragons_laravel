<template>
  <b-row>
    <b-col cols="6" class="my-2">
      <b-button class="d-block m-auto px-4" variant="primary" @click="makeEditable()"
        >Edit</b-button
      >
    </b-col>
    <b-col cols="6" class="my-2">
      <b-button
        class="d-block m-auto px-4"
        :variant="editable ? 'dark' : 'outline-primary'"
        @click="save()"
        >Save</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  props: {
    form: {
      type: [Array, Object],
      default: () => {
        if (this.type == Array) return [];
        if (this.type == Object) return {};
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
    return {
      timer: 5,
      countdown: 0,
      showSave: false,
      saveResponse: { message: 'Saved!', variant: 'success' },
    };
  },

  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },

  mounted() {},

  methods: {
    makeEditable() {
      this.$emit('make-editable');
    },
    save() {
      if (!this.$props.editable) return;
      const data = this.$props.form.data;
      const route = this.$props.form.route;

      if (data.class || data.experience) {
        const exp = this.$props.form.exp;
        data.class = exp.class;
        data.experience = exp.experience;
        data.multi_class = exp.multi_class;
        data.multi_experience = exp.multi_experience;
        data.prestige_class = exp.prestige_class;
        data.prestige_experience = exp.prestige_experience;
      }
      axios
        .put(
          `${this.env}${route}`,
          {
            withCredentials: true,
            data: data,
            character_id: this.$props.characterId,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          this.$bvToast.toast('Your changes have been successfully saved!', {
            title: 'Success',
            toaster: 'b-toaster-top-center',
            variant: 'success',
            solid: true,
            autoHideDelay: 3 * 1000,
          });
          this.refresh();
        })
        .catch(err => {
          console.log(err.response);
          this.$bvToast.toast(
            'There was an issue saving your changes. If this issue persists, please submit the bug in the Report Bug page',
            {
              title: 'Error',
              toaster: 'b-toaster-top-center',
              variant: 'danger',
              solid: true,
            }
          );
        });
    },
    refresh() {
      this.$emit('refresh');
    },
    countDownChanged(countdown) {
      this.countdown = countdown;
    },
    showAlert() {
      this.countdown = this.timer;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.alert {
  font-size: 1.5em;
}
</style>
