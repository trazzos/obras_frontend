import axios from '@/axios'
export default async function stageGetApi (filters) {
  try {
    return await axios.get('/stage', { params: { ...filters } })
  } catch (error) {
     return error.response
  }
}
