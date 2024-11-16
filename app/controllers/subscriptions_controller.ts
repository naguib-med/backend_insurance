// import type { HttpContext } from '@adonisjs/core/http'

import { HttpContext } from '@adonisjs/core/http'
import Subscription from '#models/subscription'

export default class SubscriptionsController {
  /**
   * Get all subscriptions for the authenticated user
   */
  public async index({ auth, response }: HttpContext) {
    const subscriptions = await auth.user!.related('contracts').query()
    return response.ok(subscriptions)
  }

  /**
   * Subscribe to a contract
   */
  public async store({ auth, request, response }: HttpContext) {
    const user = auth.user!
    const { contractId } = request.only(['contractId'])

    const existingSubscription = await Subscription.query()
      .where('user_id', user.id)
      .where('contract_id', contractId)
      .first()

    if (existingSubscription) {
      return response.badRequest({ message: 'User already subscribed to this contract' })
    }

    const subscription = await Subscription.create({
      userId: user.id,
      contractId,
    })

    return response.created({ subscription, message: 'Subscription created successfully' })
  }

  /**
   * Unsubscribe from a contract
   */
  public async destroy({ auth, params, response }: HttpContext) {
    const user = auth.user!
    const subscription = await Subscription.query()
      .where('user_id', user.id)
      .where('contract_id', params.id)
      .first()

    if (!subscription) {
      return response.notFound({ message: 'Subscription not found' })
    }

    await subscription.delete()
    return response.noContent()
  }
}
