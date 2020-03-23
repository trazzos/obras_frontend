import axios from '@/axios'
export default async function actionGetApi (filters) {
  try {
    return await axios.get('/action', { params: { ...filters } })
  } catch (error) {
     return error.response
  }
}
