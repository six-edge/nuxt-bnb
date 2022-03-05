import { sendJSON } from '../helpers'

export default function (apis) {
  return async function getUserRoute({ identity }, res, next) {
    const userId = identity.id
    const userData = await apis.user.getById(userId)
    if (userData.status === 200) {
      sendJSON(userData.json, res)
      return
    }
    const payload = makeUserPayload(identity)
    await apis.user.create(userId, payload)
    sendJSON(payload, res)
  }

  function makeUserPayload(identity) {
    return {
      name: identity.name,
      email: identity.email,
      image: identity.image,
      homeId: [],
      reviewCount: 0,
      description: '',
      joined: new Date().toISOString(),
    }
  }
}
