import fetch from 'node-fetch'
import { getErrorResponse, unwrap } from '../../../utils/fetchUtils'

export default function ({ basePath, headers }) {
  return {
    async create(homeId, payload) {
      try {
        return unwrap(
          await fetch(`${basePath}/1/indexes/homes/${homeId}`, {
            headers,
            method: 'POST',
            body: JSON.stringify(payload),
          })
        )
      } catch (err) {
        const errorResponse = getErrorResponse(err)
        console.log(errorResponse)
        return errorResponse
      }
    },
  }
}
