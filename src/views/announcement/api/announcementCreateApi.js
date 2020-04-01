import axios from '@/axios'
export default async function announcementCreateApi (data) {
  try {
    return await axios.post('/announcement', { ...data })
  } catch (error) {
   return error.response
  }
}
