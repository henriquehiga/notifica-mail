export const badRequest = (body: string) => ({
  statusCode: 400,
  body
})

export const created = (body?: string) => ({
  statusCode: 201,
  body: body ?? null
})