// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  /**
   * Connecter un utilisateur
   */
  public async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return response.ok({
      token,
      ...user.serialize(),
    })
  }

  /**
   * Enregistrer un nouvel utilisateur
   */
  public async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = await User.create(payload)
    return response.created({ user })
  }

  /**
   * Déconnecter un utilisateur
   */
  public async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const token = auth.user?.currentAccessToken.identifier

    if (!token) {
      return response.badRequest({ error: 'Token not found' })
    }
    await User.accessTokens.delete(user, token)
    return response.ok({ message: 'User logged out' })
  }

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  public async me({ auth, response }: HttpContext) {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  }
}
