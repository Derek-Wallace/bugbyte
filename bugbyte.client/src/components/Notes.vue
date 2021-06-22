<template>
  <div class="col-lg-9 mx-auto border bg-light py-2 my-1">
    <div class="row">
      <div class="col-lg-2 d-flex">
        <img class="rounded-circle" height="30" alt="Creator Picture" :src="note.creator.picture">
        <p class="pt-1 ml-2 text-muted">
          {{ note.creator.name }}
        </p>
      </div>
    </div>
    <div class="row">
      <div class="col-11 m-auto d-flex justify-content-between">
        <p class="">
          {{ note.body }}
        </p>
        <div v-if="note.creatorId === account.id && activeBug.closed === false" role="button" title="Delete Note" @click="deleteNote(note.id)" class="mdi mdi-trash-can"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
import { AppState } from '../AppState'
export default {
  props: { note: { type: Object, required: true } },
  setup() {
    return {
      account: computed(() => AppState.account),
      activeBug: computed(() => AppState.activeBug),
      async deleteNote(id) {
        try {
          if (await Notification.confirmAction()) { await notesService.deleteNote(id) }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
