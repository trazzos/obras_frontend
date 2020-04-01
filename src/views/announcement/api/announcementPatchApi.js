import axios from '@/axios'
export default async function announcementPatchApi (data) {
  try {
    return await axios.patch('/announcement', { ...data })
  } catch (error) {
    return error.response
  }
}
