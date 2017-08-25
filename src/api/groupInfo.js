import {ajax} from '../common'

export const groupInfo = {
  all () {
    return ajax.get('/group_infos')
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve([])
      })
  },
  newGroup (entity) {
    let url = entity.ID ? '/group_info/' + entity.ID : '/group_infos'
    return ajax.post(url, entity)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  },
  deleteGroup (groupId) {
    let url = '/group_info/' + groupId
    return ajax.delete(url)
  },
  getGroup (groupId) {
    let url = '/group_info/' + groupId
    return ajax.get(url)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  },
  getGroupTypes (groupId) {
    let url = '/group_info/' + groupId + '/types'
    return ajax.get(url)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.reject(false)
      })
  }
}
