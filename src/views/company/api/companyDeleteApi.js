import axios from '@/axios'
export default async function companyDeleteApi (id) {
  try {
    return await axios.delete('/company', { params: { id } })
  } catch (error) {
    throw new Error(error)
  }
}
