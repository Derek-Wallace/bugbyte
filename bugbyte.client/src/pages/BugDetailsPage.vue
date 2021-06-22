<template>
  <div v-if="bug.id" class="container-fluid">
    <div class="row my-5">
      <div class="col-lg-10 m-auto bg-opaque py-5">
        <div class="row">
          <div class="col-lg-8 m-auto d-flex justify-content-between align-items-center">
            <h1 class="my-4">
              {{ bug.title }}
            </h1>
            <button v-if="bug.creatorId === account.id" class="btn btn-danger h-50" @click="closeBug(bug.id)">
              Close bug
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-8 m-auto d-flex flex-inline">
            <img :src="bug.creator.picture" alt="Creator Picture" height="40" class="rounded-circle">
            <p class="pt-2 ml-2">
              {{ bug.creator.name }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 m-auto d-flex justify-content-between">
            <p v-if="bug.closed === false" class="p-2 bg-success rounded-pill text-center">
              <b>Open</b>
            </p>
            <p v-if="bug.closed === true" class="p-2 bg-danger rounded-pill text-center">
              <b>Closed</b>
            </p>
            <p>
              {{ new Date(bug.updatedAt).toLocaleString() }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 m-auto">
            <div class="row">
              <div class="col-lg-8 m-auto bg-light pt-2 border d-flex justify-content-between align-items-center">
                <p v-if="editing === false">
                  {{ bug.description }}
                </p>
                <textarea v-if="editing === true" v-model="state.bugEdit.description" cols="65" rows="5" class="mb-2"></textarea>
                <button v-if="editing === true" class="btn btn-success h-5 h-50 mx-2" @click="editBug(bug.id)">
                  Accept Edit
                </button>
                <div role="button" v-if="bug.creatorId === account.id && bug.closed === false" title="Edit bug description" @click="toggleEdit" class="mdi mdi-pencil-plus"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-lg-7 m-auto">
            <h2>Notes:</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 m-auto">
            <div class="row border p-3 bg-white">
              <Notes v-for="note in notes" :key="note.id" :note="note" />
            </div>
          </div>
        </div>
        <div class="row mb-5" v-if="bug.closed === false">
          <div class="col-lg-8 m-auto d-flex justify-content-center">
            <form @submit.prevent="createNote" class="d-flex w-75 mt-5">
              <label for="note" class="sr-only">Note</label>
              <input required type="text" placeholder="Note" v-model="state.newNote.body" class=" mr-5 w-100 border-right-0 border-left-0 border-top-0 bg-transparent">
              <button type="submit" class="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onUnmounted, reactive, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import Notification from '../utils/Notification'
export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: { bug: route.params.id },
      bugEdit: { description: AppState.activeBug.description }
    })
    watchEffect(async() => {
      try {
        if (route.params.id) {
          await bugsService.getBug(route.params.id)
          await notesService.getNotes(route.params.id)
        }
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    onUnmounted(() => {
      AppState.editing = false
      AppState.activeBug = {}
    })
    return {
      state,
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      editing: computed(() => AppState.editing),
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
          state.newNote = { bug: AppState.activeBug.id }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async closeBug(id) {
        try {
          if (await Notification.confirmAction('Close this bug?', 'This bug will be closed and you will not be able to edit it anymore, are you sure?', 'warning', 'Yes, Close it')) { await bugsService.closeBug(id, AppState.activeBug) }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      toggleEdit() {
        if (AppState.editing === true) {
          AppState.editing = false
        } else { AppState.editing = true }
      },
      async editBug() {
        try {
          await bugsService.editBug(route.params.id, state.bugEdit)
          AppState.editing = false
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>
.bg-opaque {
  background-color: rgba(215, 255, 255, 0.596);
}
</style>
