import axios from '@/axios'
export default async function stageGetApi () {
  try {
    return await axios.get('/stage', { params: { id: 'test' } })
  } catch (error) {
     return error.response
  }
}
