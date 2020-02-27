import axios from '@/axios'
export default async function createUser (data) {
  try {
    return await axios.post('/user', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
