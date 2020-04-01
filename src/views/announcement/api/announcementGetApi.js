import axios from '@/axios'
import Qs from 'qs'
export default async function announcementGetApi (filters) {
  try {
    return await axios.get('/announcement', {
      params: { ...filters },
      paramsSerializer: function (params) {
        return Qs.stringify(params)
      },
    })
  } catch (error) {
     return error.response
  }
}
