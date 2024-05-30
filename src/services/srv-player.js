import HTTP_APP from '@/config/axios-conf-app'

const srvPlayer = {

  async searchPlayer(search, playerId) {
		let payload = {
      params: {
        search,
        playerId
      }
    }
    return HTTP_APP.get('/player/search', payload).then((response) => {
      return response.data
    })
  }

}

export default srvPlayer