import axios from 'axios'
export default async function catStateInegiApi () {
  try {
    return await axios.get('https://gaia.inegi.org.mx/wscatgeo/mgee/')
  } catch (error) {
    throw new Error(error)
  }
}
