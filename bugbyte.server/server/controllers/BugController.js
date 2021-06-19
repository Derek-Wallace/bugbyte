import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import BaseController from '../utils/BaseController'

export class BugController extends BaseController {
  constructor() {
    super('api')
    this.router
      .get('/bugs', this.getBugs)
      .get('/bugs/:id', this.getBug)
      .get('/bugs/:id/notes', this.getNotes)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/bugs', this.createBug)
      .post('/notes', this.createNote)
      .put('/bugs/:id', this.editBug)
      .put('/notes/:id', this.editNote)
      .delete('/bugs/:id', this.close)
      .delete('/notes/:id', this.deleteNote)
  }

  async getBugs(req, res, next) {
    try {
      const bugs = await bugsService.getBugs()
      return res.send(bugs)
    } catch (error) {
      next(error)
    }
  }

  async getBug(req, res, next) {
    try {
      const bug = await bugsService.getBug(req.params.id)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const notes = await bugsService.getNotes(req.params.id)
      return res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async createBug(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const bug = await bugsService.createBug(req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async createNote(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await bugsService.createNote(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async editBug(req, res, next) {
    try {
      const bug = await bugsService.editBug(req.params.id, req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async editNote(req, res, next) {
    try {
      const note = await bugsService.editNote(req.params.id, req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async close(req, res, next) {
    try {
      const bug = await bugsService.close(req.params.id, req.body)
      return res.send(bug)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await bugsService.deleteNote(req.params.id)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
