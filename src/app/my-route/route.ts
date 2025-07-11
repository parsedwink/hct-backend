import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async (request: Request) => {
  const payload = await getPayload({
    config: configPromise,
  })

  console.log(`${request} ${payload.config.routes}`)
  return Response.json({
    message: 'This is an example of a custom route.',
  })
}
