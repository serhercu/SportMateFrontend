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
      province: gameToCreate.province,
      time: gameToCreate.time
    }
    return HTTP_APP.post('/game/createGame', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  },
  findGameWithParams(payload) {
    return HTTP_APP.get('/game/findGameWithParams', payload).then((response) => {
      return response
    }).catch((error) => {
      console.log(error)
    })
  }


}

export default srvGame