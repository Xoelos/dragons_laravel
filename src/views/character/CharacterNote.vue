<template>
  <span>
    <b-row>
      <b-col cols="12" md="10">
        <EditSave
          :editable="editable"
          :form="{ data: noteSection, route: '/api/character/notes' }"
          :character-id="characterId"
          @make-editable="makeEditable"
          @refresh="refresh"
        />
      </b-col>
      <b-col cols="6" offset="3" md="2" offset-md="0" class="my-2">
        <b-button
          class="d-block m-auto px-4"
          :variant="editable ? 'success' : 'outline-primary'"
          @click="addNoteSection"
          >Add Section</b-button
        >
      </b-col>
    </b-row>
    <div class="display mt-3">
      <b-row class="mb-5">
        <b-col v-if="!noteSection.length" cols="12" class="mt-5">
          <h1 class="mx-auto mt-5">Add a section!</h1>
        </b-col>
        <b-col v-else cols="12" md="3" class="mb-5">
          <b-list-group
            v-for="(section, sectionIndex) in noteSection"
            :key="sectionIndex"
          >
            <b-list-group-item v-b-toggle="'collapse-' + sectionIndex">
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
                <b-button>Add Note</b-button>
              </b-list-group-item>
            </b-collapse>
          </b-list-group>
        </b-col>
        <b-col cols="12" md="9" v-if="noteSection.length">
          <b-row>
            <b-col cols="12">
              <b-row class="mb-4">
                <b-col cols="12" class="align-items-center d-flex">
                  <b-input
                    v-model="noteSection[activeNote.sectionIndex].name"
                    class="d-inline-block align-middle mx-1 my-0 bg-light name-inputs"
                  />

                  <b-button-group vertical class="d-inline-flex">
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
                  <b-button
                    variant="danger"
                    @click="
                      deleteNote(noteSection[activeNote.sectionIndex].id, 'section')
                    "
                    class="ml-auto mr-0"
                    :disabled="!editable"
                    >X</b-button
                  >
                  <hr class="d-none d-md-block" />
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12" md="4">
                  <b-row>
                    <b-col cols="12" class="align-items-center d-flex">
                      <b-input
                        v-model="
                          noteSection[activeNote.sectionIndex].note[activeNote.noteIndex]
                            .name
                        "
                        class="d-inline-block align-middle mx-1 my-0 bg-light name-inputs"
                      />

                      <b-button-group vertical class="d-inline-flex">
                        <b-button
                          class="px-2 py-0"
                          @click="
                            move(activeNote.sectionIndex, -1, true, activeNote.noteIndex)
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
                      <b-button
                        variant="danger"
                        @click="
                          deleteNote(
                            noteSection[activeNote.sectionIndex].note[
                              activeNote.noteIndex
                            ].id,
                            'note'
                          )
                        "
                        class="ml-auto mr-0"
                        :disabled="!editable"
                        >X</b-button
                      >
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="12" md="8">
                  <b-form-textarea
                    v-model="
                      noteSection[activeNote.sectionIndex].note[activeNote.noteIndex]
                        .summary
                    "
                    rows="8"
                    :disabled="!editable"
                  ></b-form-textarea
                ></b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
          console.log(res);
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
          console.log(res);
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
      console.log(id);
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
          console.log(res);
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
.display {
  width: 100%;
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

  .name-inputs {
    font-size: 1.4rem;
    text-align: center;
    width: auto;
    border: 0;
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

  .sublist-item {
    color: $background;
    background-color: lighten(lightgray, 10%);
    cursor: pointer;

    &.active {
      color: $secondary;
    }
  }
}
</style>
