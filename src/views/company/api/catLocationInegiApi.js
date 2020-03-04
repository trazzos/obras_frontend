import axios from 'axios'
export default async function catLocationInegiApi (cveAgee, cveAgem) {
  try {
    return await axios.get('https://gaia.inegi.org.mx/wscatgeo/localidades/' + cveAgee + cveAgem)
  } catch (error) {
    throw new Error(error)
  }
}
