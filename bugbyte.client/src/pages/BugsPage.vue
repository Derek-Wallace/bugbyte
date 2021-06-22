<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 text-center">
        <div class="display-2 my-2 text-white word-outline">
          <b>Bugs</b>
        </div>
      </div>
    </div>
    <div class="row my-4">
      <div class="col-lg-10 m-auto border bg-white">
        <div class="row mt-3 border-bottom">
          <div class="col-lg-6 col-3">
            <p class="ml-5">
              <b>Bug Title</b>
            </p>
          </div>
          <div class="col-3">
            <p><b>Creator</b></p>
          </div>
          <div class="col-lg-1 col-2 pl-0 d-flex">
            <p><b>Status</b></p>
            <p role="button" @click="sort" title="Sort by open or closed" class="mdi mdi-arrow-down-bold"></p>
          </div>
          <div class="col-2">
            <p><b>Last updated</b></p>
          </div>
        </div>
        <Bugs v-for="bug in bugs" :key="bug.id" :bug="bug" />
      </div>
    </div>
  </div>
  <BugModal />
  <button v-if="user.isAuthenticated" data-toggle="modal" data-target="#bugModal" class="btn btn-primary text-dark fab rounded-pill p-3">
    <b>Create Bug</b>
  </button>
</template>

<script>
import { computed, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  setup() {
    watchEffect(async() => {
      await bugsService.getBugs()
    })
    return {
      bugs: computed(() => AppState.bugs),
      user: computed(() => AppState.user),
      sort() {
        if (AppState.sorted === true) {
          AppState.bugs.sort((a, b) => (a.closed > b.closed) ? 1 : -1)
          AppState.sorted = false
        } else {
          AppState.bugs.sort((a, b) => (a.closed < b.closed) ? 1 : -1)
          AppState.sorted = true
        }
      }
    }
  }
}
</script>

<style>
.fab{
  position: fixed;
  bottom: 3rem;
  right: 3rem;
  z-index: 9
}
.word-outline {
  -webkit-text-stroke: 2px black;
}
</style>
