import axios from '@/axios'
export default async function createCompany (data) {
  try {
    return await axios.post('/company', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
