import axios from '@/axios'
export default async function stagePatchApi (data) {
  try {
    return await axios.patch('/stage', { ...data })
  } catch (error) {
    return error.response
  }
}
