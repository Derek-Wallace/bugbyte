import { AppState } from '../AppState'
import { api } from './AxiosService'

class BugsService {
  async getBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
    AppState.bugs.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
  }

  async getBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async closeBug(id, body) {
    const res = await api.delete('api/bugs/' + id, body)
    AppState.activeBug = res.data
  }

  async createBug(body) {
    const res = await api.post('api/bugs', body)
    AppState.bugs.push(res.data)
    AppState.bugs.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
    AppState.activeBug = res.data
  }

  async editBug(id, body) {
    const res = await api.put('api/bugs/' + id, body)
    AppState.activeBug = res.data
  }
}
export const bugsService = new BugsService()
