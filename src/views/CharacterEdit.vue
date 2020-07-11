<template>
  <div>
    <b-form @submit="submitChanges()" @submit.stop.prevent>
      <b-row align="center">
        <b-col cols="12" md="10">
          <b-row>
            <b-col cols="6" md="12">
              <b-row>
                <b-col cols="12" md="4">
                  <small class="form-text text-muted">Character Name</small>
                  <b-form-input
                    v-model="form.characterName"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Race</small>
                  <b-form-input
                    v-model="form.race"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Class</small>
                  <b-form-input
                    v-model="form.class"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Level</small>
                  <div>{{ expCalc(form.experience) }}</div>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Experience</small>
                  <b-form-input
                    v-model="form.experience"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="6" md="12">
              <b-row>
                <b-col cols="12" md="4">
                  <small class="form-text text-muted">Alignment</small>
                  <b-form-input
                    v-model="form.alignment"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Base Attack</small>
                  <b-form-input
                    v-model="form.baseAttack"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">Prestige Class</small>
                  <b-form-input
                    v-model="form.pClass"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">P.C. Level</small>
                  <div>{{ expCalc(form.pcExperience) }}</div>
                </b-col>
                <b-col cols="12" md="2">
                  <small class="form-text text-muted">P.C. Experience</small>
                  <b-form-input
                    v-model="form.pcExperience"
                    size="sm"
                    :readonly="!editable"
                    required
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="2">
          <b-row>
            <b-col cols="6">
              <b-button class="w-100" variant="primary" @click="makeEditable()"
                >Edit</b-button
              >
            </b-col>
            <b-col cols="6">
              <b-button class="w-100" variant="dark" @click="submitChanges()"
                >Save</b-button
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" align="center">
              <b-alert
                class="mt-2 p-0 w-100"
                align="center"
                :show="dismissCountDown"
                variant="success"
                @dismissed="dismissCountDown = 0"
                @dismiss-count-down="countDownChanged"
              >
                <p>Saved!</p>
              </b-alert>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col cols="12" md="2" class="mb-4">
          <b-list-group align="center">
            <b-list-group-item
              display="summary"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'summary' }"
              >Summary</b-list-group-item
            >
            <b-list-group-item
              display="abilities"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'abilities' }"
              >Abilities</b-list-group-item
            >
            <b-list-group-item
              display="skills"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'skills' }"
              >Skills</b-list-group-item
            >
            <b-list-group-item
              display="savingThrows"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'savingThrows' }"
              >Saving Throws</b-list-group-item
            >
            <b-list-group-item
              display="weapons"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'weapons' }"
              >Weapons</b-list-group-item
            >
            <b-list-group-item
              display="armour"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'armour' }"
              >Armour</b-list-group-item
            >
            <b-list-group-item
              display="spells"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'spells' }"
              >Spells</b-list-group-item
            >
            <b-list-group-item
              display="other"
              @click="activateScreen"
              :class="{ 'list-group-active': activeScreen == 'other' }"
              >Other</b-list-group-item
            >
          </b-list-group>
        </b-col>
        <b-col cols="12" md="10">
          <div class="dataSection shadow p-2 bg-white rounded">
            <b-row>
              <b-col cols="12">
                <!-- Summary Display Page -->
                <div
                  v-if="activeScreen == 'summary'"
                  id="summaryDisplay"
                  align="center"
                >
                  <div
                    v-for="(item, key, index) in form.summary"
                    :key="index"
                    class="display"
                  >
                    <div class="grid-item">{{ item.name }}</div>
                    <div class="grid-item">
                      {{ summaryTotalCalc(item, key) }}
                    </div>
                    <div class="grid-item">
                      <b-button
                        class="w-100 m-2"
                        v-b-toggle="'collapse-summary-' + index"
                        variant="primary"
                        >Details</b-button
                      >
                    </div>
                    <b-collapse
                      :id="'collapse-summary-' + index"
                      class="mt-2 mb-2 w-100 summarySubGrid"
                    >
                      <div
                        v-for="(itemTwo, keyTwo, indexTwo) in summaryClean(
                          item
                        )"
                        :key="indexTwo"
                      >
                        <small>{{ form.summary[key][keyTwo].name }}</small>
                        <b-form-input
                          v-model="form.summary[key][keyTwo].value"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                    </b-collapse>
                  </div>
                </div>
                <!-- Abilities Display Page -->
                <div
                  v-if="activeScreen == 'abilities'"
                  id="abilitiesDisplay"
                  align="center"
                >
                  <div class="display">
                    <div class="grid-item grid-head">Ability</div>
                    <div class="grid-item grid-head">Ability Score</div>
                    <div class="grid-item grid-head">Ability Modifier</div>
                    <span
                      v-for="(item, index) in form.abilities"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="grid-item">{{ item.name }}</div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.abilities[index].abilityScore"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                      <div class="grid-item">
                        {{ Math.floor((parseInt(item.abilityScore) - 10) / 2) }}
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Skills Display Page -->
                <div
                  v-if="activeScreen == 'skills'"
                  id="skillsDisplay"
                  align="center"
                >
                  <div class="display">
                    <div class="grid-item grid-head">Skill</div>
                    <div class="grid-item grid-head">Ability</div>
                    <div class="grid-item grid-head">Skill Modifier</div>
                    <div class="grid-item grid-head">Ability Modifier</div>
                    <div class="grid-item grid-head">Ranks</div>
                    <div class="grid-item grid-head">Misc Modifier</div>
                    <span
                      v-for="(item, index) in form.skills"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="grid-item">
                        <b-form-input
                          class="input-clear"
                          v-model="form.skills[index].name"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                      <div class="grid-item">
                        <b-form-select
                          class="ddItem"
                          v-model="form.skills[index].ability"
                          :options="abilityList"
                          :readonly="!editable"
                          required
                        ></b-form-select>
                      </div>
                      <div class="grid-item">
                        {{
                          parseInt(item.skillRanks) +
                            parseInt(item.skillMisc) +
                            skillsAbilitiesModifier(item.ability)
                        }}
                      </div>
                      <div class="grid-item">
                        {{ skillsAbilitiesModifier(item.ability) }}
                      </div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.skills[index].skillRanks"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.skills[index].skillMisc"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Saving Throws Display Page -->
                <div
                  v-if="activeScreen == 'savingThrows'"
                  id="savingThrowsDisplay"
                  align="center"
                >
                  <div class="display">
                    <div class="grid-item grid-head">Name</div>
                    <div class="grid-item grid-head">Total</div>
                    <div class="grid-item grid-head">Base Save</div>
                    <div class="grid-item grid-head">Ability Modifier</div>
                    <div class="grid-item grid-head">Misc Modifier</div>
                    <span
                      v-for="(item, index) in form.savingThrows"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="grid-item">{{ item.name }}</div>
                      <div class="grid-item">
                        {{
                          parseInt(form.savingThrows[index].baseSave) +
                            parseInt(form.savingThrows[index].abilityMod) +
                            parseInt(form.savingThrows[index].miscMod)
                        }}
                      </div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.savingThrows[index].baseSave"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.savingThrows[index].abilityMod"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                      <div class="grid-item">
                        <b-form-input
                          v-model="form.savingThrows[index].miscMod"
                          :readonly="!editable"
                          required
                        ></b-form-input>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Weapons Display Page -->
                <div
                  v-if="activeScreen == 'weapons'"
                  id="weaponsDisplay"
                  align="center"
                >
                  <div class="display">
                    <b-button variant="primary" @click="createWeapon"
                      >Add New Weapon</b-button
                    >
                    <span
                      v-for="(item, index) in form.weapons"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="itemWeaponDisplay mt-3 ml-2 mr-2">
                        <div class="grid-item">
                          <small>Weapon</small>
                          <b-form-input
                            class="input-clear"
                            v-model="form.weapons[index].name"
                            :readonly="!editable"
                            required
                          ></b-form-input>
                        </div>
                        <span class="grid-item">
                          <small>Show</small>
                          <b-button
                            class="w-100"
                            v-b-toggle="'collapse-note-' + index"
                            variant="primary"
                            >Details</b-button
                          >
                        </span>
                        <div class="grid-item">
                          <small>Delete</small>
                          <b-button
                            class="w-100"
                            :disabled="!editable"
                            :value="index"
                            @click="deleteWeapon"
                            >Delete</b-button
                          >
                        </div>
                        <b-collapse
                          :id="'collapse-note-' + index"
                          class="mt-2 w-100 noGrid"
                        >
                          <div class="grid-item">
                            <small>Attack Bonus</small>
                            <b-form-input
                              v-model="form.weapons[index].attackBonus"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Damage</small>
                            <b-form-input
                              v-model="form.weapons[index].damage"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Critical Chance</small>
                            <b-form-input
                              v-model="form.weapons[index].critical"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Damage Type</small>
                            <b-form-input
                              v-model="form.weapons[index].type"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Range</small>
                            <b-form-input
                              v-model="form.weapons[index].range"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Ammo Count</small>
                            <b-form-input
                              v-model="form.weapons[index].ammo"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div
                            v-if="form.weapons[index].notes"
                            class="grid-item fullGrid mb-4"
                          >
                            <small>Notes</small>
                            <b-form-textarea
                              class="w-100"
                              v-model="form.weapons[index].notes"
                              :readonly="!editable"
                              required
                              rows="3"
                              max-rows="12"
                            ></b-form-textarea>
                          </div>
                        </b-collapse>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Armour Display Page -->
                <div
                  v-if="activeScreen == 'armour'"
                  id="armourDisplay"
                  align="center"
                >
                  <div class="display">
                    <b-button variant="primary" @click="createArmour"
                      >Add New Armour</b-button
                    >
                    <span
                      v-for="(item, index) in form.armours"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="itemArmourDisplay mt-3 ml-2 mr-2">
                        <div class="grid-item">
                          <small>Armour</small>
                          <b-form-input
                            class="input-clear"
                            v-model="form.armours[index].name"
                            :readonly="!editable"
                            required
                          ></b-form-input>
                        </div>
                        <span class="grid-item">
                          <small>Show</small>
                          <b-button
                            class="w-100"
                            v-b-toggle="'collapse-note-' + index"
                            variant="primary"
                            >Details</b-button
                          >
                        </span>
                        <div class="grid-item">
                          <small>Delete</small>
                          <b-button
                            class="w-100"
                            :disabled="!editable"
                            :value="index"
                            @click="deleteArmour"
                            >Delete</b-button
                          >
                        </div>
                        <b-collapse
                          :id="'collapse-note-' + index"
                          class="mt-2 w-100 noGrid"
                        >
                          <div class="grid-item">
                            <small>Armour Type</small>
                            <b-form-input
                              v-model="form.armours[index].type"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>AC Bonus</small>
                            <b-form-input
                              v-model="form.armours[index].acBonus"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Max DEX</small>
                            <b-form-input
                              v-model="form.armours[index].maxDex"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Check Penalty</small>
                            <b-form-input
                              v-model="form.armours[index].checkPenalty"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Spell Failure %</small>
                            <b-form-input
                              v-model="form.armours[index].spellFailure"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Speed</small>
                            <b-form-input
                              v-model="form.armours[index].speed"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Weight</small>
                            <b-form-input
                              v-model="form.armours[index].weight"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item fullGrid mb-4">
                            <small>Notes</small>
                            <b-form-textarea
                              class="w-100"
                              v-model="form.armours[index].specialProperties"
                              :readonly="!editable"
                              required
                              rows="3"
                              max-rows="12"
                            ></b-form-textarea>
                          </div>
                        </b-collapse>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Spells Display Page -->
                <div
                  v-if="activeScreen == 'spells'"
                  id="spellsDisplay"
                  align="center"
                >
                  <div class="display">
                    <b-button variant="primary" @click="createSpell"
                      >Add Spell</b-button
                    >
                    <span
                      v-for="(item, index) in form.spells"
                      :key="index"
                      draggable="true"
                    >
                      <div class="itemSpellsDisplay mt-3 ml-2 mr-2">
                        <div class="grid-item">
                          <small>Spell</small>
                          <b-form-input
                            class="input-clear"
                            v-model="form.spells[index].name"
                            :readonly="!editable"
                            required
                          ></b-form-input>
                        </div>
                        <div class="grid-item">
                          <small>Casting Level</small>
                          <b-form-input
                            class="input-clear"
                            v-model="form.spells[index].level"
                            :readonly="!editable"
                            required
                          ></b-form-input>
                        </div>
                        <div class="grid-item">
                          <small>Show</small>
                          <b-button
                            class="w-100"
                            v-b-toggle="'collapse-spell-' + index"
                            variant="primary"
                            >Summary</b-button
                          >
                        </div>
                        <div class="grid-item">
                          <small>Delete</small>
                          <b-button
                            class="w-100"
                            :disabled="!editable"
                            :value="index"
                            @click="deleteSpell"
                            >Delete</b-button
                          >
                        </div>
                        <b-collapse
                          :id="'collapse-spell-' + index"
                          class="mt-2 w-100 noGrid"
                        >
                          <div class="grid-item">
                            <small>Components</small>
                            <b-form-input
                              v-model="form.spells[index].components"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Casting Time</small>
                            <b-form-input
                              v-model="form.spells[index].castingTime"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Range</small>
                            <b-form-input
                              v-model="form.spells[index].range"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Area</small>
                            <b-form-input
                              v-model="form.spells[index].area"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Target</small>
                            <b-form-input
                              v-model="form.spells[index].target"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Duration</small>
                            <b-form-input
                              v-model="form.spells[index].duration"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Saving Throw</small>
                            <b-form-input
                              v-model="form.spells[index].savingThrow"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item">
                            <small>Spell Resistance</small>
                            <b-form-input
                              v-model="form.spells[index].spellResistance"
                              :readonly="!editable"
                              required
                            ></b-form-input>
                          </div>
                          <div class="grid-item grid-summary mb-4">
                            <small>Spell Summary</small>
                            <b-form-textarea
                              class="w-100"
                              v-model="form.spells[index].summary"
                              :readonly="!editable"
                              required
                              rows="3"
                              max-rows="12"
                            ></b-form-textarea>
                          </div>
                        </b-collapse>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- Other Display Page -->
                <div
                  v-if="activeScreen == 'other'"
                  id="otherDisplay"
                  align="center"
                >
                  <div class="display">
                    <b-button variant="primary" @click="createNote"
                      >Add Notes</b-button
                    >
                    <span
                      v-for="(item, key, index) in form.other"
                      :key="index"
                      class="noGrid"
                    >
                      <div class="itemOtherDisplay mt-3 ml-2 mr-2">
                        <div class="grid-item">
                          <b-form-input
                            v-model="form.other[key].title"
                            :readonly="!editable"
                            required
                          ></b-form-input>
                        </div>
                        <div class="grid-item">
                          <b-button
                            class="w-100"
                            v-b-toggle="'collapse-note-' + index"
                            variant="primary"
                            >Summary</b-button
                          >
                        </div>
                        <div class="grid-item">
                          <b-button
                            class="w-100"
                            :disabled="!editable"
                            :value="key"
                            @click="deleteNote"
                            >Delete</b-button
                          >
                        </div>
                        <div class="grid-item grid-summary">
                          <b-collapse
                            :id="'collapse-note-' + index"
                            class="mt-2 w-100"
                          >
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
                    </span>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/firestore";
import _ from "lodash";
import blankUser, {
  blankWeapon,
  blankArmour,
  blankSpell,
  blankNote
} from "./CharacterEdit.js";

export default {
  props: {
    characterId: {
      type: String,
      default: "1"
    }
  },
  data: () => {
    return {
      form: {
        characterName: "",
        race: "",
        class: "",
        alignment: "",
        gender: "",
        level: "1",
        speed: "30",
        ...blankUser
      },
      editable: false,
      activeScreen: "summary",
      abilityList: [
        "STR",
        { value: "DEX", text: "DEX" },
        { value: "CON", text: "CON" },
        { value: "INT", text: "INT" },
        { value: "WIS", text: "WIS" },
        { value: "CHA", text: "CHA" }
      ],
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false
    };
  },
  created() {
    firebase
      .firestore()
      .collection("characters")
      .doc(this.$props.characterId)
      .onSnapshot(res => {
        let dbData = res.data();
        this.form = dbData;
      });
  },
  methods: {
    summaryClean(item) {
      let cleanItem = { ...item };
      delete cleanItem.name;
      delete cleanItem.value;
      return cleanItem;
    },
    summaryTotalCalc(item, key) {
      let cleanItem = { ...item };
      let total = 0;
      delete cleanItem.name;
      delete cleanItem.value;

      Object.keys(cleanItem).forEach(item => {
        total += parseFloat(cleanItem[item].value);
      });
      if (key == "ac") total += 10;
      return total;
    },
    expCalc(XP) {
      let i = 1;
      let j = 1;

      if (XP == "") return 0;

      let experience = Math.floor(XP / 1000);
      if (experience >= 190) return 20;
      else if (experience >= 171) return 19;
      else if (experience >= 153) return 18;
      else if (experience >= 136) return 17;
      else if (experience >= 120) return 16;
      else if (experience >= 105) return 15;
      else if (experience >= 91) return 14;
      else if (experience >= 78) return 13;
      else if (experience >= 66) return 12;
      else if (experience >= 55) return 11;
      else if (experience >= 45) return 10;
      else if (experience >= 36) return 9;
      else if (experience >= 28) return 8;
      else if (experience >= 21) return 7;
      else if (experience >= 15) return 6;
      else if (experience >= 10) return 5;
      else if (experience >= 6) return 4;
      else if (experience >= 3) return 3;
      else if (experience >= 1) return 2;
      else if (experience <= 0) return 1;
      else return 0;
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    makeEditable() {
      this.editable = !this.editable;
    },
    activateScreen(e) {
      this.activeScreen = e.target.attributes.display.value;
    },
    submitChanges() {
      let { character } = this.form;
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .set({
          ...this.form
        })
        .then(() => {
          this.showAlert();
        })
        .catch(err => {
          console.log(err);
        });
    },
    skillsAbilitiesModifier(item) {
      if (item !== "") {
        let ability = Math.floor(
          (parseInt(
            this.form.abilities.filter(ability => {
              return ability.id === item.toLowerCase();
            })[0].abilityScore
          ) -
            10) /
            2
        );
        return ability;
      } else {
        return 0;
      }
    },
    createWeapon() {
      let randomId = Date.now();
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .set({ ...blankWeapon(randomId) }, { merge: true })
        .catch(err => {
          console.log(err);
        });
    },
    deleteWeapon(e) {
      let indexValue = e.target.attributes.value.value;
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .update({
          [`weapons.${indexValue}`]: firebase.firestore.FieldValue.delete()
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    createArmour() {
      let randomId = Date.now();
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .set({ ...blankArmour(randomId) }, { merge: true })
        .catch(err => {
          console.log(err);
        });
    },
    deleteArmour(e) {
      let indexValue = e.target.attributes.value.value;
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .update({
          [`armours.${indexValue}`]: firebase.firestore.FieldValue.delete()
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    createSpell() {
      let randomId = Date.now();
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .set({ ...blankSpell(randomId) }, { merge: true })
        .catch(err => {
          console.log(err);
        });
    },
    deleteSpell(e) {
      let indexValue = e.target.attributes.value.value;
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .update({
          [`spells.${indexValue}`]: firebase.firestore.FieldValue.delete()
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    createNote() {
      let randomId = Date.now();
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .set({ ...blankNote(randomId) }, { merge: true })
        .catch(err => {
          console.log(err);
        });
    },
    deleteNote(e) {
      let indexValue = e.target.attributes.value.value;
      firebase
        .firestore()
        .collection("characters")
        .doc(this.$props.characterId)
        .update({
          [`other.${indexValue}`]: firebase.firestore.FieldValue.delete()
        })
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  text-align: center;
  color: $black;
  background-color: $white;
}

.list-group {
  cursor: pointer;
  :hover {
    color: $secondary;
    background-color: $primary;
  }
}

.list-group-active {
  color: $highlight !important;
  background-color: $primary;
}

.dataSection {
  overflow-y: scroll;
  background-color: $white;
  max-height: 100%;
  height: 58vh;

  @media (max-width: 576px) {
    font-size: 0.7rem;
    input[type="text"],
    button,
    textarea {
      font-size: 0.7rem;
    }
  }

  * {
    margin: 0;
  }

  .col-12 {
    padding: 0;
  }

  .display,
  .weaponItem {
    display: grid;
  }

  #summaryDisplay {
    .display {
      grid-template-columns: 3fr 2fr 1fr;
    }
  }
  .summarySubGrid {
    grid-column: 1/4;
    grid-gap: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media (max-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  #abilitiesDisplay {
    .display {
      grid-template-columns: 2fr 1fr 1fr;
    }
  }

  #savingThrowsDisplay {
    .display {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }

  #skillsDisplay {
    .display {
      grid-template-columns: 3fr 1fr 2fr 2fr 2fr 2fr;

      .input-clear {
        border: none;
        background-color: inherit;
      }
    }
  }

  #weaponsDisplay {
    .display {
      grid-template-columns: 1fr;
    }
    .itemWeaponDisplay {
      display: grid;
      grid-gap: 1%;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 0.5em;
      border-style: solid;
      border-width: 1px;
      height: 100%;
      .grid-item {
        display: flex;
        flex-direction: column;
        border-style: none;
      }
      .input-clear {
        border: none;
        background-color: inherit;
      }
      .fullGrid {
        grid-column: 1/4;
      }
      @media (max-width: 576px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  #armourDisplay {
    .display {
      grid-template-columns: 1fr;
    }
    .itemArmourDisplay {
      display: grid;
      grid-gap: 1%;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      padding: 0.5em;
      border-style: solid;
      border-width: 1px;
      height: 100%;
      .grid-item {
        display: flex;
        flex-direction: column;
        border-style: none;
      }
      .input-clear {
        border: none;
        background-color: inherit;
      }
      .fullGrid {
        grid-column: 1/6;
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr 1fr;

        .fullGrid {
          grid-column: 1/3;
        }
      }
    }
  }

  #spellsDisplay {
    .display {
      .itemSpellsDisplay {
        display: grid;
        grid-gap: 1%;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
        padding: 0.5em;
        padding-bottom: 1.1em;
        border-style: solid;
        border-width: 1px;
        height: 100%;

        .grid-item {
          display: flex;
          flex-direction: column;
          border-style: none;
        }
        .grid-summary {
          grid-column: 1/7;
        }
        .input-clear {
          border: none;
          background-color: inherit;
        }

        @media (max-width: 576px) {
          grid-template-columns: 1fr 1fr;
          .grid-summary {
            grid-column: 1/3;
          }
        }
      }
    }
  }

  #otherDisplay {
    .display {
      grid-template-columns: 1fr;
    }
    .itemOtherDisplay {
      display: grid;
      grid-gap: 1%;
      grid-template-columns: 5fr 2fr 1fr;
      padding: 0.5em;
      border-style: solid;
      border-width: 1px;
      .grid-item {
        display: flex;
        flex-direction: column;
        border-style: none;
      }
    }
    input {
      border: none;
      background-color: inherit;
    }
    .grid-summary {
      grid-column: 1/4;
    }
  }

  .addBar {
    display: grid;
    grid-template-columns: 1fr;
  }

  .noGrid {
    display: contents;
  }

  .grid-head {
    padding: 0.375rem 0.75rem;
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-width: 1px;
  }

  .collapsing {
    transition: none;
    display: none;
  }
}

.notesArea {
  font-family: monospace;
}

.ddItem::after {
  display: none;
}
</style>
