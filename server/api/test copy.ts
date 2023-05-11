import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)

  const { data } = await client.from('countries').select('*')

  return { users: data }
})
