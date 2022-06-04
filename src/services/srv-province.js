import HTTP_APP from '@/config/axios-conf-app'

const srvProvince = {

  getAllProvinces() {
    return HTTP_APP.get('/province/getAllProvinces').then((response) => {
      return response.data
    })
  }

}

export default srvProvince