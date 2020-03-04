import axios from '@/axios'
export default async function taskDeleteApi (id) {
  try {
    return await axios.delete('/task', { params: { id } })
  } catch (error) {
    return error.response
  }
}
