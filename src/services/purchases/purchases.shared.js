export const purchasesPath = '/purchases'

export const purchasesMethods = ['find', 'get', 'create', 'patch', 'remove']

export const purchasesClient = client => {
  const connection = client.get('connection')

  client.use(purchasesPath, connection.service(purchasesPath), {
    methods: purchasesMethods
  })
}
