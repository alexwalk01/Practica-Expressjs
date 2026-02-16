import { purchases } from './purchases/purchases.js'
import { products } from './products/products.js'
import { users } from './users/users.js'
export const services = app => {
  app.configure(purchases)

  app.configure(products)

  app.configure(users)

  // All services will be registered here
}
