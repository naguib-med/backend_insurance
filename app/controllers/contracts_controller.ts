// import type { HttpContext } from '@adonisjs/core/http'

import Contract from '#models/contract'
import { HttpContext } from '@adonisjs/core/http'

export default class ContractsController {
  /**
   * Get all contracts
   */
  public async index({ response }: HttpContext) {
    const contracts = await Contract.all()
    return response.ok(contracts)
  }

  /**
   * Get a contract by its ID
   */
  public async show({ params, response }: HttpContext) {
    try {
      const contract = await Contract.findOrFail(params.id)
      return response.ok(contract)
    } catch (error) {
      return response.notFound({ message: 'Contract not found' })
    }
  }

  /**
   * Create a new contract
   */
  public async store({ request, response }: HttpContext) {
    const payload = request.only(['title', 'description', 'price', 'coverage'])
    const contract = await Contract.create(payload)
    return response.created(contract)
  }

  /**
   * Update a contract by its ID
   */
  public async update({ params, request, response }: HttpContext) {
    try {
      const contract = await Contract.findOrFail(params.id)
      const data = request.only(['name', 'description', 'price', 'coverage'])
      contract.merge(data)
      await contract.save()
      return response.ok(contract)
    } catch (error) {
      return response.notFound({ message: 'Contract not found' })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const contract = await Contract.findOrFail(params.id)
      await contract.delete()
      return response.noContent()
    } catch (error) {
      return response.notFound({ message: 'Contract not found' })
    }
  }
}
