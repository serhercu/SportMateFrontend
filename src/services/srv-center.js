import HTTP_APP from '@/config/axios-conf-app'

const srvCenter = {

  async searchCenters(name, city, sports) {
		let payload = {
      params: {
        centerName: name,
				cityId: city,
				listSports: sports.join(',')
      }
    }
    return HTTP_APP.get('/center/centers', payload).then((response) => {
      return response.data
    })
  }

}

export default srvCenter