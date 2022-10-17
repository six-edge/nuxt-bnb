import bodyParser from 'body-parser'
import userRouter from './routers/user'
import homesRouter from './routers/homes'
import getApis from './apis'
import { getOptions } from './helpers'

export default function () {
  const { options, nuxt } = this
  const algoliaConfig = getOptions(options.privateRuntimeConfig.algolia)
  const apis = getApis(algoliaConfig)

  nuxt.hook('render:setupMiddleware', (app) => {
    app.use(bodyParser.json())
    app.use('/api/user', userRouter(apis))
    app.use('/api/homes', homesRouter(apis))
  })
}
