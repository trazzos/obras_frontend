import axios from '@/axios'
export default async function createInvoice (data) {
  try {
    return await axios.post('/invoice', { ...data })
  } catch (error) {
    throw new Error(error)
  }
}
