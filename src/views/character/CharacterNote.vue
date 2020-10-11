<template>
  <span>
    <b-container fluid class="mb-4">
      <b-row>
        <b-col cols="12" lg="2">
          <EditSave
            :editable="editable"
            :form="{ data: noteSection, route: '/api/character/notes' }"
            :character-id="characterId"
            @make-editable="makeEditable"
            @refresh="refresh"
          />
        </b-col>
        <b-col cols="12" lg="2" class="d-flex">
          <b-button
            class="d-block m-auto px-4"
            :variant="editable ? 'success' : 'outline-primary'"
            @click="addNoteSection"
            >Add Section</b-button
          >
        </b-col>
        <b-col cols="12" lg="8"></b-col>
      </b-row>
      <b-row class="my-4">
        <b-col v-if="!noteSection.length" cols="12" class="mt-5">
          <h1 class="mx-auto mt-5">Add a section!</h1>
        </b-col>
        <b-col v-else cols="12" md="3" lg="2" class="mb-5">
          <b-list-group
            v-for="(section, sectionIndex) in noteSection"
            :key="sectionIndex"
          >
            <b-list-group-item v-b-toggle="'collapse-' + sectionIndex" class="lead">
              {{ section.name }}
            </b-list-group-item>
            <b-collapse
              :id="'collapse-' + sectionIndex"
              accordion="note-section"
              :visible="sectionIndex == 0"
            >
              <span
                v-for="(note, noteIndex) in noteSection[sectionIndex].note"
                :key="noteIndex"
              >
                <b-list-group-item
                  @click="showNote(sectionIndex, noteIndex)"
                  class="sublist-item"
                  :class="
                    sectionIndex == activeNote.sectionIndex &&
                    noteIndex == activeNote.noteIndex
                      ? 'active'
                      : null
                  "
                >
                  {{ note.name }}
                </b-list-group-item>
              </span>
              <b-list-group-item
                @click="addNote(section.id)"
                class="sublist-item"
                :class="
                  editable || !noteSection[sectionIndex].note.length
                    ? 'd-block'
                    : 'd-none'
                "
              >
                <b-button variant="success">Add Note</b-button>
              </b-list-group-item>
            </b-collapse>
          </b-list-group>
        </b-col>
        <b-col cols="12" md="9" lg="10" v-if="noteSection.length">
          <b-row>
            <b-col cols="12">
              <b-row class="mb-4">
                <b-col cols="12" md="12" lg="6" class="align-items-left">
                  <b-row>
                    <b-col cols="12" md="10" class="d-inline-flex">
                      <b-form-group label="Reorder">
                        <b-button-group vertical class="d-inline-flex my-auto">
                          <b-button
                            class="px-2 py-0"
                            @click="move(activeNote.sectionIndex, -1, false)"
                            variant="light"
                            :disabled="!editable"
                          >
                            <font-awesome-icon icon="caret-up" />
                          </b-button>
                          <b-button
                            class="px-2 py-0"
                            @click="move(activeNote.sectionIndex, 1, false)"
                            variant="light"
                            :disabled="!editable"
                          >
                            <font-awesome-icon icon="caret-down" />
                          </b-button>
                        </b-button-group>
                      </b-form-group>
                      <b-form-group label="Note Section Name">
                        <b-input
                          v-model="noteSection[activeNote.sectionIndex].name"
                          class="d-inline-block align-middle bg-light name-inputs"
                        />
                      </b-form-group>
                    </b-col>
                    <b-col cols="12" md="2">
                      <b-form-group label="Delete Section">
                        <b-button
                          variant="danger"
                          class="w-100 mb-5"
                          @click="
                            deleteNote(noteSection[activeNote.sectionIndex].id, 'section')
                          "
                          :disabled="!editable"
                          >X</b-button
                        >
                      </b-form-group>
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" md="12" lg="6" class="align-items-center">
                  <b-row
                    ><b-col cols="12" md="10" class="d-inline-flex">
                      <b-form-group label="Reorder">
                        <b-button-group vertical class="d-inline-flex">
                          <b-button
                            class="px-2 py-0"
                            @click="
                              move(
                                activeNote.sectionIndex,
                                -1,
                                true,
                                activeNote.noteIndex
                              )
                            "
                            variant="light"
                            :disabled="!editable"
                          >
                            <font-awesome-icon icon="caret-up" />
                          </b-button>
                          <b-button
                            class="px-2 py-0"
                            @click="
                              move(activeNote.sectionIndex, 1, true, activeNote.noteIndex)
                            "
                            variant="light"
                            :disabled="!editable"
                          >
                            <font-awesome-icon icon="caret-down" />
                          </b-button>
                        </b-button-group>
                      </b-form-group>
                      <b-form-group label="Note Name">
                        <b-input
                          v-model="
                            noteSection[activeNote.sectionIndex].note[
                              activeNote.noteIndex
                            ].name
                          "
                          class="d-inline-block align-middle mx-1 my-0 bg-light name-inputs"
                        /> </b-form-group></b-col
                    ><b-col cols="12" md="2">
                      <b-form-group label="Delete Note">
                        <b-button
                          variant="danger"
                          class="w-100 mb-3"
                          @click="
                            deleteNote(
                              noteSection[activeNote.sectionIndex].note[
                                activeNote.noteIndex
                              ].id,
                              'note'
                            )
                          "
                          :disabled="!editable"
                          >X</b-button
                        ></b-form-group
                      ></b-col
                    ></b-row
                  >
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-form-textarea
                    v-model="
                      noteSection[activeNote.sectionIndex].note[activeNote.noteIndex]
                        .summary
                    "
                    rows="12"
                    :disabled="!editable"
                  ></b-form-textarea>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
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
    noteSection: {
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
    return {
      activeNote: {
        sectionIndex: 0,
        noteIndex: 0,
      },
    };
  },
  computed: {
    // map `this.env` to `this.$store.getters.env`
    ...mapGetters({
      user: 'user',
      env: 'env',
    }),
  },
  created() {},
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
    showNote(sectionIndex, noteIndex) {
      this.activeNote.sectionIndex = sectionIndex;
      this.activeNote.noteIndex = noteIndex;
    },
    addNote(section_id) {
      if (!this.$props.editable) return;
      axios
        .post(
          `${this.env}/api/character/notes/note`,
          {
            withCredentials: true,
            character_id: this.$props.characterId,
            section_id: section_id,
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
    addNoteSection() {
      if (!this.$props.editable) return;
      axios
        .post(
          `${this.env}/api/character/notes/section`,
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
    move(sectionIndex, move, secondMove, noteIndex) {
      if (!this.$props.editable) return;
      let section_array = [...this.noteSection];
      if (secondMove) {
        section_array[sectionIndex].note = arrayMove(
          section_array[sectionIndex].note,
          noteIndex,
          noteIndex + move
        );
        section_array[sectionIndex].note.forEach((note, noteIndex) => {
          note.order = noteIndex + 2;
        });
      } else {
        section_array = arrayMove(section_array, sectionIndex, sectionIndex + move);
        section_array.forEach((section, section_index) => {
          section.order = section_index + 2;
        });
      }
      this.$emit('move', { array: section_array, place: 'note_section' });
    },
    deleteNote(id, route) {
      if (!this.$props.editable || !confirm('This is permanent, are you sure?')) return;
      axios({
        url: `${this.env}/api/character/notes/${route}`,
        method: 'delete',
        data: {
          withCredentials: true,
          id: id,
          character_id: this.$props.characterId,
        },
        headers: { Authorization: `Bearer ${this.user.access_token}` },
      })
        .then(res => {
          this.refresh();
          if (route == 'section') {
            this.activeNote.sectionIndex = 0;
          } else if (route == 'note') {
            this.activeNote.noteIndex = 0;
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.sublist-item {
  color: $background;
  background-color: lighten(lightgray, 10%);
  cursor: pointer;

  &.active {
    background-color: $primary;
    color: $highlight;
  }
}
</style>
