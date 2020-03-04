import axios from '@/axios'
export default async function catCompanysApi () {
  try {
    return await axios.get('/company', { params: { uuid: 'test' } })
  } catch (error) {
    throw new Error(error)
  }
}
