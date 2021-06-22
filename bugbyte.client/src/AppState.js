import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  bugs: [],
  activeBug: {},
  notes: [],
  sorted: true,
  editing: false,
  user: {},
  account: {}
})
