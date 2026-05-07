import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LoggerMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log("ricevo una chiamata da ", request.ip())

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}