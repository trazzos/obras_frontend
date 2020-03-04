import axios from '@/axios'
export default async function taskPatchApi (data) {
  try {
    return await axios.patch('/task', { ...data })
  } catch (error) {
    return error.response
  }
}
