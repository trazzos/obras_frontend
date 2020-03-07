import axios from '@/axios'
export default async function userDeleteApi (id) {
  try {
    return await axios.delete('/user', { params: { id } })
  } catch (error) {
    throw new Error(error)
  }
}
