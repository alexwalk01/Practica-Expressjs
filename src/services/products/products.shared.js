export const productsPath = '/products'

export const productsMethods = ['find', 'get', 'create', 'patch', 'remove']

export const productsClient = client => {
  const connection = client.get('connection')

  client.use(productsPath, connection.service(productsPath), {
    methods: productsMethods
  })
}
