import fetch from 'node-fetch'
import { getErrorResponse, unwrap } from '../../../utils/fetchUtils'

export default function ({ basePath, headers }) {
  return {
    async create(userId, payload) {
      try {
        return unwrap(
          await fetch(`${basePath}/1/indexes/users/${userId}`, {
            headers,
            method: 'PUT',
            body: JSON.stringify(payload),
          })
        )
      } catch (err) {
        const errorResponse = getErrorResponse(err)
        console.log(errorResponse)
        return errorResponse
      }
    },
    async getById(userId) {
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
    },
  }
}
