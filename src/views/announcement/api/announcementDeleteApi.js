import axios from '@/axios'
export default async function announcementDeleteApi (id) {
  try {
    return await axios.delete('/announcement', { params: { id } })
  } catch (error) {
    return error.response
  }
}
