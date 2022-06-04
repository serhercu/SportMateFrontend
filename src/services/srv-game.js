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
    return HTTP_APP.post('/createGame', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
    })
  }

}

export default srvGame