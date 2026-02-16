import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// =====================
// MAIN MODEL
// =====================
export const purchasesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    userId: ObjectIdSchema(),
    products: Type.Array(
      Type.Object({
        productId: ObjectIdSchema(),
        quantity: Type.Number()
      })
    ),
    date: Type.String({ format: 'date-time' })
  },
  { $id: 'Purchases', additionalProperties: false }
)

export const purchasesValidator = getValidator(purchasesSchema, dataValidator)
export const purchasesResolver = resolve({})
export const purchasesExternalResolver = resolve({})

// =====================
// CREATE
// =====================
export const purchasesDataSchema = Type.Pick(purchasesSchema, ['userId', 'products', 'date'], {
  $id: 'PurchasesData'
})

export const purchasesDataValidator = getValidator(purchasesDataSchema, dataValidator)
export const purchasesDataResolver = resolve({})

// =====================
// PATCH
// =====================
export const purchasesPatchSchema = Type.Partial(purchasesDataSchema, {
  $id: 'PurchasesPatch'
})

export const purchasesPatchValidator = getValidator(purchasesPatchSchema, dataValidator)
export const purchasesPatchResolver = resolve({})

// =====================
// QUERY
// =====================
export const purchasesQueryProperties = Type.Pick(purchasesSchema, ['_id', 'userId'])

export const purchasesQuerySchema = Type.Intersect(
  [querySyntax(purchasesQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)

export const purchasesQueryValidator = getValidator(purchasesQuerySchema, queryValidator)
export const purchasesQueryResolver = resolve({})
