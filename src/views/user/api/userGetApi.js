import axios from '@/axios'
export default async function userGetApi (request) {
  try {
    return await axios.get('/user', {
      params: request,
    })
  } catch (error) {
    throw new Error(error)
  }
}
