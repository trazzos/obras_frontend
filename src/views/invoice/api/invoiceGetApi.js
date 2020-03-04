import axios from '@/axios'
export default async function invoiceGetApi () {
  try {
    return await axios.get('/invoice', { params: { id: 'test' } })
  } catch (error) {
    throw new Error(error)
  }
}
