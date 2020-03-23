import axios from '@/axios'
export default async function actionDeleteApi (id) {
  try {
    return await axios.delete('/action', { params: { id } })
  } catch (error) {
    return error.response
  }
}
