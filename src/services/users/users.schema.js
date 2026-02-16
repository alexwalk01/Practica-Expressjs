import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// =====================
// MAIN MODEL
// =====================
export const usersSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    email: Type.String(),
    age: Type.Number()
  },
  { $id: 'Users', additionalProperties: false }
)

export const usersValidator = getValidator(usersSchema, dataValidator)
export const usersResolver = resolve({})
export const usersExternalResolver = resolve({})

// =====================
// CREATE (POST)
// =====================
export const usersDataSchema = Type.Pick(usersSchema, ['name', 'email', 'age'], {
  $id: 'UsersData'
})

export const usersDataValidator = getValidator(usersDataSchema, dataValidator)
export const usersDataResolver = resolve({})

// =====================
// PATCH (UPDATE)
// =====================
export const usersPatchSchema = Type.Partial(Type.Pick(usersSchema, ['name', 'email', 'age']), {
  $id: 'UsersPatch'
})

export const usersPatchValidator = getValidator(usersPatchSchema, dataValidator)
export const usersPatchResolver = resolve({})

// =====================
// QUERY
// =====================
export const usersQueryProperties = Type.Pick(usersSchema, ['_id', 'name', 'email', 'age'])

export const usersQuerySchema = Type.Intersect(
  [querySyntax(usersQueryProperties), Type.Object({}, { additionalProperties: false })],
  { additionalProperties: false }
)

export const usersQueryValidator = getValidator(usersQuerySchema, queryValidator)
export const usersQueryResolver = resolve({})
