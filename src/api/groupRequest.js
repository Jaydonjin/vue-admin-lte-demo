import {ajax} from '@/common'

export const groupRequest = {
  all (params) {
    params['per_page'] = params.pageSize || 20
    return ajax.get('/group_requests', params)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve({})
      })
  },
  approve (type, {Id, Comment}) {
    return ajax.put('/group_request/' + Id + '/' + type.toLowerCase(), {Comment: Comment})
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve({})
      })
  },
  add (entity) {
    return ajax.post('/group_requests', entity)
  }
}
