import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getNotes(id) {
    const res = await api.get(`api/bugs/${id}/notes`)
    AppState.notes = res.data
  }

  async createNote(body) {
    const res = await api.post('api/notes', body)
    AppState.notes.push(res.data)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    AppState.notes = AppState.notes.filter(n => n.id !== id)
  }
}
export const notesService = new NotesService()
