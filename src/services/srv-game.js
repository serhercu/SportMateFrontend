import HTTP_APP from '@/config/axios-conf-app'

const srvGame = {
  async getGame(idGame) {
    let payload = {
      params: {
        idGame
      }
    }
    return HTTP_APP.get('/game', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  },
  createGame(gameToCreate) {
    let payload = {
      description: gameToCreate.description,
      playersRequired: gameToCreate.players,
      level: gameToCreate.level,
      location: gameToCreate.location,
      date: gameToCreate.date,
      privacy: gameToCreate.privacy,
      sport: gameToCreate.sport,
      city: gameToCreate.city,
      time: gameToCreate.time
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
  },
  async joinGame(gameId, playerId) {
    let payload = {
      gameId,
      playerId
    }
    return HTTP_APP.post('/game/joinGame', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  async leaveGame(gameId, playerId) {
    let payload = {
      gameId,
      playerId
    }
    return HTTP_APP.post('/game/leaveGame', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }
}

export default srvGame