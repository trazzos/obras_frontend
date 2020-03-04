import axios from '@/axios'
export default async function invoicePatchApi (data) {
  try {
    return await axios.patch('/invoice', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
