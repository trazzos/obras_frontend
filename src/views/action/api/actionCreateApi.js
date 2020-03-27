import axios from '@/axios'
export default async function actionCreateApi (data) {
  try {
    return await axios.post('/action', { ...data })
  } catch (error) {
   return error.response
  }
}
