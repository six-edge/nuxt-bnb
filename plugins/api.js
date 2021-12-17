export default function (ctx, inject) {
  const appId = '2O2U5PFAF4'
  const apiKey = 'a43ac5ab2def1bf127fac12638e467ac'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('api', { getHome })

  /**
   * Get Home by ID
   *
   * Optional fetch options: ?attributes=email,name
   * @param {number} id
   */
  async function getHome(id) {
    try {
      return unwrap(
        await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${id}`, {
          headers,
        })
      )
    } catch (err) {
      return getErrorResponse(err)
    }
  }

  async function unwrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
