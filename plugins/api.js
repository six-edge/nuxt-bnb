export default function (ctx, inject) {
  const appId = '2O2U5PFAF4'
  const apiKey = 'a43ac5ab2def1bf127fac12638e467ac'

  inject('api', { getHome })

  /**
   * Get Home by ID
   *
   * Optional fetch options: ?attributes=email,name
   * @param {number} id
   */
  async function getHome(id) {
    const response = await fetch(
      `https://${appId}-dsn.algolia.net/1/indexes/homes/${id}`,
      {
        headers: {
          'X-Algolia-API-Key': apiKey,
          'X-Algolia-Application-Id': appId,
        },
      }
    )
    return await response.json()
  }
}
