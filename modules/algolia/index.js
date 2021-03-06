import bodyParser from 'body-parser'
import userRouter from './routers/user'
import getApis from './apis'
import { getOptions } from './helpers'

export default function () {
  const { options, nuxt } = this
  const algoliaConfig = getOptions(options.privateRuntimeConfig.algolia)
  const apis = getApis(algoliaConfig)

  nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.urlencoded())
    app.use('/api/user', userRouter(apis))
  })
}
