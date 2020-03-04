import axios from '@/axios'
export default async function stageDeleteApi (id) {
  try {
    return await axios.delete('/stage', { params: { id } })
  } catch (error) {
    return error.response
  }
}
