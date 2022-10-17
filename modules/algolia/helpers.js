/**
 * Return a new options object with headers and basePath
 * @param appId
 * @param apiKey
 * @return {{headers: {'X-Algolia-API-Key', 'X-Algolia-Application-Id'}, apiKey, basePath: string, appId}}
 */
export function getOptions({ appId, apiKey }) {
  return {
    appId,
    apiKey,
    basePath: getBasePath(appId),
    headers: getHeaders(appId, apiKey),
  }
}

/**
 * Get base path for all algolia requests
 * @param appId
 * @return {string}
 */
export function getBasePath(appId) {
  return `https://${appId}-dsn.algolia.net`
}

/**
 * Get headers for all algolia requests
 * @param appId
 * @param apiKey
 * @return {{'X-Algolia-API-Key', 'X-Algolia-Application-Id'}}
 */
export function getHeaders(appId, apiKey) {
  return {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }
}

/**
 * Send JSON response
 * @param data
 * @param res
 */
export function sendJSON(data, res) {
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

/**
 * Send HTTP 400 Bad Request response
 * @param res
 */
export function badRequest(res) {
  res.status(400).end()
}

/**
 * Send HTTP 400 Bad Request response
 * @param req
 */
export function isValidBody(req) {
  return req.body && Object.keys(req.body).length > 0
}
