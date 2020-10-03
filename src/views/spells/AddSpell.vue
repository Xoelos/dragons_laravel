<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h1>Add a spell!</h1>
      </b-col>
      <b-col cols="12" align="center">
        <b-row>
          <b-col cols="12" md="4" offset-md="1" align="center">
            <b-form-group label="Spell Name*">
              <b-form-input v-model="form.name" required />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" offset-md="2" align="center">
            <b-form-group label="School of Magic*">
              <b-form-input v-model="form.school_of_magic" required />
            </b-form-group>
          </b-col>
          <b-col cols="0" md="1"></b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="12" align="center">
            <b-form-group label="Spell Class*">
              <b-form-radio-group
                v-model="spellClass"
                :options="spellClasses"
                name="spellClass"
              ></b-form-radio-group>
            </b-form-group>
            <b-button v-b-toggle.collapse-1 variant="primary">Show Domains</b-button>
          </b-col>
        </b-row>
        <b-collapse id="collapse-1">
          <b-row class="my-3">
            <b-col cols="12" align="center">
              <b-form-group label="Spell Domains*">
                <b-form-radio-group
                  v-model="spellClass"
                  :options="spellDomains"
                  name="spellClass"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-collapse>
        <b-row class="my-3">
          <b-col cols="12" md="2" offset-md="5" align="center">
            <b-form-group label="Spell Level*">
              <b-form-input v-model="spellLevel" type="number" min="0" max="9" required />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="2" offset-md="5" align="center">
            <b-button
              id="updateProfileSubmit"
              type="submit"
              variant="primary"
              @click="addLevel"
              >Add Level</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" align="center" class="mt-5">
            <b-button
              v-for="(level, index) in form.levels"
              :key="index"
              @click="deleteLevel(index)"
              class="mx-2"
              >{{ level.class }} Level {{ level.level }}</b-button
            >
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Components">
              <b-form-input v-model="form.components" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Casting Time">
              <b-form-input v-model="form.casting_time" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Range">
              <b-form-input v-model="form.range" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Area">
              <b-form-input v-model="form.area" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Target">
              <b-form-input v-model="form.target" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Effect">
              <b-form-input v-model="form.effect" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Duration">
              <b-form-input v-model="form.duration" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Saving Throw">
              <b-form-input v-model="form.saving_throw" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="4" align="center">
            <b-form-group label="Spell Resistance">
              <b-form-input v-model="form.spell_resistance" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="8" offset-md="2" align="center">
            <b-form-group label="Summary*">
              <b-form-textarea v-model="form.summary" rows="12"></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row
          ><b-col cols="6" offset="3" md="4" offset-md="4">
            <b-button
              id="updateProfileSubmit"
              @click="addSpell"
              type="submit"
              class="d-block mx-auto my-5 w-50"
              variant="primary"
              >Add new spell</b-button
            ></b-col
          ></b-row
        >
      </b-col>
    </b-row>
  </span>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'AddSpell',
  data: () => {
    return {
      form: {
        name: '',
        school_of_magic: '',
        area: '',
        casting_time: '',
        components: '',
        duration: '',
        effect: '',
        range: '',
        saving_throw: '',
        spell_resistance: '',
        target: '',
        summary: '',
        levels: [],
      },
      spellLevel: '',
      spellClass: '',
      spellClasses: [
        { text: 'None', value: '', autofocus: true },
        { text: 'Bard', value: 'Bard' },
        { text: 'Cleric', value: 'Cleric' },
        { text: 'Druid', value: 'Druid' },
        { text: 'Sorcerer', value: 'Sorcerer' },
        { text: 'Wizard', value: 'Wizard' },
        { text: 'Paladin', value: 'Paladin' },
        { text: 'Ranger', value: 'Ranger' },
      ],
      spellDomains: [
        { text: 'Air', value: 'Air' },
        { text: 'Animal', value: 'Animal' },
        { text: 'Chaos', value: 'Chaos' },
        { text: 'Death', value: 'Death' },
        { text: 'Destruction', value: 'Destruction' },
        { text: 'Earth', value: 'Earth' },
        { text: 'Evil', value: 'Evil' },
        { text: 'Fire', value: 'Fire' },
        { text: 'Good', value: 'Good' },
        { text: 'Healing', value: 'Healing' },
        { text: 'Knowledge', value: 'Knowledge' },
        { text: 'Law', value: 'Law' },
        { text: 'Luck', value: 'Luck' },
        { text: 'Magic', value: 'Magic' },
        { text: 'Plant', value: 'Plant' },
        { text: 'Protection', value: 'Protection' },
        { text: 'Strength', value: 'Strength' },
        { text: 'Sun', value: 'Sun' },
        { text: 'Travel', value: 'Travel' },
        { text: 'Trickery', value: 'Trickery' },
        { text: 'War', value: 'War' },
        { text: 'Water', value: 'Water' },
      ],
    };
  },
  created() {},
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  methods: {
    addSpell(event) {
      event.preventDefault();
      if (
        this.form.school_of_magic == '' ||
        this.form.name == '' ||
        this.form.summary == '' ||
        this.form.levels.length == 0
      ) {
        this.$bvToast.toast('Must enter all required information!', {
          title: 'Error',
          toaster: 'b-toaster-top-center',
          variant: 'danger',
          solid: true,
          autoHideDelay: 2 * 1000,
        });
        return;
      }

      const summary = this.form.summary.replace('\n', ' ').trim();

      axios
        .post(
          `${this.env}/api/spells`,
          {
            withCredentials: true,
            name: this.form.name.trim(),
            school_of_magic: this.form.school_of_magic.trim(),
            area: this.form.area.trim(),
            casting_time: this.form.casting_time.trim(),
            components: this.form.components.trim(),
            duration: this.form.duration.trim(),
            effect: this.form.effect.trim(),
            range: this.form.range.trim(),
            saving_throw: this.form.saving_throw.trim(),
            spell_resistance: this.form.spell_resistance.trim(),
            summary: summary,
            target: this.form.target.trim(),
            levels: this.form.levels,
          },
          {
            headers: { Authorization: `Bearer ${this.user.access_token}` },
          }
        )
        .then(res => {
          console.log(res);
          this.$bvToast.toast(this.form.name + ' has been added successfully!', {
            title: 'Success',
            toaster: 'b-toaster-top-center',
            variant: 'success',
            solid: true,
            autoHideDelay: 3 * 1000,
          });

          this.form = {
            name: '',
            school_of_magic: '',
            area: '',
            casting_time: '',
            components: '',
            duration: '',
            effect: '',
            range: '',
            saving_throw: '',
            spell_resistance: '',
            target: '',
            summary: '',
            levels: [],
          };
          this.spellLevel = '';
          this.spellClass = '';
        })
        .catch(err => {
          console.log(err.response);
          this.$bvToast.toast(
            'There was an issue adding your spell.\n' + err.response.data,
            {
              title: 'Error',
              toaster: 'b-toaster-top-center',
              variant: 'danger',
              solid: true,
            }
          );
        });
    },
    addLevel() {
      if (this.spellLevel == '' || this.spellClass == '') return;
      this.form.levels.push({ level: this.spellLevel, class: this.spellClass });
    },
    deleteLevel(index) {
      this.form.levels.splice(index, 1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
