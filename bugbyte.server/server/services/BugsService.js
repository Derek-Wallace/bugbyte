import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async deleteNote(id) {
    const foundNote = await dbContext.Notes.findById(id)
    if (foundNote.bug.closed === true) {
      throw new BadRequest('Not Permitted')
    }
    const note = await dbContext.Notes.findByIdAndRemove(id)
    return note
  }

  async close(id, body) {
    body.closed = true
    const bug = await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return bug
  }

  async editNote(id, body) {
    const foundNote = await dbContext.Bugs.findById(body.bug.id)
    if (foundNote.bug.closed === true) {
      throw new BadRequest('Not Permitted')
    }
    delete body.bug.closed
    const note = await dbContext.Notes.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return note
  }

  async editBug(id, body) {
    const foundBug = await dbContext.Bugs.findById(id)
    if (foundBug.closed === true) {
      throw new BadRequest('Not Permitted')
    }
    delete body.closed
    const bug = await dbContext.Bugs.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    return bug
  }

  async createNote(body) {
    const note = await dbContext.Notes.create(body)
    await note.populate('creator', 'name picture').execPopulate()
    return note
  }

  async createBug(body) {
    const bug = await dbContext.Bugs.create(body)
    await bug.populate('creator', 'name picture').execPopulate()
    return bug
  }

  async getNotes(id) {
    const bug = await dbContext.Bugs.findById(id)
    const notes = await dbContext.Notes.find({ bug: bug })
    return notes
  }

  async getBug(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture')
    return bug
  }

  async getBugs() {
    const bugs = await dbContext.Bugs.find().populate('creator', 'name picture')
    return bugs
  }
}

export const bugsService = new BugsService()
