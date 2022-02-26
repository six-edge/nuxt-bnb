import fetch from 'node-fetch'
import { getErrorResponse, unwrap } from '../utils/fetchUtils'

export default function () {
  const { options, nuxt } = this
  const { appId, apiKey } = options.privateRuntimeConfig.algolia
  const basePath = `https://${appId}-dsn.algolia.net`
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  nuxt.hook('render:setupMiddleware', (app) => {
    app.use('/api/user', getUserRoute)
  })

  async function getUserRoute({ identity }, res, next) {
    const userData = await getUserById(identity.id)
    if (userData.status === 200) {
      sendJSON(userData.json, res)
      return
    }
    createUser(identity)
    sendJSON(makeUserPayload(identity), res)
  }

  async function getUserById(userId) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/users/${userId}`, {
          headers,
        })
      )
    } catch (err) {
      const errorResponse = getErrorResponse(err)
      console.log(errorResponse)
      return errorResponse
    }
  }

  function sendJSON(data, res) {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
  }

  async function createUser(identity) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/users/${identity.id}`, {
          headers,
          method: 'PUT',
          body: JSON.stringify(makeUserPayload(identity)),
        })
      )
    } catch (err) {
      const errorResponse = getErrorResponse(err)
      console.log(errorResponse)
      return errorResponse
    }
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
