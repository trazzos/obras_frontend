import axios from '@/axios'
export default async function userPatchApi (data) {
  try {
    return await axios.patch('/user', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
