import HTTP_APP from '@/config/axios-conf-app'

const srvAuth = {
  registerPlayer(email, username, name, surname, birthday, sportList, password, confirmPassword) {
    let payload = {
      player: {
        email,
        username,
        name,
        surname,
        birthday
      },
      sportList,
      password,
      confirmPassword
    }
    return HTTP_APP.post('/auth/registerPlayer', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  checkUsernameEmail(username, email) {
    let payload = {
      params: {
        username,
        email
      }
    }
    return HTTP_APP.get('/auth/checkUsernameEmail', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}
  
export default srvAuth