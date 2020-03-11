import axios from '@/axios'
export default async function userGetApi (page) {
  try {
    return await axios.get('/user', {
      params: {
        page: page,
        per_page: 2, // TODO send this value and predicates
      },
    })
  } catch (error) {
    throw new Error(error)
  }
}
