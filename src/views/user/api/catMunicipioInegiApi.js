import axios from 'axios'
export default async function catMunicipioInegiApi (cveAgee) {
  try {
    return await axios.get('https://gaia.inegi.org.mx/wscatgeo/mgem/' + cveAgee)
  } catch (error) {
    throw new Error(error)
  }
}
