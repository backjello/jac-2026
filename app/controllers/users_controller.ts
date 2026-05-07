import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) {
    return await User.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    // leggo l'input fullname
    const fullName = request.input('fullName', 'Nome non indicato')
    const email = request.input('email')
    const password = request.input('password')

    console.log(fullName, email, password)
  }

  /**
   * Show individual record
   */
  // users/:id
  async show({ params, response }: HttpContext) {
    const id = params.id
    const user = await User.find(id)
    if (!user) {
      return response.status(404).send("l'utente non esiste")
    }
    return user
  }

  async me({ auth }: HttpContext) {
    const user = auth.user
    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  // users/:id (metodo DELETE)
  async destroy({ params }: HttpContext) {
    const id = params.id
    const user = await User.findOrFail(id)
    await user.delete()
    return
  }
}