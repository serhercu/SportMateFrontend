import HTTP_APP from '@/config/axios-conf-app'

const srvLevel = {

  getAllLevels() {
    return HTTP_APP.get('/level/getAllLevels').then((response) => {
      return response.data
    })
  }

}

export default srvLevel