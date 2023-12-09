import HTTP_APP from '@/config/axios-conf-app'

const srvGame = {
  createGame(gameToCreate) {
    let payload = {
      description: gameToCreate.description,
      playersRequired: gameToCreate.players,
      level: gameToCreate.level,
      location: gameToCreate.location,
      date: gameToCreate.date,
      privacy: gameToCreate.privacy,
      sport: gameToCreate.sport,
      province: gameToCreate.province
    }
    return HTTP_APP.post('/game/createGame', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  async getGames(sportId, levelValue, dateStart, dateEnd, locationId) {
    let payload = {
      params: {
        sportId,
        levelValue,
        dateStart,
        dateEnd,
        locationId
      }
    }
    return HTTP_APP.get('/game/games', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  }
}

export default srvGame