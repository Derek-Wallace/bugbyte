<template>
  <div role="button" @click="toggleBug(bug.id)" class="row m-2 bg-light shadow bug border">
    <div class="col-lg-6">
      <p class="m-3">
        {{ bug.title }}
      </p>
    </div>
    <div class="col-lg-3">
      <p class="my-3">
        {{ bug.creator.name }}
      </p>
    </div>
    <div v-if="bug.closed === false" class="col-lg-1">
      <p class="text-success my-3">
        <b>Open</b>
      </p>
    </div>
    <div v-if="bug.closed === true" class="col-lg-1">
      <p class="text-danger my-3">
        <b>Closed</b>
      </p>
    </div>
    <div class="col-2">
      <p class="my-3">
        {{ new Date(bug.updatedAt).toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
  props: { bug: { type: Object, required: true } },
  setup() {
    const router = useRouter()
    return {
      toggleBug(id) {
        router.push('/bug/' + id)
      }
    }
  }
}
</script>

<style>
.bug:hover {
transform: scale(1.011);
}

</style>
