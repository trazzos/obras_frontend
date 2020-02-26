import axios from '@/axios'
export default async function companyPatchApi (data) {
  try {
    return await axios.patch('/company', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
