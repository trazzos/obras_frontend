import axios from '@/axios'
export default async function actionPatchApi (data) {
  try {
    return await axios.patch('/action', { ...data })
  } catch (error) {
    return error.response
  }
}
