import { createClient } from '@supabase/supabase-js'

const supabase_url = 'https://hhxlyesjmtbhnqwsoplw.supabase.co'
const anon_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeGx5ZXNqbXRiaG5xd3NvcGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQzMzE3NjYsImV4cCI6MTk5OTkwNzc2Nn0.MZQt6Je4Vj1-7wvGa4N0VxOg5o7AWZYbOeatVYU3sUc'



// const storageAdapter = {
//     getItem: async (name) => {
//      const data = await localStorage.getItem(name)
//      return data
//     },
  
//     setItem: async (name, value) => {
//         return await localStorage.setItem(name, value)
//     },
  
//     removeItem: async (name) => {
//       return await localStorage.removeItem(name)
//     },
//   };

export const supabase = createClient(supabase_url, anon_key, 
//     {
//     auth: {
//         storage: storageAdapter,
//         persistSession: true,
// autoRefreshToken: false,
// detectSessionInUrl: false,
//     }
// }
)
  