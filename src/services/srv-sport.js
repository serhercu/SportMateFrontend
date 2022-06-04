import HTTP_APP from '@/config/axios-conf-app'

const srvSport = {

  getAllSports() {
    return HTTP_APP.get('/getAllSports').then((response) => {
      return response.data
    })
  }

}

export default srvSport