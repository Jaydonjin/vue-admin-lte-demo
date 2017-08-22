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
    return ajax.post('/group_infos', entity, {
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'Application/json'
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
