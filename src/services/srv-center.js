import HTTP_APP from '@/config/axios-conf-app'

const srvCenter = {

  async searchCenters(name, city, sports) {
		const parsedSports = sports !== null ? sports : []
		let payload = {
      params: {
        centerName: name,
				cityId: city,
				listSports: parsedSports.join(',')
      }
    }
    return HTTP_APP.get('/center/centers', payload).then((response) => {
      return response.data
    })
  },
  async getCenter(centerId) {
    let payload = {
      params: {
        centerId
      }
    }
    return HTTP_APP.get('/center', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  }

}

export default srvCenter