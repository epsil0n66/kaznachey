import { serverSupabaseClient } from '#supabase/server'
export default eventHandler(async (event) => {
  const client = serverSupabaseClient(event)
  const { data } = await client.from('test').insert([{ text: 'Value2' }])
  return { test: data }
})