import HTTP_APP from '@/config/axios-conf-app'

const srvPlayer = {

  async searchPlayer(search) {
		let payload = {
      params: {
        search
      }
    }
    return HTTP_APP.get('/player/search', payload).then((response) => {
      return response.data
    })
  }

}

export default srvPlayer