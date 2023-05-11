import { serverSupabaseClient } from '#supabase/server'

export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)

  const { data } = await client.from('test').select('*')

  return { test: data }
})
