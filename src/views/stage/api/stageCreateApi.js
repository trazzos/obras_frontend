import axios from '@/axios'
export default async function createStage (data) {
  try {
    return await axios.post('/stage', { ...data })
  } catch (error) {
   return error.response
  }
}
