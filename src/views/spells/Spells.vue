<template>
  <span>
    <b-row>
      <b-col cols="12" align="center">
        <h3 class="my-4">Search for a spell!</h3>
      </b-col>
      <b-col cols="12" align="center">
        <b-row class="d-flex align-items-center">
          <b-col cols="12" md="3" align="center">
            <b-form-group label="Spell Name">
              <b-form-input v-model="form.name" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" align="center">
            <b-form-group label="School of Magic">
              <b-form-input v-model="form.school_of_magic" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3" align="center">
            <b-form-group label="Spell Level">
              <b-form-input v-model="spellLevel" type="number" />
            </b-form-group> </b-col
          ><b-col cols="12" md="3" align="center">
            <b-button v-b-toggle.collapse-1 variant="primary">Show Domains</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" align="center" class="my-3">
            <b-form-group label="Spell Class">
              <b-form-radio-group
                v-model="spellClass"
                :options="spellClasses"
                name="spellClass"
              ></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-collapse id="collapse-1">
          <b-row>
            <b-col cols="12" align="center" class="my-3">
              <b-form-group label="Spell Domains">
                <b-form-radio-group
                  v-model="spellClass"
                  :options="spellDomains"
                  name="spellClass"
                ></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-collapse>
        <b-col cols="12">
          <b-button
            @click="searchSpell"
            type="submit"
            class="d-block mx-auto my-5 px-5"
            variant="primary"
            >Search</b-button
          >
        </b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-row v-if="!spellResults.length">
          <b-col cols="12">
            <h4>No spells found.</h4>
          </b-col>
        </b-row>
        <b-row v-for="(spell, index) in spellResults" :key="index">
          <b-col cols="12" md="8" offset-md="2" align="left">
            <b-card :title="spell.name" border-variant="primary" class="my-3 p-4">
              <b-card-sub-title>
                <div class="mb-2">{{ spell.school_of_magic }}</div>
                <div class="mb-2">{{ spellLevels(spell.level) }}</div>
              </b-card-sub-title>
              <b-collapse :id="'collapse-' + spell.id">
                <b-card-text v-if="spell.components"
                  ><span class="lead mr-2">Components:</span>
                  {{ spell.components }}</b-card-text
                >
                <b-card-text v-if="spell.casting_time"
                  ><span class="lead mr-2">Casting Time:</span>
                  {{ spell.casting_time }}</b-card-text
                >
                <b-card-text v-if="spell.range"
                  ><span class="lead mr-2">Range:</span> {{ spell.range }}</b-card-text
                >
                <b-card-text v-if="spell.area"
                  ><span class="lead mr-2">Area:</span> {{ spell.area }}</b-card-text
                >
                <b-card-text v-if="spell.target"
                  ><span class="lead mr-2">Target:</span> {{ spell.target }}</b-card-text
                >
                <b-card-text v-if="spell.effect"
                  ><span class="lead mr-2">Effect:</span> {{ spell.effect }}</b-card-text
                >
                <b-card-text v-if="spell.duration"
                  ><span class="lead mr-2">Duration:</span>
                  {{ spell.duration }}</b-card-text
                >
                <b-card-text v-if="spell.saving_throw"
                  ><span class="lead mr-2">Saving Throw:</span>
                  {{ spell.saving_throw }}</b-card-text
                >
                <b-card-text v-if="spell.spell_resistance">
                  <span class="lead mr-2">Spell Resistance:</span>
                  {{ spell.spell_resistance }}
                </b-card-text>
                <b-card-text>
                  <div class="lead mr-2">Summary:</div>
                  <b-row>
                    <b-col cols="12">
                      <p class="spell-summary lead pre-wrap">
                        {{ spell.summary }}
                      </p>
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-collapse>
              <b-collapse :id="'collapse-summary-' + spell.id" :visible="true">
                <b-card-text>
                  {{ spellSummary(spell.summary) }}
                </b-card-text>
              </b-collapse>
              <b-button
                variant="primary"
                class="mt-5"
                v-b-toggle="'collapse-' + spell.id + ' collapse-summary-' + spell.id"
                >Details</b-button
              >
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </span>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';

export default {
  name: 'Spells',
  data: () => {
    return {
      form: {
        name: '',
        school_of_magic: '',
        level: '',
        class: '',
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
      spellResults: [],
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
    searchSpell(event) {
      event.preventDefault();
      if (
        this.form.school_of_magic == '' &&
        this.form.name == '' &&
        this.spellLevel == '' &&
        this.spellClass == ''
      )
        return;

      const params = {
        search: this.form.name,
        school: this.form.school_of_magic,
        level: this.spellLevel,
        class: this.spellClass,
      };

      let query = [];
      for (let param in params) {
        if (params[param] !== '')
          query.push(encodeURIComponent(param) + '=' + encodeURIComponent(params[param]));
      }
      const queryString = query.join('&');

      axios
        .get(`${this.env}/api/spells?${queryString}`)
        .then(res => {
          this.spellResults = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err.response);
        });
    },
    spellLevels(spellLevels) {
      let levels = '';
      spellLevels.forEach((level, index) => {
        levels += level.class;
        levels += ' ';
        levels += level.level;
        if (index !== spellLevels.length - 1) levels += ', ';
      });
      return levels;
    },
    spellSummary(spellSummary) {
      let i = 60;
      spellSummary = spellSummary.split(' ');
      if (spellSummary.length > i) {
        spellSummary = spellSummary.slice(0, i).join(' ');
        spellSummary += '...';
      } else {
        spellSummary = spellSummary.slice(0, i).join(' ');
      }
      return spellSummary;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.spell-summary {
  margin-top: 1.5em;
  line-height: 1.75;
}

.pre-wrap {
  white-space: pre-wrap;
}
</style>
