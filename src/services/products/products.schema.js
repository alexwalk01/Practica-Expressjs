import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// =====================
// MAIN MODEL
// =====================
export const productsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    description: Type.String(),
    price: Type.Number(),
    imgUrl: Type.String(),
    categories: Type.Array(Type.String()),
    options: Type.Array(Type.String())
  },
  { $id: 'Products', additionalProperties: false }
)

export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve({})
export const productsExternalResolver = resolve({})

// =====================
// CREATE
// =====================
export const productsDataSchema = Type.Pick(
  productsSchema,
  ['name', 'description', 'price', 'imgUrl', 'categories', 'options'],
  { $id: 'ProductsData' }
)

export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve({})

// =====================
// PATCH
// =====================
export const productsPatchSchema = Type.Partial(productsDataSchema, {
  $id: 'ProductsPatch'
})

export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve({})

// =====================
// QUERY
// =====================
export const productsQueryProperties = Type.Pick(productsSchema, ['_id', 'name', 'price'])

export const productsQuerySchema = Type.Intersect(
  [querySyntax(productsQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)

export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve({})
