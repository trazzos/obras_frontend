import axios from '@/axios'
export default async function companyGetApi () {
  try {
    return await axios.get('/company', { params: { uuid: 'test' } })
  } catch (error) {
    throw new Error(error)
  }
}
