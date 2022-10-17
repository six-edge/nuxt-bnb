import { v4 as uuid } from 'uuid'
import { isValidBody, badRequest, sendJSON } from '../helpers'

export default function (apis) {
  return async (req, res) => {
    if (req.method === 'POST' && isValidBody(req)) {
      await createHome(req.identity, req.body, res)
    }
    return badRequest(res)
  }
  async function createHome(identity, body, res) {
    const homeId = uuid()
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    }
    const response = await apis.homes.create(homeId, payload)

    if (!response.ok) {
      res.statusCode = 500
      res.end()
      return
    }
    sendJSON({}, res)
  }
}
