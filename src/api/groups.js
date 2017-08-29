import {ajax} from '../common'

export const groups = {
  all (params) {
    params['per_page'] = params.pageSize || 20
    return ajax.get('/groups', params)
      .then(response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        }
        return Promise.resolve({})
      })
  }
}
