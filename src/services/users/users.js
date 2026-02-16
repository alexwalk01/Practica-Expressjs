import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  usersDataValidator,
  usersPatchValidator,
  usersQueryValidator,
  usersResolver,
  usersExternalResolver,
  usersDataResolver,
  usersPatchResolver,
  usersQueryResolver
} from './users.schema.js'
import { UsersService, getOptions } from './users.class.js'
import { usersPath, usersMethods } from './users.shared.js'

export * from './users.class.js'
export * from './users.schema.js'

export const users = app => {
  app.use(usersPath, new UsersService(getOptions(app)), {
    methods: usersMethods,
    events: []
  })

  app.service(usersPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(usersExternalResolver), schemaHooks.resolveResult(usersResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(usersQueryValidator), schemaHooks.resolveQuery(usersQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(usersDataValidator), schemaHooks.resolveData(usersDataResolver)],
      patch: [schemaHooks.validateData(usersPatchValidator), schemaHooks.resolveData(usersPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}
