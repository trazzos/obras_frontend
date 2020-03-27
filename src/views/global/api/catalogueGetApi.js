import axios from '@/axios'
export default async function catalogueGetApi (filters) {
  try {
    return await axios.get('/setting/catalogue', { params: { ...filters } })
  } catch (error) {
     return error.response
  }
}
