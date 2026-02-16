// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
  purchasesDataValidator,
  purchasesPatchValidator,
  purchasesQueryValidator,
  purchasesResolver,
  purchasesExternalResolver,
  purchasesDataResolver,
  purchasesPatchResolver,
  purchasesQueryResolver
} from './purchases.schema.js'
import { PurchasesService, getOptions } from './purchases.class.js'
import { purchasesPath, purchasesMethods } from './purchases.shared.js'

export * from './purchases.class.js'
export * from './purchases.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const purchases = app => {
  // Register our service on the Feathers application
  app.use(purchasesPath, new PurchasesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: purchasesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(purchasesPath).hooks({
    around: {
      all: [
        schemaHooks.resolveExternal(purchasesExternalResolver),
        schemaHooks.resolveResult(purchasesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(purchasesQueryValidator),
        schemaHooks.resolveQuery(purchasesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(purchasesDataValidator),
        schemaHooks.resolveData(purchasesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(purchasesPatchValidator),
        schemaHooks.resolveData(purchasesPatchResolver)
      ],
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
