import axios from '@/axios'
export default async function userGetApi () {
  try {
    return await axios.get('/user', { params: { page: '1', per_page: '2' } })
  } catch (error) {
    throw new Error(error)
  }
}
