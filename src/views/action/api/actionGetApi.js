import axios from '@/axios'
import Qs from 'qs'
export default async function actionGetApi (filters) {
  try {
    return await axios.get('/action', {
      params: { ...filters },
      paramsSerializer: function (params) {
        return Qs.stringify(params)
      },
    })
  } catch (error) {
     return error.response
  }
}
