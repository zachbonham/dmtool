// Composable for Supabase operations
export const useSupabase = () => {
  const supabase = useSupabaseClient()

  const testConnection = async () => {
    try {
      // Test connection by checking if we can access the client
      const { data, error } = await supabase.from('test').select('*').limit(1)
      if (error && error.code !== 'PGRST116') { // PGRST116 is "relation does not exist" which is expected for test table
        throw error
      }
      return { success: true, message: 'Supabase connection successful' }
    } catch (error) {
      return { success: false, message: `Connection failed: ${error.message}` }
    }
  }

  return {
    supabase,
    testConnection
  }
}