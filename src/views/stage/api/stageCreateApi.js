import axios from '@/axios'
export default async function stageCreateApi (data) {
  try {
    return await axios.post('/stage', { ...data })
  } catch (error) {
   return error.response
  }
}
