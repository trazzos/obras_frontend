import axios from '@/axios'
export default async function userGetApi () {
  try {
    return await axios.get('/user', { params: { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8', 8: '9', 9: '10', 10: '11' } })
  } catch (error) {
    throw new Error(error)
  }
}
