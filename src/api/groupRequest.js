import {ajax, session} from '@/common'

export const groupRequest = {
  all () {
    let token = session.get('token')
    return ajax.get('/group_requests', {}, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve({})
      })
  },
  approve (type, {Id, Comment}) {
    let token = session.get('token')
    return ajax.put('/group_request/' + Id + '/' + type.toLowerCase(), {Comment: Comment}, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve({})
      })
  }
}
