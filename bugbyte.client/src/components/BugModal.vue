<template>
  <div class="modal fade" id="bugModal" tabindex="-1" aria-labelledby="Bug Form" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Create Bug
          </h5>
          <button type="button" class="close" title="Close Form" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createBug">
            <label for="Title" class="sr-only">Title</label>
            <input required
                   type="text"
                   maxlength="40"
                   v-model="state.bugData.title"
                   class="w-100 border-left-0 border-right-0 border-top-0 my-3"
                   placeholder="Bug Title"
            >
            <label for="Description" class="sr-only">Description</label>
            <input required type="text" v-model="state.bugData.description" class="w-100 border-left-0 border-right-0 border-top-0 my-3" placeholder="Bug Description">
            <button type="button" class="btn btn-outline-danger mr-3" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-success">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import $ from 'jquery'
import { useRouter } from 'vue-router'
import { AppState } from '../AppState'
export default {
  setup() {
    const state = reactive({
      bugData: {}
    })
    const router = useRouter()
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.bugData)
          state.bugData = {}
          $('#bugModal').modal('hide')
          router.push('/bug/' + AppState.activeBug.id)
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
