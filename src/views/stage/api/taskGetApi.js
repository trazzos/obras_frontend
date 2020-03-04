import axios from '@/axios'
export default async function taskGetApi () {
  try {
    return await axios.get('/task', { params: { id: 'test' } })
  } catch (error) {
     return error.response
  }
}
