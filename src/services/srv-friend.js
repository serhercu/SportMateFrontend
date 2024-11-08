import HTTP_APP from '@/config/axios-conf-app'

const srvFriend = {

  async friendRequest(sender, receiver) {
    let payload = {
      sender,
      receiver
    }
    return HTTP_APP.put('/friend/request', payload).then((response) => {
      return response.data
    })
  },
	async status(playerId1, playerId2) {
    let payload = {
      params: {
        playerId1,
        playerId2
      }
    }
    return HTTP_APP.get('/friend/status', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  },
  async getFriendRequestByPlayer(playerId) {
    let payload = {
      params: {
        playerId
      }
    }
    return HTTP_APP.get('/friend/getFriendRequestByPlayer', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  },
  async getFriendsByPlayer(playerId) {
    let payload = {
      params: {
        playerId
      }
    }
    return HTTP_APP.get('/friend/getFriendsByPlayer', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  },
  async replyFriendRequest(sender, requesterReplier, status) {
    let payload = {
      sender,
      requesterReplier,
      status
    }
    return HTTP_APP.put('/friend/replyFriendRequest', payload).then((response) => {
      return response.data
    }).catch((error) => {
      console.log(error)
      throw error
    })
  }
}

export default srvFriend