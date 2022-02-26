import { getErrorResponse, unwrap } from '~/utils/fetchUtils'

export default function ({ $config }, inject) {
  const appId = $config.algolia.appId
  const apiKey = $config.algolia.apiKey
  const basePath = `https://${appId}-dsn.algolia.net`
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('api', {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId,
    getHomeByLocation,
  })

  /**
   * Get Home by ID
   *
   * Optional fetch options: ?attributes=email,name
   * @param {number} id
   */
  async function getHome(id) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/homes/${id}`, {
          headers,
        })
      )
    } catch (err) {
      return getErrorResponse(err)
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/reviews/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            hitsPerPage: 6,
            attributesToHighlight: [],
          }),
        })
      )
    } catch (err) {
      return getErrorResponse(err)
    }
  }

  async function getUserByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/users/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            filters: `homeId:${homeId}`,
            attributesToHighlight: [],
          }),
        })
      )
    } catch (err) {
      return getErrorResponse(err)
    }
  }

  async function getHomeByLocation(lat, lng, radiusInMeters = 1500) {
    try {
      return unwrap(
        await fetch(`${basePath}/1/indexes/homes/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify({
            aroundLatLng: `${lat},${lng}`,
            aroundRadius: radiusInMeters,
            hitsPerPage: 10,
            attributesToHighlight: [],
          }),
        })
      )
    } catch (err) {
      return getErrorResponse(err)
    }
  }
}
