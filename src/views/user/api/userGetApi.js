import axios from '@/axios'
// import userStore from 'userModule/stores/userStore'
export default async function userGetApi (page) {
  try {
    console.log(page)
    // console.log(userStore.state.pagination)
    return await axios.get('/user', {
      params: {
        page: page,
        per_page: 2,
      },
    })
  } catch (error) {
    throw new Error(error)
  }
}
