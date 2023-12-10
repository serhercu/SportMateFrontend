import HTTP_APP from '@/config/axios-conf-app'

const srvCity = {

  getAllCities() {
    return HTTP_APP.get('/city/cities').then((response) => {
      return response.data
    })
  }

}

export default srvCity