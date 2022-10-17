import { v4 as uuidv4 } from 'uuid'
import { isValidBody, badRequest, sendJSON } from '../helpers'

export default function (apis) {
  return async (req, res) => {
    if (req.method === 'POST' && isValidBody(req)) {
      await createHome(req.identity, req.body, res)
    }
    return badRequest(res)
  }
  async function createHome(identity, body, res) {
    const homeId = uuidv4()
    const payload = {
      ...body,
      reviewCount: 0,
      reviewValue: 0,
      userId: identity.id,
    }
    const response = await apis.homes.create(homeId, payload)

    if (!response.ok) {
      res.statusCode = 500
      res.send()
      return
    }
    sendJSON({}, res)
  }
}
