import axios from '@/axios'
import Qs from 'qs'
export default async function announcementTypeGetApi (filters) {
  try {
    return await axios.get('/announcement_type', {
      params: { ...filters },
      paramsSerializer: function (params) {
        return Qs.stringify(params)
      },
    })
  } catch (error) {
     return error.response
  }
}
