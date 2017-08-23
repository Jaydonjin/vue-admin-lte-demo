import { ajax, session } from '../common'

export const groupInfo = {
  all () {
    let token = session.get('token')
    return ajax.get('/group_infos', {}, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'Application/json'
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve([])
      })
  },
  newGroup (entity) {
    let token = session.get('token')
    let url = entity.ID ? '/group_info/' + entity.ID : '/group_infos'
    return ajax.post(url, entity, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  },
  deleteGroup (groupId) {
    // TODO(benjamin): process authorization
    let token = session.get('token')
    debugger
    let url = '/group_info/' + groupId
    return ajax.delete(url, undefined, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  },
  getGroup (groupId) {
    let token = session.get('token')
    let url = '/group_info/' + groupId
    return ajax.get(url, undefined, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  },
  getGroupTypes (groupId) {
    let token = session.get('token')
    let url = '/group_info/' + groupId + '/types'
    return ajax.get(url, undefined, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  }
}
