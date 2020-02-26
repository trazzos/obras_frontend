import axios from '@/axios'
export default async function stageDeleteApi (uuid) {
  try {
    return await axios.delete('/company', { params: { uuid } })
  } catch (error) {
    throw new Error(error)
  }
}
