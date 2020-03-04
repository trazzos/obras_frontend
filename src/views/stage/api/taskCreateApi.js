import axios from '@/axios'
export default async function taskCreateApi (data) {
  try {
    return await axios.post('/task', { ...data })
  } catch (error) {
   return error.response
  }
}
